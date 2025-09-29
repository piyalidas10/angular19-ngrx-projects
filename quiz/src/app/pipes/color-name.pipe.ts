import { Pipe, PipeTransform } from '@angular/core';
import { displayNameOfColor } from '../services/helpers';

@Pipe({
  name: 'colorName',
  standalone: true
})
export class ColorNamePipe implements PipeTransform {

  transform(value: string): string {
    return displayNameOfColor(value);
  }

}
