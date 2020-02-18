import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { ModalController } from '@ionic/angular';
import { TradingModal } from './trading.modal.component';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
})
export class TradingComponent {

  emptyUser = { name: '', surname: '', email: '', createdAt: "2020-02-17T15:40:38.801Z" };
  self$ = this.route.data.pipe(map(data => data.self && data.self.currentUser ? data.self.currentUser : this.emptyUser));
  currencyList$ = this.route.data.pipe(
    map(data => data.currencyList.currencies),
    map(items => items.filter(item => item.type !== "BTC"))
  );
  selfCurrencyList$ = this.route.data.pipe(
    map(data => data.selfCurrencyList.userCurrencies),
    map(items => items.filter(item => item.type !== "BTC"))
  );
  selfCurrencyListBTC$ = this.route.data.pipe(
    map(data => data.selfCurrencyList.userCurrencies),
    map(items => items.filter(item => item.type === "BTC")[0]),
    map(btc => btc.value),
  );
  selfTransectionList$ = this.route.data.pipe(map(data => data.selfTransectionList.transections));

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    public auth: AuthService) { }

  async presentModal(componentProps) {
    const modal = await this.modalController.create({
      component: TradingModal,
      swipeToClose: true,
      componentProps
    });
    return await modal.present();
  }

}
