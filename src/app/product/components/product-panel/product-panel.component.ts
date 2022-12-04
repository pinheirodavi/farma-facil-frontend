import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from './../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss']
})
export class ProductPanelComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  displayedColumns = ['name','purchasePrice','sellPrice','provider','inventory','stripe','recipe','generic','action']

  productDataSource = new MatTableDataSource<any>([]);

  constructor(private productService: ProductService) { }

  filter = new FormControl('');

  ngOnInit(): void {

    this.productDataSource.paginator = this.paginator;

    this.productService.findProducts().subscribe((response) => {
      this.productDataSource.data = response;
      console.log(response)
    })

  }

  deleteProduct(element: any){
    this.productService.deleteProduct(element.id).subscribe({
      next: () => {
        alert('Produto deletado com sucesso!');
        window.location.reload();
      },
      error: (e) => {
        alert('O produto não pôde ser atualizado.')
        console.log(e)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();

    if (this.productDataSource.paginator) {
      this.productDataSource.paginator.firstPage();
    }
  }

}
