import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tables } from '../../models/tables/tables';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Subscription } from 'rxjs';
import { GeneriqueService } from 'src/app/api/services/generique.service';
import { UtilsService } from 'src/app/api/services/utils.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiRequestBody } from 'src/app/api/models/utils/apiRequestBody';
import { IBase } from 'src/app/api/models/interface/abstracts/base.interface';
import { BaseComponent } from '../base/base.component';
import { AppResource } from 'src/app/app.resource';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/state/core.state';
import * as FileSaver from 'file-saver';
import { ExportColumn } from '../../models/tables/column';
import { Button } from '../../types/button.type';
import { String } from 'typescript-string-operations';
import { GenericFormGroup } from '../../models/forms/generic-formgroup';
import { capitalize } from '../../utils/string-capitalize';
import { pluralize } from '../../utils/string-pluralize';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    FontAwesomeModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    PaginatorModule,
    ChartModule,
    MenuModule,
  ],
  providers: [MessageService],
})
export class TableComponent<T extends IBase>
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() table!: Tables<T>;
  @Input() formGroup!: GenericFormGroup;

  selectedDatas!: T[] | (T & { key: string })[] | null;
  dataSubscription!: Subscription;

  //#region Form
  form!: FormGroup;
  //#endregion

  //#region Export
  exportColumns!: ExportColumn[];
  exportButton: Button[] = [];
  //#endregion

  data!: any;
  dataDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    store: Store<State>,
    resources: AppResource,
    messageService: MessageService,
    protected _generiqueService: GeneriqueService<T>,
    protected utilsService: UtilsService,
    protected confirmationService: ConfirmationService,
  ) {
    super(store, resources, messageService);
  }

  override ngOnInit() {
    this._generiqueService.getAll();

    this.dataSubscription = this._generiqueService.subject.subscribe(
      (datas: T[]) => {
        this.table.setDatas(datas);
      },
    );
    this.initForm();
    this.initExport();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  //#region CRUD
  open() {
    this.data = this.table.getInitData();
    this.submitted = false;
    this.dataDialog = true;
  }

  create() {
    this.updateProperty();
    this._generiqueService.create(
      ApiRequestBody.GenerateRequestBody(this.data),
    );

    this.initData();
  }

  edit(data: T) {
    this.data = { ...data };
    this.dataDialog = true;
  }

  update(key: string) {
    this.updateProperty(key);
    this._generiqueService.update(
      key,
      ApiRequestBody.GenerateRequestBody(this.data),
    );
    this.initData();
  }

  delete(data: T) {
    this.confirmationService.confirm({
      message: String.format(
        this.resource.toast.confirmDescriptionM,
        this.table.getMessage('modelName'),
      ),
      header: this.resource.toast.confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._generiqueService.delete(data['key']);
        this.resetSelected();
        this.messageServiceUtils.success(
          String.format(
            this.resource.table.delete_format,
            capitalize(this.table.getMessage('modelName')),
          ),
        );
      },
    });
  }

  deleteSelected() {
    this.confirmationService.confirm({
      message: String.format(
        this.resource.toast.confirmDescriptionP,
        this.table.getMessage('modelsName'),
      ),
      header: this.resource.toast.confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedDatas) {
          this._generiqueService.deleteMultiple(this.selectedDatas);
        }
        this.resetSelected();
        this.messageServiceUtils.success(
          String.format(
            this.resource.table.deleteP_format,
            capitalize(this.table.getMessage('modelsName')),
          ),
        );
      },
    });
  }

  save() {
    this.submitted = true;
    if (this.data['code']?.trim()) {
      if (this.data['key']) {
        this.update(this.data['key']);
        this.messageServiceUtils.success(
          String.format(
            this.resource.table.updateOK,
            capitalize(this.table.getMessage('modelName')),
          ),
        );
      } else {
        this.create();
        console.log('test', this.resource.table);
        this.messageServiceUtils.success(
          String.format(
            this.resource.table.newOK,
            capitalize(this.table.getMessage('modelName')),
          ),
        );
      }
      this.resetForm();
      this.dataDialog = false;
    }
  }
  //#endregion CRUD

  //#region Utils
  hideDialog() {
    this.dataDialog = false;
    this.submitted = false;
  }

  initData() {
    Object.keys(this.data).map((property) => {
      this.data[property] = '';
    });
  }

  resetSelected() {
    this.selectedDatas = new Array<T>();
  }

  updateProperty(key: string = '') {
    Object.keys(this.data).map((property) => {
      if (property !== 'key') {
        if (property == 'created_at') {
          if (!this.data[property]) {
            this.data[property] = new Date().toLocaleString();
          }
        } else if (property == 'updated_at') {
          this.data[property] = new Date().toLocaleString();
        } else {
          if (this.form.get(property) != null) {
            this.data[property] = this.form.get(property)?.value;
          }
        }
      } else {
        this.data[property] = key === '' ? this.utilsService.getKey() : key;
      }
    });
  }
  //#endregion Utils

  //#region Form
  initForm() {
    this.form = new FormGroup({});

    this.formGroup.formControls.forEach((formControl) => {
      this.form.addControl(
        formControl.getName(),
        new FormControl(
          formControl.value as typeof formControl.value,
          formControl.validatorOrOpts,
          formControl.asyncValidator,
        ),
      );
    });
  }

  resetForm() {
    // Réinitialiser le formulaire et marquer tous les champs comme non touchés
    this.form.reset();
    this.markFormGroupAsUntouched(this.form);
  }

  markFormGroupAsUntouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsUntouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsUntouched(control);
      }
    });
  }
  //#endregion Form

  //#region Export
  initExport() {
    this.exportColumns = this.table
      .getColumns()
      .map((col) => ({ title: col.header, dataKey: col.field }));

    this.exportButton = [
      {
        class: 'p-button-info',
        text: this.resource.table.export.codeCSV,
        prefix: {
          class: 'pi pi-file',
        },
        tooltip: { text: this.resource.table.export.csv, position: 'bottom' },
        show: () => this.table.getExport().csv,
        disabled: () => false,
        actionTrigger: 'click',
        action: () => false,
      },
      {
        class: 'p-button-success',
        text: this.resource.table.export.codeExcel,
        prefix: {
          class: 'pi pi-file-excel',
        },
        tooltip: { text: this.resource.table.export.excel, position: 'bottom' },
        show: () => this.table.getExport().excel,
        disabled: () => false,
        actionTrigger: 'click',
        action: this.exportExcel.bind(this),
      },
      {
        class: 'p-button-danger',
        text: this.resource.table.export.codePdf,
        prefix: {
          class: 'pi pi-file-pdf',
        },
        tooltip: { text: this.resource.table.export.pdf, position: 'bottom' },
        show: () => this.table.getExport().pdf,
        disabled: () => false,
        actionTrigger: 'click',
        action: this.exportExcel.bind(this),
      },
      {
        class: 'p-button-text',
        text: this.resource.table.export.codeCSV_P,
        prefix: {
          class: 'pi pi-filter',
        },
        tooltip: { text: this.resource.table.export.csv_p, position: 'bottom' },
        show: () => this.table.getExport().csvFiltered,
        disabled: () => false,
        actionTrigger: 'click',
        action: () => false,
      },
    ];
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.table.getDatas());
        doc.save(this.table.getMessage('modelName') + '.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.table.getDatas());
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, this.table.getMessage('modelName'));
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION,
    );
  }
  //#endregion Export
}
