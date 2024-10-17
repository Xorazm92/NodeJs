{
     "info": {
       "name": "User and Debt API",
       "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
     },
     "item": [
       {
         "name": "Auth",
         "item": [
           {
             "name": "Register",
             "request": {
               "method": "POST",
               "url": "http://localhost:4000/auth/register",
               "header": [
                 {
                   "key": "Content-Type",
                   "value": "application/json"
                 }
               ],
               "body": {
                 "mode": "raw",
                 "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
               }
             }
           },
           {
             "name": "Login",
             "request": {
               "method": "POST",
               "url": "http://localhost:4000/auth/login",
               "header": [
                 {
                   "key": "Content-Type",
                   "value": "application/json"
                 }
               ],
               "body": {
                 "mode": "raw",
                 "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
               }
             }
           },
           {
             "name": "Logout",
             "request": {
               "method": "GET",
               "url": "http://localhost:4000/auth/logout/:id"
             }
           }
         ]
       },
       {
         "name": "Profile",
         "item": [
           {
             "name": "Get Profile",
             "request": {
               "method": "GET",
               "url": "http://localhost:4000/profile/:id"
             }
           },
           {
             "name": "Update Profile",
             "request": {
               "method": "PUT",
               "url": "http://localhost:4000/profile/:id",
               "header": [
                 {
                   "key": "Content-Type",
                   "value": "application/json"
                 }
               ],
               "body": {
                 "mode": "raw",
                 "raw": "{\n  \"name\": \"Updated Name\"\n}"
               }
             }
           },
           {
             "name": "Delete Profile",
             "request": {
               "method": "DELETE",
               "url": "http://localhost:4000/profile/:id"
             }
           }
         ]
       },
       {
         "name": "Debt",
         "item": [
           {
             "name": "Get All Debts",
             "request": {
               "method": "GET",
               "url": "http://localhost:4000/debt"
             }
           },
           {
             "name": "Create Debt",
             "request": {
               "method": "POST",
               "url": "http://localhost:4000/debt",
               "header": [
                 {
                   "key": "Content-Type",
                   "value": "application/json"
                 }
               ],
               "body": {
                 "mode": "raw",
                 "raw": "{\n  \"amount\": 100,\n  \"description\": \"Test debt\"\n}"
               }
             }
           },
           {
             "name": "Get Debt by ID",
             "request": {
               "method": "GET",
               "url": "http://localhost:4000/debt/:id"
             }
           },
           {
             "name": "Update Debt",
             "request": {
               "method": "PUT",
               "url": "http://localhost:4000/debt/:id",
               "header": [
                 {
                   "key": "Content-Type",
                   "value": "application/json"
                 }
               ],
               "body": {
                 "mode": "raw",
                 "raw": "{\n  \"amount\": 150,\n  \"description\": \"Updated test debt\"\n}"
               }
             }
           },
           {
             "name": "Delete Debt",
             "request": {
               "method": "DELETE",
               "url": "http://localhost:4000/debt/:id"
             }
           }
         ]
       }
     ]
   }