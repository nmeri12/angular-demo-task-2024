import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../model/user.model';

@Pipe({
  name: 'customFilter',
  standalone: true
})
export class CustomFilterPipe implements PipeTransform {

  /**
   * filter users array by name,username,email or company
   * @param users
   * @param searchTerm
   * @returns - filtered array of users
   */
  transform(users: User[], searchTerm: string): User[] {
    if (!users || !searchTerm) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
