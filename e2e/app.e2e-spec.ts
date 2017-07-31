import { NgeneralPage } from './app.po';

describe('ngeneral App', () => {
  let page: NgeneralPage;

  beforeEach(() => {
    page = new NgeneralPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
