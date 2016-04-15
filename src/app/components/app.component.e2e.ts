describe('App', () => {

  beforeEach( () => {
      browser.get('');
  });

  it('should have a title', () => {
      expect(browser.getTitle()).toEqual('My Angular2 App');
  });

  it('should have <nav>', () => {
      expect(element(by.css('sd-app sd-navbar nav')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', () => {
      expect(element(by.css('sd-app sd-navbar nav a:first-child')).getText()).toEqual('Dashboard');
  });

  it('should have correct nav text for Accounts', () => {
      expect(element(by.css('sd-app sd-navbar nav a:last-child')).getText()).toEqual('Accounts');
  });
  it('should have correct nav text for Settings', () => {
      expect(element(by.css('sd-app sd-navbar nav a:last-child')).getText()).toEqual('Settings');
  });
});
