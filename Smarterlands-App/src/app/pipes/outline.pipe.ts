import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outline'
})
export class OutlinePipe implements PipeTransform {

  transform(value: unknown): any {
    switch (value) {
      case 0:
        return "green-outline"
      case 1:
        return "yellow-outline"
      case 2:
        return "red-outline"
      default:
        return "gray-outline"
    }
  }

}
