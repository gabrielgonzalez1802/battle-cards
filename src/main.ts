import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { ListadoCartasComponent } from './app/componentes/listado-cartas/listado-cartas.component';
import { CreacionCartaComponent } from './app/componentes/creacion-carta/creacion-carta.component';
import { provideRouter, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [
  { path: '', component: ListadoCartasComponent }, // Ruta por defecto
  { path: 'creacion-carta', component: CreacionCartaComponent }
];

const appConfig = {
  providers: [
    provideRouter(routes)
  ]
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(FontAwesomeModule)
  ]
}).catch(err => console.error(err));