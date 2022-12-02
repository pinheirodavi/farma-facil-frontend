import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UsersTableComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule,UsersRoutingModule, SharedModule
  ]
})
export class UsersModule { }
