import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Warehouse } from './warehouse.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  token: string | null = null;
  userType: string | null = null;
  dataSource: MatTableDataSource<Warehouse> =
    new MatTableDataSource<Warehouse>();
  displayedColumns: string[] = [
    'name',
    'description',
    'createdBy',
    'createdAt',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router: Router) {
    this.token = localStorage.getItem('token'); // Get tocken from local storage
    if (this.token == null) {
      this.redirectToLogin();
    }
  }

  // Navigate to Login page
  redirectToLogin(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.fetchWarehouses();
  }

  fetchWarehouses(): void {
    console.log('Token:', this.token);

    fetch('http://localhost:8080/warehouse/all-warehouses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Error fetching warehouses:', response.statusText);
          throw new Error('Error fetching warehouses');
        }
        return response.json();
      })
      .then((warehouses: Warehouse[]) => {
        this.dataSource.data = warehouses;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        console.error('Fetch warehouses error:', error.message);
        alert('Error fetching warehouses. See console for details.');
      });
  }

  deleteWarehouse(warehouseId: number): void {
    console.log(`Attempting to delete warehouse with ID: ${warehouseId}`);

    fetch(`http://localhost:8080/warehouse/delete/${warehouseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Error deleting warehouse:', response.statusText);
          throw new Error('Error deleting warehouse');
        }
        console.log(`Warehouse with ID ${warehouseId} successfully deleted.`);
        this.dataSource.data = this.dataSource.data.filter(
          (warehouse) => warehouse.id !== warehouseId
        );
      })
      .catch((error) => {
        console.error('Delete warehouse error:', error.message);
        alert('Error deleting warehouse. See console for details.');
      });
  }

  addWarehouse(): void {
    this.router.navigate(['/add-warehouse']);
  }

  exportToExcel(): void {
    console.log('Export to Excel functionality not yet implemented.');

    const worksheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Warehouses');
    XLSX.writeFile(workbook, 'warehouses.xlsx');
  }
}
