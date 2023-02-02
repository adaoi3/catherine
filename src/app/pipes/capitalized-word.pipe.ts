import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizedWord'
})
export class CapitalizedWordPipe implements PipeTransform {

  transform(value: string): string {
    if (value === '') {
      return value;
    }
    if (value.length === 1) {
      return value.toUpperCase();
    }
    return value[0].toUpperCase() + value.substring(1).toLowerCase();
  }

}
