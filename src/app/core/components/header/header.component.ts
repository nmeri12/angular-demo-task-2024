import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgbCollapse
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isMenuCollapsed = true;
}
