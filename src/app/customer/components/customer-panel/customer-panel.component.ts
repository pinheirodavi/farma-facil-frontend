import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { CustomerService } from './../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss']
})
export class CustomerPanelComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  customerDataSource = new MatTableDataSource<any>([]);

  displayedColumns = ['name','email','postalCode','address','legalDocument','phone','isActiveClient','action']

  filter = new FormControl('');

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

    this.customerDataSource.paginator = this.paginator;

    this.customerService.findCustomers().subscribe((response) => {
      this.customerDataSource.data = response
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.customerDataSource.paginator) {
      this.customerDataSource.paginator.firstPage();
    }
  }


  deleteCustomer(element: any){
    this.customerService.deleteCustomer(element.id).subscribe({
      next: () => {
        alert("Cliente deletado com sucesso.")
        window.location.reload()
      },
      error: () => {
        alert("Não foi possível deletar o cliente.")
      }
    })
  }

}
