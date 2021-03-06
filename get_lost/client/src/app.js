var CityTools = require('./city_tools/city_tools');
var CityView = require('./views/city_view');
var ImageView = require('./views/image_view');
var MapView = require('./views/map_view');
var ListView = require('./views/lists_view');


window.onload = function(){
  
  var city1 = new CityTools();
  var imageView = new ImageView();
  var mapDiv = document.getElementById('main-map');
  var mapView;

  var city;
  var cityView = new CityView();
  var cityUrl = "https://restcountries.eu/rest/v1/all"; 
  var listView = new ListView();

  var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  };

  var fetchResults = function(results){
    listView.places = results;
  }

  var cityComplete = function(){
    if(this.status !==200) return;
    var jsonString = JSON.parse(this.responseText);
    var countries = jsonString;
    
    var cityDisplayButton = document.getElementById('city-button');
      cityDisplayButton.onclick = function(){
      document.getElementById('city-title').scrollIntoView();
      changeCity();   
      hide();
      showDiv();

      var mapDisplayButton = document.getElementById('map-button');
      mapDisplayButton.onclick = function(){
        mapView.initMap();
      }

      var placesButton = document.getElementById('places-button')
      placesButton.onclick = function(){
        mapView.getPlaces(fetchResults); 
      }

      var tryAgain = document.getElementById('try-again');
      tryAgain.onclick = changeCity;
      };
  
    var changeCity = function(){
      city = city1.getRandomCity(countries);
      cityView.city = city;
      cityView.render(city); 
      mapView = new MapView(mapDiv, city, 6);
    };

    var hide = function() {
      var div = document.getElementById('city-button');
      div.style.display = 'none';
    }; 

    var showDiv = function() {
      var containerDiv = document.getElementById('container')
      containerDiv.style.display = "block";
    };
  }  
  makeRequest(cityUrl, cityComplete);
}
