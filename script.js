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
  if(!countryName.length) {
    countryName = 'Poland';
  } 
  $.ajax({
     url: url + countryName,
     method: 'GET',
     success: function(data)
     {
      const filteredResp = data.filter(function (el) {
        const regex = new RegExp('^' + countryName, 'gi')
        return regex.test(el.name);
      })
      showCountries(filteredResp)
     },
     error: showErrorMessage
  });
  
}

function showCountries(filteredResp) {
  countriesList.empty();
  filteredResp.forEach(function(item) {
    const $country = $('<div>').addClass('country');
    const $countryIntro = $('<div>').addClass('country-intro');
    const $countryInfo = $('<div>').addClass('country-info').append($('<h4>').text('Background info:'));

    const $countryFlag = $("<img class='map' src='" + item.flag + "'/>");
    const $countryName = $('<h2>').text(item.name);

    const $countryNativeName = $('<p>').text('Native name: ' + item.nativeName);
    const $countryCapital = $('<p>').text('Capital: ' + item.capital);
    const $countryPopulation = $('<p>').text('Population: ' + item.population);

    const $countryLanguagesArr = [];
    item.languages.map(function (value, index) {
      $countryLanguagesArr[index] = value.name;
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