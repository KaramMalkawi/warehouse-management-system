import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Item } from './items.model'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manager-items',
  templateUrl: './manager-items.component.html',
  styleUrl: './manager-items.component.scss'
})
export class ManagerItemsComponent implements OnInit {
  supplyDocuments: Item[] = [];
  dataSource = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'description',
    'quantity',
    'createdAt',
    'delete'
  ];

  token: string | null = null;

  constructor(private router: Router) {
    this.token = localStorage.getItem('token'); // Get tocken from local storage
    if (!this.token) {
      this.redirectToLogin();
    }
  }

    // Navigate to Login page
    redirectToLogin() {
      this.router.navigate(['/']);
    }

  ngOnInit(): void {
    this.fetchSupplyDocuments();
    this.dataSource.paginator = this.paginator;
  }

  fetchSupplyDocuments() {
    fetch('http://localhost:8080/items/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          this.dataSource.data = [];
          return;
        }
        if (!response.ok) {
          throw new Error(`Error fetching supply documents: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        this.supplyDocuments = data || [];
        this.dataSource.data = this.supplyDocuments;
      })
      .catch((error) => {
        console.error('Fetch supply document error:', error.message);
      });
  }

  onPageChange(event: PageEvent) {
    console.log('Page changed:', event);
  }


  addItem(): void {
    this.router.navigate(['/manager-add-item']);
  }

  deleteItem(itemId: number): void {

    console.log(`Attempting to delete item with ID: ${itemId}`);

    fetch(`http://localhost:8080/items/delete/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          console.error('Error deleting item:', response.statusText);
          throw new Error('Error deleting item');
        }
        console.log(`Warehouse with ID ${itemId} successfully deleted.`);

        this.dataSource.data = this.dataSource.data.filter(item => item.id !== itemId);
      })
      .catch(error => {
        console.error('Delete warehouse error:', error.message);
        alert('Error deleting warehouse. See console for details.');
      });
  }

}
