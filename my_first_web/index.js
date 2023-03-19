// on top of the page shows the date of today in formate like "Wednesday,23 Mar"
function showDate() {
    // the day of the week (0–6)  
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(new Date()).getDay()];
    // the day of the month (1–31) 
    let date = (new Date()).getDate();
    // the month (0–11)
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][(new Date()).getMonth()];
    $("#day").html(day + ', ' + date + ' ' + month);
}
setInterval(showDate, 1000);// keep the time shown updated once per second


// The user can easily switch between the views using a menu. 
// Only one view is visible at a time.
$(function () {
    $(".main").click((function () {
        // console.log(window.event.target.tagName);
        $(this).addClass("active").siblings().removeClass("active");
        // console.log($(this).html());
        let index = $(this).index();
        $(".content").eq(index).addClass("current").siblings(".content").removeClass("current");
    }))
})


// data(all types,now 30) to html table 
function dataToTable(dataObjects) {
    let table_content = `
    <table> <thead> <tr>
            <th>Row</th>  <th>Date</th>  <th>Time</th>  <th>Type</th>  <th>Value</th>
    </tr> </thead> <tbody>`;
    for (let i = 0; i < 30; i++) {
        table_content += `<tr> <td>${i + 1}</td>
                               <td>${dataObjects[i].date_time.substr(0, 10)}</td>
                               <td>${dataObjects[i].date_time.substr(11, 12)}</td>
                               <td>${Object.keys(dataObjects[i].data)[0]}</td>
                               <td>${Object.values(dataObjects[i].data)[0]}</td> </tr>`
    }
    table_content += `</tbody> </table>`;
    return table_content;
}


// View 1: show the latest 30 measurements fetched from the backend API.
function listAll() {
    const DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
    fetch(DATA_SOURCE).then(response => { return response.json() })
        .then(data => {
            $(".all .table").html(dataToTable(data));
        })
        .catch(error => { console.error('AAARRRGH!' + error) });
}
window.onload = function () {
    listAll()
};

// show max and min above the table
function setTableContent(weathertype, date, time, weathervalue, rows) {
    let max = Math.max.apply(null, weathervalue);
    let min = Math.min.apply(null, weathervalue);
    let table_content = `<h3>Highest = ${max} &nbsp &nbsp &nbsp &nbsp &nbsp Lowest = ${min}</h3> <br>`;
    table_content += `<table id='mytable'> <thead> <tr>
                      <th>Row</th>  <th>Date</th>  <th>Time</th>  <th>${weathertype}</th>
                      </tr> </thead> <tbody>`;
    for (let j = 0; j < rows; j++) {
        table_content += `
            <tr>
              <td>${j + 1}</td>
              <td>${date[j]}</td>
              <td>${time[j]}</td>
              <td>${weathervalue[j]}</td>
            </tr>`
    }
    table_content += `</tbody> </table>`;
    return table_content;
}


// data(one type,now 25) to html table
function dataToTableNow(dataObjects, weathertype) {
    let date = [];
    let time = [];
    let weathervalue = [];

    for (let i = 0; i < 500; i++) {
        if (Object.keys(dataObjects[i].data)[0] == weathertype && time.length < 25) {
            date.push(dataObjects[i].date_time.substr(0, 10));
            time.push(dataObjects[i].date_time.substr(11, 12));
            weathervalue.push(Object.values(dataObjects[i].data)[0]);
        }
    }
    date = date.reverse();
    time = time.reverse();
    weathervalue = weathervalue.reverse();
    return setTableContent(weathertype, date, time, weathervalue, 25);
}




// data(one type,now 20 or hourly) to html table 
function dataToTableHourly(dataObjects, weathertype, rows) {
    let date = [];
    let time = [];
    let weathervalue = [];
    for (let i = 0; i < rows; i++) {
        date.push(dataObjects[i].date_time.substr(0, 10));
        time.push(dataObjects[i].date_time.substr(11, 12));
        weathervalue.push(dataObjects[i][weathertype]);
    }
    return setTableContent(weathertype, date, time, weathervalue, rows);
}


// features: markpoints of max and min,markline of average,tooltip
function setChartOption(weathertype, date_time, weathervalue, charttype) {
    let option = {
        color: '#72B9F9',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: { text: weathertype },
        grid: {
            bottom: '22%'
        },
        xAxis: {
            type: 'category',
            axisLabel: { rotate: 45 },
            data: date_time,
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: weathertype,
                data: weathervalue,
                type: charttype,
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ],
                    itemStyle: {
                        color: 'pink',
                    },
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }],
                    itemStyle: {
                        color: 'red',
                    },
                }
            }
        ]
    };
    return option;
}


