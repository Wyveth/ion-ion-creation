import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WithFieldValue } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TagInterface } from 'src/app/api/models/interface/concretes/tag.interface';
import { Tag } from 'src/app/api/models/model/concretes/tag.model';
import { ApiRequestBody } from 'src/app/api/models/utils/apiRequestBody';
import { TagService } from 'src/app/api/services/tag.service';
import { UtilsService } from 'src/app/api/services/utils.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class TagComponent implements OnInit {
  tags: TagInterface[] = [];
  tagSubscription!: Subscription;

  //#region Form
  tagForm!: FormGroup
  //#endregion

  //#region GetFormControls
  get code() { return this.tagForm.get('code') }
  get libelle() { return this.tagForm.get('libelle') }
  get description() { return this.tagForm.get('description') }
  //#endregion

  constructor(private _tagService: TagService, private utilsService: UtilsService) {
    this.initForm();

    this.tagSubscription = this._tagService.subject.subscribe((tags: TagInterface[]) => {
      this.tags = tags;
    });
  }

  ngOnInit() {
    console.log(this.tags);
  }

  initForm() {
    this.tagForm = new FormGroup({
      code: new FormControl<string>('', null),
      libelle: new FormControl<string>('', null),
      description: new FormControl<string>('', null),
    });
  }

  createTag() {
    const tag = new Tag(this.utilsService.getKey(),this.code?.value, this.libelle?.value, this.description?.value);
    this._tagService.create(ApiRequestBody.GenerateRequestBody(tag));
  }

  deleteTag(key: string) {
    this._tagService.delete(key);
  }
}
