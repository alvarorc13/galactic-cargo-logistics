import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargoServices } from '../../../services/cargo-services';

@Component({
  selector: 'app-cargo-list-component',
  imports: [RouterLink],
  templateUrl: './cargo-list-component.html',
})
export class CargoListComponent {
  private cargoServices = inject(CargoServices);
  cargos = this.cargoServices.cargos;
}
