const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = $('#countries');

$('#search').click(searchCountries);

$('#country-name').keypress(function (e) {
  if (e.keyCode == 13) {
    searchCountries()
  }
});


function searchCountries() {
 let countryName = $('#country-name').val();
if(!countryName.length) countryName = 'Poland';
$.ajax({
     url: url + countryName,
     method: 'GET',
     success: showCountries,
     error: showErrorMessage
   });
  
}

function showCountries(resp) {
  countriesList.empty();
  resp.forEach(function(item) {
    const $country = $('<div>').addClass('country');
    const $countryIntro = $('<div>').addClass('country-intro');
    const $countryInfo = $('<div>').addClass('country-info').append($('<h4>').text('Background info:'));

    const $countryFlag = $("<img class='map' src='" + item.flag + "'/>");
    const $countryName = $('<h2>').text(item.name);

    const $countryNativeName = $('<p>').text('Native name: ' + item.nativeName);
    const $countryCapital = $('<p>').text('Capital: ' + item.capital);
    const $countryPopulation = $('<p>').text('Population: ' + item.population);

    let $countryLanguagesArr = [];
    item.languages.forEach(function (value) {
      $countryLanguagesArr.push(value.name)
    })

    const $countryLanguages = $('<p>').text('Language(s): ' + $countryLanguagesArr.join(', '));
    
    $countryIntro.append($countryFlag);
    $countryIntro.append($countryName);
    $country.append($countryIntro); 
    $countryInfo.append($countryNativeName);
    $countryInfo.append($countryCapital);
    $countryInfo.append($countryPopulation);
    $countryInfo.append($countryLanguages);
    $country.append($countryInfo);    
    countriesList.append($country);
  });
}

function showErrorMessage() {
  countriesList.empty();
  const $error = $('<div>').addClass('error').text('TRY AGAIN!! ;)');
  countriesList.append($error);
}