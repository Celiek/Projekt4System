import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.css'
})
export class AppModalComponent {
  constructor(public modalRef: MbdModalRes)
}
