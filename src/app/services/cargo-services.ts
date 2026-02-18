import { inject, Injectable, signal } from '@angular/core';
import { Cargo, NewCargo } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CargoServices {
  private _cargos = signal<Cargo[]>([]);
  cargos = this._cargos.asReadonly();
  private http = inject(HttpClient);
  private APIURL = 'http://localhost:3000';
  private router = inject(Router);

  constructor() {
    this.fetchCargos();
  }

  fetchCargos() {
    this.http.get<Cargo[]>(`${this.APIURL}/cargo`).subscribe({
      next: (response) => this._cargos.set(response),
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'Fallo al cargar los cargos' }),
    });
  }

  addCargo(newCargo: NewCargo) {
    this.http.post<Cargo>(`${this.APIURL}/cargo`, newCargo).subscribe({
      next: (response) => {
        this._cargos.update((prev) => [...prev, response]);
        this.router.navigate(['/dashboard/list'])
      },
      error: () => Swal.fire({ icon: 'warning', title: 'Error', text: 'Fallo al añadir la carga' }),
    });
  }
}
