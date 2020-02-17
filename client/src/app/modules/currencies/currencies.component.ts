import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {

  list$ = this.route.data.pipe(
    map(data => data.currencyList.currencies),
    map(items => items.filter(item => item.type !== "BTC"))
  );
  constructor(private route: ActivatedRoute) { }

  ngOnInit() { }

}
