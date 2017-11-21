

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('opens the page', () => {
    cy.visit('http://localhost:3000');
  });

  it('opens the page and queries the dom', () => {
    cy.visit('http://localhost:3000')
      .then(() => cy.get('div'))
      .then(divs => expect(divs).to.have.length.greaterThan(5));
  });
})
