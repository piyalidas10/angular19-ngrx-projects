import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private snackbar = inject(MatSnackBar);


  success(message: string) {
    this.openSnackBar(message, 'Ok', 'success-snackbar');
  }

  error(message: string) {
    this.openSnackBar(message, 'Ok', 'error-snackbar');
  }

  private openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 50000
  ) {
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: [className]
    });
  }
}
