import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-best-selling-product',
    templateUrl: './best-selling-product.component.html',
    styleUrls: ['./best-selling-product.component.scss'],
    imports: [CommonModule, MenuModule, ButtonModule]
})
export class BestSellingProductComponent implements OnInit {
  items!: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }
}
