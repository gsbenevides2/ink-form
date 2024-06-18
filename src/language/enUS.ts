import { FormLanguageTexts } from '../types.js';

const enUSLanguage: FormLanguageTexts = {
  arrowKeysInstruction: 'Use arrow keys to move around',
  escKeyInstruction: 'Press ESC to cancel, or Enter to complete field',
  editingField: 'Editing',
  pressEnterToEdit: 'Press enter to edit',
  noFormFieldManager: 'No formfield manager for form field of type {formfieldtype} available.',
  pressEscToCancel: 'Press ESC to cancel',
  pressEnterToComplete: 'Press {needCtrlToReturnSave} to complete field, or ESC to cancel.',
  minNumberError: '{value} too samll, must be above or equal to {min}.',
  maxNumberError: '{value} too big, must be below or equal to {max}.',
  floatOrIntegerError: '{value} is not an {type}.',
  increaseOrDecrease: 'Press UP/DOWN to increase or decrease the value.',
  missingRequired: 'There are still required inputs you have not competed yet.',
  pressEnterToSubmit: 'Press Enter to submit form',
  useArrowKeysToNavigate: 'Use the arrow keys to navigate to the submit button.',
  cannotSubmit: 'Cannot submit form yet',
  submmitButton: 'Submit form',
  booleanTrue: '[True]',
  booleanFalse: '[False]',
  booleanNotSet: '[Not set]',
  stringRegularError: 'Value does not conform to regular expression: {regex}',
  selectNoValue: 'No value',
};

export default enUSLanguage;
