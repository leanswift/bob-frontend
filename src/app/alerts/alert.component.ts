import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'alert-message',
  templateUrl: 'alert.component.html'
})

export class AlertComponent  {

  modalTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.modalTitle = data.title;
  }
}
