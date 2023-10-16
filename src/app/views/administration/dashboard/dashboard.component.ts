import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResumeComponent } from '../resume/resume.component';
import { RecentSalesComponent } from '../recent-sales/recent-sales.component';
import { BestSellingProductComponent } from '../best-selling-product/best-selling-product.component';
import { NotificationComponent } from '../notification/notification.component';
import { SalesOverviewComponent } from '../sales-overview/sales-overview.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ResumeComponent,
    RecentSalesComponent,
    BestSellingProductComponent,
    SalesOverviewComponent,
    NotificationComponent,
  ],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
