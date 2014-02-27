describe('Books dependency test', function() {
  
  beforeEach(function(done) {
    var self = this;
    require([
      'jquery',
      'modules/books',
      'modules/books/collection',
      'modules/books/books-view',
      'controller'
    ],
    function($, BooksModule, Collection, BooksView, Controller) {
      self.$ = $;
    
      self.BooksModule = BooksModule;
      self.BooksView = BooksView;
      self.Controller = Controller;
      self.Collection = Collection;

      self.booksIns = new BooksModule();
      done();
    });
  });

  it('should load books module', function() {
    expect(this.BooksModule).to.be.a('function');

    expect(this.booksIns).to.be.an.instanceof(this.Controller);
  });

  it('should have showList public API', function() {
    expect(this.booksIns).to.be.a('object');

    expect(this.booksIns.showList).to.be.a('function');
  });

  it('should fetch collection each time', function() {
    expect(this.Collection).to.be.a('function');
    sinon.spy(this.Collection.prototype, 'fetch');

    expect(this.Collection.prototype.fetch.callCount).to.be.equal(0);

    var container = this.$('<div />');
    this.booksIns.showList(container);

    expect(this.Collection.prototype.fetch.callCount).to.be.equal(1);

    expect(this.booksIns.collection).to.be.an.instanceof(this.Collection);

    this.Collection.prototype.fetch.restore();
  });

  it('should create collection view', function() {
    expect(this.BooksView).to.be.a('function');
    sinon.spy(this.BooksView.prototype, 'render');

    expect(this.BooksView.prototype.render.callCount).to.be.equal(0);

    var container = this.$('<div />');
    this.booksIns.showList(container);

    expect(this.BooksView.prototype.render.callCount).to.be.equal(0);

    expect(this.booksIns.collectionView).to.be.an.instanceof(this.BooksView);
    
    expect(this.booksIns.collectionView.collection).to.be.instanceof(
      this.Collection
    );
    this.BooksView.prototype.render.restore();
  });

  it('should fetch data and render view', function() {
    sinon.spy(this.BooksView.prototype, 'render');
    var server = sinon.fakeServer.create();
    server.respondWith('books/',
      '[{"id": 1, "name": "Harry Potter", "date": "June, 30 2000 г.", "author": "J. K. Rowling"},'+
      '{"id": 2, "name": "Neuromancer", "date": "March 3,1984", "author": "William Gibson"}]');

    var container = this.$('<div />');
    expect(this.BooksView.prototype.render.callCount).to.be.equal(0);
    this.booksIns.showList(container);
    
    expect(this.BooksView.prototype.render.callCount).to.be.equal(0);

    server.respond();

    expect(this.BooksView.prototype.render.callCount).to.be.equal(1);
    expect(this.booksIns.collection.length).to.be.equal(2);

    server.restore();
    this.BooksView.prototype.render.restore();
  });
});