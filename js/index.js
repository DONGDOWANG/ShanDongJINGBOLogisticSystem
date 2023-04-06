var app = new Vue({
    el: '#app',
    data: {
        date: '',
        date2: '',
        timer: null,
        screenWidth: document.body.clientWidth, // 屏幕宽度
        dynHeight: 0,
        dynHeight1: 0,
        numberList: [
            {
                title: '统计车辆总数',
                number: 318,
                color: 'color1',
            },
            {
                title: '停车场A区',
                number: 272,
                color: 'color2',
            },
            {
                title: '停车场B区',
                number: 279,
                color: 'color5',
            },
            {
                title: '化工园区',
                number: 236,
                color: 'color3',
            },
            {
                title: '石化厂东区',
                number: 236,
                color: 'color4',
            },
            {
                title: '石化厂西区',
                number: 236,
                color: 'color6',
            },
        ],
        lineList2: [
            {
                time: '12:00',
                value: 100,
            },
            {
                time: '14:00',
                value: 170,
            },
            {
                time: '16:00',
                value: 70,
            },
            {
                time: '18:00',
                value: 184,
            },
        ],
        columns1: [
            {
                title: '停车场',
                key: 'parkingLot',
                align: 'center',
            },
            {
                title: '实时车位',
                key: 'realTimeParking',
                align: 'center',
            },
            {
                title: '可用车位',
                key: 'availableParkingSpaces',
                align: 'center',
            },
            {
                title: '预警指数',
                key: 'earlyWarningIndex',
                align: 'center',
                render: function (h, params) {
                    if (params.row.earlyWarningIndex !== '正常') {
                        return h('span', {
                            'style': {
                                'color': '#ff0808'
                            }
                        }, params.row.earlyWarningIndex)
                    } else {
                        return h('span', {
                            'style': {
                                'color': '#fff'
                            }
                        }, params.row.earlyWarningIndex)
                    }
                }
            },
        ],
        data1: [
            {
                parkingLot: '停车场A区',
                realTimeParking: 30,
                availableParkingSpaces: 110,
                earlyWarningIndex: '正常',
            },
            {
                parkingLot: '停车场A区',
                realTimeParking: 120,
                availableParkingSpaces: 30,
                earlyWarningIndex: 85,
            },
            {
                parkingLot: '停车场A区',
                realTimeParking: 170,
                availableParkingSpaces: 60,
                earlyWarningIndex: '正常',
            },
            {
                parkingLot: '停车场A区',
                realTimeParking: 20,
                availableParkingSpaces: 80,
                earlyWarningIndex: '正常',
            },
        ],
        VerSiteData: [
            {
                name: '石化厂东区',
                value: 116
            }, {
                name: '化工园区',
                value: 322
            }, {
                name: '石化厂西区',
                value: 116
            }
        ],
        lineList3: [
            {
                title: '进园区',
                list: [
                    { name: '10时', value: 12 },
                    { name: '11时', value: 130 },
                    { name: '12时', value: 45 },
                    { name: '13时', value: 52 },
                    { name: '14时', value: 86 },
                ]
            },
            {
                title: '出园区',
                list: [
                    { name: '10时', value: 30 },
                    { name: '11时', value: 10 },
                    { name: '12时', value: 120 },
                    { name: '13时', value: 65 },
                    { name: '14时', value: 75 },
                ]

            },
        ],
        barList2: [
            {
                title: '轻车',
                list: [
                    { name: '14:00', value: 30 },
                    { name: '15:00', value: 30 },
                    { name: '16:00', value: 30 },
                    { name: '18:00', value: 30 },
                ],
            },
            {
                title: '重车',
                list: [
                    { name: '14:00', value: 130 },
                    { name: '15:00', value: 130 },
                    { name: '16:00', value: 130 },
                    { name: '18:00', value: 130 },
                ],
            },
        ],
        barList1: [
            {
                title: '进园',
                list: [
                    { name: '10时', value: 30 },
                    { name: '11时', value: 70 },
                    { name: '12时', value: 20 },
                    { name: '13时', value: 60 },
                    { name: '14时', value: 33 },
                    { name: '15时', value: 55 },
                ],
            },
            {
                title: '出园',
                list: [
                    { name: '10时', value: 22 },
                    { name: '11时', value: 48 },
                    { name: '12时', value: 76 },
                    { name: '13时', value: 82 },
                    { name: '14时', value: 66 },
                    { name: '15时', value: 15 },
                ],
            },
        ],
        pieList2: [
            {
                name: '危化品车辆',
                y: 200,
                sliced: true,
                selected: true
            },
            {
                name: '其他车辆',
                y: 300,
            },
        ],
        animate: false,
        precent: 9 / 16

    },
    created: function () {
        setInterval(this.showMarquee, 2000);
    },
    mounted: function () {
        /*监听屏幕 */
        this.setDomBox()
        // 监听窗口大小
        window.onresize = () => {
            this.screenWidth = document.body.clientWidth
        }
        var _this = this
        setTimeout(function () {
            chartCollection.lineChart2('lineExample6', _this.lineList2, 0)
            chartCollection.PieChart1('verSiteAreaChart2', _this.VerSiteData)
            chartCollection.PieChart2('vehicleProportion', _this.pieList2)
            chartCollection.barChart2('barExample6', _this.barList2, 0)
            chartCollection.barChart2('barExample7', _this.barList2, 0)
            chartCollection.barChart2('barExample8', _this.barList2, 0)
            chartCollection.barChart3('barExample9', _this.barList1)
            chartCollection.lineChart3('vehicleIOChart', _this.lineList3)
        }, 500)
        this.getDate()
        this.getDate2()

        this.timer = setInterval(function () {
            _this.getDate()
            _this.getDate2()
        }, 1000);



    },
    destroyed: function () {
        clearInterval(this.timer);
    },
    methods: {
        setDomBox() {
            document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
            var height = (this.$refs.box.clientWidth) * this.precent
            console.log('宽'+this.$refs.box.clientWidth,'高：'+height)
            this.dynHeight = height + 'px';
            this.dynHeight1 = (height * 2 + 10) + 'px';
        },
        showMarquee: function () {
            var _this = this;
            _this.animate = true;
            setTimeout(function () {
                _this.data1.push(_this.data1[0]);
                _this.data1.shift();
                _this.animate = false;
            }, 500);
        },
        dateFormat: function (fmt, date) {
            var ret;
            var opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString(),         // 秒
                "W": date.getDay().toString()               // 周
            };
            for (var k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        getDate: function () {
            var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
            this.date = this.dateFormat("YYYY年mm月dd日 " + str, new Date())
        },
        getDate2: function () {
            this.date2 = this.dateFormat("HH:MM", new Date())
        },
        linkTo: function () {
            window.location.href = "./parkingLot.html"
        },
        linkTo2: function () {
            window.location.href = "./vehicleMonitoring.html"
        },
    },
    watch: {
        screenWidth(val) {
            this.setDomBox();
        }
    },

})