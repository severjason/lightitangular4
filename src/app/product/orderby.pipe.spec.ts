import {OrderByPipe} from './orderby.pipe';

describe('Pipe: orderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('Array sorted properly', () => {
    expect(pipe.transform([{rate: 3}, {rate: 1}], {property: 'rate', direction: -1}))
      .toEqual([{rate: 3}, {rate: 1}]);
    expect(pipe.transform([{rate: 3}, {rate: 8}, {rate: 1}], {property: 'rate', direction: 1}))
      .toEqual([{rate: 1}, {rate: 3}, {rate: 8}]);
    expect(pipe.transform([{someValue: 3}, {someValue: 1}], {property: 'someValue', direction: -1}))
      .toEqual([{someValue: 3}, {someValue: 1}]);
  });
});
