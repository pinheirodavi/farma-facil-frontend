import { CustomerService } from './../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerForm = this.form.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    postalCode: ['', Validators.required],
    address: ['', Validators.required],
    legalDocument: ['', Validators.required],
    phone: ['', Validators.required],
    isActiveClient: ['', Validators.required],
  });

  customerId: any;
  isEdit: boolean = false;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (params) => {
        this.customerId = params['id'];
        this.customerId == "new"? this.isEdit = false : this.isEdit = true
      }
    });

    if(this.isEdit){
      this.customerService.findCustomerById(this.customerId).subscribe((response) => {
        this.customerForm.patchValue(response)
      })
    }

  }

  update(){
    this.customerService.updateCustomer(this.customerForm.value, this.customerId).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/customers']);
      },
      error: (e) => {
        alert('O produto não pôde ser atualizado.')
        console.log(e)
      }
    })
  }

  create(){
    this.customerService.createCustomer(this.customerForm.value).subscribe({
      next: () => {
        alert('Cliente adicionado com sucesso!');
        this.router.navigate(['/customers'])
      },
      error: (e) => {
        alert('O cliente não pôde ser adicionado.')
        console.log(e)
      }
    })
  }

  clear() {
    this.customerForm.reset();
  }

}
