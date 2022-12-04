import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productForm = this.form.group({
    name: ['', Validators.required],
    ppurchase: ['', Validators.required],
    psale: ['', Validators.required],
    provider: ['', Validators.required],
    inventory: ['', Validators.required],
    stripe: ['', Validators.required],
    revenue: ['', Validators.required],
    generic: ['', Validators.required]
  });

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

}
