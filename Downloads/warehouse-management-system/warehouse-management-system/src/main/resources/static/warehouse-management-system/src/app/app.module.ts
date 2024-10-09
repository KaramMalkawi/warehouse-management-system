import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { MatSortModule } from '@angular/material/sort';
import { SupplyDocumentEmployeeComponent } from './supply-document-employee/supply-document-employee.component';
import { SupplyDocumentManagerComponent } from './supply-document-manager/supply-document-manager.component';
import { AddSupplyDocumentComponent } from './add-supply-document/add-supply-document.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { EmployeeItemsComponent } from './employee-items/employee-items.component';
import { EmployeeAddItemsComponent } from './employee-add-items/employee-add-items.component';
import { ManagerItemsComponent } from './manager-items/manager-items.component';
import { ManagerAddItemComponent } from './manager-add-item/manager-add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WarehouseComponent,
    AddWarehouseComponent,
    SupplyDocumentEmployeeComponent,
    SupplyDocumentManagerComponent,
    AddSupplyDocumentComponent,
    ManagerNavbarComponent,
    EmployeeNavbarComponent,
    EmployeeItemsComponent,
    ManagerItemsComponent,
    ManagerAddItemComponent,
    EmployeeAddItemsComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDatepickerModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [provideAnimationsAsync()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
