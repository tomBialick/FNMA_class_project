# FNMA_class_project
This is the Team Clippy solution to the class project  
Members:  
  * Thomas Bialick  
  * Shannon Darroch  
  * Antonio Sierra
  * Max Zilvitis

## Before you run
Make sure you have set up everything  
  * Postgresql (database, user, user roles, and table)
  * Run npm install (to verify all dependencies are installed)  
  * config.json values are not default (host_info, database)  
  * Change the start_server.sh file to be set for the right OS
  * Change line 10 in public/index.html to reflect the correct host url


## Running
In the FNMA_class_project directory, run:  
 `$ ./start_server.sh`  


## API
Networking with this app is recommended to be done using fetch through
RESTful calls. See below for examples and a routing list of implemented methods

##### Examples
```javascript
fetch( hosturl + '/list', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
  }
}).then(response => response.json()).then((responseJson) => {
```
For a POST request with a body
```javascript
var data_json = JSON.stringify(data)

fetch( hosturl + '/house', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: data_json
}).then(response => {
  location.reload();
})
```
Both examples are taken from FNMA_class_project/public/index.html

### Adding an Appraisal
It is a POST request using the route `/house`. The body given in the request
should be in JSON of the format:  
```JSON
{
  "address": "<Content>",
  "city": "<Content>",
  "state": "<Content>",
  "zip": "<Content>",
  "borrow": "<Content>",
  "owner_of_record": "<Content>",
  "county": "<Content>"
}
```

### Getting a list of all Appraisals
It is a GET request using the route `/list`. The returned body should be in JSON
of the format (Note: for example purposes, the id field has the value -1, but should
never be less than 1 when running this application):  
```JSON
[
  {
    "id": -1,
    "address": "<Content>",
    "city": "<Content>",
    "state": "<Content>",
    "zip": "<Content>",
    "borrow": "<Content>",
    "owner_of_record": "<Content>",
    "county": "<Content>"
  }
]
```

### Updating an Appraisal
It is a POST request using the route `/house/update`. The id is used to identify
which appraisal is to be updated. The body given in the request should be in JSON
of the format (Note: for example purposes, the id field has the value -1, but
should never be less than 1 when running this application):  
```JSON
{
  "id": -1,
  "address": "<Content>",
  "city": "<Content>",
  "state": "<Content>",
  "zip": "<Content>",
  "borrow": "<Content>",
  "owner_of_record": "<Content>",
  "county": "<Content>"
}
```

### Deleting an Appraisal
It is a DELETE request using the route `/house/delete`. The id is used to identify
which appraisal is to be deleted. The body given in the request should be in JSON
of the format (Note: for example purposes, the id field has the value -1, but
should never be less than 1 when running this application):  
```JSON
{
  "id": -1,
}
```

### Searching For an Appraisal

#### Searching by ID
It is a GET request using the route `/list/quert/byID/` with a URL query string.
The id is used to identify which appraisal is to be found. (Note: for example purposes, the id field has the value -1, but should never be less than 1 when running this application):  
`?id=-1`
