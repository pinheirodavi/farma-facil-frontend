import { ProvidersService } from './../../services/providers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.scss']
})
export class ProvidersDetailsComponent implements OnInit {

  isNew: boolean = true;
  providerId: any;
  states: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
    'DF'
  ];

  providerForm = this.form.group({
    name: ['', Validators.required],
    legalDocument: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    postalCode: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required]
  });

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private providersService: ProvidersService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (params) => {
        this.providerId = params['id'];
        this.providerId == "new" ? this.isNew = true : this.isNew = false;
      }
    });

    if(!this.isNew) {
      this.findProviderById();
    }

  }

  clear() {
    this.providerForm.reset();
  }

  findProviderById() {
    this.providersService.findProviderById(this.providerId).subscribe( response => {
      this.providerForm.patchValue(response);
      console.log(response)
    })
  }

  createProvider() {
    this.providersService.createProvider(this.providerForm.value).subscribe({
      next: () => {
        alert('Fornecedor adicionado com sucesso!');
        this.router.navigate(['/providers']);
      },
      error: () => {
        alert('O fornecedor não pôde ser adicionado.')
      }
    });
  }

  updateProvider() {
    this.providersService.updateProvider(this.providerForm.value, this.providerId).subscribe({
      next: () => {
        alert('Fornecedor atualizado com sucesso!');
        this.router.navigate(['/providers']);
      },
      error: () => {
        alert('O fornecedor não pôde ser atualizado')
      }
    });
  }


}
