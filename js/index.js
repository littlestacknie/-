var pressure = document.getElementById('pressure');
var banjing = document.getElementById('banjing');
var banhou = document.getElementById('banhou');
var daojiao = document.getElementById('daojiao');
var kongxilv = document.getElementById('kongxilv');
var yingli = document.getElementById('yingli');
var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');

var formula1 = document.querySelector('#formula1');
var formula2 = document.querySelector('#formula2');
var shentoulv = document.querySelector('#shentoulv');
//1.提示功能（开始）
banjing.onfocus = function() {
    if (this.value === '请输入3~11之间的值') {
        this.value = '';
    }
    this.style.color = '#fff';
}
banjing.onblur = function() {
    if (this.value === '') {
        this.value = '请输入3~11之间的值';
    }
    this.style.color = 'rgb(194, 189, 189)';
}
banhou.onfocus = function() {
    if (this.value === '板厚与倒角之和不超过2.5') {
        this.value = '';
    }
    this.style.color = '#fff';
}
banhou.onblur = function() {
    if (this.value === '') {
        this.value = '板厚与倒角之和不超过2.5';
    }
    this.style.color = 'rgb(194, 189, 189)';
}
daojiao.onfocus = function() {
    if (this.value === '板厚与倒角之和不超过2.5') {
        this.value = '';
    }
    this.style.color = '#fff';
}
daojiao.onblur = function() {
    if (this.value === '') {
        this.value = '板厚与倒角之和不超过2.5';
    }
    this.style.color = 'rgb(194, 189, 189)';
}
kongxilv.onfocus = function() {
    if (this.value === '请输入0~1之间的值') {
        this.value = '';
    }
    this.style.color = '#fff';
}
kongxilv.onblur = function() {
        if (this.value === '') {
            this.value = '请输入0~1之间的值';
        }
        this.style.color = 'rgb(194, 189, 189)';
    }
    //1.提示功能（结束）
    //2.计算功能（开始）
    //1)应力


btn1.onclick = function() {
    var a = pressure.value;
    var b = banjing.value;
    var c = banhou.value;
    var d = daojiao.value;
    var e = kongxilv.value;
    var f = yingli.value;



    if (!b && c + d <= 2.5) {

        if (a + c + d + e + f > 0) {
            var bj = getBanJing(a, c, d, e, f);
            banjing.value = bj.toFixed(2);

        }

    } else if (!e && a * b * c * d * f > 0 && c + d <= 2.5) {
        var kxl = getKongXiLv(a, b, c, d, f);
        kongxilv.value = kxl.toFixed(2);
    } else if (!f && a * b * d * e * c > 0 && c + d <= 2.5) {
        var yl = getYingLi(a, b, c, d, e);
        yingli.value = yl.toFixed(2);
    } else if (!c && a * b * d * e * f > 0) {
        var bh = getBanHou(a, b, d, e, f);
        banhou.value = bh.toFixed(2);
    }
    //2)流动
    // if (formula1.checked && b && e) {
    //     var stl1 = getShenTouLv1(b, e);
    //     shentoulv.value = stl1.toFixed(2);

    // } else if (formula2.checked && b && e) {
    //     var stl2 = getShenTouLv2(b, e);
    //     shentoulv.value = stl2.toFixed(2);
    // } else {
    //     shentoulv.value = '';
    // }
    var str = banjing.value;

    var n = 20
    var arr = str.split('-')
    let min = parseInt(arr[0])
    let max = parseInt(arr[1])
    let step = (max - min) / n
    let x = Array(n + 1).join(' ').split(' ').map((e, i) => parseFloat((min + step * i).toFixed(2)))
    console.log(x);
    let y = x.map(b => (parseFloat(getYingLi(b).toFixed(2))))
    console.log(y);
    var title = '应力图'

    var myChart = echarts.init(document.querySelector('.content section'));
    option = {
        color: ['#ccc'],
        title: {
            textStyle: {
                color: '#fff'
            },
            text: title
        },
        tooltip: {
            show: true,

            trigger: 'axis'
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: x,
            scale: true,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            scale: true,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        },
        series: [{
            symbolSize: 10,
            type: 'line',
            data: y
        }]
    };
    myChart.setOption(option);

}

