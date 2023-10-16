import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tag } from 'src/app/api/models/model/concretes/tag.model';
import { TagService } from 'src/app/api/services/tag.service';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-recent-sales',
  templateUrl: './recent-sales.component.html',
  styleUrls: ['./recent-sales.component.scss'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class RecentSalesComponent implements OnInit {
  products!: Product[];

  constructor(private tagService: TagService) {}

  async ngOnInit() {
    //await this.tagService.getTagsSmall().then((data) => (this.tags = data));
    this.products = [
      { name: 'test', price: 10 },
      { name: 'test2', price: 20 },
    ];
  }
}
