import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supply-document',
  templateUrl: './add-supply-document.component.html',
  styleUrls: ['./add-supply-document.component.scss'],
})
export class AddSupplyDocumentComponent implements OnInit {
  token: string | null = null;
  userId: string | null = null;
  username: string | null = null;
  warehouseForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  items: Array<any> = []; // Store fetched items
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
      this.fetchUserDetails();
      this.fetchItems(); // Fetch items for drop-down
      this.fetchWarehouses(); // Fetch warehouses for drop-down
    }
  }

  /*
    initializeForm(): void {
    this.warehouseForm = this.fb.group({
      name: ['', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*')
        ],
      ],
      description: ['', 
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*')
        ],
      ],
      userId: [{ value: '', disabled: true }, Validators.required], // Disabled if not editable
    });
  }

  */
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
      subject: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      status: ['Pending', Validators.required],
      itemId: ['', Validators.required], // Item dropdown
      warehouseId: ['', Validators.required], // Warehouse dropdown
      userId: [{ value: '', disabled: true }, Validators.required], // User ID
    });
  }

  async fetchUserDetails(): Promise<void> {
    try {
      const response = await fetch('http://localhost:8080/user/details', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user details: ${response.status}`);
      }

      const user = await response.json();
      this.userId = user.id;
      this.username = user.username;
      this.warehouseForm.patchValue({ userId: this.userId });
    } catch (error) {
      console.error('Error fetching user details:', error);
      this.errorMessage = 'Failed to load user details';
    }
  }

  // Fetch available items from the API
  async fetchItems(): Promise<void> {
    try {
      const response = await fetch('http://localhost:8080/items/all', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching items: ${response.status}`);
      }

      this.items = await response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      this.errorMessage = 'Failed to load items';
    }
  }

  // Fetch available warehouses from the API
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

    try {
      const formData = this.warehouseForm.getRawValue();
      const response = await fetch(
        'http://localhost:8080/supply_document/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error creating supply document: ${response.status}`);
      }

      this.router.navigate(['/supply-document-employee']);
    } catch (error) {
      console.error('Error creating supply document:', error);
      this.errorMessage = 'Failed to create supply document';
    } finally {
      this.isLoading = false;
    }
  }
}
