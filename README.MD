# Financial Management API Documentation

## Introduction
This API allows users to manage their incomes, outcomes, and frequent outcomes. It provides endpoints for creating, retrieving, updating, and deleting financial records.

## Base URL
https://money-manager-api-c0fg.onrender.com
## Authentication
Authentication is required for all endpoints. Please sign up to obtain an API key.

### Signup
- **POST** `/signup`
    - Create a new user account.
    - **Request Body:**
      ```json
      {
          "name": "sebastian",
          "email": "sebasrodsua05@gmail.com",
          "password": "password*123"
      }
      ```
        - **Note:** Password must be at least eight characters long, including at least one letter, one number, and one special character.

## Endpoints

### Incomes
#### Create Income
- **POST** `/incomes`
    - Create a new income record.
    - **Request Body:**
      ```json
      {
          "name": "Wage",
          "date": "2024-12-21",
          "category": "Work",
          "price": "50321"
      }
      ```
#### Get Income by month
- **GET** `/incomes/?month={mm}&year={yyyy}`
    - Retrieve an array of income filtered by their month.
#### Get Income
- **GET** `/incomes/{id}`
    - Retrieve a specific income record by its ID.

#### Update Income
- **PATCH** `/incomes/{id}`
    - Update a specific income record by its ID.
    - **Request Body:**
      ```json
      [
          {
              "propName": "name",
              "value": "Akros"
          },
          {
              "propName": "price",
              "value": "654123"
          }
      ]
      ```

#### Delete Income
- **DELETE** `/incomes/{id}`
    - Delete a specific income record by its ID.

### Outcomes
#### Create Outcome
- **POST** `/outcomes`
    - Create a new outcome record.
    - **Request Body:**
      ```json
      {
          "name": "Civica",
          "date": "2024-12-21",
          "category": "Transportation",
          "price": "50321"
      }
      ```

#### Get Outcome
- **GET** `/outcomes/{id}`
    - Retrieve a specific outcome record by its ID.

#### Update Outcome
- **PATCH** `/outcomes/{id}`
    - Update a specific outcome record by its ID.
    - **Request Body:**
      ```json
      [
          {
              "propName": "name",
              "value": "Bus"
          },
          {
              "propName": "price",
              "value": "654123"
          }
      ]
      ```

#### Delete Outcome
- **DELETE** `/outcomes/{id}`
    - Delete a specific outcome record by its ID.

### Frequent Outcomes
#### Create Frequent Outcome
- **POST** `/frequent-outcomes`
    - Create a new frequent outcome record.
    - **Request Body:**
      ```json
      {
          "name": "Civica",
          "frequency": "1", // in months
          "category": "Transportation",
          "price": "50321"
      }
      ```

#### Get Frequent Outcome
- **GET** `/frequent-outcomes/{id}`
    - Retrieve a specific frequent outcome record by its ID.

#### Update Frequent Outcome
- **PATCH** `/frequent-outcomes/{id}`
    - Update a specific frequent outcome record by its ID.
    - **Request Body:**
      ```json
      [
          {
              "propName": "name",
              "value": "Bus"
          },
          {
              "propName": "price",
              "value": "654123"
          }
      ]
      ```

#### Delete Frequent Outcome
- **DELETE** `/frequent-outcomes/{id}`
    - Delete a specific frequent outcome record by its ID.

