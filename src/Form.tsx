import { Box, useFocusManager, useInput } from 'ink';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { DescriptionRenderer } from './DescriptionRenderer.js';
import { FormFieldRenderer } from './FormFieldRenderer.js';
import { FormHeader } from './FormHeader.js';
import { SubmitButton } from './SubmitButton.js';
import { canSubmit } from './canSubmit.js';
import { LanguageContext } from './language/context.js';
import enUSLanguage from './language/enUS.js';
import { FormProps } from './types.js';

export const Form: React.FC<FormProps> = props => {
  const isControlled = props.value !== undefined;
  const [currentTab, setCurrentTab] = useState(0);
  const [value, setValue] = useState<object>(props.value ?? {});
  const [editingField, setEditingField] = useState<string>();
  const canSubmitForm = useMemo(() => canSubmit(props.form, value), [value, props.form]);
  const focusManager = useFocusManager();

  useEffect(() => {
    focusManager.enableFocus();
  }, []);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    // Set initial values
    if (!isControlled) {
      setValueAndPropagate({
        ...value,
        ...props.form.sections
          .map(section =>
            section.fields
              .map(field => (field.initialValue !== undefined ? { [field.name]: field.initialValue } : {}))
              .reduce((obj1, obj2) => ({ ...obj1, ...obj2 }), {})
          )
          .reduce((obj1, obj2) => ({ ...obj1, ...obj2 }), {}),
      });
    }
  }, []);

  const setValueAndPropagate = (value: object) => {
    setValue(value);
    props.onChange?.(value);
  };

  useInput(
    (input, key) => {
      if (key.upArrow) {
        focusManager.focusPrevious();
      } else if (key.downArrow) {
        focusManager.focusNext();
      }
    },
    { isActive: !editingField }
  );

  return (
    <LanguageContext.Provider value={props.language ?? enUSLanguage}>
      <Box width="100%" height="100%" flexDirection="column">
        <FormHeader {...props} currentTab={currentTab} onChangeTab={setCurrentTab} editingField={editingField} />
        {!editingField && props.form.sections[currentTab].description && (
          <Box marginX={4}>
            <DescriptionRenderer description={props.form.sections[currentTab].description} />
          </Box>
        )}
        <Box flexDirection="column">
          {currentTab > props.form.sections.length - 1
            ? null
            : props.form.sections[currentTab].fields.map(field => (
                <FormFieldRenderer
                  field={field}
                  key={field.name}
                  form={props.form}
                  value={value[field.name]}
                  onChange={v => setValueAndPropagate({ ...value, [field.name]: v })}
                  onSetEditingField={setEditingField}
                  editingField={editingField}
                  customManagers={props.customManagers}
                />
              ))}
        </Box>
        {!editingField && (
          <Box flexDirection="row-reverse">
            <SubmitButton canSubmit={canSubmitForm} onSubmit={() => props.onSubmit?.(value)} />
          </Box>
        )}
      </Box>
    </LanguageContext.Provider>
  );
};
