const chartCollection = {
    pie3d: function (id, data) {
        var each = Highcharts.each,
            round = Math.round,
            cos = Math.cos,
            sin = Math.sin,
            deg2rad = Math.deg2rad;
        Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'translate', function (proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return;
            }
            var series = this,
                chart = series.chart,
                options = chart.options,
                seriesOptions = series.options,
                depth = seriesOptions.depth || 0,
                options3d = options.chart.options3d,
                alpha = options3d.alpha,
                beta = options3d.beta,
                z = seriesOptions.stacking ? (seriesOptions.stack || 0) * depth : series._i * depth;
            z += depth / 2;
            if (seriesOptions.grouping !== false) {
                z = 0;
            }
            each(series.data, function (point) {
                var shapeArgs = point.shapeArgs,
                    angle;
                point.shapeType = 'arc3d';
                var ran = point.options.h;
                shapeArgs.z = z;
                shapeArgs.depth = depth * 0.75 + ran;
                shapeArgs.alpha = alpha;
                shapeArgs.beta = beta;
                shapeArgs.center = series.center;
                shapeArgs.ran = ran;
                angle = (shapeArgs.end + shapeArgs.start) / 2;
                point.slicedTranslation = {
                    translateX: round(cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
                    translateY: round(sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad))
                };
            });
        });

        (function (H) {
            H.wrap(Highcharts.SVGRenderer.prototype, 'arc3dPath', function (proceed) {
                // Run original proceed method
                var ret = proceed.apply(this, [].slice.call(arguments, 1));
                ret.zTop = (ret.zOut + 0.5) / 100;
                return ret;
            });
        }(Highcharts));

        Highcharts.getOptions().colors = ['#ff5ca1', '#ac4ed3', '#ffb68b', '#70fef1', '#019aff']
        var chart = Highcharts.chart(id, {
            colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: { cx: 0.3, cy: 0.3, r: 1 },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            }),
            chart: {
                type: 'pie',
                animation: true,
                marginLeft: -120,
                events: {
                    load: function () {
                        var each = Highcharts.each,
                            points = this.series[0].points;
                        each(points, function (p, i) {
                            p.graphic.attr({
                                translateY: -p.shapeArgs.ran
                            });
                            p.graphic.side1.attr({
                                translateY: -p.shapeArgs.ran
                            });
                            p.graphic.side2.attr({
                                translateY: -p.shapeArgs.ran
                            });
                        });
                    }
                },
                options3d: {
                    enabled: true,
                    alpha: 55,
                    beta: 0
                },
                backgroundColor: 'transparent'
            },
            legend: {
                layout: 'vertical',
                symbolRadius: 0,
                symbolHeight: 10,
                floating: true,
                align: 'right',
                x: -10,
                y: -40,
                itemHoverStyle: {
                    color: '#fff'
                },
                itemMarginBottom: 5,
                labelFormatter: function () {
                    return '<span class="label-formatter">' + this.name + '</span> ' + this.value;
                },
                itemStyle: {
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    lineHeight: '33px',
                    letterSpacing: '0px',
                    color: '#00deff',
                }
            },
            labels: {
                style: {
                    color: '#fff',
                }
            },
            plotOptions: {
                pie: {
                    innerSize: '70%',
                    depth: 20,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}:{point.percentage:.0f}%',
                        style: {
                            color: '#ffffff',
                            fontSize: 14,
                            fontFamily: 'MicrosoftYaHei',
                            fontWeight: 'normal',
                        },
                        connectorWidth: 1,
                        connectorPadding: -35,
                    },
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    },
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                showInLegend: true,
                data: data
            }],
            title: {
                text: '单位：辆',
                align: 'left',
                style: {
                    color: '#ffffff',
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    letterSpacing: '0px',
                    opacity: 0.68,
                },

            },
            tooltip: {
                enabled: false
            }

        });
        window.addEventListener("resize", function () {
            chart.reflow();
        })
    },
    barChart1: function (id, data, key) {
        var colors = [
            {
                startColor: '#78baf5',
                endColor: '#188df0',
            },
            {
                startColor: '#f5a773',
                endColor: '#ffe785',
            },
            {
                startColor: '#ff9a45',
                endColor: '#fb613c',
            },
            {
                startColor: '#98d399',
                endColor: '#91cc75',
            },
        ]
        var name = []
        var value = []
        data.map(function (res) {
            name.push(res.title)
            value.push(res.value)
        })
        var myChart = echarts.init(document.getElementById(id));
        option = {
            grid: {
                top: '40',
                bottom: '20%',
                // left:'0',
                // right:'0',
            },
            tooltip: {
                show: true,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderWidth: 0,
                formatter: '{c}辆',
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: {
                data: name,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#eeebe9',
                        opacity: 0.4,
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                    width: 45,
                    overflow: 'break',
                    interval: 0,
                }
            },
            yAxis: {
                name: "单位：辆",
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#eeebe9',
                        opacity: 0.4,
                    }
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68,
                },
                splitLine: {
                    show: false,
                },

            },
            series: [{
                type: 'bar',
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[key].startColor
                        }, {
                            offset: 1,
                            color: colors[key].endColor
                        }], false)
                    }
                },
                data: value
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    barChart2: function (id, data, key) {
        var setColor = [['#da9338', '#6369be'], ['#25a6bf', '#90a6ec']];
        var state = false;
        var stateBar = true
        if (key == 1) {
            state = true
            stateBar = false
        }
        var SerData = [],
            yAxisData = [],
            lengData = [];

        yAxisData = data[0].list.map(function (d, i) {
            return d.name;
        })
        data.forEach(function (d, i) {
            lengData.push(d.title);
            SerData.push({
                type: 'bar',
                stack: 'A',
                name: d.title,
                barWidth: '45%',
                itemStyle: {
                    borderRadius: i == 0 ? [5, 0, 0, 5] : [0, 5, 5, 0],
                },
                label: {
                    normal: {
                        show: stateBar,
                        position: 'inside',
                        formatter: '{c}',
                        textStyle: {
                            align: 'center',
                            fontSize: 12,
                            color: '#fff',
                        },
                    },
                },
                data: d.list.map(function (item, index) {
                    return item.value;
                }),
            });
        });
        var myChart = echarts.init(document.getElementById(id));
        option = {
            color: setColor[key],
            legend: {
                right: 80,
                top: 5,
                icon: 'roundRect',
                itemWidth: 13,
                itemHeight: 13,
                itemGap: 20,
                textStyle: {
                    fontSize: 12,
                    color: '#fff',
                },
                data: lengData,
            },
            grid: {
                left: '7%',
                top: '40',
                right: '10%',
                bottom: '10%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: true,
                },
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    show: state,
                    color: '#fff',
                    fontSize: '12px',
                    margin: 15,
                },
            },
            yAxis: {
                type: 'category',
                name: '单位：辆',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68,
                    align: 'right',
                },
                data: yAxisData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#696969',
                    },
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: true,
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#fff',
                },
            },
            series: SerData,
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    barChart3: function (id, data) {
        var colors = [
            {
                startColor: '#004c87',
                middleColor: '#0268b7',
                endColor: '#0383e7',
            },
            {
                startColor: '#00676e',
                middleColor: '#00868e',
                endColor: '#00a4ae',
            }
        ]
        var SerData = [],
            yAxisData = [],
            lengData = [];

        yAxisData = data[0].list.map(function (d, i) {
            return d.name;
        })
        data.forEach(function (d, i) {
            lengData.push(d.title);
            SerData.push({
                type: 'bar',
                name: d.title,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[i].startColor
                        },
                        {
                            offset: 0.5,
                            color: colors[i].middleColor
                        },
                        {
                            offset: 1,
                            color: colors[i].endColor
                        }
                        ], false)
                    }
                },
                label: {
                    show: false,
                },
                data: d.list.map(function (item, index) {
                    return item.value;
                }),
            });
        });
        var myChart = echarts.init(document.getElementById(id));
        option = {
            grid: {
                top: '40',
                bottom: '15%',
                left:'10%',
                right:'5%',
            },
            tooltip: {
                show: true,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderWidth: 0,
                formatter: '{c}辆',
                textStyle: {
                    color: '#fff'
                }
            },
            legend: {
                right: 30,
                top: 12,
                icon: 'roundRect',
                itemWidth: 13,
                itemHeight: 13,
                itemGap: 20,
                textStyle: {
                    fontSize: 12,
                    lineHeight: 20,
                    padding: [-10, 0, 0, 0],
                    color: '#fff',
                },
                data: lengData,
            },
            xAxis: {
                data: yAxisData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#eeebe9',
                        opacity: 0.4,
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#696969'
                    },

                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                    width: 45,
                    overflow: 'break',
                    interval: 0,
                }
            },
            yAxis: {
                name: "单位：辆",
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#eeebe9',
                        opacity: 0.4,
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#696969'
                    },

                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#696969',
                        opacity: 0.3
                    },
                    
                },

            },
            series: SerData
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    lineChart1: function (id, data, key) {
        var myChart = echarts.init(document.getElementById(id));
        var colors = [
            {
                startColor: '#11133a',
                endColor: '#11133a',
                lineColor: '#da9c44',
            },
            {
                startColor: '#061655',
                endColor: '#02063b',
                lineColor: '#273f95',
            },
        ]
        var name = []
        var value = []
        data.map(function (res) {
            name.push(res.time)
            value.push(res.value)
        })
        option = {
            grid: {
                top: '40',
                left: '60',
                right: '7%',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '1e244d'
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: 'SourceHanSansCN-Regular',
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: name,
            }],
            yAxis: [{
                type: 'value',
                name: "单位：辆",
                nameGap: 20,
                splitNumber: 3,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68,
                    align: 'right',
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    margin: 15,
                    color: '#fff',
                    opacity: 0.68,
                    fontSize: '14px',
                    fontFamily: 'SourceHanSansCN-Regular',
                },
            }],
            series: [{
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVQ4jW2T3S5DURCFv3P0UFWqEcS/V3DDtSue0ltw48KthETioi9AhKp/La3TU5ltTbOLSSb7dHdmzZqZtZODywGyRJ5Gp9tAXkRnsJJOCx7Tb/NMp4P0gRz4kvflg5KqWfI4UAYqwJS+S6poSR9AG+gAXQHnXqWkhBmgDszpe0IAn8Az8AA8KdnaKJxBpsqWvAKsAQu6M4A34E4s45aGDAygCswDG5s1drcW2J0tUy8GFDfvXJ/ecPTWC2BdtWGephGDSaAGLO4ssW/JYboJ6eo069tL7IlVTbGBfbyyTHOoVrJAfcSWq6GtacVkGnwAiM218MeS5P/7NBJGrmm3e316vwObbW61xq5ig6gcINeeX2zaF01OOl9hSMFaH9yf33JsOMCrYnMXkiFZxXeLtd03Whw2WpxJUIX+MwZX0kJH4go6cKXZ5aOKWiu2dxeSs7MCJiiLHWHgLQR5qldfVSxlY+JSHgJYgCnL2vB2DMBWFQ/ZH5L5cIj+GuNnagGuD1/d76f887yBb+qhm0ViVmlfAAAAAElFTkSuQmCC',
                symbolSize: 18,
                tooltip: {
                    show: false
                },
                lineStyle: {
                    normal: {
                        color: colors[key].lineColor,
                        width: 4,
                    },
                },
                label: {
                    show: true,
                    position: ['-35%', '-50%'],
                    formatter: '{c}辆',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        fontFamily: 'SourceHanSansCN-Regular',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[key].startColor,
                        },
                        {
                            offset: 1,
                            color: colors[key].endColor,
                        }
                        ], false),
                    }
                },
                data: value
            },

            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    lineChart2: function (id, data, key) {
        var colors = [
            {
                startColor: '#644436',
                endColor: '#241a33',
                lineStartColor: '#e4bda3',
                lineEndColor: '#da943d',
            },
            {
                startColor: '#0d0e47',
                endColor: '#020335',
                lineStartColor: '#569dd4',
                lineEndColor: '#4e57b2',
            },
        ]
        var myChart = echarts.init(document.getElementById(id));
        var name = []
        var value = []
        data.map(function (res) {
            name.push(res.time)
            value.push(res.value)
        })
        option = {
            grid: {
                top: '40',
                left: '70',
                right: '50',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '1e244d'
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: 'SourceHanSansCN-Regular',
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: name,

            }],

            yAxis: [{
                type: 'value',
                name: "单位：辆",
                nameGap: 20,
                splitNumber: 3,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68,
                    align: 'right',
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    margin: 15,
                    color: '#fff',
                    opacity: 0.68,
                    fontSize: '14px',
                    fontFamily: 'SourceHanSansCN-Regular',
                },
            }],
            series: [{
                type: 'line',
                smooth: true,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVQ4jW2T3S5DURCFv3P0UFWqEcS/V3DDtSue0ltw48KthETioi9AhKp/La3TU5ltTbOLSSb7dHdmzZqZtZODywGyRJ5Gp9tAXkRnsJJOCx7Tb/NMp4P0gRz4kvflg5KqWfI4UAYqwJS+S6poSR9AG+gAXQHnXqWkhBmgDszpe0IAn8Az8AA8KdnaKJxBpsqWvAKsAQu6M4A34E4s45aGDAygCswDG5s1drcW2J0tUy8GFDfvXJ/ecPTWC2BdtWGephGDSaAGLO4ssW/JYboJ6eo069tL7IlVTbGBfbyyTHOoVrJAfcSWq6GtacVkGnwAiM218MeS5P/7NBJGrmm3e316vwObbW61xq5ig6gcINeeX2zaF01OOl9hSMFaH9yf33JsOMCrYnMXkiFZxXeLtd03Whw2WpxJUIX+MwZX0kJH4go6cKXZ5aOKWiu2dxeSs7MCJiiLHWHgLQR5qldfVSxlY+JSHgJYgCnL2vB2DMBWFQ/ZH5L5cIj+GuNnagGuD1/d76f887yBb+qhm0ViVmlfAAAAAElFTkSuQmCC',
                symbolSize: 18,
                lineStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[key].lineStartColor,
                        },
                        {
                            offset: 1,
                            color: colors[key].lineEndColor,
                        }
                        ]),
                        width: 4,
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[key].lineStartColor,
                        },
                        {
                            offset: 1,
                            color: colors[key].lineEndColor,
                        }
                        ]),
                        width: 8,
                    }
                },
                label: {
                    show: true,
                    position: ['-35%', '-50%'],
                    formatter: '{c}辆',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        fontFamily: 'SourceHanSansCN-Regular',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'transparent',
                            }, {
                                offset: 0.1,
                                color: colors[key].startColor,
                            },
                            {
                                offset: 1,
                                color: colors[key].endColor,
                            }
                        ]),
                        // shadowColor: 'rgba(108,80,243, 0.9)',
                        // shadowBlur: 20
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[key].startColor,
                        },
                        {
                            offset: 1,
                            color: colors[key].endColor,
                        }
                        ]),
                    }
                },
                // emphasis: {
                //     // show:false,
                //     areaStyle: {
                //         color: '#fff',
                //         // shadowColor: 'rgba(108,80,243, 0.9)',
                //         // shadowBlur: 20
                //     },
                // },
                data: value
            },

            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    lineChart3: function (id, data,index) {
        var colors = [
            {
                startColor: '#241a33',
                endColor: '#644436',
                lineStartColor: '#e4bda3',
                lineEndColor: '#da943d',
            },
            {
                startColor: '#0d0e47',
                endColor: '#020335',
                lineStartColor: '#569dd4',
                lineEndColor: '#4e57b2',
            },
        ]
        var myChart = echarts.init(document.getElementById(id));
        var serData = [], lengData = []; xAxisData = [];
        data[0].list.forEach(function (d) {
            xAxisData.push(d.name)
        })
        data.forEach(function (d, index) {
            lengData.push(d.title);
            serData.push({
                name: d.title,
                type: "line",
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVQ4jW2T3S5DURCFv3P0UFWqEcS/V3DDtSue0ltw48KthETioi9AhKp/La3TU5ltTbOLSSb7dHdmzZqZtZODywGyRJ5Gp9tAXkRnsJJOCx7Tb/NMp4P0gRz4kvflg5KqWfI4UAYqwJS+S6poSR9AG+gAXQHnXqWkhBmgDszpe0IAn8Az8AA8KdnaKJxBpsqWvAKsAQu6M4A34E4s45aGDAygCswDG5s1drcW2J0tUy8GFDfvXJ/ecPTWC2BdtWGephGDSaAGLO4ssW/JYboJ6eo069tL7IlVTbGBfbyyTHOoVrJAfcSWq6GtacVkGnwAiM218MeS5P/7NBJGrmm3e316vwObbW61xq5ig6gcINeeX2zaF01OOl9hSMFaH9yf33JsOMCrYnMXkiFZxXeLtd03Whw2WpxJUIX+MwZX0kJH4go6cKXZ5aOKWiu2dxeSs7MCJiiLHWHgLQR5qldfVSxlY+JSHgJYgCnL2vB2DMBWFQ/ZH5L5cIj+GuNnagGuD1/d76f887yBb+qhm0ViVmlfAAAAAElFTkSuQmCC',
                symbolSize: 20,
                smooth: true,
                zlevel: 3,
                lineStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colors[index].lineStartColor
                            },
                            {
                                offset: 1,
                                color: colors[index].lineEndColor
                            }
                        ], false),
                        width: 4,
                        z: 10
                    }
                },
                label: {
                    show: true,
                    position: ['-35%', '-50%'],
                    formatter: '{c}辆',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        fontFamily: 'SourceHanSansCN-Regular',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colors[index].startColor
                            },
                            {
                                offset: 1,
                                color: colors[index].endColor
                            }
                        ], false),
                        z: 0
                    }
                },
                data: d.list
            })
        })
        var option = {
            color: ['#efaa57', '#5e71bf'],
            grid: {
                top: '40',
                left: 70,
                right: 50,
                bottom: '15%',
            },
            legend: {
                right: 40,
                top: 10,
                icon: 'roundRect',
                itemWidth: 13,
                itemHeight: 13,
                textStyle: {
                    fontSize: 12,
                    lineHeight: 20,
                    padding: [-10, 0, 0, 0],
                    color: "#fff"
                },
                data: lengData
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '1e244d',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: 'SourceHanSansCN-Regular',
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: xAxisData
            }],
            yAxis: [{
                type: 'value',
                name: "单位：辆",
                nameGap: 20,
                splitNumber: 3,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                    opacity: 0.68,
                    align: 'right',
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    margin: 15,
                    color: '#fff',
                    opacity: 0.68,
                    fontSize: '14px',
                    fontFamily: 'SourceHanSansCN-Regular',
                },
            }],
            series: serData
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    PieChart1: function (id, data) {
        var myChart = echarts.init(document.getElementById(id));
        var serData = [], xData = [], valData = [], total = 0;
        var bgColor = ['rgba(52,236,255,0.6)', 'rgba(230,138,84,0.6)', 'rgba(255,255,143,0.6)'];
        var color = ['#32edfc', '#e68a54', '#ffe18f',];
        data.forEach(function (d, i) {
            valData.push(d.value);
            total += data[i].value;
            xData.push(data[i].name)
        })
        valData.sort(function (a, b) {
            return b - a;
        });
        var max = valData[0];
        for (var i = 0; i < data.length; i++) {
            serData.push({
                value: data[i].value,
                name: data[i].name,
                itemStyle: {
                    normal: {
                        color: bgColor[i],
                        borderWidth: 2,
                        shadowBlur: 15,
                        borderColor: color[i],
                        shadowColor: color[i]
                    }
                }
            }, {
                value: max * 0.05,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            });
        }
        var seriesOption = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: ['45%', '55%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        padding: [0, -10, 0, -10],
                        formatter: function (params) {
                            var percent = 0;
                            percent = ((params.value / total) * 100).toFixed(0);
                            if (params.name !== '') {
                                return '{name|' + params.name + ':' + percent + '%}' + '\n' + '{hr|}' + '\n' + '{value|' + params.value + '辆}';
                            } else {
                                return '';
                            }
                        },
                        rich: {
                            name: {
                                fontSize: 13,
                                lineHeight: 12,
                                padding: [0, 20, -10, 20],
                                color: '#ffffff'
                            },
                            value: {
                                fontSize: 14,
                                lineHeight: 12,
                                align: 'left',
                                padding: [-8, 20, 0, 20],
                                color: '#fafe99'
                            },
                            hr: {
                                width: 18,
                                height: 18,
                                backgroundColor: {
                                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1YzlkMDY4ZS1mOWExLWUzNGQtYWMxOS1jMmVkOGZiNzIyZDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RCOTlBQkRBM0UxMTFFQjgyQUI4ODQwMjIyMkYzRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RCOTlBQkNBM0UxMTFFQjgyQUI4ODQwMjIyMkYzRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTYzZTUxNWItMzZmNi05ZDQ1LWE2YTgtZDUyMzdjNjViM2M5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVjOWQwNjhlLWY5YTEtZTM0ZC1hYzE5LWMyZWQ4ZmI3MjJkMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhzhnPQAAAOeSURBVHjaFJTJjiRFDIZtx5KRS3UtTS/MgAYOXBBPwI2H4Jl4MsSBM0hIzIgDoKmmq6uqc4vdeA55yYy0Hf///cbHH366Q91YZQbNJTVcfIPaEbBq0NgWSUH1rwyoMiNUpVpkglDWS4QaJy41AXLWRGSBwTBwr93Wlmh7qMmANhqV3SEZhToXORyI5LhyqeTJk1KvjK4Cp8gckgZsFCDKNMVVUzfUbgcO0wDyC6LZo2k64hKg5BWMQ2b0UGAEZQtAQtA6aRpWKcQWlXOISkMpHSh1S26/4zg2pPRAut2XWiITedVsKod5YVJHqBVImRbt9lprLpqU7ZhTJx8HKSYt81a5w0NVeo/ADZjDAQqBMtUr25fo5yMiVmz6Dsk91zRnuaoUslvNAD1w2QPgLQDcQC0HO7x9t8Q4NM22I2qUUiZzHmdGjWa47yvjsYRz4LKO0oY0cxSXOodqM8ioD4jwuQz9kFR7+/bN7b3T2XVmg0tS+e9jfXWHr62Y9VSnjzNkr6GC+iSP5ppBXhADWdLWoehj3O6xd/rwzQNuvv1yM+x7hX8eQ3KCyIdjwDwer8JHW8VmwWKVOkUjiMhIJNqICYsYYg3anf7iYPvv3rXtj9/fmDd3Bn/+babX+VqfrrRcbx5veG33GMczlFWeqEQftAKdONd10HY9mo0zRlu5Iu1aUo97g07a3W81WiNGSdOSIlAeM+QxQo6xlDWLcm1BsoyKChdOhHEOq18vq/Hv/wv5lz9W9dWDoV/f+3KeakxVFchBiiwidPKVc8Rao+a4CCMxMKsrJvMCyt+g7ud55eX3v/xFuN22VsFxzOnDsUzTPF20sTPXXSW+UgmRhD/SgrgXXEdOpSHbBGr3XmM6n54/Qi6fxfOao6GkxqWkKdJcl5cThMu/THwCoFk3fSxEWVyTnkD1E7Vk+0WsPUV/Cmj6ZV0HvpwvZ9MNbfajx+yvRtMS1nARbf4Rok+S0xmR/CfHgJohiYxzDtcXqBwle1sj7JT1KVCYiOmupzyn6l9O2QyRtDvnZZzlJqda0ijJ8BKRIUDNVMOkpFiSxE+CBAvdWPz5WahXYvMGShCy41NO50CmD6Ddta4vXpoucsbrUmYPKROgvsi6aUQ4oG53EkXmGhcNpLHg1JGMKnpeZf/MhWOVWE4SwLXEKQoqq+Y0ya7RKxLLXhFr0QjlkGp4bSR/jDUrLuQk1MA5yQQwcfZF3sv0zgO/xppC+V+AAQBcIVQPar7B7QAAAABJRU5ErkJggg=='
                                },
                                color: '#fff',
                                borderRadius: 3,
                                verticalAlign: 'middle',
                                lineHeight: 18,
                                padding: [0, 0, 0, 0]
                            },
                        }
                    },
                    labelLine: {
                        length: 10,
                        length2: 15,
                        show: true,
                        color: '#00ffff'
                    }
                }
            },
            data: serData
        },];
        seriesOption.push({
            type: 'pie',
            radius: [0, '38%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle:{
                normal:{
                    color:{
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0, color: 'rgb(4,14,63)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgb(43,140,186)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    borderWidth:2,
                    borderColor: 'rgb(67,211,255)',
                    labelLine:{
                        show:false
                    }
                },
                emphasis:{
                    show:false
                }
            },
            data:[100]
        })
        var option = {
            title: {
                left: 10,
                padding:[0,0,0,20],
                subtext: '单位：辆',
                subtextStyle: {
                    color: 'rgba(255,255,255,0.68)',
                    fontSize: 14
                }
            },
            color: color,
            tooltip: {
                show: false
            },
            legend: {
                itemWidth: 13,
                itemHeight: 13,
                orient: 'horizontal',
                // x: 'left',
                data: xData,
                bottom: 10,
                textStyle: {
                    fontSize: 12,
                    padding: [3, 0, 0, 3],
                    color: "#fff"
                },
                itemGap: 20
            },
            toolbox: {
                show: false
            },
            series: seriesOption
        }
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    PieChart2: function (id, data) {
        var chart = Highcharts.chart(id, {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
                options3d: {
                    enabled: true,
                    alpha: 60,
                    beta: 0,
                    viewDistance: 200
                }
            },
            colors: ['#e8bf78', '#71ffe4'],
            title: {
                text: null
            },
            legend: {
                enabled: true,
                floating: true,
                layout: 'horizontal',
                height: 40,
                x: 10,
                y: 0,
                itemStyle: {
                    color: '#fff',
                    fontWeight: 'normal'
                },
                itemHoverStyle: {
                    color: '#fff'
                },
                labelFormatter: function () {
                    return this.name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + this.y + '辆'
                }

            },
            tooltip: {
                enabled: false,
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            title: {
                text: '单位：辆',
                align: 'left',
                style: {
                    color: '#ffffff',
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    letterSpacing: '0px',
                    opacity: 0.68,
                },

            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 15,
                    slicedOffset: 10,
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}:{point.percentage:.0f}%',
                        style: {
                            color: '#ffffff',
                            fontSize: 14,
                            fontFamily: 'MicrosoftYaHei',
                            fontWeight: 'normal',
                        },
                        connectorWidth: 1,
                        connectorPadding: -15,

                    },
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    },
                }
            },
            series: [{
                type: 'pie',
                size: '120%',
                center: ['50%', '20%'],
                data: data
            }]
        });
        window.addEventListener("resize", function () {
            chart.reflow();
        })
    },
    	// 词云
	WordCloudChart1: function (id, keydata) {
		var myChart = echarts.init(document.getElementById(id));

		var colors = ['#5aa3db', '#9f8251', '#4a817d', '#455984', '#535462',
			'#5e5f6f', '#817849', '#2d526f', '#325b7b', '#b0905a',
			'#9b5c54', '#774740', '#569691', '#8f564e']
		var option = {
			tooltip: {
				show: true,
				transitionDuration: 0
			},
			series: [{
				type: "wordCloud",
				gridSize: 10,
				shape: 'diamond',
				sizeRange: [30, 20],
				textStyle: {
						color: function () {
							return colors[parseInt(Math.random() * 12)];
						}
					},
					emphasis: {
						shadowBlur: 5,
						shadowColor: '#ddd'
					},
				data: keydata,
			}]
		};

		myChart.setOption(option);
		window.addEventListener("resize", function () {
			myChart.resize();
		})
	},
}
