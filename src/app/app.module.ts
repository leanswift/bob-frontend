import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { MdToolbarModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdButtonModule } from '@angular/material'

import { AppComponent } from './app.component';
import { ListVersionsComponent } from './list-versions/list-versions.component';

const appRoutes: Routes = [
  { path: 'list-versions', component: ListVersionsComponent },

   
  { path: '', redirectTo: '/list-versions', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListVersionsComponent
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
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
