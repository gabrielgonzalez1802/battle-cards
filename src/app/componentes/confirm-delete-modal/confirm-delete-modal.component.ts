import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm(): void {
    this.activeModal.close('confirm');
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}