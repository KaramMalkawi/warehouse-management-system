import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Navigate to Signup page
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  // Handle form submission
  handleSubmit(): void {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;

      const jsonData = JSON.stringify(payload);

      // Make the login API call
      fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to login. Status: ' + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Login successful:', data);

          // Store token and username
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', payload.username);
          localStorage.setItem('userId', data.userId);

          // Fetch user details to get userType
          return fetch('http://localhost:8080/user/details', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.token}`,
              'Content-Type': 'application/json',
            },
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              'Failed to fetch user details. Status: ' + response.status
            );
          }
          return response.json();
        })
        .then((userDetails) => {
          const userType = userDetails.userType;
          const userId = userDetails.id;
          console.log('User type:', userType);

          localStorage.setItem('userType', userType);
          localStorage.setItem('userType', userId);

          if (userType === 'Manager') {
            this.router.navigate(['/warehouse']);
          } else if (userType === 'Employee') {
            this.router.navigate(['/supply-document-employee']);
          } else {
            alert('Invalid user type');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Login failed: Check your username and password');
        });
    }
  }
}
