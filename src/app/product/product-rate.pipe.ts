import {Pipe, PipeTransform} from '@angular/core';
import {isNumber} from 'util';

@Pipe({
  name: 'rateClass'
})

export class RateClassPipe implements PipeTransform {

  transform(value: number): string[] {

    const resultArray: string[] = [];

    if (isNumber(value)) {

      for (let i = 0; i < 5; i++) {
        if (value > i) {
          resultArray.push('fa-star');
        } else {
          resultArray.push('fa-star-o');
        }
      }

      return resultArray;

    } else {
      throw Error('Value should be a Number!');
    }
  }
}
