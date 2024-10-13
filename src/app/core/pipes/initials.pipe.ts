import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {

  /**
   * @param value from a string.
   * @return first letter of the first two words in uppercase.
   */
  transform(value: string): string {
    return value.split(' ').slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('') || '';
  }

}
