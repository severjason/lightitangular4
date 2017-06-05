import { Lightitangular4Page } from './app.po';

describe('lightitangular4 App', () => {
  let page: Lightitangular4Page;

  beforeEach(() => {
    page = new Lightitangular4Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
