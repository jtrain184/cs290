
      var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

      document.addEventListener('DOMContentLoaded', bindButtons);

      function bindButtons(){
        document.getElementById('zipSubmit').addEventListener('click', function(event){
          var req = new XMLHttpRequest();
          var zipCode = document.getElementById('zipInput').value;
          var queryString = "";
          if (isNaN(zipCode)) {
            queryString = "&q=" + zipCode;
          }
          else {
            queryString = "&zip=" + zipCode;
          }
          console.log('http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + apiKey + queryString);
          req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + apiKey + queryString, true);
          req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
              var weatherData = JSON.parse(req.responseText);
              document.getElementById("zipOutput").textContent = zipCode;
              document.getElementById("weatherInfo").textContent = "City: " + weatherData.name + " " +
                                                                   "Temp: " + weatherData.main.temp + "F " +
                                                                   "Humidity: " + weatherData.main.humidity;
            } 
            else {
                  console.log("Error in network request: " + req.statusText);
            }
          });
          req.send(null);
          event.preventDefault();
        })
      }
