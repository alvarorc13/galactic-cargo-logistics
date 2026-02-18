import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargoServices } from '../../../services/cargo-services';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-cargo-list-component',
  imports: [RouterLink],
  templateUrl: './cargo-list-component.html',
})
export class CargoListComponent {
  private cargoServices = inject(CargoServices);
  cargos = this.cargoServices.cargos;
  private authService = inject(AuthService)
  user = this.authService.user
}
