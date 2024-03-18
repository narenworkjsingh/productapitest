import * as tv4 from 'tv4';

// these test are writtern to validate api test for products categories endpoints
// test covers GET all products categories, GET single products category apl endpoints

// describe block to test GET all products categories
describe('GET all product categories API test', () => {
    // test to verify the status code should be 200
    it('should return status code as 200', () => {
      cy.request('GET', 'https://dummyjson.com/products/categories')
        .its('status')
        .should('equal', 200)
        .then(status => {
          // Log success message if the request is successful
          cy.log('API request was successful with status: ' + status);
        })
        .should(() => {
          // Check if there was any error in the previous chain
          if (Cypress.env('error')) {
            // Log the error message
            cy.log('API request failed: ' + Cypress.env('error'));
            // Fail the test if there was an error
            throw new Error(Cypress.env('error'));
          }
        });
    });
    
    // test to verify that api return with correct structure
    //validate that json response should match with json Schema stored in fixture\getallproductSchema.json file
    it ('should validate the JSON response against the schema', () => {
        //load productcategory.json file to match the category list with response data
        cy.fixture('productcategory.json').then((schema: string[]) => {
            // send a request to the get all products categories
            cy.request('GET', 'https://dummyjson.com/products/categories').then(response => {
              // validate response has value
              expect(response.body).to.have.lengthOf(schema.length);
              // Assert that each item in the response body match with catogires listed in productcategory.json file
              response.body.forEach((item: string) => {
                expect(schema).to.contain(item);
               
            });
        });
    });
});
  
    
  
  // describe block to test a single single products category end point 
  
  describe('GET/ single product category API test', () => {
  
    it('should return response with selected category value', () => {
        cy.fixture('testdata.json').then((categoryObject: any) => {
          const category = categoryObject.category.toLowerCase();
          // Construct the URL using the category value
          const url = `https://dummyjson.com/products/category/${category}`;
          
          // Send a request to the specified URL
          cy.request('GET', url).then(response => {
            // Validate response status code should be 200
            expect(response.status).to.equal(200);
      
            // Validate category in response should match with catgory listed in testdata.json file
            response.body.products.forEach((product: any) => {
              expect(product.category).to.equal(category);
            });
          });
        });
      });
      
  
  });
  
});