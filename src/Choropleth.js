d3.csv('https://raw.githubusercontent.com/erichen96/Test/main/data.csv', function(err, rows){
                function unpack(rows, key) {
return rows.map(function(row) { return row[key]; });
}
var data = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: unpack(rows, 'Postal'),
    z: unpack(rows, 'Population'),
    text: unpack(rows, 'State'),
    autocolorscale: true
}];

var layout = {
title: 'Covid 19 Cases by State',
    geo:{
        scope: 'usa',
        countrycolor: 'rgb(255, 255, 255)',
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        showlakes: true,
        lakecolor: 'rgb(255, 255, 255)',
        subunitcolor: 'rgb(255, 255, 255)',
        lonaxis: {},
        lataxis: {}
    }
};
Plotly.newPlot("myDiv", data, layout, {showLink: false});
});
