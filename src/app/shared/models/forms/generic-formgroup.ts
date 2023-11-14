import { GenericFormControl } from './generic-formcontrol';
export type primitive = string | number | boolean | Date;

export class GenericFormGroup {
  formControls: GenericFormControl<primitive>[];

  constructor(formsControl: GenericFormControl<primitive>[]) {
    this.formControls = formsControl;
  }
}
