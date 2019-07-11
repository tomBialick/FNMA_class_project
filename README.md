# FNMA_class_project
This is the Team Clippy solution to the class project  
Members:  
  * Thomas Bialick  
  * Shannon Darroch  
  * Antonio Sierra
  * Max Zilvitis

## Before you run
Make sure you have set up everything  
  * Such as postgresql (database, user, user roles, and table)
  * Run npm install (to verify all dependencies are installed)  
  * config.json values are not default (host_info, database)  
  * change the start_server.sh file to be set for the right OS


## Running
In the FNMA_class_project directory, run:  
 `$ ./start_server.sh`  


### API
Networking with this app is recommended to be done using fetch through
RESTful calls. See below for examples and a routing list of implemented methods

##### Example
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

#### Adding an Appraisal
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

#### Getting a list of all Appraisals
It is a GET request using the route `/list`. The returned body should be in JSON
of the format:  
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
