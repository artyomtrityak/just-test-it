describe('Basic dependency test', function() {
  
  beforeEach(function(done) {
    var self = this;
    require(['modules/menu'], function(MenuModule) {
      self.MenuModule = MenuModule;
      done();
    });
  });

  it('should load books dep', function() {
    expect(this.MenuModule).to.be.a('function');
    var menuIns = new this.MenuModule();
    expect(menuIns).to.be.instanceof(this.MenuModule);
  });
});