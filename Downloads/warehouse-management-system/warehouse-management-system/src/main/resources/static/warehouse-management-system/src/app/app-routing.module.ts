import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { SupplyDocumentEmployeeComponent } from './supply-document-employee/supply-document-employee.component';
import { SupplyDocumentManagerComponent } from './supply-document-manager/supply-document-manager.component';
import { AddSupplyDocumentComponent } from './add-supply-document/add-supply-document.component';
import { ManagerItemsComponent } from './manager-items/manager-items.component';
import { ManagerAddItemComponent } from './manager-add-item/manager-add-item.component';
import { EmployeeItemsComponent } from './employee-items/employee-items.component';
import { EmployeeAddItemsComponent } from './employee-add-items/employee-add-items.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'warehouse', component: WarehouseComponent },
  { path: 'add-warehouse', component: AddWarehouseComponent },

  { path: 'supply-document-manager', component: SupplyDocumentManagerComponent },

  { path: 'supply-document-employee', component: SupplyDocumentEmployeeComponent },
  { path: 'add-supply-document', component: AddSupplyDocumentComponent },

  { path: 'manager-item', component: ManagerItemsComponent },
  { path: 'manager-add-item', component: ManagerAddItemComponent },
  
  { path: 'employee-item', component: EmployeeItemsComponent },
  { path: 'employee-add-item', component: EmployeeAddItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
