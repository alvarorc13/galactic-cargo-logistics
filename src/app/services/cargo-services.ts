import { inject, Injectable, signal } from '@angular/core';
import { Cargo } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CargoServices {
  private _cargos = signal<Cargo[]>([]);
  cargos = this._cargos.asReadonly();
  private http = inject(HttpClient);
  private APIURL = 'http://localhost:3000';

  constructor() {
    this.fetchCargos()
  }

  fetchCargos() {
    this.http.get<Cargo[]>(`${this.APIURL}/cargo`).subscribe({
      next: (response) => this._cargos.set(response),
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'Fallo al cargar los cargos' }),
    });
  }
}
