import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user = this.authService.user
  logout () {
    this.authService.logout()
  }
}
