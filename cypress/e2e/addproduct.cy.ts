// these test are writtern to validate add a new product endpoints POST endpoint.
// test covers POST adding a new product 

import * as tv4 from 'tv4';

// describe block to test add a new product 
describe('POST/ add new product to product API', () => {
    let response; // Variable to store the response

    beforeEach(() => {
        // load json body from fixture 
        cy.fixture('addnewproduct.json').then(product => {
            // send post request to add new product
            cy.request({
                method:'POST', 
                headers: { 'Content-Type': 'application/json' },
                url: 'https://dummyjson.com/products/add',
                body: product
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

    // test to verify that product details in response body should match with request data sent 
    it('should verify the product details', () => {
        cy.fixture('addnewproduct.json').then(product => {
            expect(response.body.id).to.exist;
            expect(response.body.title).to.equal(product.title);
            expect(response.body.description).to.equal(product.description);
            expect(response.body.price).to.equal(product.price);
            expect(response.body.discountPercentage).to.equal(product.discountPercentage);
            expect(response.body.rating).to.equal(product.rating);
            expect(response.body.stock).to.equal(product.stock);
            expect(response.body.brand).to.equal(product.brand);
            expect(response.body.category).to.equal(product.category);
            
            
        });
    });    
});
