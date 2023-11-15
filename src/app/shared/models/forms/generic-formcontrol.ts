import {
  FormControlOptions,
  ValidatorFn,
  AsyncValidatorFn,
  FormControl,
} from '@angular/forms';
import { FormControlType, Param } from '../../types/form-control.type';

export interface ValidatorMessageCustom {
  key: string;
  message: string;
}

export class GenericFormControl<T extends FormControlType> {
  /** @var name Nom du FormControl */
  private name: string;
  /** @var text Text du label */
  private text: string;
  /** @var type Type du FormControl */
  private type: string;
  /** @var parameters Type du FormControl */
  private parameters: Param<T>;
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
    parameters: Param<T>,
    value: any,
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
    this.parameters = parameters;
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

  getParameters(): Param<T> {
    return this.parameters;
  }

  getParameter(key: string): any {
    const parameter = this.parameters as typeof this.parameters & {
      [key: string]: any;
    };
    return parameter[key];
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
