import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.scss'],
})
export class AddWarehouseComponent implements OnInit {
  token: string | null = null;
  userId: string | null = null;
  username: string | null = null;
  warehouseForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

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
      userId: [{ value: '', disabled: true }, Validators.required], // Disabled if not editable
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json();
      this.userId = user.id;
      this.username = user.username;

      this.warehouseForm.patchValue({
        userId: this.userId,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      this.redirectToLogin();
    }
  }

  async handleSubmit(): Promise<void> {
    if (this.warehouseForm.valid) {
      this.isLoading = true;
      this.warehouseForm.get('userId')?.enable();

      const payload = {
        name: this.warehouseForm.get('name')?.value,
        description: this.warehouseForm.get('description')?.value,
        userId: this.warehouseForm.get('userId')?.value,
      };

      const jsonData = JSON.stringify(payload);
      console.log('Payload being sent:', payload); // Log the payload

      try {
        const response = await fetch('http://localhost:8080/warehouse/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          body: jsonData,
        });

        // Check for the response status
        if (!response.ok) {
          const errorMessage = await response.text(); // Capture any text response for errors
          throw new Error(
            `Failed to create warehouse. Status: ${response.status} - ${errorMessage}`
          );
        }

        // Attempt to parse the response as JSON
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
          throw new Error('Failed to parse server response. Please try again.');
        }

        console.log('Warehouse created successfully:', data);
        this.warehouseForm.reset(); // Resets the entire form
        this.router.navigate(['/warehouse']); // Ensure this route is defined
      } catch (error) {
        console.error('Error creating warehouse:', error); // Set error message
        this.errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.';
      } finally {
        this.isLoading = false; // Reset loading state
        this.warehouseForm.get('userId')?.disable(); // Disable the userId field again if needed
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.'; // Set error message if form is invalid
    }
  }
}
