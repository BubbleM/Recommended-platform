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
// 代码格式化
import jsBeautify from 'js-beautify/js/lib/beautify'
let ace // 代码上传区域编辑器样式
if (typeof window !== 'undefined') {
  ace = require('brace')
  require('brace/mode/javascript')
  require('brace/theme/monokai')
  require('brace/ext/language_tools')
  require('brace/ext/searchbox')
//   require('./snippets')
}

export default class Home extends Component {
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
        this.submitData = this.submitData.bind(this);
        this.getFormatData = this.getFormatData.bind(this);
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
            // var myChart = Echarts.init(document.getElementById('main'));
            // myChart.setOption(self.state.option);
        });
    }

    componentDidMount() {
        let editor = ace.edit(this.refs.codeEditor);
        editor.getSession().setMode('ace/mode/javascript');
        editor.setTheme('ace/theme/monokai');

        let users = {'Angelica': {'Blues Traveler': 3.5, 'Broken Bells': 2.0, 'Norah Jones': 4.5, 'Phoenix': 5.0,
        'Slightly Stoopid': 1.5, 'The Strokes': 2.5, 'Vampire Weekend': 2.0},
'Bill':     {'Blues Traveler': 2.0, 'Broken Bells': 3.5, 'Deadmau5': 4.0, 'Phoenix': 2.0,
        'Slightly Stoopid': 3.5, 'Vampire Weekend': 3.0},
'Chan':     {'Blues Traveler': 5.0, 'Broken Bells': 1.0, 'Deadmau5': 1.0, 'Norah Jones': 3.0,
         'Phoenix': 5, 'Slightly Stoopid': 1.0},
'Dan':      {'Blues Traveler': 3.0, 'Broken Bells': 4.0, 'Deadmau5': 4.5, 'Phoenix': 3.0,
        'Slightly Stoopid': 4.5, 'The Strokes': 4.0, 'Vampire Weekend': 2.0},
'Hailey':   {'Broken Bells': 4.0, 'Deadmau5': 1.0, 'Norah Jones': 4.0, 'The Strokes': 4.0,
         'Vampire Weekend': 1.0},
'Jordyn':   {'Broken Bells': 4.5, 'Deadmau5': 4.0, 'Norah Jones': 5.0, 'Phoenix': 5.0,
        'Slightly Stoopid': 4.5, 'The Strokes': 4.0, 'Vampire Weekend': 4.0},
'Sam':      {'Blues Traveler': 5.0, 'Broken Bells': 2.0, 'Norah Jones': 3.0, 'Phoenix': 5.0,
         'Slightly Stoopid': 4.0, 'The Strokes': 5.0},
'Veronica': {'Blues Traveler': 3.0, 'Norah Jones': 5.0, 'Phoenix': 4.0, 'Slightly Stoopid': 2.5,
         'The Strokes': 3.0}
}
        
        fetchJsonp('http://127.0.0.1:8000/hello?data='+JSON.stringify(users))
        .then(function(response) { return response.json();})
        .then(res => {
            this.formatData(res);
        });
    }

    render() {
        let self = this;
        return <div className='showData'>
            <Header></Header>
            <div className='leftUpload'>
                <div ref="codeEditor" className='codeEditor'></div>
                <button onClick={this.submitData}>提交数据</button>
                <button onClick={this.getFormatData}>格式化数据</button>
            </div>
           {/*  <div className='rightShow'>
                <div id='main' className='main'></div>
                <div className='gadeEchart'>
                    <button onClick={self.chooseChart.bind(self,'line')}>折线图</button>
                    <button onClick={self.chooseChart.bind(self,'bar')}>条形图</button>
                    <button onClick={self.chooseChart.bind(self,'pie')}>饼状图</button>
                </div>
            </div> */}
        </div>;
    }

    chooseChart(type){
        let self = this;
        // var myChart = Echarts.init(document.getElementById('main'));
        let { option } = self.state;
        option.series[0].type = type;
        self.setState({option: option},function(){
            myChart.setOption(self.state.option);
        });
    }
    submitData(){
        let self = this;
        let data = ace.edit(self.refs.codeEditor).getValue();
        // 格式化后进行校验 校验通过进行处理
        fetchJsonp('http://127.0.0.1:7001/submit?data='+data)
        .then(function(response) { return response.json();})
        .then(res => {
            this.formatData(res);
        });

        // const result = ctx.curl('http://127.0.0.1:7001/submit', {
        //     // 必须指定 method
        //     method: 'POST',
        //     // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        //     contentType: 'json',
        //     data: {
        //       data: data
        //     //   now: Date.now(),
        //     },
        //     // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        //     dataType: 'json',
        //   });
        //   ctx.body = result.data;

    }
    getFormatData(){
        let self = this;
        let editor = ace.edit(self.refs.codeEditor);
        let data = editor.getValue();
        let format = jsBeautify.js_beautify(data, { indent_size: 2 });
        editor.setValue(format);
    }
}