function getBanJing(a, c, d, e, f) {
    var k1 = 1.22 * Math.pow(d, 2) - 4.9 * d + 4.96;
    var k2 = 0.07 * Math.pow(d, 4.95) + 1.91;
    var k3 = 1.63 - 0.47 * d;
    var k4 = 0.05412 * d + 1.4884;
    var k5 = 1.95784 + 0.59653 * d;
    var k6 = 0.25603 * d + 0.07584;
    var ke = e / (1 - e);
    var k56 = k5 - k6 * c;
    var num1 = f / (0.1125 * a * (k1 * Math.pow(c, -k2) + k3) * Math.pow(ke, k4));
    var BanJing = Math.pow(num1, 1 / k56);
    return BanJing;
}

function getKongXiLv(a, b, c, d, f) {
    var k1 = 1.22 * Math.pow(d, 2) - 4.9 * d + 4.96;
    var k2 = 0.07 * Math.pow(d, 4.95) + 1.91;
    var k3 = 1.63 - 0.47 * d;
    var k4 = 0.05412 * d + 1.4884;
    var k5 = 1.95784 + 0.59653 * d;
    var k6 = 0.25603 * d + 0.07584;
    var k56 = k5 - k6 * c;
    var num1 = f / (0.1125 * a * (k1 * Math.pow(c, -k2) + k3) * Math.pow(b, k56));
    var KongXiLv = 1 / (Math.pow(num1, (-1 / k4)) + 1);
    return KongXiLv;
}


function getYingLi(b) {
    var a = parseFloat(pressure.value);
    var c = parseFloat(banhou.value);
    var d = parseFloat(daojiao.value);
    var e = parseFloat(kongxilv.value);

    var k1 = 1.22 * Math.pow(d, 2) - 4.9 * d + 4.96;
    var k2 = 0.07 * Math.pow(d, 4.95) + 1.91;
    var k3 = 1.63 - 0.47 * d;
    var k4 = 0.05412 * d + 1.4884;
    var k5 = 1.95784 + 0.59653 * d;
    var k6 = 0.25603 * d + 0.07584;
    var ke = e / (1 - e);
    var k56 = k5 - k6 * c;
    var YingLi = 0.1125 * a * (k1 * Math.pow(c, -k2) + k3) * Math.pow(ke, k4) * Math.pow(b, k56);
    return YingLi;
}

function getBanHou(a, b, d, e, f) {
    var c = 0.5;
    var k1 = 1.22 * Math.pow(d, 2) - 4.9 * d + 4.96;
    var k2 = 0.07 * Math.pow(d, 4.95) + 1.91;
    var k3 = 1.63 - 0.47 * d;
    var k4 = 0.05412 * d + 1.4884;
    var k5 = 1.95784 + 0.59653 * d;
    var k6 = 0.25603 * d + 0.07584;
    var ke = e / (1 - e);
    var k56 = k5 - k6 * c;
    var num1 = f / (0.1125 * a * Math.pow(ke, k4));
    var num2 = (k1 * Math.pow(c, -k2) + k3) * Math.pow(b, k56);
    var num3 = (num2 - num1) / num1;
    while (num3 > 0.001 && c <= 2) {
        c = c + 0.01;
        console.log(c);
        k56 = k5 - k6 * c;
        num2 = (k1 * Math.pow(c, -k2) + k3) * Math.pow(b, k56);
        num3 = (num2 - num1) / num1;
    }
    return c;
}

// function getShenTouLv1(b, e) {
//     var C = 4 / (9 * 3.141592 * Math.pow(6, 0.5));
//     var ec = 1 - 3.141592 / (2 * Math.pow(2, 0.5));
//     var k1 = (1 - ec) / (1 - e) - 1;
//     var ShenTouLv1 = Math.pow(2 * b, 2) * C * Math.pow(k1, 1.25);
//     return ShenTouLv1;
// }

// function getShenTouLv2(b, e) {
//     var Q = 1 - e;
//     var ShenTouLv2 = Math.pow(2 * b, 2) / 32 / Q * (Math.log(1 / Q) - 1.497 + 2 * Q - Math.pow(Q, 2) / 2 - 0.739 * Math.pow(Q, 4) + 2.534 * Math.pow(Q, 5) / (1 + 1.2758 * Q));
//     return ShenTouLv2;
// }
//2.计算功能（结束）

//重置功能
btn2.onclick = function() {
    pressure.value = '';
    banjing.value = '请输入3-11之间的值';
    banhou.value = '板厚与倒角之和不超过2.5';
    daojiao.value = '板厚与倒角之和不超过2.5';
    kongxilv.value = '请输入0-1之间的值';
    yingli.value = '';
    shentoulv.value = '';

    notice1.style.display = 'none';
    notice2.style.display = 'none';


}