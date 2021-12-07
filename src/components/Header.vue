<template>
  <header class = "text-center bg-blue-800 text-black p-4 mb-10">
    <div class = "text-3xl md:text-5xl font-bold mb-3"><i class = "fa fa-head-side-mask"></i> Tracker <i class = "fa fa-virus"></i></div>

    <p>Global Data: API by <a class = "text-blue-300" href = "https://covid19api.com/" target = "_blank">covid19api.com</a></p>
    <p>US Daily Specific Data: API by <a class = "text-blue-300" href = "https://covidtracking.com/api/us/daily" target = "_blank">https://covidtracking.com/api/us/daily</a></p>
    <p>Refresh Browser or use a different Browser if there is a CORS error. Issue with one of the APIs. </p>
    <p>Chloropleth Graph created using Plotly.</p>
  </header>
</template>

<script>
export default {
  name: 'Header',

}
</script>