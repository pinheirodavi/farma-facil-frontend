import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss']
})
export class CustomerPanelComponent implements OnInit {

  customerDataSource = new MatTableDataSource<any>([]);

  displayedColumns = ['name','email','postalCode','address','legalDocument','phone','isActiveClient','action']

  constructor() { }

  ngOnInit(): void {
    this.customerDataSource.data = [
      {id: 1, name: 'João', email: 'joão@tantofaz.com', postalCode:'12345-000', address:'Rua do João, 52', legalDocument: '123456789-00', phone: '(22) 99999-0000', isActiveClient: 'Sim'},
      {id: 1, name: 'João', email: 'joão@tantofaz.com', postalCode:'12345-000', address:'Rua do João, 52', legalDocument: '123456789-00', phone: '(22) 99999-0000', isActiveClient: 'Sim'},
      {id: 1, name: 'João', email: 'joão@tantofaz.com', postalCode:'12345-000', address:'Rua do João, 52', legalDocument: '123456789-00', phone: '(22) 99999-0000', isActiveClient: 'Sim'},
      {id: 1, name: 'João', email: 'joão@tantofaz.com', postalCode:'12345-000', address:'Rua do João, 52', legalDocument: '123456789-00', phone: '(22) 99999-0000', isActiveClient: 'Sim'},
      {id: 1, name: 'João', email: 'joão@tantofaz.com', postalCode:'12345-000', address:'Rua do João, 52', legalDocument: '123456789-00', phone: '(22) 99999-0000', isActiveClient: 'Sim'}
    ]
  }

  deleteCustomer(element: any){}

}
