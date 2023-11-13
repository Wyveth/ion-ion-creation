import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const AngularModule = [
  CommonModule,
  RouterModule,
  BrowserModule,
  HttpClientModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [],
  imports: [AngularModule, ToastModule],
  exports: [AngularModule, ToastModule],
  providers: [MessageService],
})
export class SharedModule {}
