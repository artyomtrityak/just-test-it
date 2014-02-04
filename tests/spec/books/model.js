//var expect = chai.expect;


describe('Books model test', function() {

    beforeEach(function(done) {
        var self = this;
        require([
            'jquery',
            'modules/books/model',
            'modules/books'
        ],
            function($, BooksModel, BooksModule) {
                self.$ = $;

                self.BooksModel = BooksModel;

                self.booksIns = new BooksModule();
                done();
            });
    });


    it('should extend the model', function() {
        expect(this.BooksModel).to.be.a('function');
    });

//    it('should create correct instances', function() {
//        var instance = new this.BooksModel();
//        expect(instance).to.be.an.instanceof(self.BooksModel);
//    });

    it('should have correct urlRoot', function() {
        var instance = new this.BooksModel();
        expect(instance.urlRoot).to.be.equal('books');
    });

    it('should fetch correct data', function() {

        var server = sinon.fakeServer.create();

        server.respondWith('books/1', '{"id": 1, "name": "Гарри Поттер", "date": "30 июня 2000 г.", "author": "Дж. К. Роулинг"}');
        server.respondWith('books/2', '{"id": 2, "name": "Нейромант", "date": "3 марта 1984", "author": "Уильяма Гибсон"}');


        var instance = new this.BooksModel({id:'1'});

        instance.fetch();

        server.respond();

        var attrs = instance.attributes;

        expect(attrs).to.have.property('name');
        expect(instance.get('name')).to.be.a('string');

        expect(attrs).to.have.property('date');
        expect(instance.get('date')).to.be.a('string');

        expect(attrs).to.have.property('author');
        expect(instance.get('author')).to.be.a('string');

        server.restore();

    })
});