import { Component, computed, signal } from '@angular/core';

/** Derivación del perfil, de la regla inicial a la cadena aceptada. */
const PASOS = [
  'perfil',
  '⇒ analista "·" desarrollador',
  '⇒ ("lenguajes formales" | "sistemas" | "problemas complejos") "·" desarrollador',
  '⇒ … "·" producción{3 años} → transformación',
  '✓ aceptado: Víctor Alonso Gómez',
];

@Component({
  selector: 'app-terminal-derivacion',
  template: `
    <div class="barra">
      <div class="titulo">
        <span class="punto" aria-hidden="true"></span>
        <span class="punto" aria-hidden="true"></span>
        <span class="punto" aria-hidden="true"></span>
        <span>perfil.bnf — derivación</span>
      </div>
      <span class="contador">paso {{ paso() }}/{{ ultimo }}</span>
    </div>
    <ol class="lineas" aria-live="polite" aria-label="Derivación de mi perfil">
      @for (l of visibles(); track $index; let i = $index) {
        <li [class.activa]="i === paso()" [attr.aria-current]="i === paso() ? 'step' : null">{{ l }}</li>
      }
    </ol>
    <div class="pie">
      <span>{{ terminado() ? 'pulsa para verla paso a paso' : 'pulsa para seguir derivando' }}</span>
      <button type="button" class="boton acento" (click)="avanzar()">
        {{ terminado() ? '↺ derivar paso a paso' : 'derivar ⇒' }}
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 22px;
      overflow: hidden;
      font-family: var(--f-mono);
    }
    .barra, .pie {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 18px;
      font-size: 0.75rem;
      color: var(--muted);
    }
    .barra { border-bottom: 1px solid var(--line); }
    .titulo { display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
    .punto { width: 11px; height: 11px; border-radius: 50%; background: #3a3d46; }
    .punto:last-of-type { margin-right: 8px; }
    .lineas {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 236px;
      margin: 0;
      padding: 22px 22px 8px;
      list-style: none;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--muted);
    }
    li { padding-left: 12px; border-left: 2px solid transparent; overflow-wrap: anywhere; }
    li.activa { border-left-color: var(--accent); color: var(--accent); }
    .pie { padding-bottom: 18px; }
    .boton { font-family: var(--f-mono); font-size: 0.875rem; padding: 10px 18px; border-radius: 10px; }
  `,
})
export class TerminalDerivacion {
  protected readonly ultimo = PASOS.length - 1;
  /** Empieza con la derivación completa (también en el HTML prerenderizado); al pulsar, vuelve al primer paso. */
  protected readonly paso = signal(PASOS.length - 1);
  protected readonly visibles = computed(() => PASOS.slice(0, this.paso() + 1));
  protected readonly terminado = computed(() => this.paso() >= this.ultimo);

  protected avanzar(): void {
    this.paso.update((p) => (p >= this.ultimo ? 0 : p + 1));
  }
}
