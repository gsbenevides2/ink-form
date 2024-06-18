import { Box, Text, useFocus, useInput } from 'ink';
import React from 'react';
import { LanguageContext } from './language/context.js';

export const SubmitButton: React.FC<{
  canSubmit: boolean;
  onSubmit: () => void;
}> = props => {
  const language = React.useContext(LanguageContext);
  const { isFocused } = useFocus({ isActive: props.canSubmit });
  useInput((input, key) => {
    if (key.return && isFocused && props.canSubmit) {
      props.onSubmit();
    }
  });

  return (
    <Box marginRight={2}>
      <Box marginRight={2} paddingY={1}>
        <Text>
          {!props.canSubmit
            ? language.missingRequired
            : isFocused
            ? language.pressEnterToSubmit
            : language.useArrowKeysToNavigate}
        </Text>
      </Box>
      <Box borderStyle={'round'} borderColor={!props.canSubmit ? 'gray' : isFocused ? 'blue' : 'white'} paddingX={2}>
        <Text color={!props.canSubmit ? 'gray' : isFocused ? 'blue' : 'white'} bold={true} underline={isFocused}>
          {props.canSubmit ? language.submmitButton : language.cannotSubmit}
        </Text>
      </Box>
    </Box>
  );
};
