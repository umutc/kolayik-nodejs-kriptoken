import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserSelfResolver, UserSelfCurrencyListResolver, UserSelfTransectionListResolver } from 'src/app/core/user.service';


const routes: Routes = [
  {
    path: 'self',
    component: ProfileComponent,
    resolve: {
      self: UserSelfResolver,
      selfCurrencyList: UserSelfCurrencyListResolver,
      selfTransectionList: UserSelfTransectionListResolver,
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
