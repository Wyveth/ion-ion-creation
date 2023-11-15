import { FormControlType } from '../../types/form-control.type';
import { GenericFormControl } from './generic-formcontrol';
export type primitive = string | number | boolean | Date;

export class GenericFormGroup {
  formControls: GenericFormControl<FormControlType>[];

  constructor(formsControl: GenericFormControl<FormControlType>[]) {
    this.formControls = formsControl;
  }
}
