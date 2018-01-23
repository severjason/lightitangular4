import {RateClassPipe} from './product-rate.pipe';


describe('Pipe: rateClassPipe', () => {
  let pipe: RateClassPipe;

  beforeEach(() => {
    pipe = new RateClassPipe();
  });

  it('should return correct array of classes', () => {
    expect(pipe.transform(0)).toEqual(['fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o']);
    expect(pipe.transform(5)).toEqual(['fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star']);
    expect(pipe.transform(2)).toEqual(['fa-star', 'fa-star', 'fa-star-o', 'fa-star-o', 'fa-star-o']);
    expect(pipe.transform(5555)).toEqual(['fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star']);
  });

  it('should throw if not used with a number', () => {
    expect(() => pipe.transform(null)).toThrowError();
    expect(() => pipe.transform(undefined)).toThrowError();
  });

});
