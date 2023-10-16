import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ResumeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
