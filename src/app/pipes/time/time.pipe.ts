import { Pipe, PipeTransform } from '@angular/core';
import { MathUtils } from 'src/app/helpers/math/math-utils.helper';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {


  transform(timestamp: number | undefined, type: string): string {
    if (timestamp) {
      switch (type) {
        case 'hours': return new Date(timestamp * 1000).toISOString().substring(11, 16);
        case 'minutes': return new Date(timestamp * 1000).toISOString().substring(14, 19);
        case 'date': return MathUtils.timeConverter(timestamp, 0, false).substring(0, 11);
      }
      return timestamp.toString();
    }
    return '';

  }

}
