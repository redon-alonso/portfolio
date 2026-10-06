import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CONTACTO, SITIO } from './datos/perfil';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly sitio = SITIO;
  protected readonly contacto = CONTACTO;
  protected readonly anio = 2026;
}
