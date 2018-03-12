const path = require('path')
const root = 'http://localhost:8080'

describe('nginx.config.io', function () {

	beforeEach(function () {
		cy.visit(root)
	})

	it('<title> is correct', function () {
		// https://on.cypress.io/visit
		cy.title().should('include', 'nginxconfig.io')
	})

	it('should use passed params', function () {
		cy.visit(root + '?domain=mydomain.fr')
		cy.get('input.domain').should('have.value', 'mydomain.fr')
		cy.get('#file-nginx').contains('server_name mydomain.fr;')
	})

})
