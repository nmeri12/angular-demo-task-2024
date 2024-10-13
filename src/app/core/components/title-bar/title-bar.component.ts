import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {AppService} from '../../services/app.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'title-bar',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe
  ],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css'
})
export class TitleBarComponent implements OnInit {

  public headerTitle$: Observable<string>;

  private _appService = inject(AppService);

  ngOnInit(): void {
    this.getHeaderText()
  }

  private getHeaderText() {
    this.headerTitle$ = this._appService._headerTitleSubject$;
  }

}
