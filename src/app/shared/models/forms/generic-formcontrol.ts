import {
  FormControlOptions,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';

export interface ValidatorMessageCustom {
  key: string;
  message: string;
}

export class GenericFormControl<T> {
  /** @var name Nom du FormControl */
  private name: string;
  /** @var text Text du label */
  private text: string;
  /** @var type Type du FormControl */
  private type: string;
  /** @var value Value du FormControl */
  value: T;

  validatorOrOpts?:
    | FormControlOptions
    | ValidatorFn
    | ValidatorFn[]
    | null
    | undefined;

  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null | undefined;

  erroMessages?: ValidatorMessageCustom[];
  /**
   * Constructeur de formulaire
   * @param name Nom du FormControl
   * @param text Text du label
   * @param value Value du FormControl
   * @param validatorOrOpts Validator du FormControl
   * @param asyncValidator AsyncValidator du FormControl
   * @param errorMessages Messages d'erreurs
   */
  constructor(
    name: string,
    text: string,
    type: string,
    value: T,
    validatorOrOpts?:
      | FormControlOptions
      | ValidatorFn
      | ValidatorFn[]
      | null
      | undefined,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null | undefined,
    errorMessages?: ValidatorMessageCustom[],
  ) {
    this.name = name;
    this.text = text;
    this.type = type;
    this.value = value;
    this.validatorOrOpts = validatorOrOpts;
    this.asyncValidator = asyncValidator;
    this.erroMessages = errorMessages;
  }

  //#region Ascesseurs
  getName(): string {
    return this.name;
  }

  getText(): string {
    return this.text;
  }

  getType(): string {
    return this.type;
  }

  getValue(): T {
    return this.value;
  }

  getValidatorOrOpts():
    | FormControlOptions
    | ValidatorFn
    | ValidatorFn[]
    | null
    | undefined {
    return this.validatorOrOpts;
  }

  getAsyncValidator():
    | AsyncValidatorFn
    | AsyncValidatorFn[]
    | null
    | undefined {
    return this.asyncValidator;
  }

  getValidatorMessageCustom(property: 'key') {
    return this.erroMessages
      ? this.erroMessages.find((msg) => msg.key === property)
      : null;
  }

  getValidatorMessagesCustom(): { key: string; message: string }[] {
    return this.erroMessages ?? [];
  }

  //#endregion
}
