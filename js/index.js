// 应力模块
// 1.得到所有的input
var inputs = document.querySelector('.cal-input').querySelectorAll('input')
var tds = document.querySelector('tbody tr').querySelectorAll('td')
var note_inputs = document.querySelector('.note').querySelectorAll('input')
    // 键盘事件
$(function() {
        $(".cal-input input").keyup(function(e) {
            if (e.code == 'ArrowDown') {
                var index = $(this).parent().index('ul li');
                if (index < $('.cal-input input').length - 1) {
                    $(".cal-input input").eq(index + 1).focus();
                } else if (index == $('.cal-input input').length - 1) {
                    $('#btn1').focus()
                }
            }
            if (e.code == 'ArrowUp') {
                var index = $(this).parent().index('ul li');
                if (index > 0) {
                    $(".cal-input input").eq(index - 1).focus();
                }

            }
        });
        document.onkeydown = function(e) {

            if (e.code == 'Enter') {
                $("#btn1").one("click", function() { //事件只触发一次

                })

            }
        };


    })
    // 循环添加index属性
for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('index', i)
}
inputs[1].onfocus = function() {
    if (this.value === '请输入3~11之间的值') {
        this.value = '';
    }
    this.style.color = '#fff';
}
inputs[1].onblur = function() {
    if (this.value === '') {
        this.value = '请输入3~11之间的值';
    }
    this.style.color = 'rgb(194, 189, 189)';
}
inputs[2].onfocus = function() {
    if (this.value === '板厚与倒角之和不超过2.5') {
        this.value = '';
    }
    this.style.color = '#fff';
}
inputs[2].onblur = function() {
    if (this.value === '') {
        this.value = '板厚与倒角之和不超过2.5';
    }
    this.style.color = 'rgb(194, 189, 189)';
}
inputs[3].onfocus = function() {
    if (this.value === '板厚与倒角之和不超过2.5') {
        this.value = '';
    }
    this.style.color = '#fff';
}
inputs[3].onblur = function() {
    if (this.value === '') {
        this.value = '板厚与倒角之和不超过2.5';
    }
    this.style.color = 'rgb(194, 189, 189)';
}
inputs[4].onfocus = function() {
    if (this.value === '请输入0~1之间的值') {
        this.value = '';
    }
    this.style.color = '#fff';
}
inputs[4].onblur = function() {
        if (this.value === '') {
            this.value = '请输入0~1之间的值';
        }
        this.style.color = 'rgb(194, 189, 189)';
    }
    // 2.绑定点击事件
btn1.onclick = function() {
    // 清空之前图表
    // myChart1.clear()
    // myChart1.clear()
    // 3.判断哪个输入为空 确定调用的函数
    var empty = 0;
    for (var i = 0; i < inputs.length; i++) {
        if (!(parseFloat(inputs[i].value) / 1)) {
            empty = i
        }
    }
    switch (empty) {
        case 1:
            var fn = getBanJing
            break;
        case 2:
            var fn = getBanHou
            break;
        case 4:
            var fn = getKongXiLv
            break;
        case 5:
            var fn = getYingLi
            break;

    }
    // console.log(empty);
    // console.log(fn);
    // 4.判断哪个输入框为范围取值
    var flag = false
    var link = 0
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.indexOf('-') != -1) {
            flag = true
            link = i
        }
    }
    // console.log(flag);
    // console.log(link);
    if (!flag) {
        // 4.1无范围取值 直接传参
        var arr1 = []
        for (var i = 0; i < inputs.length; i++) {
            if (i != empty) {
                arr1.push(parseFloat(inputs[i].value))
            }
        }

        inputs[empty].value = fn(...arr1).toFixed(2)
            // 历史数据
        arr1.splice(empty, 0, parseFloat(inputs[empty].value))
        var arr_1 = [arr1[1], arr1[2], arr1[4]]


        arr1.push(getZuLi(...arr_1))

        AddHistory(arr1);
    } else {
        // 4.有范围取值 
        var n = 20
        var arr2 = inputs[link].value.split('-')
            // console.log(arr2);
        var min = parseFloat(arr2[0])
        var max = parseFloat(arr2[1])
        var step = parseFloat(((max - min) / n).toFixed(4))
            // console.log(min, max, step);
            // var x = Array(n + 1).join(' ').split(' ').map((e, i) => parseFloat((min + step * i)))
        var x = Array(n + 1).join(' ').split(' ').map((e, i) => parseFloat((min + step * i).toFixed(3)))
            // console.log(x);
        var arr3 = []
        for (var i = 0; i < inputs.length; i++) {
            if (i != empty && i != link) {
                arr3.push(parseFloat(inputs[i].value))
            }
        }
        // console.log(arr3);
        var y = []
        var n = []
        var m = []
        var temp_arr = []
        for (var i = 0; i < x.length; i++) {
            var [...arr4] = arr3
            if (link < empty) {
                arr4.splice(link, 0, x[i])
            } else {
                arr4.splice(link - 1, 0, x[i])
            }

            // console.log(arr4);
            y[i] = parseFloat(fn(...arr4))
            if (empty == 1) {
                n = [arr4[0], y[i], arr4[1], arr4[2], arr4[3], arr4[4]]

                // console.log(n);

            } else if (empty == 2) {
                n = [arr4[0], arr4[1], y[i], arr4[2], arr4[3], arr4[4]]
                    // console.log(n);
            } else if (empty == 4) {
                n = [arr4[0], arr4[1], arr4[2], arr4[3], y[i], arr4[4]]
                    // console.log(n);
            } else {
                n = [arr4[0], arr4[1], arr4[2], arr4[3], arr4[4], y[i]]


            }
            m[i] = parseFloat(getZuLi(n[1], n[2], n[4]))

            // 最优配置模块
            // (1)获取间距
            var distance = getJianJu(n[1], n[4])
            n.splice(5, 0, distance)
            n.push(m[i])
                // console.log(n)
                // console.log(n[6], n[7]);
            var temp_stress = 0
            var temp_zuli = 1000

            var aim_stress = 366
            if (n[6] <= aim_stress) {
                if (n[6] - temp_stress >= 0) {

                    if (n[7] - temp_zuli <= 0) {
                        temp_stress = n[6]
                        temp_zuli = n[7]
                        temp_arr = n

                    }

                }
            }


        }
        // console.log(temp_arr);
        if (temp_arr.length) {

            for (var i = 0; i < tds.length; i++) {
                tds[i].innerHTML = '' + temp_arr[i] + ''
            }

            note_inputs[0].value = tds[5].innerHTML
            note_inputs[1].value = '' + 2 * tds[1].innerHTML + ''
            note_inputs[2].value = tds[3].innerHTML
            note_inputs[3].value = tds[2].innerHTML
                // 历史数据
            temp_arr.splice(5, 1)
            AddHistory(temp_arr)
        } else {
            for (var i = 0; i < tds.length; i++) {
                tds[i].innerHTML = '--'
            }
            for (var i = 0; i < note_inputs.length; i++) {
                note_inputs[i].value = '--'
            }
        }

        // console.log(note_inputs);
        // console.log(tds);


        // console.log(y);
        // console.log(m);

        var tab_jiegou = document.querySelector('.tab li:nth-child(1)')

        tab_jiegou.click();
        var myChart1 = echarts.init(document.querySelector('.content .jiegou'));
        option1 = {
            color: ['#ccc'],
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
        myChart1.setOption(option1);

        var myChart2 = echarts.init(document.querySelector('.content .zuli'));
        option2 = {
            color: ['#ccc'],
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
                data: m
            }]
        };
        myChart2.setOption(option2);

    }


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
    BanJing = parseFloat(BanJing.toFixed(3))
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
    KongXiLv = parseFloat(KongXiLv.toFixed(4))
    return KongXiLv;
}