// data(one type,now 25) to line chart 
function dataToChartNow(dataObjects, weathertype) {
    let date_time = [];
    let weathervalue = [];
    for (let i = 0; i < 500; i++) {
        if (Object.keys(dataObjects[i].data)[0] == weathertype && date_time.length < 25) {
            date_time.push(dataObjects[i].date_time);
            weathervalue.push(parseFloat(Object.values(dataObjects[i].data)[0]));
        }
    }
    date_time = date_time.reverse();
    weathervalue = weathervalue.reverse();
    return setChartOption(weathertype, date_time, weathervalue, 'line');
}


// data(one type,now 20 or hourly) to bar/line chart 
function dataToChartHourly(dataObjects, weathertype, rows, charttype) {
    let date_time = [];
    let weathervalue = [];
    for (let i = 0; i < rows; i++) {
        date_time.push(dataObjects[i].date_time);
        weathervalue.push(dataObjects[i][weathertype]);
    }
    return setChartOption(weathertype, date_time, weathervalue, charttype);
}


// View 2: shows the information concerning the latest 20 
// measurements of a single type,here is temperature
// measurements, in tabular format.
$(function () {
    $(".T").click((function () {
        let interval = ['', '23', '47', '71', '167'][$(this).index()];
        let rows = [20, 24, 48, 72, 168][$(this).index()];

        const DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/' + interval;
        // const handleFetch = () => {
        fetch(DATA_SOURCE).then(response => { return response.json() })
            .then(data => {
                $(".temp .table").html(dataToTableHourly(data, 'temperature', rows));
                let tempChart = echarts.init(document.querySelector(".temp .chart"));
                tempChart.setOption(dataToChartHourly(data, 'temperature', rows, 'bar'));
            })
            .catch(error => console.error('AAARRRGH!' + error));
        // };
        // setInterval(() => handleFecth(), 1000);
    }))
})


// View 3: shows the information concerning the latest 20 
// measurements of another single type,here is wind-speed
// measurements, in tabular format.
$(function () {
    $(".S").click((function () {
        let interval = ['', '23', '47', '71', '167'][$(this).index()];
        let rows = [20, 24, 48, 72, 168][$(this).index()];

        const DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/' + interval;
        fetch(DATA_SOURCE).then(response => { return response.json() })
            .then(data => {
                $(".speed .table").html(dataToTableHourly(data, 'wind_speed', rows));
                let speedChart = echarts.init(document.querySelector(".speed .chart"));
                speedChart.setOption(dataToChartHourly(data, 'wind_speed', rows, 'bar'));
            })
            .catch(error => console.error('AAARRRGH!' + error));
    }))
})


// View 5: user can select the desired measurement type and time interval 
$(function () {
    $(".hover-me ul li").click((function () {
        let sub1 = $(".hover-me>a").index($(this).parent().parent().siblings());
        let sub2 = $(this).index();
        let weathertype = ['rain', 'wind_speed', 'wind_direction', 'light', 'temperature'][sub1];
        let interval = ['', '23', '47', '71', '167'][sub2];
        let rows = [25, 24, 48, 72, 168][sub2];
        let link = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
        if (sub2 != 0) {
            link = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + weathertype + '/' + interval;
        }

        const DATA_SOURCE = link;
        fetch(DATA_SOURCE).then(response => { return response.json() })
            .then(data => {
                if (sub2 == 0) {
                    $(".more .table").html(dataToTableNow(data, weathertype));
                    let moreChart = echarts.init(document.querySelector(".more .chart"))
                    moreChart.setOption(dataToChartNow(data, weathertype));
                }
                else {
                    $(".more .table").html(dataToTableHourly(data, weathertype, rows));
                    let moreChart = echarts.init(document.querySelector(".more .chart"));
                    moreChart.setOption(dataToChartHourly(data, weathertype, rows, 'line'));
                }
            })
            .catch(error => console.error('AAARRRGH!' + error));
    }))
})


$(function () {
    $(".hover-me").click((function () {
        let subindex = $(this).index();
        let weathertype = ['rain', 'wind_speed', 'wind_direction', 'light', 'temperature'][subindex];

        const DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
        fetch(DATA_SOURCE).then(response => { return response.json() })
            .then(data => {
                $(".more .table").html(dataToTableNow(data, weathertype));
                let moreChart = echarts.init(document.querySelector(".more .chart"));
                moreChart.setOption(dataToChartNow(data, weathertype));
            })
            .catch(error => console.error('AAARRRGH!' + error));
    }))
})

