
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  document.getElementById('colorSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {color:null};
    payload.color = document.getElementById('colorInput').value;
    console.log(payload);
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        document.getElementById("postResponse").textContent = response.data;
        document.getElementById("url").textContent = "URL: " + response.url;
        document.getElementById("origin").textContent =  "Origin: " + response.origin;
      } 
      else {
            console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}
