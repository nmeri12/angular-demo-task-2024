import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

/**
 * Global alert, Toast
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  dialog(text: string, title: string = 'Oops...', icon: SweetAlertIcon = 'error') {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  toast(title: string, icon: SweetAlertIcon) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: title
    });
  }
}
