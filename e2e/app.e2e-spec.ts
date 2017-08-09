import { TheFourBooksPage } from './app.po';

describe('the-four-books App', () => {
  let page: TheFourBooksPage;

  beforeEach(() => {
    page = new TheFourBooksPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
