let queryUrl = 'https://jsonplaceholder.typicode.com/posts';

$.ajax ({
    url: queryUrl,
    method: 'GET'
}).then(function(response){
    console.log(response);
});