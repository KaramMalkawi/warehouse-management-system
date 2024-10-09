import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SupplyDocument } from './supply-document.model';

@Component({
  selector: 'app-supply-document-employee',
  templateUrl: './supply-document-employee.component.html',
  styleUrls: ['./supply-document-employee.component.scss'],
})
export class SupplyDocumentEmployeeComponent implements OnInit {
  supplyDocuments: SupplyDocument[] = [];
  dataSource = new MatTableDataSource<SupplyDocument>();

  displayedColumns: string[] = [
    'name',
    'subject',
    'status',
    'createdBy',
    'createdAt',
  ];

  token: string | null = null;

  constructor(private router: Router) {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.redirectToLogin();
    }
  }

  // Navigate to Login page
  redirectToLogin(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.fetchSupplyDocuments();
  }

  fetchSupplyDocuments() {
    fetch('http://localhost:8080/supply_document/all-supply-documents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (response.status === 204) {
          console.log('No content returned from server.');
          this.dataSource.data = [];
          return;
        }
        if (!response.ok) {
          throw new Error(
            `Error fetching supply documents: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        this.supplyDocuments = data || [];
        this.dataSource.data = this.supplyDocuments;
        console.log('Fetched supply documents:', this.supplyDocuments);
      })
      .catch((error) => {
        console.error('Fetch supply document error:', error.message);
      });
  }

  onPageChange(event: PageEvent) {
    console.log('Page changed:', event);
  }

  addSupplyDocument(): void {
    this.router.navigate(['/add-supply-document']);
  }
}
