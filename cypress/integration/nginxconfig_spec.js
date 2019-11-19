/* eslint-env es6 */
/* global beforeEach cy describe it */

const root = 'http://localhost:8080';

describe('nginxconfig.io', function () {

	beforeEach(function () {
		cy.visit(root);
	});

	it('<title> is correct', function () {
		cy.title().should('include', 'nginxconfig.io');
	});

	it('should use passed params', function () {
		cy.visit(root + '#?0.domain=nginxconfig.io');
		cy.get('input.domain').should('have.value', 'nginxconfig.io');
		cy.get('#file-domain-0').contains('server_name nginxconfig.io;');
	});

	it('should use legacy passed params', function () {
		cy.visit(root + '#?domain=nginxconfig.io');
		cy.get('input.domain').should('have.value', 'nginxconfig.io');
		cy.get('#file-domain-0').contains('server_name nginxconfig.io;');
	});
});
