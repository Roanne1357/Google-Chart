'use strict'
// 날씨 데이터
var feels_like = [];
var temp_max = [];
var weatherDate = [];

$.ajax({
  url: 'http://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=02c9e65f81988386ebf7ebf7b5557d2c&units=metric&lang=kr',
  async: false,
  dataType: 'json',
  success: function (json) {
    for (var index = 0; index < json.list.length; index++) {
      temp_max.push(parseFloat(json.list[index].main.temp_max));
    }
    for (var index = 0; index < json.list.length; index++) {
      feels_like.push(parseFloat(json.list[index].main.feels_like));
    }
    for (var index = 0; index < json.list.length; index++) {
      weatherDate.push(json.list[index].dt_txt);
    }
    weatherDate = weatherDate.toString().replaceAll(':00:00', ':00').replaceAll(/\d\d\d\d-/gm, '').split(',');
  }
});
////////////// 차트 /////////////////
google.charts.load('current', {'packages':['corechart']});
google.setOnLoadCallback(drawChart1); 
function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['월-일 시', '체감 온도 (℃)', '최고 온도 (℃)'],
    [weatherDate[3],  feels_like[3],      temp_max[3]],
    [weatherDate[4],  feels_like[4],      temp_max[4]],
    [weatherDate[5],  feels_like[5],      temp_max[5]],
    [weatherDate[6],  feels_like[6],      temp_max[6]],
    [weatherDate[7],  feels_like[7],      temp_max[7]]
]);
// options = https://developers.google.com/chart/interactive/docs/gallery/linechart#configuration-options
 var options = {
  title: '날씨',
  curveType: 'function',
  fontSize: 9,
  titleTextStyle: {fontSize: 25},
  hAxis: {title: '시간', titleTextStyle: {color: 'black', fontSize: 15, italic: false}},
  vAxis: {title: "℃", titleTextStyle: {color: 'black'}},
};

 var chart = new google.visualization.LineChart(document.getElementById('chart_div1'));
  chart.draw(data, options);
}

window.addEventListener('resize', function(){
    drawChart1();
});