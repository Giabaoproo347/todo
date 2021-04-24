import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): any {
    if (value == 'normal') {
      return 'Normal'
    }

    if (value == 'high') {
      return "High"
    }

    if (value == 'Low') {
      return "Low"
    }
  }

}
