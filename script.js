var nameOfTimeZone = document.getElementById('notz');
var lat = document.getElementById('lat');
var lon = document.getElementById('lon');
var offsetSTD = document.getElementById('offsetSTD');
var offsetSTDSeconds = document.getElementById('offsetSTDSeconds');
var offsetDST = document.getElementById('offsetDST');
var offsetDSTSeconds = document.getElementById('offsetDSTSeconds');
var country = document.getElementById('country');
var postcode = document.getElementById('postcode');
var city = document.getElementById('city');

var requestOptions = {
    method: 'GET',
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
getLocation();  
function showPosition(position) {
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=3d458842861a451b81bf0b62298f5b4e`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.features[0].properties)
    let data = result.features[0].properties;

    nameOfTimeZone.innerHTML = "Name of Time Zone: " + data.timezone.name;
    lat.innerHTML = "Lat: " + data.lat;
    lon.innerHTML = "Long: " + data.lon;
    offsetSTD.innerHTML = "Offset STD: " + data.timezone.offset_STD;
    offsetSTDSeconds.innerHTML = "Offset STD Seconds: " + data.timezone.offset_STD_seconds;
    offsetDST.innerHTML = "Offset DST: " + data.timezone.offset_DST;
    offsetDSTSeconds.innerHTML = "Offset DST Seconds: " + data.timezone.offset_DST_seconds;
    country.innerHTML = "Country: " + data.country;
    postcode.innerHTML = "Postcode: " + data.postcode;
    city.innerHTML = "City: " + data.city;
  })
  .catch(error => console.log('error', error));
}

function getUserInput() {
  var text = document.getElementById('userInput').value;
  console.log(text);
  showAddress(text);
}

function showAddress(address) {
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=3d458842861a451b81bf0b62298f5b4e`)
  .then(resp => resp.json())
  .then((geocodingResult) => {
  	console.log(geocodingResult.features[0].properties);
    var data = geocodingResult.features[0].properties;


    var noti = document.getElementById('noti');
    noti.remove();

    var visi = document.getElementById('your-result');
    visi.style.visibility = 'visible';

    var outerDiv = document.getElementsByClassName('sample');

    var d = document.getElementsByClassName('time-zone-info');
    console.log(d);
    d[0].classList.add('time-zone-info-updated');

    var pTagNotz = document.createElement('p');
    var pText = document.createTextNode("Name of Time Zone: " + data.timezone.name);
    pTagNotz.appendChild(pText);
    outerDiv[0].append(pTagNotz);

    var pTagLat = document.createElement('p');
    pTagLat.classList.add('float-child');
    var pText = document.createTextNode("Lat: " + data.lat);
    pTagLat.appendChild(pText);
    outerDiv[0].append(pTagLat);

    var pTag = document.createElement('p');
    pTag.classList.add('float-child');
    var pText = document.createTextNode("Long: " + data.lon);
    pTag.appendChild(pText);
    outerDiv[0].append(pTag);

    var pTagOffsetSTD = document.createElement('p');
    var pText = document.createTextNode("Offset STD: " + data.timezone.offset_STD);
    pTagOffsetSTD.appendChild(pText);
    outerDiv[0].append(pTagOffsetSTD);

    var pTagOffsetSTDSeconds = document.createElement('p');
    var pText = document.createTextNode("Offset STD Seconds: " + data.timezone.offset_STD_seconds);
    pTagOffsetSTDSeconds.appendChild(pText);
    outerDiv[0].append(pTagOffsetSTDSeconds);

    var pTagOffsetDST = document.createElement('p');
    var pText = document.createTextNode("Offset DST: " + data.timezone.offset_DST);
    pTagOffsetDST.appendChild(pText);
    outerDiv[0].append(pTagOffsetDST);

    var pTagOffsetDSTSeconds = document.createElement('p');
    var pText = document.createTextNode("Offset DST Seconds: " + data.timezone.offset_DST_seconds);
    pTagOffsetDSTSeconds.appendChild(pText);
    outerDiv[0].append(pTagOffsetDSTSeconds);

    var pTagCountry = document.createElement('p');
    var pText = document.createTextNode("Country: " + data.country);
    pTagCountry.appendChild(pText);
    outerDiv[0].append(pTagCountry);

    var pTagPostcode = document.createElement('p');
    var pText = document.createTextNode("Postcode: " + data.postcode);
    pTagPostcode.appendChild(pText);
    outerDiv[0].append(pTagPostcode);

    var pTagCity = document.createElement('p');
    var pText = document.createTextNode("City: " + data.city);
    pTagCity.appendChild(pText);
    outerDiv[0].append(pTagCity);
  });
}