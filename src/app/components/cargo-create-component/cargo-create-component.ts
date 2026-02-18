import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CargoServices } from '../../services/cargo-services';
import { Router } from '@angular/router';
import { NewCargo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cargo-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './cargo-create-component.html',
})
export class CargoCreateComponent {
  private fb = inject(FormBuilder);
  private cargoService = inject(CargoServices);

  cargoForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
    origin: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    value: ['', [Validators.required, Validators.min(1)]],
    status: ['Disponible', [Validators.required]],
  });

  isNotValidField(field: string) {
    return this.cargoForm.controls[field].invalid && this.cargoForm.controls[field].touched;
  }

  getFieldErrors(field: string) {
    const control = this.cargoForm.controls[field];
    if (!control) return null;
    const errors = control.errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido';
        case 'min':
          return 'Debe ser positivo';
        default:
          return null;
      }
    }
    return null;
  }

  save() {
    if (this.cargoForm.invalid) {
      this.cargoForm.markAllAsTouched();
      return;
    }
    this.cargoService.addCargo(this.cargoForm.value);
  }
}
