1. What was done?
    1. Created product and stock tables and stored the create and seed scripts inside file at product-service/db-script folder
    2. Added ENV variable for products table and stocks table
    3. Created a lambda function called createProduct to expose POST API /products which creates new Itenm in products table

2. Backend APIs: 
    1. GET https://9hm5ojtl48.execute-api.us-east-1.amazonaws.com/dev/products/: Gets all products with stock count
    2. GET https://9hm5ojtl48.execute-api.us-east-1.amazonaws.com/dev/products/{id}: Gets product by id with stock count
    3. POST: https://9hm5ojtl48.execute-api.us-east-1.amazonaws.com/dev/products/: Creates product from request body json.
    Sample POST request body:
        1. Happy path
        `
        {
            "description": "Test Product descrition",
            "id": 6,
            "price": 66,
            "title": "Test Product",
            "count": 77
        }
        `
        2. Invalid user creation request: Sending title empty, which is a required field. Returns 400 Bad request error code
        `
        {
            "description": "Test Product descrition",
            "id": 6,
            "price": 66,
            "title": "",
            "count": 77
        }
        `
        3. Product not found. Sending a product id which does not exist. Returns 404 Not found  error code
        HTTP GET https://9hm5ojtl48.execute-api.us-east-1.amazonaws.com/dev/products/9999999


3. Frontend:
    - Application URL: https://d2s4vtjjdp7wcf.cloudfront.net/
    - PR: https://github.com/sujit-epam/shop-react-redux-cloudfront/pull/3
