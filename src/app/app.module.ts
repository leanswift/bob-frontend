import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatListModule, MatButtonModule, MatCardModule, MatOptionModule,
  MatSelectModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSnackBarModule,
  MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

import { ProgressHttpModule } from 'angular-progress-http';

import { BobService } from './service/bob.service';
import { AppComponent } from './app.component';
import { ListVersionsComponent } from './list-versions/list-versions.component';
import { CustomizeComponent } from './customize/customize.component';
import { DownloadAndInstallComponent } from './download-and-install/download-and-install.component';
import { CreateConfigComponent } from './create-config/create-config.component';
import { SelectProjectComponent } from './select-project/select-project.component';
import { EditOrDelConfigComponent } from './edit-del-config/edit-del-config.component';
import { AlertComponent } from './alerts/alert.component';

const appRoutes: Routes = [
  { path: 'select-project', component: SelectProjectComponent },
  { path: ':project/versions', component: ListVersionsComponent },
  { path: ':project/customize/:version', component: CustomizeComponent },
  { path: ':project/download-and-install/:version', component: DownloadAndInstallComponent },
  { path: ':project/create-configuration', component: CreateConfigComponent },
  { path: ':project/edit-configuration/:version', component: EditOrDelConfigComponent },
  { path: '', redirectTo: '/select-project', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SelectProjectComponent,
    ListVersionsComponent,
    CustomizeComponent,
    CreateConfigComponent,
    DownloadAndInstallComponent,
    EditOrDelConfigComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    ProgressHttpModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [BobService],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule { }
