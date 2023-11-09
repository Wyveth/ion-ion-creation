import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TagInterface } from 'src/app/api/models/interface/concretes/tag.interface';
import { Tag } from 'src/app/api/models/model/concretes/tag.model';
import { ApiRequestBody } from 'src/app/api/models/utils/apiRequestBody';
import { TagService } from 'src/app/api/services/tag.service';
import { UtilsService } from 'src/app/api/services/utils.service';
import { InputTextModule } from 'primeng/inputtext';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
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
  standalone: true,
  providers: [ConfirmationService, MessageService],
})
export class TagComponent implements OnInit {
  tags: TagInterface[] = [];
  selectedTags!: TagInterface[] | null;
  tagSubscription!: Subscription;

  //#region Form
  tagForm!: FormGroup;
  //#endregion

  tag!: TagInterface;
  tagDialog: boolean = false;
  submitted: boolean = false;

  //#region GetFormControls
  get code() {
    return this.tagForm.get('code');
  }
  get libelle() {
    return this.tagForm.get('libelle');
  }
  get description() {
    return this.tagForm.get('description');
  }
  //#endregion

  constructor(
    private _tagService: TagService,
    private utilsService: UtilsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.tagSubscription = this._tagService.subject.subscribe(
      (tags: TagInterface[]) => {
        this.tags = tags;
        console.log(this.tags);
      },
    );
  }

  openNew() {
    this.tag = new Tag('', '', '', '');
    this.submitted = false;
    this.tagDialog = true;
  }

  initForm() {
    this.tagForm = new FormGroup({
      code: new FormControl<string>('', Validators.required),
      libelle: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
    });
  }

  createTag() {
    const tag = new Tag(
      this.utilsService.getKey(),
      this.code?.value,
      this.libelle?.value,
      this.description?.value,
    );
    this._tagService.create(ApiRequestBody.GenerateRequestBody(tag));
  }

  updateTag(key: string) {
    const tag = new Tag(
      key,
      this.code?.value,
      this.libelle?.value,
      this.description?.value,
    );
    this._tagService.update(key, ApiRequestBody.GenerateRequestBody(tag));
  }

  deleteSelectedTags() {
    console.log(this.selectedTags);
    this.confirmationService.confirm({
      message: 'Êtes vous sûr de vouloir supprimer les Tags sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedTags) {
          this._tagService.deleteMultiple(this.selectedTags);
          this.tags = this.tags.filter(
            (val) => !this.selectedTags?.includes(val),
          );
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tags supprimés',
          life: 3000,
        });
      },
    });
  }

  editTag(tag: TagInterface) {
    this.tag = { ...tag };
    this.tagDialog = true;
  }

  deleteTag(tag: TagInterface) {
    this.confirmationService.confirm({
      message: 'Êtes vous sûr de vouloir supprimer le tag ' + tag.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._tagService.delete(tag.key);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tag Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.tagDialog = false;
    this.submitted = false;
  }

  saveTag() {
    this.submitted = true;
    console.log(this.tag);

    if (this.tag.code?.trim()) {
      if (this.tag.key) {
        this.tags[this.findIndexById(this.tag.key)] = this.tag;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        const tag = new Tag(
          this.utilsService.getKey(),
          this.tag.code,
          this.tag.libelle,
          this.tag.description,
        );
        this._tagService.create(ApiRequestBody.GenerateRequestBody(tag));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tag Created',
          life: 3000,
        });
      }

      //this.tags = [...this.tags];
      this.tagDialog = false;
      this.tag = new Tag('', '', '', '');
    }
  }

  findIndexById(key: string): number {
    let index = -1;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].key === key) {
        index = i;
        break;
      }
    }

    return index;
  }
}
