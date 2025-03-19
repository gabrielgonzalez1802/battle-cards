import { Component, Input } from '@angular/core';
import { Carta } from '../../model/carta';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-view-monster-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './view-monster-modal.component.html',
  styleUrls: ['./view-monster-modal.component.css']
})
export class ViewMonsterModalComponent {

  @Input() carta: Carta | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  getTipoNombre(tipo: string | undefined): string {
    if (!tipo) return 'Desconocido';
    return tipo;
  }
}