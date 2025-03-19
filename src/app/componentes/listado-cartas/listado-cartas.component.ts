import { Component, OnInit } from '@angular/core';
import { CartaService } from '../../servicios/carta.service';
import { Carta } from '../../model/carta';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { FormsModule } from '@angular/forms';
import { ViewMonsterModalComponent } from '../view-monster-modal/view-monster-modal.component';
import { faTrash, faEye, faHandPaper, faFistRaised, faFlagCheckered, faPencil as faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-listado-cartas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: './listado-cartas.component.html',
  styleUrls: ['./listado-cartas.component.css']
})
export class ListadoCartasComponent implements OnInit {

  constructor(private cartaService: CartaService, private router: Router, private modalService: NgbModal) {}

  cartas: Carta[] = [];
  countCards: number = 0;
  cartaToDelete: number = 0;
  searchTerm: string = '';
  filteredCartas: Carta[] = [];

  faTrash = faTrash;
  faEye = faEye;
  faHandPaper = faHandPaper;
  faFistRaised = faFistRaised;
  faFlagCheckered = faFlagCheckered;
  faEdit = faEdit;

  ngOnInit(): void {
    this.cargarCartas();
  }

  cargarCartas(): void {
    this.cartaService.obtenerCartas().subscribe(cartas => {
      this.cartas = cartas;
      this.filteredCartas = cartas;
      console.log(this.cartas);
    });
  }

  verDetalle(id: number): void {
    const carta = this.cartas.find(c => c.id === id);
    if (carta) {
      const modalRef = this.modalService.open(ViewMonsterModalComponent);
      modalRef.componentInstance.carta = carta;
    }
  }

  crearCarta() {
    //redireccionar a creacion-carta
    this.router.navigate(['/creacion-carta']); 
  }

  batalla() {
    this.router.navigate(['/batalla']);
  }

  eliminarCarta(id: number): void {
    this.cartaToDelete = id;
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.confirmDelete();
      }
    });
  }

  confirmDelete(): void {
    if (this.cartaToDelete) {
      this.cartaService.eliminarCarta(this.cartaToDelete).subscribe(() => {
        this.cargarCartas();
        this.modalService.dismissAll();
        alert('Carta eliminada exitosamente');
      }, (error) => {
        console.error('Error al eliminar la carta:', error);
        alert('Error al eliminar la carta');
      });
    }
  }

  filterCartas(): void {
    this.filteredCartas = this.cartas.filter(carta =>
      carta.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editarCarta(id: number) {
    const carta = this.cartas.find(c => c.id === id);
    if (carta) {
      this.router.navigate(['/creacion-carta'], { state: { carta } });
    }
  }
}