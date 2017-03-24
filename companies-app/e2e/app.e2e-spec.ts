import { CompaniesAppPage } from './app.po';

describe('companies-app App', () => {
  let page: CompaniesAppPage;

  beforeEach(() => {
    page = new CompaniesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
