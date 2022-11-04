### Task-5

1. Frontend:
    - Application URL: https://d2s4vtjjdp7wcf.cloudfront.net/admin/products
    - PR: https://github.com/sujit-epam/shop-react-redux-cloudfront/pull/4

2. Backend:
    1. APIs
        1. GET https://e90oycwm21.execute-api.us-east-1.amazonaws.com/dev/import?name=<file-name>: Get S3 signed url
        2. PUT <S3-signed-url>: Uploads csv file

- Created a new service called import-service
- Created and configured a new S3 bucket with a folder called uploaded
- Added lambda function importProductsFile that gets triggered by HTTP GET method to the endpoint "/import" which accepts "name" as query string param and returns S3 signed url of same.
- Added lambda function importFileParser that gets triggered by HTTP PUT method to upload the file on S3-signed-url returnd by importProductsFile endpoint.

