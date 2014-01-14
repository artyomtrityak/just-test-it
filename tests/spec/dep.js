describe('Basic dependency test', function() {
  
  beforeEach(function(done) {
    var self = this;
    require(['modules/books'], function(BooksModule) {
      self.BooksModule = BooksModule;
      done();
    });
  });

  it('should load books dep', function() {
    expect(this.BooksModule).to.be.a('function');
  });
});