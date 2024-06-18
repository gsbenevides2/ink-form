import { Box, Transform } from 'ink';
import TextInput from 'ink-text-input';
import React from 'react';
import { LanguageContext } from '../language/context.js';
import {
  FormFieldManager,
  FormFieldString,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';

export class StringFormFieldManager implements FormFieldManager<FormFieldString> {
  public type: TypeOfField<FormFieldString> = 'string';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldString>> = props => {
    const language = React.useContext(LanguageContext);
    return (
      <Box borderStyle={'round'} width="100%">
        <TextInput
          value={props.value ?? ''}
          onChange={value => {
            props.onChange(value);

            if (props.field.regex && !props.field.regex.test(value)) {
              props.onError(language.stringRegularError.replace('{regex}', props.field.regex.source));
            } else {
              props.onClearError();
            }
          }}
          placeholder={props.field.placeholder}
          onSubmit={() => props.onSetEditingField(undefined)}
          mask={props.field.mask}
        />
      </Box>
    );
  };

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldString>> = props => (
    <Transform
      transform={
        props.value !== undefined && props.field.mask
          ? text =>
              text
                .split('')
                .map(char => '*')
                .join('')
          : text => text
      }
    >
      {props.value}
    </Transform>
  );
}
