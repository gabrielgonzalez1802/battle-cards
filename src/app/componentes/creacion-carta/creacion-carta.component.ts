import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TarjetaCartaComponent } from "../tarjeta-carta/tarjeta-carta.component";
import { Carta } from '../../model/carta';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartaService } from '../../servicios/carta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacion-carta',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaCartaComponent, FontAwesomeModule],
  templateUrl: './creacion-carta.component.html',
  styleUrls: ['./creacion-carta.component.css']
})
export class CreacionCartaComponent {
  modoEdicion: boolean = false;
  constructor(private cartaService: CartaService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['carta']) {
      this.carta = navigation.extras.state['carta'];
      this.modoEdicion = true;
    }
    console.log(this.carta);
  }

  carta: Carta = {
    id: undefined,
    nombre: '',
    descripcion: '',
    ataque: 0,
    defensa: 0,
    imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXG3jVq5pnt3RTWfLCiwY1fMAIJZtg0vZH5Q&s',
    tipoCarta: '',
  };

  formSubmitted = false;

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      // Preparar el objeto para enviar
      const cartaDTO = {
        id: this.carta.id,
        nombre: this.carta.nombre,
        descripcion: this.carta.descripcion,
        ataque: this.carta.ataque,
        defensa: this.carta.defensa,
        cantidadDisponible: 1, // O el valor que desees
        imagenUrl: this.carta.imagenUrl,
        tipoCarta: this.carta.tipoCarta,
        tipoMonstruo: this.carta.tipoMonstruo // Si aplica
      };

      if (this.modoEdicion) {
        //realizar la solicitud PUT 
        this.cartaService.actualizarCarta(this.carta.id!, cartaDTO)
          .subscribe({
            next: (response) => {
              console.log('Carta actualizada:', response);
              alert('Carta actualizada exitosamente');
              this.router.navigate(['/']);
              this.resetForm(form);
            },
            error: (error) => {
              console.error('Error al actualizar la carta:', error);
              this.showErrorModal();
            }
          });
      } else {
        // Realizar la solicitud POST
        this.cartaService.crearCarta(cartaDTO)
          .subscribe({
            next: (response) => {
              console.log('Carta creada:', response);
              alert('Carta creada exitosamente');
              this.resetForm(form);
            },
            error: (error) => {
              console.error('Error al crear la carta:', error);
              this.showErrorModal();
            }
          });
      }
    }

  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.formSubmitted = false;
    this.carta = {
      id: 0,
      nombre: '',
      descripcion: '',
      defensa: 0,
      ataque: 0,
      tipoCarta: '',
      tipoMonstruo: '',
      imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXG3jVq5pnt3RTWfLCiwY1fMAIJZtg0vZH5Q&s'
    };
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  showErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
      modal.style.display = 'block'; // Muestra el modal
    }
  }

  closeModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
      modal.style.display = 'none'; // Oculta el modal
    }
  }

  listadoDeCartas() {
    this.router.navigate(['/']);
  }
}
