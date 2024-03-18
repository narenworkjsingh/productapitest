import * as tv4 from 'tv4';

// these test are writtern to validate api test for search (GET) product endpoints

// describe block to test GET search product as listed in testdata file
describe('GET/ search product API test', () => {
    let searchQuery: string;
    
    before(() => {
      // Load the fixture data before running the tests
      cy.fixture('testdata.json').then((searchObject: any) => {
        searchQuery = searchObject.searchproduct;
      });
    });
  
    // test to verify the status code should be 200
    it('should return status code as 200', () => {
      // Construct the URL using the search query
      const url = `https://dummyjson.com/products/search?q=${searchQuery}`;
      cy.request('GET', url)
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
    
    // test to verify that api returns response as per search query parameter
    it('should return response with selected category value', () => {
      // Construct the URL using the search query parameter
      const url = `https://dummyjson.com/products/search?q=${searchQuery}`;
      
      // Send a request to the specified URL
      cy.request('GET', url).then(response => {
        // Validate response status code should be 200
        expect(response.status).to.equal(200);
  
        // Validate category of each product in the response contain the records
        response.body.products.forEach((product: any) => {
          expect(product.category).to.equal(searchQuery);
        });
      });
    });
  
    // test to verify that total number of products is returned correctly 
    // assumption is that total at the end should match with all the items count listed in products array
    it('should return total number of products successfully', () => {
      // Construct the URL using the search query
      const url = `https://dummyjson.com/products/search?q=${searchQuery}`;
      
      // Send request to get the total number of products
      cy.request('GET', url).then(response => {
        const totalProducts = response.body.total;
        const productsCount = response.body.products.length;
        // Validate that the total number of products matches the number of items listed in the products array
        expect(productsCount, `Expected total number of products: ${totalProducts}, Actual number of products: ${productsCount}`).to.equal(totalProducts);
      });
    });
  });

// describe block to test limit and skip products 
  describe('GET/ products endpoint with query parameters test', () => {
    it('should return status code as 200 and correct response data as per quary parameter passed in url', () => {
      cy.fixture('testdata.json').then((testData: any) => {
        const queryParameters = testData.queryParameters;
        const queryString = Object.entries(queryParameters).map(([key, value]) => `${key}=${value}`).join('&');
        const url = `https://dummyjson.com/products?${queryString}`;
        // Verify that response status should be 200
        cy.request('GET', url).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('products').that.is.an('array');
          expect(response.body.products).to.have.lengthOf(10);
        // Verify that repsonse display only selected fields as listed in query parameter
          response.body.products.forEach((product: any) => {
            expect(product).to.have.property('id').that.is.a('number');
            expect(product).to.have.property('title').that.is.a('string');
            expect(product).to.have.property('price').that.is.a('number');
          });
        });
      });
    });
  });
  