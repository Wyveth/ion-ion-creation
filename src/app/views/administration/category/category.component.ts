import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/api/models/model/concretes/tag.model';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { Tables } from 'src/app/shared/models/tables/tables';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports: [CommonModule, TableComponent],
})
export class CategoryComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
