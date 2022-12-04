import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productForm = this.form.group({
    name: ['', Validators.required],
    purchasePrice: ['', Validators.required],
    sellPrice: ['', Validators.required],
    provider: ['', Validators.required],
    inventory: ['', Validators.required],
    stripe: ['', Validators.required],
    recipe: ['', Validators.required],
    generic: ['', Validators.required]
  });

  productId: any;
  isEdit: boolean = false;

  productList: any;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
    ) { }

  ngOnInit(): void {

    this.productService.findProviders().subscribe((response) => {
      this.productList = response
    })

    this.route.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.productId == "new"? this.isEdit = false : this.isEdit = true
      }
    });

    if(this.isEdit){
      this.productService.findProductById(this.productId).subscribe((response) => {
        this.productForm.patchValue(response)
      })
    }

  }

  update(){
    this.productService.updateProduct(this.productForm.value, this.productId).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/products']);
      },
      error: (e) => {
        alert('O produto não pôde ser atualizado.')
        console.log(e)
      }
    })
  }

  create(){
    this.productService.createProduct(this.productForm.value).subscribe({
      next: () => {
        alert('Produto adicionado com sucesso!');
        this.router.navigate(['/products']);
      },
      error: (e) => {
        alert('O produto não pôde ser adicionado.')
        console.log(e)
      }
    })
  }

  clear() {
    this.productForm.reset();
  }

}
