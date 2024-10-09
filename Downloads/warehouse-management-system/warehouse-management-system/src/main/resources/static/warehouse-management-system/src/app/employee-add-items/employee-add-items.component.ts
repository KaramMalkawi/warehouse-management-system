import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add-items',
  templateUrl: './employee-add-items.component.html',
  styleUrl: './employee-add-items.component.scss',
})
export class EmployeeAddItemsComponent implements OnInit {
  token: string | null = null;
  warehouseForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  warehouses: Array<any> = []; // Store fetched warehouses

  constructor(private fb: FormBuilder, private router: Router) {
    this.token = localStorage.getItem('token'); // Get tocken from local storage
    this.initializeForm();
  }

  // Navigate to Login page
  redirectToLogin(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (!this.token) {
      console.error('Token not found in localStorage');
      this.redirectToLogin();
    } else {
      this.fetchWarehouses();
    }
  }

  initializeForm(): void {
    this.warehouseForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      description: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      quantity: [null, [Validators.required, Validators.min(1)]], // Ensure quantity is a positive number
      warehouseId: ['', Validators.required],
      userId: [{ value: '', disabled: true }, Validators.required],
    });
  }

  async fetchWarehouses(): Promise<void> {
    try {
      const response = await fetch('http://localhost:8080/warehouse/all', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching warehouses: ${response.status}`);
      }

      this.warehouses = await response.json();
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      this.errorMessage = 'Failed to load warehouses';
    }
  }

  async handleSubmit(): Promise<void> {
    if (this.warehouseForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Clear any previous error messages

    try {
      const formData = this.warehouseForm.getRawValue(); // Include disabled fields like userId
      const response = await fetch('http://localhost:8080/items/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error creating supply document: ${response.status}`);
      }

      this.router.navigate(['/employee-item']);
    } catch (error) {
      console.error('Error creating supply document:', error);
      this.errorMessage = 'Failed to create supply document. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
