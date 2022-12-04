import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss']
})
export class ProductPanelComponent implements OnInit {

  displayedColumns = ['name','ppurchase','psale','provider','inventory','stripe','recipe','generic','action']

  productDataSource = new MatTableDataSource<any>([]);

  constructor() { }

  ngOnInit(): void {
    this.productDataSource.data = [
      {id: 1, name: "Amoxilina", ppurchase: "50,00", psale:"100,00",provider:"Drogasil",inventory:"100",stripe:"Vermelha",recipe:"Obrigatória",generic:"Sim"},
      {id: 2, name: "Amoxilina", ppurchase: "50,00", psale:"100,00",provider:"Drogasil",inventory:"100",stripe:"Vermelha",recipe:"Obrigatória",generic:"Sim"},
      {id: 3, name: "Amoxilina", ppurchase: "50,00", psale:"100,00",provider:"Drogasil",inventory:"100",stripe:"Vermelha",recipe:"Obrigatória",generic:"Sim"},
      {id: 4, name: "Amoxilina", ppurchase: "50,00", psale:"100,00",provider:"Drogasil",inventory:"100",stripe:"Vermelha",recipe:"Obrigatória",generic:"Sim"},
      {id: 5, name: "Amoxilina", ppurchase: "50,00", psale:"100,00",provider:"Drogasil",inventory:"100",stripe:"Vermelha",recipe:"Obrigatória",generic:"Sim"},
      {id: 6, name: "Amoxilina", ppurchase: "50,00", psale:"100,00",provider:"Drogasil",inventory:"100",stripe:"Vermelha",recipe:"Obrigatória",generic:"Sim"},
    ]
  }

  deleteProduct(element: any){}


}
