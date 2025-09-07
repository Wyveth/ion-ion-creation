import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Gender } from 'src/app/api/models/enum/gender.enum';
import { Category } from 'src/app/api/models/model/concretes/category.model';
import { GeneriqueService } from 'src/app/api/services/generique.service';
import { AppResource } from 'src/app/app.resource';
import { State } from 'src/app/core/state/core.state';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { GenericFormControl } from 'src/app/shared/models/forms/generic-formcontrol';
import { GenericFormGroup } from 'src/app/shared/models/forms/generic-formgroup';
import { ColType, Column } from 'src/app/shared/models/tables/column';
import { Tables } from 'src/app/shared/models/tables/tables';
import { FormControlType } from 'src/app/shared/types/form-control.type';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [CommonModule, TableComponent],
  standalone: true,
  providers: [
    ConfirmationService,
    MessageService,
    [{ provide: 'collectionName', useValue: 'categories' }, GeneriqueService],
  ],
})
export class CategoryComponent extends BaseComponent implements OnInit {
  table!: Tables<Category>;
  form!: GenericFormGroup;

  constructor(
    store: Store<State>,
    resources: AppResource,
    messageService: MessageService,
  ) {
    super(store, resources, messageService);

    this.initTable();
    this.initForm();
  }

  initColumns(): Column<ColType>[] {
    return [
      new Column<'checkbox'>('', '', 'checkbox', [], [], {
        width: 4,
      }),
      new Column<'text'>('Code', 'code', 'text', undefined, ['Code'], {
        width: 60,
      }),
      new Column<'text'>('Libellé', 'libelle', 'text', undefined, ['Libellé'], {
        width: 60,
      }),
      new Column<'text'>(
        'Description',
        'description',
        'text',
        undefined,
        ['Description;'],
        { width: 60 },
      ),
      new Column<'text'>('Action', '', 'action', undefined, [], {
        width: 4,
      }),
    ];
  }

  initTable() {
    this.table = new Tables<Category>(
      'catégorie',
      new Category('', '', '', ''),
      new Array<Category>(),
      this.initColumns(),
      this.resource,
      Gender.f,
    );
  }

  initForm() {
    let gFormControls: GenericFormControl<FormControlType>[] = [
      new GenericFormControl<'text'>(
        'code',
        'Code',
        'text',
        { placeholder: '' },
        null,
        Validators.required,
        null,
        [
          {
            key: 'required',
            message: String.format(
              this.resource.form.mandatoryM,
              this.resource.db.properties.code,
            ),
          },
        ],
      ),
      new GenericFormControl<'text', string>(
        'libelle',
        'Libellé',
        'text',
        { placeholder: '' },
        null,
        Validators.required,
        null,
        [
          {
            key: 'required',
            message: String.format(
              this.resource.form.mandatoryM,
              this.resource.db.properties.libelle,
            ),
          },
        ],
      ),
      new GenericFormControl<'text'>(
        'description',
        'Description',
        'text',
        { placeholder: '' },
        null,
        Validators.required,
        null,
        [
          {
            key: 'required',
            message: String.format(
              this.resource.form.mandatoryF,
              this.resource.db.properties.description,
            ),
          },
        ],
      ),
    ];
    this.form = new GenericFormGroup(gFormControls);
  }
}
