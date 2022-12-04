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
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (params) => {
        this.customerId = params['id'];
        this.customerId == "new"? this.isEdit = false : this.isEdit = true
      }
    });

  }

}
