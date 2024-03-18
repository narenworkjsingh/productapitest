// this test is written to verify update product endpoint

import * as tv4 from 'tv4';

// describe block to test update product endpoint
describe('PUT update product to product API', () => {
    let response; // Variable to store the response

    beforeEach(() => {
        // load pdateproduct json body from fixture 
        cy.fixture('updateproduct.json').then(updateproduct => {
            // send PUT request to update product details
            cy.request({
                method:'PUT', 
                headers: { 'Content-Type': 'application/json' },
                url: 'https://dummyjson.com/products/1',
                body: updateproduct
            }).then(resp => {
                response = resp;
            });
        });
    });

    // test to verify that the request was successful
    it ('should return status code as 200', () => {
        // Assert that the response status is 200
        expect(response.status).to.equal(200);
    });

    // test to verify that product details in response body should match with updated request data sent 
    it('should verify the product details', () => {
        cy.fixture('updateproduct.json').then(updateproduct => {
            expect(response.body.id).to.exist;
            expect(response.body.title).to.equal(updateproduct.title);
            expect(response.body.description).to.equal(updateproduct.description);
            expect(response.body.price).to.equal(updateproduct.price);
            expect(response.body.discountPercentage).to.equal(updateproduct.discountPercentage);
            expect(response.body.rating).to.equal(updateproduct.rating);
            expect(response.body.stock).to.equal(updateproduct.stock);
            expect(response.body.brand).to.equal(updateproduct.brand);
            expect(response.body.category).to.equal(updateproduct.category);
            
            
        });
    });    
});
