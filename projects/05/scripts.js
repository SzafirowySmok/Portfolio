$(document).ready(function() {
    var url = 'https://restcountries.eu/rest/v2/name/';
    var countriesList = $('#countries');
    var countriesCapital = $('#capital');
    var countriesArea = $('#area');
    var countriesPopulation = $('#population');
    var countriesRegion = $('#region');
    $('#search').click(searchCountries);
    function searchCountries() {
        var countryName = $('#country-name').val();
        if(!countryName.length) {countryName = 'Poland'};
        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: showCountriesList
        });
        function showCountriesList(resp) {
            countriesList.empty();
            countriesCapital.empty();
            countriesArea.empty();
            countriesPopulation.empty();
            countriesRegion.empty();
            resp.forEach(function(item) {
                $('<h2>').text(item.name).appendTo(countriesList);
                $('<p>').text(item.capital).appendTo(countriesCapital);
                $('<p>').text(item.area).appendTo(countriesArea);
                $('<p>').text(item.population).appendTo(countriesPopulation);
                $('<p>').text(item.region).appendTo(countriesRegion);
            });
        }
    }
});

