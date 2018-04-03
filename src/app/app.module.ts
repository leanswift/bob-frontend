import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MdToolbarModule, MdListModule, MdButtonModule, MdProgressBarModule, MdFormFieldModule, MdInputModule } from '@angular/material';

import { ProgressHttpModule } from 'angular-progress-http';

import { BobService } from './service/bob.service';
import { AppComponent } from './app.component';
import { ListVersionsComponent } from './list-versions/list-versions.component';
import { CustomizeComponent } from './customize/customize.component';
import { DownloadAndInstallComponent } from './download-and-install/download-and-install.component';

const appRoutes: Routes = [
  { path: 'list-versions', component: ListVersionsComponent },
  { path: 'customize/:eLinkVersion', component: CustomizeComponent },
  { path: 'download-and-install/:eLinkVersion', component: DownloadAndInstallComponent },
  { path: '', redirectTo: '/list-versions', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListVersionsComponent,
    CustomizeComponent,
    DownloadAndInstallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    MdToolbarModule,
    MdListModule,
    MdButtonModule,
    MdFormFieldModule,
    MdInputModule,
    MdProgressBarModule,
    ProgressHttpModule,
    BrowserAnimationsModule
  ],
  providers: [BobService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
