import { en } from './en';
import { fr } from './fr';
import { ar } from './ar';
import { Language, TranslationStructure } from '../types';

export const locales: Record<Language, TranslationStructure> = {
  en,
  fr,
  ar
};

export const cafCountries = [
  "Morocco", "Egypt", "Senegal", "Nigeria", "Algeria", "Tunisia", 
  "Cameroon", "Ivory Coast", "Ghana", "South Africa", "Mali", 
  "Burkina Faso", "DR Congo", "Guinea"
];
