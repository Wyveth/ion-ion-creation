import { DatetimeFormat } from '../models/tables/column';

export type AutocompleteType = { options: any[] };
export type CalendarType = {
  selectionMode: 'single' | 'multiple' | 'range';
  dateFormat: DatetimeFormat;
  readonlyInput: boolean;
};
export type CurrencyType = { mode: string; currency: string; locale: string };
export type ChexboxType = { key: string; value: string }[];
export type DropdownType = {
  options: any[];
  placeholder: string;
  editable: boolean;
  optionLabel: string;
};
export type EditorType = { placeholder: string };
export interface TextType {
  [key: string]: any;
  placeholder: string;
}
export type TextareaType = { rows: string; cols: string; placeholder: string };
export type NumberType = { placeholder: string };
export type MultiselectType = {
  options: any[];
  placeholder: string;
  optionLabel: string;
};
export type RadioType = { key: string; value: string }[];
export type RatingType = { stars: number; cancel: boolean; disabled: boolean };
export type SelectType = {
  options: any[];
  optionLabel: string;
  optionValue: string;
};

export type FormControlType =
  | 'autocomplete'
  | 'calendar'
  | 'checkbox'
  | 'currency'
  | 'dropdown'
  | 'editor'
  | 'text'
  | 'textarea'
  | 'number'
  | 'multiselect'
  | 'radio'
  | 'rating'
  | 'select';

export type Param<T extends FormControlType> = T extends 'autocomplete'
  ? AutocompleteType
  : T extends 'calendar'
  ? CalendarType
  : T extends 'checkbox'
  ? ChexboxType
  : T extends 'currency'
  ? CurrencyType
  : T extends 'dropdown'
  ? DropdownType
  : T extends 'editor'
  ? EditorType
  : T extends 'text'
  ? TextType
  : T extends 'textarea'
  ? TextareaType
  : T extends 'number'
  ? NumberType
  : T extends 'multiselect'
  ? MultiselectType
  : T extends 'radio'
  ? RadioType
  : T extends 'rating'
  ? RatingType
  : T extends 'select'
  ? SelectType
  : never & {
      [key: string]: string; // Remplacez 'any' par le type souhaité
    };
