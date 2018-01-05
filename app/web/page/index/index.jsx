import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import fetchJsonp from 'fetch-jsonp';
// 引入 ECharts 主模块
import Echarts from 'echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './index.css';

export default class Home extends Component {
  componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = Echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });

        // const url = "/ajax?action=getchexingconf&source=car&value="+value+"&cateid="+cateid        
        fetchJsonp('http://127.0.0.1:8000/hello')
        .then(function(response) { return response.json();})
        .then(res => {
            console.log(res);
        })

        /* const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8000/hello', true);
        xhr.withCredentials = true;
        xhr.send();
        xhr.onreadystatechange = () =>{
            if(xhr.readyState == XMLHttpRequest.DONE){
                if(xhr.status == 200){
                    console.log(xhr.responseText);
                    let gotServices = JSON.parse(xhr.responseText);
                }
            }else{
                alert('ajax失败了');
            }
        } */
  }

  render() {
    return <div>
        <Header></Header>
        <div id='main' className="mains"></div>
        <div id='gadeEchart'>
            <button>折线图</button>
            <button>条形图</button>
            <button>饼状图</button>
        </div>
    </div>;
  }
}