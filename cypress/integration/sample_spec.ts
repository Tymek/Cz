describe('Basic test', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Tymoteusz Czech')
	})
})

export {}
