import { createContext } from 'react';
import { FormLanguageTexts } from '../types.js';
import enUSLanguage from './enUS.js';

export const LanguageContext = createContext<FormLanguageTexts>(enUSLanguage);
