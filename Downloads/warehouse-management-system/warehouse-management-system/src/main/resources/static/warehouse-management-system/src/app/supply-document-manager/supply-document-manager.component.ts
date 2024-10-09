import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SupplyDocument } from './supply-document.model';

@Component({
  selector: 'app-supply-document-manager',
  templateUrl: './supply-document-manager.component.html',
  styleUrls: ['./supply-document-manager.component.scss'],
})
export class SupplyDocumentManagerComponent implements OnInit {
  supplyDocuments: SupplyDocument[] = [];
  dataSource = new MatTableDataSource<SupplyDocument>();

  displayedColumns: string[] = [
    'name',
    'subject',
    'status',
    'createdBy',
    'createdAt',
    'approve',
    'decline',
  ];

  token: string | null = null;

  constructor(private router: Router) {
    this.token = localStorage.getItem('token'); // Get tocken from local storage
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

  approveDocument(supplyDocument: SupplyDocument) {
    console.log(`Approving document ID: ${supplyDocument.id}`);
    this.updateDocumentStatus(supplyDocument.id, 'Approved');
  }

  declineDocument(supplyDocument: SupplyDocument) {
    console.log(`Declining document ID: ${supplyDocument.id}`);
    this.updateDocumentStatus(supplyDocument.id, 'Declined');
  }

  updateDocumentStatus(documentId: number, newStatus: string) {
    const requestBody = { status: newStatus };

    console.log('Authorization Token:', this.token);

    fetch(`http://localhost:8080/supply_document/update/${documentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error updating document: ${response.statusText}`);
        }
        return response.json();
      })
      .then((updatedDocument) => {
        const documentIndex = this.supplyDocuments.findIndex(
          (doc) => doc.id === documentId
        );
        if (documentIndex !== -1) {
          this.supplyDocuments[documentIndex] = updatedDocument;
          this.dataSource.data = [...this.supplyDocuments];
          console.log(`Document ${documentId} status updated to: ${newStatus}`);
        }
      })
      .catch((error) => {
        console.error('Error updating document status:', error.message);
      });
  }
}
