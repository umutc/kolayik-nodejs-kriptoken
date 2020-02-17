import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  emptyUser = { name: '', surname: '', email: '', createdAt: "2020-02-17T15:40:38.801Z" };
  self$ = this.route.data.pipe(map(data => data.self && data.self.currentUser ? data.self.currentUser : this.emptyUser));
  selfCurrencyList$ = this.route.data.pipe(map(data => data.selfCurrencyList.userCurrencies));
  selfTransectionList$ = this.route.data.pipe(map(data => data.selfTransectionList.transections));
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {}

}
