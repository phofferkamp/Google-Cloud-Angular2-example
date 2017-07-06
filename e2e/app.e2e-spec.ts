import { Ng2HelloWorldPage } from './app.po';

describe('ng2-hello-world App', () => {
  let page: Ng2HelloWorldPage;

  beforeEach(() => {
    page = new Ng2HelloWorldPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
