import { ProvidersDetailsComponent } from './components/providers-details/providers-details.component';
import { ProvidersPanelComponent } from './components/providers-panel/providers-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProvidersPanelComponent },
  { path: ':id', component: ProvidersDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
