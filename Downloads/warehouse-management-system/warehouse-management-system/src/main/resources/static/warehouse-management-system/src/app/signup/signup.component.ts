import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
          ),
        ],
      ],
      userType: ['', Validators.required],
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/']);
  }

  handleSubmit(): void {
    if (this.signupForm.valid) {
      const payload = this.signupForm.value;

      const jsonData = JSON.stringify(payload);

      fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              'Failed to create user. Status: ' + response.status
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log('User created successfully:', data);
          this.signupForm.reset();
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error('Error creating user:', error.message);
        });
    }
  }
}
