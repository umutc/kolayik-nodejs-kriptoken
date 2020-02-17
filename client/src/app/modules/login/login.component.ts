import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { DataService } from 'src/app/core/data.service';
import { tap, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  form = this.fb.group({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dataService: DataService,
    public toastController: ToastController,
  ) { }

  async submit() {
    this
      .dataService
      .setEndpoint('authentication/login')
      .create(this.form.value)
      .pipe(
        tap(console.log),
        take(1)
      ).subscribe((response: { error?: string, token?: { string: any } }) => {
        if (response.error) {
          this.presentToast(response.error, "danger")
        } else {
          this.auth.authenticate(response.token.string);
        }
      });
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
