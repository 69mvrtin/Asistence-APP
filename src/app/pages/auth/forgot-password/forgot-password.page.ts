import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    // Enviar correo de recuperación
    this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {

      // Mostrar mensaje de éxito
      this.utilsSvc.presentToast({
        message: 'Correo enviado correctamente', 
        duration: 1500,
        position: 'middle',
        color: 'danger',
        icon: 'mail-outline'
      });

      // Redirigir al login después de un segundo
      this.utilsSvc.routerLink('/auth');
      this.form.reset();

    }).catch(error => {
      console.log(error);

      // Mostrar mensaje de error si la solicitud falla
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2000,
        position: 'middle',
        color: 'danger',
        icon: 'alert-circle-outline'
      });
      
    }).finally(() => {
      loading.dismiss();
    });
  }

}
