<template lang="html">
  <div id="ivu-watch-chart" style="width: 100%; height: 400px"/>
</template>

<script>
// import AmCharts from 'amcharts3'
// import AmSerial from 'amcharts3/amcharts/serial'

export default {
  created () {
    // const AmCharts = require('amcharts3')
    AmCharts.makeChart('ivu-watch-chart', {
      type: 'serial',
      theme: 'light',
      autoMarginOffset: 20,
      mouseWheelZoomEnabled: true,
      dataDateFormat: 'YYYY-MM-DD',
      valueAxes: [{
        id: 'v1',
        axisAlpha: 0,
        position: 'left',
        ignoreAxisWidth: true
      }],
      balloon: {
        borderThickness: 1,
        shadowAlpha: 0
      },
      graphs: [{
        id: 'g1',
        balloon: {
          drop: true,
          adjustBorderColor: false,
          color: '#ffffff'
        },
        bullet: 'round',
        bulletBorderAlpha: 1,
        bulletColor: '#FFFFFF',
        bulletSize: 5,
        hideBulletsCount: 50,
        lineThickness: 2,
        title: 'red line',
        useLineColorForBulletBorder: true,
        valueField: 'value',
        balloonText: '<span style="font-size: 18px">[[value]]</span>'
      }],
      chartScrollbar: {
        graph: 'g1',
        oppositeAxis: false,
        offset: 30,
        scrollbarHeight: 80,
        backgroundAlpha: 0,
        selectedBackgroundAlpha: 0.1,
        selectedBackgroundColor: '#888888',
        graphFillAlpha: 0,
        graphLineAlpha: 0.5,
        selectedGraphFillAlpha: 0,
        selectedGraphLineAlpha: 1,
        autoGridCount: true,
        color: '#AAAAAA'
      },
      chartCursor: {
        pan: true,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        cursorAlpha: 1,
        cursorColor: '#258cbb',
        limitToGraph: 'g1',
        valueLineAlpha: 0.2,
        valueZoomable: true
      },
      valueScrollbar: {
        oppositeAxis: false,
        offset: 50,
        scrollbarHeight: 10
      },
      categoryField: 'date',
      categoryAxis: {
        parseDates: true,
        dashLength: 1,
        minorGridEnabled: true
      },
      // export: {
      //   enabled: true
      // },
      dataProvider: [
      {date: '2013-01-01', value: 60},
      {date: '2013-01-02', value: 67},
      {date: '2013-01-03', value: 64},
      {date: '2013-01-04', value: 66},
      {date: '2013-01-05', value: 60},
      {date: '2013-01-06', value: 63},
      {date: '2013-01-07', value: 61},
      {date: '2013-01-08', value: 60},
      {date: '2013-01-09', value: 65},
      {date: '2013-01-10', value: 75},
      {date: '2013-01-11', value: 77},
      {date: '2013-01-12', value: 78},
      {date: '2013-01-13', value: 70},
      {date: '2013-01-14', value: 70},
      {date: '2013-01-15', value: 73},
      {date: '2013-01-16', value: 71},
      {date: '2013-01-17', value: 74},
      {date: '2013-01-18', value: 78},
      {date: '2013-01-19', value: 85},
      {date: '2013-01-20', value: 82},
      {date: '2013-01-21', value: 83},
      {date: '2013-01-22', value: 88},
      {date: '2013-01-23', value: 85},
      {date: '2013-01-24', value: 85},
      {date: '2013-01-25', value: 80},
      {date: '2013-01-26', value: 87},
      {date: '2013-01-27', value: 84},
      {date: '2013-01-28', value: 83},
      {date: '2013-01-29', value: 84},
      {date: '2013-01-30', value: 81}
      ]
    })
  }
}
</script>
