import { ProvidersService } from './../../services/providers.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-providers-panel',
  templateUrl: './providers-panel.component.html',
  styleUrls: ['./providers-panel.component.scss']
})
export class ProvidersPanelComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  filter = new FormControl('');

  dataTable = new MatTableDataSource();

  displayedColumns = [
    'name',
    'legalDocument',
    'email',
    'phone',
    'postalCode',
    'state',
    'city',
    'actions'
  ];

  constructor(
    private providersService: ProvidersService
  ) { }

  ngOnInit(): void {

    this.dataTable.paginator = this.paginator;
    this.loadData();

  }

  loadData() {
    this.providersService.findAllProviders().subscribe( response => {
      this.dataTable.data = response;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  deleteProvider(id: any) {
    this.providersService.deleteProvider(id).subscribe({
      next: () => {
        alert("Fornecedor excluído com sucesso!");
      },
      error: () => {
        alert("O fornecedor não pôde ser excluído.")
      }
    });
  }
}
