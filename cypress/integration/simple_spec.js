import _ from 'lodash';



const isLocalFile = fileName => _.startsWith(fileName, 'http://localhost:3000') || _.startsWith('/');

describe('Build success', () => {
  it('verifies that built js files referenced by the page are present', () => {
    cy.visit('http://localhost:3000');
    cy.get('script')
      .then(nodes => _.filter(_.map(nodes, 'src'), isLocalFile))
      .then((scriptNames) => {
        _.forEach(scriptNames, scriptName => cy.request(scriptName));
      });
  });
});

describe.skip('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('does something', () => {
    cy.visit('http://localhost:3000');
  });

  it.skip('Visits the home pager', (done) => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('something about the error')

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done('blurg');

      // return false to prevent the error from
      // failing this test
      return true
    })

    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'fff');
    cy.contains('Grid').click();
    cy.url().should('include', '/grid').then(() => done());
  });

  it('Tries to visit a site with an expired certificate', () => {
    cy.visit('https://expired.badssl.com/');
  });

  it('does an onload', () => {
    cy.visit('http://localhost:3000', { onload: function(contentWindow) {
      debugger
    }});
  });
})
