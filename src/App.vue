<template>

  <div class="container">
    <header class = "text-center bg-blue-800 text-black p-4 mb-10">
    <Header />
    </header>
    <main v-if= "!loading">
    <DataTitle :text = "title" :dataDate = "dataDate" />
    <DataBoxes :stats = "stats"/>
    <CountrySelect @get-country="getCountryData" :countries="countries" />

    <button @click="clearCountryData"
    v-if = "stats.Country"
    class="bg-green-700 text-white rounded p-3 mt-10 focus:outline-none hover:bg-green-600">
      Clear Country
    </button>
  </main>
<main class = "flex flex-col align-center justify-center text-center" v-else>
  <div class = "text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
  <img :src = "loadingImage" class = "w-24 m-auto" alt = "" />
  </main>


    <!-- Chartjs below -->
    <div class="row mt-5">
      <div class="col">
        <h1 class="text-center">COVID-19 DATA</h1>
      </div>
    </div>
    <div class="row mt-5" v-if="arrPositive.length > 0">
      <div class="col">
        <h2 class="text-center">Positive</h2>
        <line-chart
          :chartData="arrPositive"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Positive"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrHospitalized.length > 0">
      <div class="col">
        <h2 class="text-center">Hospitalized</h2>
        <line-chart
          :chartData="arrHospitalized"
          :options="chartOptions"
          :chartColors="hospitalizedChartColors"
          label="Hospitalized"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrInIcu.length > 0">
      <div class="col">
        <h2 class="text-center">In ICU</h2>
        <line-chart
          :chartData="arrInIcu"
          :options="chartOptions"
          :chartColors="inIcuColors"
          label="In ICU"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrOnVentilators.length > 0">
      <div class="col">
        <h2 class="text-center">On Ventilators</h2>
        <line-chart
          :chartData="arrOnVentilators"
          :options="chartOptions"
          :chartColors="onVentilatorsColors"
          label="On Ventilators"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrTotalTestResults.length > 0">
      <div class="col">
        <h2 class="text-center">Total Test Results</h2>
        <line-chart
          :chartData="arrTotalTestResults"
          :options="chartOptions"
          :chartColors="totalTestResultsColors"
          label="TotalTestResults"
        />
      </div>
    </div>

    <div class="row mt-5 mb-5">
      <div class="col">
        <h2 class="text-center">Deaths</h2>
        <line-chart
          v-if="arrDeaths.length > 0"
          :chartData="arrDeaths"
          :options="chartOptions"
          :chartColors="deathColors"
          label="Deaths"
        />
      </div>
    </div>
  </div>
</template>
<script src='https://cdn.plot.ly/plotly-2.6.3.min.js'></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'></script>
<script>
import axios from "axios";
import moment from "moment";

import LineChart from "./components/LineChart";
import Header from '@/components/Header'


import DataTitle from '@/components/DataTitle'
import DataBoxes from '@/components/DataBoxes'
import CountrySelect from '@/components/CountrySelect'

export default {
  components: {
    LineChart,
    Header,
    DataTitle,
    DataBoxes,
    CountrySelect,
  },
  data() {
    return {
      arrPositive: [],
      positiveChartColors: {
        borderColor: "#077187",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "#74A57F"
      },
      arrHospitalized: [],
      hospitalizedChartColors: {
        borderColor: "#251F47",
        pointBorderColor: "#260F26",
        pointBackgroundColor: "#858EAB",
        backgroundColor: "#858EAB"
      },
      arrInIcu: [],
      inIcuColors: {
        borderColor: "#190B28",
        pointBorderColor: "#190B28",
        pointBackgroundColor: "#E55381",
        backgroundColor: "#E55381"
      },
      arrOnVentilators: [],
      onVentilatorsColors: {
        borderColor: "#784F41",
        pointBorderColor: "#784F41",
        pointBackgroundColor: "#BBE5ED",
        backgroundColor: "#BBE5ED"
      },
      arrTotalTestResults: [],
      totalTestResultsColors: {
        borderColor: "#4E5E66",
        pointBorderColor: "#4E5E66",
        pointBackgroundColor: "#31E981",
        backgroundColor: "#31E981"
      },
      arrDeaths: [],
      deathColors: {
        borderColor: "#E06D06",
        pointBorderColor: "#E06D06",
        pointBackgroundColor: "#402A2C",
        backgroundColor: "#402A2C"
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      loading: true,
      title: 'Global',
      dataDate: '',
      stats: {},
      countries: [],
      loadingImage: require('./assets/logo.png')
    };
  },
  async created() {
    const { data } = await axios.get("https://covidtracking.com/api/us/daily");
    console.log(data)

    data.forEach(d => {
      const date = moment(d.date, "YYYYMMDD").format("MM/DD");
      const {
        positive,
        hospitalizedCurrently,
        inIcuCurrently,
        onVentilatorCurrently,
        totalTestResults,
        death
      } = d;

      this.arrPositive.push({ date, total: positive });
      this.arrHospitalized.push({ date, total: hospitalizedCurrently });
      this.arrInIcu.push({ date, total: inIcuCurrently });
      this.arrOnVentilators.push({ date, total: onVentilatorCurrently });
      this.arrTotalTestResults.push({ date, total: totalTestResults });
      this.arrDeaths.push({ date, total: death });
    });


    const data2 = await this.fetchCovidData()
    console.log(data2)
    this.dataDate = data2.Date
    this.stats = data2.Global
    this.countries = data2.Countries
    this.loading = false
  },
  methods:{
    async fetchCovidData(){
      const res = await fetch('https://api.covid19api.com/summary')
      const data = await res.json()
      return data
    },
    getCountryData(country){
      this.stats = country
      this.title = country.Country
    },
    async clearCountryData(){
      this.loading = true
      const data = await this.fetchCovidData()
      this.title = 'Global'
      this.stats = data.Global
      this.loading = false
    }
  },
};


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
title: 'Covid 19 Cases in Past Seven Days by State',
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
</script>



<style>
header
{
    background-color:#D1DEDE;
}
</style>
