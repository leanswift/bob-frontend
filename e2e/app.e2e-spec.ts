import { BobFrontendPage } from './app.po';

describe('bob-frontend App', function() {
  let page: BobFrontendPage;

  beforeEach(() => {
    page = new BobFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
