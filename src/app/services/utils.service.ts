import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl =  inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);


  //===== Loading =====

  loading () {
    return this.loadingCtrl.create({ spinner: 'crescent' })}
  

  //===== Toast =====
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //===== Navigation =====
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //===== guardar en localstorage =====

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //===== obtener de localstorage =====
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}