function getYingLi(a, b, c, d, e) {


    var k1 = 1.22 * Math.pow(d, 2) - 4.9 * d + 4.96;
    var k2 = 0.07 * Math.pow(d, 4.95) + 1.91;
    var k3 = 1.63 - 0.47 * d;
    var k4 = 0.05412 * d + 1.4884;
    var k5 = 1.95784 + 0.59653 * d;
    var k6 = 0.25603 * d + 0.07584;
    var ke = e / (1 - e);
    var k56 = k5 - k6 * c;
    var YingLi = 0.1125 * a * (k1 * Math.pow(c, -k2) + k3) * Math.pow(ke, k4) * Math.pow(b, k56);
    YingLi = parseFloat(YingLi.toFixed(2))
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
        // console.log(c);
        k56 = k5 - k6 * c;
        num2 = (k1 * Math.pow(c, -k2) + k3) * Math.pow(b, k56);
        num3 = (num2 - num1) / num1;
    }
    var BanHou = parseFloat(c.toFixed(4))
    return BanHou;
}

function getZuLi(b, c, e) {
    var R = Math.pow(3.1415926 * 1.732 / 6 / (1 - e), 0.5) * b
    var h = 5 - 2 * c
    var k1 = 4 * h * (R - b) / (h + 2 * (R - b))
    var ZuLi = parseFloat((1 / (0.41 * Math.pow(k1, -2.4) + 0.00786)).toFixed(2))
    return ZuLi;
}

function getJianJu(b, e) {
    var R = Math.pow(3.1415926 * 1.732 / 6 / (1 - e), 0.5) * b
    var JianJu = parseFloat((2 * (R - b)).toFixed(2))
    return JianJu;
}
// Tab导航栏模块
$(function() {
    // 1.点击上部的li，当前li 添加current类，其余兄弟移除类
    $(".tab li").click(function() {
        // 链式编程操作
        $(this).addClass("current").siblings().removeClass("current");
        // 2.点击的同时，得到当前li 的索引号
        var index = $(this).index();
        // console.log(index);
        // 3.让下部里面相应索引号的item显示，其余的item隐藏
        $(".content section").eq(index).show().siblings("section").hide();
    });
})

// 历史数据模块
// 定义历史数据模块
var minstress = 1000;
var minzuli = 500;

function AddHistory(arrHistory) {
    var tbody = document.querySelector('.history-date-main table tbody')
    var trs = document.querySelector('.history-date-main table tbody').querySelectorAll('tr')
    var tr = document.createElement("tr")
    for (let i = 0; i < arrHistory.length; i++) {
        var td = document.createElement("td")
        td.innerHTML = arrHistory[i]
        tr.appendChild(td)
    }
    if (arrHistory[5] <= minstress && arrHistory[6] <= minzuli) {
        for (let i = 0; i < trs.length; i++) {
            trs[i].style.backgroundColor = ""
        }
        tr.style.backgroundColor = "#2302b5"

        minstress = arrHistory[5]
        minzuli = arrHistory[6]
    }
    tbody.appendChild(tr)
}

document.addEventListener("click", function(e) {
    console.log(e.clientX)
    console.log(e.clientY)
})