const path = require('path');
const root = 'http://localhost:8080';

describe('nginxconfig.io', function () {

	beforeEach(function () {
		cy.visit(root);
	});

	it('<title> is correct', function () {
		cy.title().should('include', 'nginxconfig.io');
	});

	it('should use passed params', function () {
		cy.visit(root + '?domain=nginxconfig.io');
		cy.get('input.domain').should('have.value', 'nginxconfig.io');
		cy.get('#file-nginx').contains('server_name nginxconfig.io;');
	});
});
