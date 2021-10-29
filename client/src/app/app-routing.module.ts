import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutesInterceptor } from './core/routes-interceptor.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trading/self',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.module').then( m => m.RegistrationModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'currencies',
    loadChildren: () => import('./modules/currencies/currencies.module').then( m => m.CurrenciesModule),
    canActivate: [RoutesInterceptor],
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then( m => m.ProfileModule),
    canActivate: [RoutesInterceptor],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'trading',
    loadChildren: () => import('./modules/trading/trading.module').then( m => m.TradingModule),
    canActivate: [RoutesInterceptor],
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
