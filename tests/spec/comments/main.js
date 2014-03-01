var expect = chai.expect;

describe('Comments widget tests', function() {
  beforeEach(function(done) {
    var self = this;
    require([
      'modules/comments',
      'backbone',
      'modules/comments/collection',
      'modules/comments/view',
      'Q'
      ], function(Com, BB, Col, View, Q) {
      self.Comments = Com;
      self.BB = BB;
      self.Collection = Col;
      self.View = View;
      self.Q = Q;
      done();
    });
  });

  it('should be Controller', function() {
    expect(this.Comments).to.be.a('function');
    var ins = new this.Comments();
    expect(ins.remove).to.be.a('function');
  });

  it('should have method getComments', function() {
    sinon.spy(this.Collection.prototype, 'fetch');

    var ins = new this.Comments();
    expect(ins.getComments).to.be.a('function');

    var server = sinon.fakeServer.create();
    server.respondWith('comments/', '[{"id": 1, "name": "Harry"}, {"id": 2, "name": "Vasya"}]');

    expect(this.Collection.prototype.fetch.callCount).to.be.equal(0);
    var result = ins.getComments(2);
    expect(this.Collection.prototype.fetch.callCount).to.be.equal(1);
    expect(result).to.be.instanceof(this.BB.Collection);
    expect(result.length).to.be.equal(0);

    expect(ins.collection).to.be.equal(result);

    server.respond();
    
    expect(result.length).to.be.equal(2);

    server.restore();
    this.Collection.prototype.fetch.restore();

  });

  it('should have showComments method', function() {
    sinon.spy(this.View.prototype, 'initialize');

    var ins = new this.Comments();
    expect(ins.showComments).to.be.a('function');

    var col = new this.Collection([{'id': 1, name: 'hello'}])

    sinon.stub(ins, 'getComments');
    ins.getComments.returns(col);

    expect(ins.view).to.be.equal(undefined);
    ins.showComments(222);
    expect(ins.view).to.be.not.equal(undefined);
    expect(ins.view).to.be.instanceof(this.View);

    expect(ins.getComments.calledWith(222)).to.be.equal(true);
    
    expect(this.View.prototype.initialize.calledWith({
      collection: col
    })).to.be.equal(true);
  });

  it('should have correct remove', function() {
    var view = {
      remove: sinon.spy()
    },
    view2 = {
      remove2: sinon.spy()
    },
    collection = 'test';

    var ins = new this.Comments();
    ins.view = view;
    ins.collection = collection;

    expect(ins.view.remove.callCount).to.be.equal(0);
    
    ins.remove();

    expect(ins.view.remove.callCount).to.be.equal(1)
    expect(ins.collection).to.be.equal(null);

    ins.view = null;
    ins.collection = null;

    ins.remove();

    ins.view = view2;
    ins.remove();

  });

  it('should have correct method onChange', function(done) {
    var ins = new this.Comments();
    sinon.spy(ins, 'showComments');
    expect(ins.onChange).to.be.a('function');

    var defer = ins.onChange();
    expect(this.Q.isPromise(defer.promise)).to.be.equal(true);

    expect(ins.showComments.callCount).to.be.equal(0);

    defer.promise.then(function(result) {
      expect(result).to.be.equal(333);
      expect(ins.showComments.callCount).to.be.equal(1);
      expect(ins.showComments.calledWith(333)).to.be.equal(true);
      done()
    });

    defer.resolve(333);
  });

});