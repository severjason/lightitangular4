import {Pipe, PipeTransform} from '@angular/core';
import {IAppReview} from '../interfaces/api.interface';

@Pipe({
  name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {

  transform(array: Array<IAppReview>, args?: any): any {
    array.sort((a: IAppReview, b: IAppReview) => {
      if (a[args.property] < b[args.property]) {
        return -1 * args.direction;
      } else if (a[args.property] > b[args.property]) {
        return 1 * args.direction;
      } else {
        return 0;
      }
    });
    return array;
  };
}
