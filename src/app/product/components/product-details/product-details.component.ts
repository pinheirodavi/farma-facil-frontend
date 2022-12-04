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
    recipe: ['', Validators.required],
    generic: ['', Validators.required]
  });

  productId: any;
  isEdit: boolean = false;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.productId == "new"? this.isEdit = false : this.isEdit = true
      }
    });

  }

}
