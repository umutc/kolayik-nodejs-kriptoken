import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './currencies.component';
import { CurrencyListResolver } from 'src/app/core/currencies.service';


const routes: Routes = [
  {
    path: 'list',
    component: CurrenciesComponent,
    resolve: {
      currencyList: CurrencyListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
