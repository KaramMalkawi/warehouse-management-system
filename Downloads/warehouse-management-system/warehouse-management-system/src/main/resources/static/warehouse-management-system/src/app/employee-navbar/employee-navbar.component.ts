import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.scss',
})
export class EmployeeNavbarComponent {
  tocken: string | null = null;
  constructor(private router: Router) {
    this.tocken = localStorage.getItem('token'); // Get tocken from local storage
  }

  // Navigate to Login page
  redirectToLogin() {
    this.router.navigate(['/']);
  }

  submitLogoutForm() {
    // Call the logout endpoint
    fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ this.tocken }`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Logout failed: ${response.statusText}`);
        }
        localStorage.clear();
        this.redirectToLogin();
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  }
}
