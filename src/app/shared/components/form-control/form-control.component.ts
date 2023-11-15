import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GenericFormControl } from '../../models/forms/generic-formcontrol';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import {
  Form,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormControlType } from '../../types/form-control.type';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    EditorModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
  ],
})
export class FormControlComponent implements OnInit {
  @Input() control!: GenericFormControl<FormControlType>;
  @Input() form!: FormGroup;
  @Input() data!: any;

  constructor() {}

  ngOnInit() {}

  search(event: any) {
    console.log(event);
  }
}
