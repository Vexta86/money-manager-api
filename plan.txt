/incomes
    GET 
    POST:
        body:
        {
            "name": "Wage",
            "date": "2024-12-21",
            "category": "Work",
            "price": "50321",
        }

/incomes/{id}
    GET 
    PATCH:
        body:        
        [
            {
                "propName": "name",
                "value": "Akros"
            }, 
            ...
            {
                "propName": "price",
                "value": "654123"
            }
        ]

    DELETE

/outcomes
    GET 
    POST:
        body:
        {
            "name": "Civica",
            "date": "2024-12-21",
            "category": "Transportation",
            "price": "50321"
        }
/outcomes/{id}
    GET
    PATCH:  
    body:        
        [
            {
                "propName": "name",
                "value": "Bus"
            }, 
            ...
            {
                "propName": "price",
                "value": "654123"
            }
        ]
    DELETE



 /frequent-outcomes
     GET
     POST:
         body:
         {
             "name": "Civica",
             "frequency": "1", in months!
             "category": "Transportation",
             "price": "50321"
         }
 /frequent-outcomes/{id}
     GET
     PATCH:
     body:
         [
             {
                 "propName": "name",
                 "value": "Bus"
             },
             ...
             {
                 "propName": "price",
                 "value": "654123"
             }
         ]
     DELETE





/signup
    POST:
    body:
        {
            "name": "sebastian",
            "email": "sebasrodsua05@gmail.com",
            "password": "password*123"
        }
