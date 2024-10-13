import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Constants} from '../../../core/utils/Constants';

@Component({
  selector: 'app-todo-toolbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './todo-toolbar.component.html',
  styleUrl: './todo-toolbar.component.css'
})
export class TodoToolbarComponent {

  public itemsPerRow = input.required<number>(); // Default items per row
  public gridSizeChange = output<number>();
  public rowOptions: number[] = Constants.ROW_OPTIONS;  // Items per row options

  /**
   * Emit items per row
   * @param option Number of items to display per row.
   */
  updateGridSize(option: number): void {
    this.gridSizeChange.emit(option);

  }
}
