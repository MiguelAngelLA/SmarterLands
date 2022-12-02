import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(type: number,): any {
    switch (type) {
      case 0:
        return "green"
      case 1:
        return "yellow"
      case 2:
        return "red"
      case 3:
        return "green"
      default:
        return "gray"
    }

  }

}
