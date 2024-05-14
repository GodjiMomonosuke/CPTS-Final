let chartConfig = {
    type: 'radar',
    plot: {
      aspect: 'area',
      animation: {
        effect: 3,
        sequence: 1,
        speed: 700,
      },
    },
    scaleV: {
      visible: false,
    },
    scaleK: {
      values: '0:5:1',
      labels: ['Dogs', 'Cats', 'Fish', 'Birds', 'Reptiles', 'Horses'],
      guide: {
        alpha: 0.3,
        backgroundColor: '#c5c5c5 #718eb4',
        lineColor: '#607D8B',
        lineStyle: 'solid',
      },
      item: {
        backgroundColor: 'white',
        borderColor: '#aeaeae',
        borderRadius: '10px',
        borderWidth: '1px',
        fontColor: '#607D8B',
        padding: '5 10',
      },
      refLine: {
        lineColor: '#c10000',
      },
      tick: {
        lineColor: '#59869c',
        lineWidth: '2px',
        lineStyle: 'dotted',
        size: 20,
      },
    },
    series: [{
        values: [59, 39, 38, 19, 21, 35],
        text: 'farm',
      },
      {
        values: [20, 20, 54, 41, 41, 35],
        backgroundColor: '#689F38',
        lineColor: '#53a534',
      },
    ],
  };
   
  zingchart.render({
    id: 'myChart',
    data: chartConfig,
    height: '100px',
    width: '100px',
  });