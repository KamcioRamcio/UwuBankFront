# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# ENDPOINTS
### Employee
```
---> /api/employees
@POST
{
  "employee": {
    "name": "Rafał Borek",
    "position": "TELLER",
    "branchId": 1
  },
  "user": {
    "username": "rav",
    "password": "123",
    "role": "EMPLOYEE"
  }
}

@GET
empty body

@GET customers for employee
---> /api/employees/{employeeId}/customers
```
### Customer
```
---> /api/customers
{
  "customer": {
    "name": "Rav",
    "surname":"Borus",
    "pesel":420692137,
    "address":"Walkowiakowa 27",
    "phoneNumber":122222222,
    "email": "rafalborek@gmail.com",
    "branchId": 1
  },
  "user": {
    "username": "rav",
    "password": "123",
    "role": "CUSTOMER"
  }
}
```

### Account
```
---> /api/accounts
@POST
{
    "balance": 2700,
    "accountType": "USD",
    "customerId": 1
}
```