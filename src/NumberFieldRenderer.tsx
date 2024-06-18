import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import React from 'react';
import { LanguageContext } from './language/context.js';
import { FormFieldFloat, FormFieldInteger, SpecificFormFieldRendererProps } from './types.js';

const FLOAT_REGEX = /^-?((\d+)|(\d*\.\d+))$/;
const INTEGER_REGEX = /^-?\d+$/;

export const NumberFieldRenderer: React.FC<
  SpecificFormFieldRendererProps<FormFieldInteger | FormFieldFloat> & { isFloat: boolean }
> = props => {
  const language = React.useContext(LanguageContext);
  const regex = props.isFloat ? FLOAT_REGEX : INTEGER_REGEX;
  const parse = props.isFloat ? parseFloat : parseInt;

  const change = (value: string) => {
    if (regex.test(value)) {
      props.onClearError();
      const asNumber = Math.round(parse(value) * 100000) / 100000;
      if (props.field.min !== undefined && props.field.min > asNumber) {
        props.onError(language.minNumberError.replace('{value}', value).replace('{min}', props.field.min.toString()));
        props.onChange(value as any);
        return;
      } else if (props.field.max !== undefined && props.field.max < asNumber) {
        props.onError(language.maxNumberError.replace('{value}', value).replace('{max}', props.field.max.toString()));
        props.onChange(value as any);
        return;
      } else {
        props.onChange(asNumber);
      }
    } else {
      props.onError(
        language.floatOrIntegerError.replace('{value}', value).replace('{type}', props.isFloat ? 'float' : 'integer')
      );
      props.onChange(value as any);
    }
  };

  useInput((input, key) => {
    if (typeof props.value === 'number') {
      if (key.upArrow) {
        change('' + ((props.value ?? 0) + (props.field.step ?? 1)));
      } else if (key.downArrow) {
        change('' + ((props.value ?? 0) - (props.field.step ?? 1)));
      }
    } else {
      if (key.upArrow || key.downArrow) {
        change(
          '' + ((props.field.min ?? 0) <= 0 && (props.field.max ?? 0) >= 0 ? 0 : props.field.min ?? props.field.max)
        );
      }
    }
  });

  return (
    <Box borderStyle={'round'} width="100%" flexDirection="column">
      <Box>
        <TextInput
          value={'' + (props.value ?? '')}
          onChange={value => {
            if (regex.test(value)) {
              props.onClearError();
              change(value);
            } else {
              props.onError(
                language.floatOrIntegerError
                  .replace('{value}', value)
                  .replace('{type}', props.isFloat ? 'float' : 'integer')
              );
              props.onChange(value as any);
            }
          }}
          placeholder={props.field.placeholder}
          onSubmit={() => props.onSetEditingField(undefined)}
        />
      </Box>
      <Box>
        <Text dimColor>{language.increaseOrDecrease}</Text>
      </Box>
    </Box>
  );
};
