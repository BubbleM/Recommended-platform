import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import fetchJsonp from 'fetch-jsonp';
// 引入 ECharts 主模块
import Echarts from 'echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './index.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        let options = {
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
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        this.state = { option: options };
    }

    componentDidMount() {
        fetchJsonp('http://127.0.0.1:8000/hello')
        .then(function(response) { return response.json();})
        .then(res => {
            console.log(res);
        });
        var myChart = Echarts.init(document.getElementById('main'));
        myChart.setOption(this.state.option);
    }

    render() {
        let self = this;
        return <div>
            <Header></Header>
            <div id='main' className="mains"></div>
            <div className='gadeEchart'>
                <button onClick={self.chooseChart.bind(self,'line')}>折线图</button>
                <button onClick={self.chooseChart.bind(self,'bar')}>条形图</button>
                <button onClick={self.chooseChart.bind(self,'pie')}>饼状图</button>
            </div>
        </div>;
    }

    chooseChart(type){
        let self = this;
        var myChart = Echarts.init(document.getElementById('main'));
        let { option } = self.state;
        option.series[0].type = type;
        self.setState({option: option},function(){
            myChart.setOption(option);
        })
    }
}