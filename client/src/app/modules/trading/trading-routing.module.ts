import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from './trading.component';
import { UserSelfResolver, UserSelfCurrencyListResolver, UserSelfTransectionListResolver } from 'src/app/core/user.service';
import { CurrencyListResolver } from 'src/app/core/currencies.service';


const routes: Routes = [
  {
    path: 'self',
    component: TradingComponent,
    resolve: {
      currencyList: CurrencyListResolver,
      self: UserSelfResolver,
      selfCurrencyList: UserSelfCurrencyListResolver,
      selfTransectionList: UserSelfTransectionListResolver,
    },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule { }
