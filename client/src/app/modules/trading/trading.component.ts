import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

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
  selfCurrencyList$ = this.route.data.pipe(map(data => data.selfCurrencyList.userCurrencies));
  selfTransectionList$ = this.route.data.pipe(map(data => data.selfTransectionList.transections));

  constructor(private route: ActivatedRoute, public auth: AuthService) { }

}
