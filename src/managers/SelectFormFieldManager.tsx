import { Box } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
import { LanguageContext } from '../language/context.js';
import {
  FormFieldManager,
  FormFieldSelect,
  FormFieldValueRendererProps,
  SpecificFormFieldRendererProps,
  TypeOfField,
} from '../types.js';

export class SelectFormFieldManager implements FormFieldManager<FormFieldSelect> {
  needCtrlToReturnSave?: boolean | undefined;
  public type: TypeOfField<FormFieldSelect> = 'select';

  public renderField: React.FC<SpecificFormFieldRendererProps<FormFieldSelect>> = props => (
    <Box borderStyle={'round'} width="100%">
      <SelectInput
        items={props.field.options.map(option => ({ value: option.value, label: option.label ?? option.value }))}
        onHighlight={option => props.onChange(option.value)}
        initialIndex={props.field.options.findIndex(option => option.value === props.value) ?? 0}
      />
    </Box>
  );

  public renderValue: React.FC<FormFieldValueRendererProps<FormFieldSelect>> = props => {
    const language = React.useContext(LanguageContext);
    return (
      <>
        {props.field.options.find(option => option.value === props.value)?.label ??
          props.value ??
          language.selectNoValue}
      </>
    );
  };
}
