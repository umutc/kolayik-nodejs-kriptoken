import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Profile',
      url: '/folder/Profile',
      icon: 'person'
    },
    {
      title: 'Register',
      url: '/folder/Register',
      icon: 'person-add'
    },
    {
      title: 'Login',
      url: '/folder/Login',
      icon: 'log-in'
    },
    {
      title: 'Trading',
      url: '/folder/Trading',
      icon: 'swap-horizontal'
    },
    {
      title: 'Currencies',
      url: '/folder/Currencies',
      icon: 'trending-up'
    },
    {
      title: 'Wallet',
      url: '/folder/Wallet',
      icon: 'cash'
    },
    {
      title: 'Logout',
      url: '/folder/Logout',
      icon: 'log-out'
    }
  ];
  public labels = [
    'BTC',
    'ETH',
    'LTC',
    'DASH',
    'XRP',
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
