var expect = chai.expect;

describe('Basics tests that Karma works', function(){
  it('should support default tests', function(){
    expect(true).to.be.a('boolean');
    
    expect(typeof "test").to.be.a('string');
    
    expect(1).to.be.equal(1);
  });
});