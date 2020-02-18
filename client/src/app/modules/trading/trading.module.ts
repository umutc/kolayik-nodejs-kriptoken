import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingRoutingModule } from './trading-routing.module';
import { IonicModule } from '@ionic/angular';
import { TradingComponent } from './trading.component';
import { TradingModal } from './trading.modal.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TradingComponent,
    TradingModal
  ],
  imports: [
    CommonModule,
    TradingRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    TradingModal
  ]
})
export class TradingModule { }
