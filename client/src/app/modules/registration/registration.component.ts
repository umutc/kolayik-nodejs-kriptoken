import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';
import { ToastController } from '@ionic/angular';
import { tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

 
  form = this.fb.group({
    name: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    surname: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
  });
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  async submit() {
    this
      .dataService
      .setEndpoint('users/register')
      .create(this.form.value)
      .pipe(
        tap(console.log),
        take(1)
      ).subscribe((response: { error?: string | { errmsg: string }, token?: { string: any } }) => {
        if (response.error) {
          if (typeof response.error === "object") {
            this.presentToast(response.error.errmsg, "danger", 4000)
          }
          if (typeof response.error === "string") {
            this.presentToast(response.error, "danger", 4000)
          }
        } else {
          this.presentToast("Registration complated successfuly");
          this.router.navigate(['/login', 'login']);
        }
      });
  }

  async presentToast(msg: string, color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark" = "primary", duration: number = 2000) {
    const toast = await this.toastController.create({
      message: msg,
      duration,
      color
    });
    toast.present();
  }

}
