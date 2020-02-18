import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/core/shared.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-page',
  templateUrl: './trading.modal.component.html'
})
export class TradingModal {

  @Input() action: string;
  @Input() type: string;
  value = new FormControl(null, [Validators.required, Validators.min(0)])
  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private sharedService: SharedService,
    private router: Router
  ) { }

  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

  async submit() {
    this
      .sharedService
      .setEndpoint(`users/current/user/currencies/${this.action}`)
      .create({
        "type": this.type,
        "value": this.value.value
      })
      .pipe(
        take(1)
      )
      .subscribe(async r => {
        if (r && r.error) {
          this.presentToast(r.error, "danger")
        } else {
          this.dismiss();
          this.presentToast("Successfull");
          await this.router.navigateByUrl('/');
          await this.router.navigateByUrl('/trading/self');
        }
      })
  }
  async presentToast(msg: string, color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark" = "primary") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color
    });
    toast.present();
  }
}