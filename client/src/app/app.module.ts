import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonInput } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './core/auth-guard.service';
import { AuthService } from './core/auth.service';
import { DataService } from './core/data.service';
import { LogoutService } from './core/logout.service';
import { RoutesInterceptor } from './core/routes-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './core/token-interceptor.service';
import { CurrenciesService, CurrencyListResolver } from './core/currencies.service';
import { UserService, UserSelfResolver, UserSelfCurrencyListResolver, UserSelfTransectionListResolver } from './core/user.service';
import { SharedService } from './core/shared.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuardService,
    AuthService,
    DataService,
    LogoutService,
    RoutesInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    CurrenciesService,
    CurrencyListResolver,
    UserService,
    UserSelfResolver,
    UserSelfCurrencyListResolver,
    UserSelfTransectionListResolver,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
