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
                name: '可能喜欢的物品',
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '喜爱程度',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        this.state = { option: options, datas: [], objs: []};
        this.formatData = this.formatData.bind(this);
        this.setDataFn = this.setDataFn.bind(this);
        this.showResult = this.showResult.bind(this);
    }

    componentDidMount() {
        let data = '';
        let _self = this;
        fetchJsonp('http://127.0.0.1:7001/getUploadData')
        .then(function(response) { return response.json();})
        .then(res => {
            data = res[0].data; // 暂时选择当前用户最早上传的一条数据作为模拟数据
            this.setState({datas: res});
        });
    }
    showResult(){
        let _self = this, data = '';
        let { datas,option } = _self.state;
        let setData = document.getElementById('setData').value;
        let obj = document.getElementById('setObj').value;
        option.title.text = obj+'的推荐结果展示';
        _self.setState({option: option});
        datas.map(item => {
            if (item.id == setData) {
                data = item.data;
            }
        })
        fetchJsonp('http://127.0.0.1:8000/hello?data='+data+'&user='+obj)
        .then(function(response) { return response.json();})
        .then(res => {
            _self.formatData(res);
        });
    }
    setDataFn(e){
        let val = e.target.value; // 用户选择数据集
        fetchJsonp('/showRecommendObj?dataId='+val)
        .then(function(response) { return response.json();})
        .then(res => {
            this.setState({objs: res});
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
        let { datas, objs } = this.state;
        return <div>
            <Header></Header>
            <div className='showData'>
                <div>
                    <div className='gadeEchart'>
                        <button onClick={self.chooseChart.bind(self,'line')}>折线图</button>
                        <button onClick={self.chooseChart.bind(self,'bar')}>条形图</button>
                        <button onClick={self.chooseChart.bind(self,'pie')}>饼状图</button>
                    </div>
                    <select id='setData' onChange={(e) => self.setDataFn(e)}>
                        <option value="" selected>请选择推荐数据集</option>
                    {
                        datas.map((item, index)=> {
                            return <option key={index} value={item.id}>{item.id}</option>
                        })
                    }
                    </select>
                    <select id='setObj'>
                        <option value="" selected>请选择推荐对象</option>
                    {
                        objs.map((item, index)=> {
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                    </select>
                    <select>
                        <option>请选择推荐算法</option>
                        <option value="Bill">基于用户的协同过滤</option>
                        <option value="Hailey">基于物品的协调过滤</option>
                        <option value="Sam">层次聚类</option>
                        <option value="Veronica">分类算法</option>
                    </select>
                    <button type="button" onClick={self.showResult}>查看结果</button>
                </div>
                <div id='main' className='main'></div>
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