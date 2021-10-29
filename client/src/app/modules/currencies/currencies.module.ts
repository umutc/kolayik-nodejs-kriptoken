import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CurrenciesComponent
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    IonicModule
  ]
})
export class CurrenciesModule { }
