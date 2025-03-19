export interface Carta {
  id?: number;
  nombre: string;
  descripcion: string;
  ataque: number;
  defensa: number;
  cantidadDisponible?: number; // Opcional
  imagenUrl: string;
  tipoCarta: string; // Cambiar según el tipo real
  tipoMonstruo?: string; // Cambiar según el tipo real
}