import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [ToolbarModule, ButtonModule]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
