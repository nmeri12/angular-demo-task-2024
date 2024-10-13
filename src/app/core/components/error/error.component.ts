import {Component, inject, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  private _appService = inject(AppService);

  ngOnInit(): void {
    this._appService.setHeaderTitleSubject('ErrorFound');
  }

}
