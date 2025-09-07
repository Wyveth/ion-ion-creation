export interface Resource {
  layout: Layout;
  toast: Toast;
  table: Table;
  db: Db;
  filter: Filter;
  form: Form;
}

//#region Layout
export interface Layout {
  config: Config;
  footer: Footer;
  topbar: Topbar;
}

export interface Config {
  scale: string;
  menu_type: string;
  static: string;
  overlay: string;
  input_style: string;
  outlined: string;
  filled: string;
  ripple_effect: string;
}

export interface Footer {
  title: string;
}

export interface Topbar {
  calendrier: string;
  notifications: string;
  messages: string;
  profil: string;
}
//#endregion

//#region Toast
export interface Toast {
  error: string;
  errorDescription: string;
  success: string;
  info: string;
  warning: string;
  confirm: string;
  confirmDescriptionM: string;
  confirmDescriptionF: string;
  confirmDescriptionP: string;
}
//#endregion

//#region Table
export interface Table {
  new: string;
  new_format: string;
  newF: string;
  newF_format: string;
  newOK: string;
  edit: string;
  edit_format: string;
  updateOK: string;
  delete: string;
  delete_format: string;
  deleteP_format: string;
  manage: string;
  search: string;
  export: Export;
  columnHeader: ColumnHeader;
  columnTemplate: ColumnTemplate;
}

export interface Export {
  codeCSV: string;
  csv: string;
  codeCSV_P: string;
  csv_p: string;
  codeExcel: string;
  excel: string;
  codePdf: string;
  pdf: string;
}

export interface ColumnHeader {
  code: string;
  libelle: string;
  description: string;
  actions: string;
}

export interface ColumnTemplate {
  text: string;
  date: string;
  datetime: string;
  time: string;
  number: string;
  currency: string;
  boolean: string;
  action: string;
}
//#endregion

//#region Db
export interface Db {
  tag: string;
  category: string;
  properties: Properties;
}

export interface Properties {
  key: string;
  code: string;
  libelle: string;
  description: string;
  created_at: string;
  updated_at: string;
}
//#endregion

//#region Filter
export interface Filter {
  contains: string;
}
//#endregion

//#region Form
export interface Form {
  mandatoryM: string;
  mandatoryF: string;
  invalidEmail: string;
  invalidUrl: string;
  invalidPatternMessage: string;
  invalidPatternMessageDetail: string;
  invalidPatternMessageDetail2: string;
  cancel: string;
  save: string;
  yes: string;
  no: string;
}
//#endregion
