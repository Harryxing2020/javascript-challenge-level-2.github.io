// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var table = d3.select("table");
tbody.style("text-align", "center")
/////////////////////////////////////////////////////////////////////
//Display tables
function displayData(showData) {
    // clear data 
    tbody.html("");
    // cannot find any data 
    if (showData.length == 0) {
        d3.select("tbody")
            .append("tr")
            .append("td")
            .attr("colspan", 7)
            .html("<h5>Sorry, no records found</h5>");
    } else {
        // show the data from json data
        showData.forEach(function (ufodata) {
            var row = tbody.append("tr")
            Object.entries(ufodata).forEach(function ([key, value]) {
                var cell = row.append("td")
                cell.text(value)
            })
        })

    }

}

/////////////////////////////////////////////////////////////////////
// show all ufo data in dataset
/////////////////////////////////////////////////////////////////////
displayData(tableData)

/////////////////////////////////////////////////////////////////////
//show search ufo data in dataset
/////////////////////////////////////////////////////////////////////

var buttonFilter = d3.select("#filter-btn-filter");
var buttonShowAll = d3.select("#filter-btn-all-data");

var inputFielddatetime = document.getElementById("datetime");
var inputFieldcityname = document.getElementById("cityname");
var inputFieldstatename = document.getElementById("statename");
var inputFieldcountryname = document.getElementById("countryname");
var inputFieldshapename = document.getElementById("shapename");

// Create event handlers 
buttonFilter.on("click", runEnterFilter);

buttonShowAll.on("click", showAllData);

// show all ufo data in dataset
function showAllData() {
    displayData(tableData)

    // clear all field input.
    inputFielddatetime.value=""
    inputFieldcityname.value=""
    inputFieldstatename.value=""
    inputFieldcountryname.value=""
    inputFieldshapename.value=""
}


// Complete the event handler function for the form
function runEnterFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElementdatetime = d3.select("#datetime");
    // Get the value property of the input element
    var inputElementdatetimeValue = inputElementdatetime.property("value");

    var inputElementcityname = d3.select("#cityname");
    // Get the value property of the input element
    var inputElementcitynameValue = inputElementcityname.property("value");

    var inputElementstatename = d3.select("#statename");
    // Get the value property of the input element
    var inputElementstatenameValue = inputElementstatename.property("value");

    var inputElementcountryname = d3.select("#countryname");
    // Get the value property of the input element
    var inputElementcountrynameValue = inputElementcountryname.property("value");

    var inputElementshape = d3.select("#shapename");
    // Get the value property of the input element
    var inputElementshapeValue = inputElementshape.property("value");

    // initial data for display
    var filteredDatas = []
    // if all input field empty
    if (inputElementdatetimeValue === "" && inputElementcitynameValue === ""
        && inputElementstatenameValue === "" && inputElementcountrynameValue === ""
        && inputElementshapeValue === "") {
        // all input field empty, show empty data list
        filteredDatas = []
    } else {

        filteredDatas= tableData
        // if field not empty 
        if (inputElementdatetimeValue != "") {
            filteredDatas = filteredDatas.filter(ufodata => ufodata.datetime === inputElementdatetimeValue);

        }
        // if field not empty and data not empty in previous filter
        if (inputElementcitynameValue != "" && filteredDatas.length != 0) {
            filteredDatas = filteredDatas.filter(ufodata => ufodata.city === inputElementcitynameValue.toLowerCase());
        }

        // if field not empty and data not empty in previous filter
        if (inputElementstatenameValue != "" && filteredDatas.length != 0) {
            console.log(inputElementstatenameValue)
            filteredDatas = filteredDatas.filter(ufodata => ufodata.state === inputElementstatenameValue.toLowerCase());
            console.log(filteredDatas)

        }

        // if field not empty and data not empty in previous filter
        if (inputElementcountrynameValue != "" && filteredDatas.length != 0) {
            filteredDatas = filteredDatas.filter(ufodata => ufodata.country === inputElementcountrynameValue.toLowerCase());
        }

        // if field not empty and data not empty in previous filter
        if (inputElementshapeValue != "" && filteredDatas.length != 0) {
            filteredDatas = filteredDatas.filter(ufodata => ufodata.shape === inputElementshapeValue);
        }


    }

    // show data 
    displayData(filteredDatas)
};

