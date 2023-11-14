import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/api/services/tag.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { GeneriqueService } from 'src/app/api/services/generique.service';
import { Tag } from 'src/app/api/models/model/concretes/tag.model';
import { Tables } from 'src/app/shared/models/tables/tables';
import { ColType, Column } from 'src/app/shared/models/tables/column';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Store } from '@ngrx/store';
import { AppResource } from 'src/app/app.resource';
import { State } from 'src/app/core/state/core.state';
import { Validators } from '@angular/forms';
import {
  GenericFormGroup,
  primitive,
} from 'src/app/shared/models/forms/generic-formgroup';
import { GenericFormControl } from 'src/app/shared/models/forms/generic-formcontrol';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  imports: [CommonModule, TableComponent],
  standalone: true,
  providers: [
    ConfirmationService,
    MessageService,
    [{ provide: 'collectionName', useValue: 'tags' }, GeneriqueService],
  ],
})
export class TagComponent extends BaseComponent implements OnInit {
  tags!: Tables<Tag>;
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
    this.tags = new Tables<Tag>(
      'tag',
      new Tag('', '', '', ''),
      new Array<Tag>(),
      this.initColumns(),
      this.resource,
    );
  }

  initForm() {
    let gFormControls: GenericFormControl<primitive>[] = [
      new GenericFormControl<string>(
        'code',
        'Code',
        'string',
        '',
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
      new GenericFormControl<string>(
        'libelle',
        'Libellé',
        'string',
        '',
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
      new GenericFormControl<string>(
        'description',
        'Description',
        'string',
        '',
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
