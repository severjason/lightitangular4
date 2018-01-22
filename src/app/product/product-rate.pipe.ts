import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rateClass'
})

export class RateClassPipe implements PipeTransform {

  transform(value: number): string[] {
    const resultArray: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (value > i) {
        resultArray.push('fa-star');
      } else {
        resultArray.push('fa-star-o');
      }
    }
    return resultArray;
  }
}
