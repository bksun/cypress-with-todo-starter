describe('Input form', () => {
  const todoInputClassName = 'new-todo';
  const todoInputClass = '.new-todo';
  const typedValue = 'my first todo';

  beforeEach(() => {
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    cy.focused()
    .should('have.class', todoInputClassName)
  })

  it('accept inputs', () => {
    const typedValue = 'my first name'
    cy.get(todoInputClass)
    .type(typedValue)
    .should('have.value', typedValue)
  })


  context('todo form submission', () => {
    beforeEach(() => {
      cy.server()
    })

    it('adds a new todo on submit', ()=> {
      cy.route('POST', '/api/todos', {
        name: typedValue,
        id: 1,
        isComplete: false
      })

      cy.get(todoInputClass)
      .type(typedValue)
      .type('{enter}')
      .should('have.value', '')

      cy.get('.todo-list li')
      .should('have.length', 1)
      .and('contain', typedValue)
    })

    it('show an error message on failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get(todoInputClass)
      .type('test{enter}')

      cy.get('.todo-list li')
      .should('not.exist')

      cy.get('.error')
      .should('be.visible')
    })
  })

})