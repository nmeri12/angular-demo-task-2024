import {ErrorHandler, inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from './alert.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  private _alertService=inject(AlertService);

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    //display err massage
    this._alertService.dialog(error,'Error found, please try again later')
    console.error('Error found, please try again later', error);
  }
}

