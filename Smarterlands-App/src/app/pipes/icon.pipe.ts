import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: any,): any {
    switch (value) {
      case 0:
        return "fa-check"
      case 1:
        return "fa-exclamation"
      case 2:
        return "fa-xmark"
      default:
        return "fa-question"
    }
  }

}
