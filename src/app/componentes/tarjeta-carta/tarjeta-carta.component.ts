import { Component, Input } from '@angular/core';
import { Carta } from '../../model/carta';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tarjeta-carta',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './tarjeta-carta.component.html',
  styleUrls: ['./tarjeta-carta.component.css']
})
export class TarjetaCartaComponent {
  @Input() carta: Carta = {
    id: 0,
    nombre: '',
    descripcion: '',
    defensa: 0,
    ataque: 0,
    tipoCarta: '',
    imagenUrl: 'https://via.placeholder.com/300x400/cccccc/666666?text=Carta'
  };

  getTipoNombre(tipo: string | undefined): string {
    if (!tipo) return 'Desconocido';
    return tipo;
  }
}