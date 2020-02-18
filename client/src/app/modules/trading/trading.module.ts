import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingRoutingModule } from './trading-routing.module';
import { IonicModule } from '@ionic/angular';
import { TradingComponent } from './trading.component';


@NgModule({
  declarations: [
    TradingComponent
  ],
  imports: [
    CommonModule,
    TradingRoutingModule,
    IonicModule
  ]
})
export class TradingModule { }
