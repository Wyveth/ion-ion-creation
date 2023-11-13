export type ColType = 'text' | 'routerLink' | 'money' | 'checkbox' | 'datetime';

export type TextDecoration = { prefix: string; suffix: string } | undefined;
export type Currency = '€';
export type ColSuffix = { text: string; isField: boolean };
export type DatetimeFormat = 'dd/MM/yyyy HH:mm' | 'dd/MM/yyyy' | 'HH:mm';

export type Param<T extends ColType> = T extends 'text'
  ? TextDecoration
  : T extends 'routerLink'
  ? string
  : T extends 'money'
  ? Currency
  : T extends 'checkbox'
  ? ColSuffix[]
  : T extends 'datetime'
  ? DatetimeFormat
  : never;

/** @param T Représente le type de colonne suivant les possibilités de ColType */
export class Column<T extends ColType> {
  field: string;
  header: string;
  customExportHeader?: string;
  type: string;
  parameters: Param<T>;
  properties: string[];
  classStyle: string;
  width: number;
  filterable: boolean;
  separator: string;
  defaultValue: string;

  /**
   * @param header En-tête de la colonne
   * @param field Valeur de la colonne
   * @param type Type de la colonne
   * @param optionals Options supplémentaires
   * @param optionals.classStyle Classe CSS de la colonne
   * @param optionals.separator Séparateur de la colonne
   * @param optionals.filterable Colonne filtrable
   * @param optionals.width Largeur de la colonne
   * @param optionals.defaultValue Valeur par défaut de la colonne
   */
  constructor(
    header: string,
    field: string,
    type: string,
    paramaters: Param<T>,
    properties: string[],
    optionals: {
      classStyle?: string;
      separator?: string;
      filterable?: boolean;
      width?: number;
      defaultValue?: string;
    } = {},
  ) {
    this.field = field;
    this.header = header;
    this.type = type;
    this.parameters = paramaters;
    this.properties = properties;
    this.classStyle = optionals?.classStyle ?? '';
    this.width = optionals?.width ?? 100;
    this.filterable = false;
    this.separator = optionals?.separator ?? '';
    this.defaultValue = optionals?.defaultValue ?? '';
  }

  //#region Ascesseurs
  getField(): string {
    return this.field;
  }

  setField(field: string) {
    this.field = field;
  }

  getHeader(): string {
    return this.header;
  }

  setHeader(header: string) {
    this.header = header;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  getParameters(): Param<T> {
    return this.parameters;
  }

  getProperties(): string[] {
    return this.properties;
  }

  setProperties(properties: string[]) {
    this.properties = properties;
  }

  getClassStyle(): string {
    return this.classStyle;
  }

  setClassStyle(classStyle: string) {
    this.classStyle = classStyle;
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number) {
    this.width = width;
  }

  getFilterable(): boolean {
    return this.filterable;
  }

  setFilterable(filterable: boolean) {
    this.filterable = filterable;
  }

  getSeparator(): string {
    return this.separator;
  }

  setSeparator(separator: string) {
    this.separator = separator;
  }

  getDefaultValue(): string {
    return this.defaultValue;
  }

  setDefaultValue(defaultValue: string) {
    this.defaultValue = defaultValue;
  }
  //#endregion
}

export interface ExportColumn {
  title: string;
  dataKey: string;
}
