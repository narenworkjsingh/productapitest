import * as tv4 from 'tv4';

// these test are writtern to validate api test for GET product endpoints
// test covers GET all products, GET single product apl endpoints

// describe block to test GET all product endpoint
describe('GET all product API test', () => {
  // test to verify the status code should be 200
  it('should return status code as 200', () => {
    cy.request('GET', 'https://dummyjson.com/products')
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
  it ('should validate the JSON response against the schema', () =>{
    cy.fixture('getallproductSchema.json').then(schema => {
      //send a request to get all product api
      cy.request('GET', 'https://dummyjson.com/products').then(response => {
        //validate response again json schema
        const isValid = tv4.validate(response.body, schema)
        if (isValid) {
          console.log('passed: json response match with schema');
        }
        else {
          console.log('failed: json response failed to match with schema', tv4.error);
        }
        //expect the validation result to be true
        expect(isValid).to.be.true;


      })

    });
  });

  //test to verify that total number products return correctly 
  // assumtion is that total at the end should match with all the items count listed in products array
  it('should return total number of products successfully', () => {
    //send request 
    cy.request('GET', 'https://dummyjson.com/products').then(response => {
      const totalProducts = response.body.total;
      const productsCount = response.body.products.length;
      expect(productsCount, `Expected total number of products: ${totalProducts}, Actual number of products: ${productsCount}`).to.equal(totalProducts);
    });
  });
  // test to verify that test return with valid thumnail url
  it('should return products with valid thumbnail URLs', () => {
    cy.request('GET', 'https://dummyjson.com/products').then((response) => {
      const products = response.body.products;
      products.forEach(product => {
        expect(product.thumbnail).to.match(/^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/);
       })
    })   

  });

// test to verify that product response should contains valid image URL's
  it('should return products with valid image URLs', () => {
    cy.request('GET', 'https://dummyjson.com/products').then((response) => {
      const products = response.body.products;
      products.forEach(product => {
        product.images.forEach(image => {
          expect(image).to.match(/^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/);
        });
      });
    });
  });  

});


// describe block to test a single product end point 

describe('GET single product API test', () => {

  it('should return response for provided product id listed in testdata.json file', () => {
    cy.fixture('testdata.json').then((productObject: any) => {
      const  productId = productObject.productid;
      // Construct the URL using the category value
      const url = `https://dummyjson.com/products/${productId}`;
      
      // Send a request to the specified URL
      cy.request('GET', url).then(response => {
        // Validate response status code should be 200
        expect(response.status).to.equal(200);
        //validate that product id in response should match with requeste data
        expect(response.body.id).to.equal(productId);
  
      });
    });
  });
  

});
