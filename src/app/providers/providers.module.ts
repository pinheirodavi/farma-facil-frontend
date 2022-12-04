import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersDetailsComponent } from './components/providers-details/providers-details.component';
import { ProvidersPanelComponent } from './components/providers-panel/providers-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProvidersDetailsComponent,
    ProvidersPanelComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    SharedModule
  ]
})
export class ProvidersModule { }
