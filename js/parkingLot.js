var app = new Vue({
    el: '#app',
    data: {
        date: '',
        date2: '',
        timer: null,
        numberList: [
            {
                title: '统计车辆总数',
                number: 318,
                color: 'color1',
            },
            {
                title: '自有车辆',
                number: 272,
                color: 'color2',
            },
            {
                title: '社会车辆',
                number: 279,
                color: 'color3',
            },
            {
                title: '空闲车位',
                number: 236,
                color: 'color4',
            },
        ],
        columns1: [
            {
                title: '车牌号',
                key: 'carNumber',
                align: 'center',
                width: 105
            },
            {
                title: '车辆种类',
                key: 'vehicleType',
                align: 'center',
                width: 110
            },
            {
                title: '司机姓名',
                key: 'DriverName',
                align: 'center',
                width: 100
            },
            {
                title: '司机电话',
                key: 'DriverPhone',
                align: 'center',
                width: 130,
            },
            {
                title: '入园时间',
                key: 'EntryTime',
                align: 'center',
                width: 130,
            },
            {
                title: '运单号',
                key: 'WaybillNo',
                align: 'center',
                minWidth: 160
            },
            {
                title: '货品',
                key: 'goods',
                width: 80,
                align: 'center',
            },
            {
                title: '货量',
                key: 'volume',
                width: 80,
                align: 'center',
            },
        ],
        data1: [
            {
                carNumber: '鲁MC0597',
                vehicleType: '危化品车辆',
                DriverName: '刘国伟',
                DriverPhone: '13340525670',
                EntryTime: '12-15  08：32',
                WaybillNo: 'JBL.202101260001',
                goods: '卷钢',
                volume: '66T',
            },
            {
                carNumber: '鲁MC0597',
                vehicleType: '危化品车辆',
                DriverName: '刘国伟',
                DriverPhone: '13340525670',
                EntryTime: '12-15  08：32',
                WaybillNo: 'JBL.202101260001',
                goods: '卷钢',
                volume: '66T',
            },
            {
                carNumber: '鲁MC0597',
                vehicleType: '危化品车辆',
                DriverName: '刘国伟',
                DriverPhone: '13340525670',
                EntryTime: '12-15  08：32',
                WaybillNo: 'JBL.202101260001',
                goods: '卷钢',
                volume: '66T',
            },
            {
                carNumber: '鲁MC0597',
                vehicleType: '危化品车辆',
                DriverName: '刘国伟',
                DriverPhone: '13340525670',
                EntryTime: '12-15  08：32',
                WaybillNo: 'JBL.202101260001',
                goods: '卷钢',
                volume: '66T',
            },
            {
                carNumber: '鲁MC0597',
                vehicleType: '危化品车辆',
                DriverName: '刘国伟',
                DriverPhone: '13340525670',
                EntryTime: '12-15  08：32',
                WaybillNo: 'JBL.202101260001',
                goods: '卷钢',
                volume: '66T',
            },
        ],
        pie3dList: [{
            name: '乙烯',
            value: '30T',
            y: 30,
            h: 10,
        }, {
            name: '原油',
            value: '15T',
            y: 15,
            h: 1
        }, {
            name: '硝化甘油',
            value: '20T',
            y: 20,
            h: 1
        }, {
            name: '苯',
            value: '25T',
            y: 25,
            h: 1
        }, {
            name: '硝基苯',
            value: '5T',
            y: 5,
            h: 1
        }],
        barList1: [
            {
                title: '1小时以内',
                value: 38,
            },
            {
                title: '1-3小时',
                value: 40,
            },
            {
                title: '3-5小时',
                value: 25,
            },
            {
                title: '5-7小时',
                value: 30,
            },
            {
                title: '7-9小时',
                value: 20,
            },
            {
                title: '9小时及以上',
                value: 45,
            },
        ],
        lineList1: [
            {
                time: '9时',
                value: 100,
            },
            {
                time: '10时',
                value: 170,
            },
            {
                time: '11时',
                value: 70,
            },
            {
                time: '12时',
                value: 184,
            },
            {
                time: '13时',
                value: 100,
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
        animate: false,
        screenWidth: document.body.clientWidth, // 屏幕宽度
        dynHeight: 0,
        dynHeight1: 0,
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
            chartCollection.pie3d('container', _this.pie3dList)
            chartCollection.barChart1('barExample1', _this.barList1, 0)
            chartCollection.barChart1('barExample2', _this.barList1, 1)
            chartCollection.barChart1('barExample3', _this.barList1, 2)
            chartCollection.barChart1('barExample4', _this.barList1, 3)
            chartCollection.lineChart1('lineExample1', _this.lineList1, 1)
            chartCollection.lineChart2('lineExample2', _this.lineList2, 0)
            chartCollection.lineChart2('lineExample3', _this.lineList2, 1)
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
                "S+": date.getSeconds().toString(),          // 秒
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
        goHistory: function () {
            window.history.go(-1)
        }


    },
    watch: {
        screenWidth(val) {
            this.setDomBox();
        }
    },
})