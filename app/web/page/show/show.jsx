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
import './show.css';

export default class Show extends Component {
    constructor(props) {
        super(props);
        let options = {
            title: {
                text: '推荐结果展示'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '相关程度',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        this.state = { option: options };
        this.formatData = this.formatData.bind(this);
    }

    componentDidMount() {
        let data = '';
        let _self = this;
        fetchJsonp('http://127.0.0.1:7001/getUploadData')
        .then(function(response) { return response.json();})
        .then(res => {
            data = res[0].data;

            fetchJsonp('http://127.0.0.1:8000/hello?data='+data)
            .then(function(response) { return response.json();})
            .then(res => {
                _self.formatData(res);
            });
        });
    }

    formatData(res) {
        let self = this, xData = [], yData = [];
        let { option } = self.state;

        res.forEach(item => {
            xData.push(item[0]);
            yData.push(item[1]);
        });
        option.xAxis.data = xData;
        option.series[0].data = yData;
        self.setState({option: option},function(){
            var myChart = Echarts.init(document.getElementById('main'));
            myChart.setOption(self.state.option);
        });
    }

    render() {
        let self = this;
        return <div className='showData'>
            <Header></Header>
           <div id='main' className='main'></div>
            <div className='gadeEchart'>
                <button onClick={self.chooseChart.bind(self,'line')}>折线图</button>
                <button onClick={self.chooseChart.bind(self,'bar')}>条形图</button>
                <button onClick={self.chooseChart.bind(self,'pie')}>饼状图</button>
            </div>
            <div>
                <section>
                    <option value="Bill"></option>
                    <option value="Hailey"></option>
                    <option value="Sam"></option>
                    <option value="Veronica"></option>
                </section>
            </div>
        </div>;
    }

    chooseChart(type){
        let self = this;
        var myChart = Echarts.init(document.getElementById('main'));
        let { option } = self.state;
        option.series[0].type = type;
        self.setState({option: option},function(){
            myChart.setOption(self.state.option);
        });
    }
    
}