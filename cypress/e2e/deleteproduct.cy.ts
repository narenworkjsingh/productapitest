// this test is written to test delete product api endpoint

// describe block to test DELETE endpoint
describe('DELETE/ delete product to product API', () => {
    let response; // Variable to store the response
    let deleteProductId; // Variable to store the delete product ID

    beforeEach(() => {
        // load json body from fixture 
        cy.fixture('testdata.json').then((data) => {
            deleteProductId = data.deleteproductid;
            // send DELETE request to delete the product with the specified ID
            cy.request({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                url: `https://dummyjson.com/products/${deleteProductId}`
            }).then(resp => {
                response = resp;
            });
        });
    });

    // test to verify that the request was successful
    it('should return status code as 200', () => {
        // Assert that the response status is 200
        expect(response.status).to.equal(200);
    });

    // test to verify that product is deleted successfully
    it('should verify the product is deleted successfully', () => {
        // Check if the response body contains the expected properties
        expect(response.body.id).to.equal(deleteProductId);
        expect(response.body.isDeleted).to.equal(true);
        expect(response.body.deletedOn).to.exist;

        // Parse the deletedOn date from the response body
        const deletedOnDate: Date = new Date(response.body.deletedOn);
        // Get the current date and time
        const currentDate: Date = new Date();
        // Check if deletedOnDate is within an acceptable range of the current date and time
        // Allow a tolerance of a few seconds
        const timeTolerance: number = 5000; // 5 seconds in milliseconds
        const timeDifference: number = Math.abs(currentDate.getTime() - deletedOnDate.getTime());
        expect(timeDifference).to.be.lessThan(timeTolerance);
    });
});
