import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'message'
})
export class MessagePipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case 0:
        return "Data sent successfully"
      case 1:
        return "Warning: incoming storm"
      case 2:
        return "Error: Data malformed!"
      default:
        return "Unknown Error"
    }
  }

}
