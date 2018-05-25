import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import Star from 'component/star/star.jsx';
import fetchJsonp from 'fetch-jsonp';
// 引入 ECharts 主模块
import Echarts from 'echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './show.sass';

export default class Show extends Component {
  constructor(props) {
    super(props);
    let options = {
      // title: {
      //   text: '推荐结果展示',
      //   textStyle: {
      //     color: 'green',
      //     fontSize: 14,
      //     fontWeight: 'bold'
      //   }
      // },
      tooltip: {},
      xAxis: {
        name: 'Like',
        type: 'category',
        axisLabel: {
          interval: 0 // X坐标轴所有属性全展示
        },
        nameGap: 2,
        nameTextStyle: {
          fontSize: 12,
          align: 'left'
        },
        data: ['Blue Traveler', 'Deadmau5', 'Broken', 'Bells', 'Strokes', 'Books']
      },
      yAxis: {
        min: 0
      },
      series: [{
        name: '喜爱程度',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    this.myChart = {};
    this.state = { option: options, datas: [], objs: [], 
      titleInfo: '推荐结果展示', analyze: {} };
    this.formatData = this.formatData.bind(this);
    this.setDataFn = this.setDataFn.bind(this);
    this.showResult = this.showResult.bind(this);
  }
  showResult() {
    let _self = this, data = '';
    let { datas, option, titleInfo } = _self.state;
    let setData = document.getElementById('setData').value;
    let obj = document.getElementById('setObj').value;
    let recommendMethod = document.getElementById('setRecommend').value;
    titleInfo = ' ~_~ '+obj + '的推荐结果展示';
    _self.setState({titleInfo: titleInfo });
    datas.map(item => {
      if (item.id == setData) {
        data = item.data;
      }
    })
    fetchJsonp('http://127.0.0.1:8000/recommened?data=' + data + '&user=' + obj + '&recommendMethod=' + recommendMethod)
      .then(function (response) { return response.json(); })
      .then(res => {
        _self.formatData(res);
        _self.setAnalyze(obj, res);
      });
  }
  setDataFn(e) {
    let val = e.target.value; // 用户选择数据集
    fetchJsonp('/showRecommendObj?dataId=' + val)
      .then(function (response) { return response.json(); })
      .then(res => {
        this.setState({ objs: res });
      });
  }
  setAnalyze(obj, info) {
    // 对推荐结果按照评分进行排序
    info.sort((a,b) => {
      return b[1] - a[1];
    });
    let { analyze } = this.state;
    analyze.obj = obj;
    analyze.info = info;
    this.setState({analyze: analyze});
    console.log(this.state.analyze);
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
    self.setState({ option: option }, function () {
      for(let chart in self.myChart){
        let type = chart.split('Chart')[0];
        self.state.option.series[0].type = type;
        self.myChart[chart].setOption(self.state.option);
      }
    });
  }
  chooseChart(chartId,type) {
    let self = this;
    let { option } = self.state;
    self.myChart[chartId] = Echarts.init(document.getElementById(chartId));
    option.series[0].type = type;
    self.setState({ option: option }, function () {
      self.state.option.series[0].type = type;
      self.myChart[chartId].setOption(self.state.option);
    });
  }
  componentWillMount() {
    let data = '';
    let _self = this;
    fetchJsonp('http://127.0.0.1:7001/getUploadData')
      .then(function (response) { return response.json(); })
      .then(res => {
        data = res[0].data; // 暂时选择当前用户最早上传的一条数据作为模拟数据
        this.setState({ datas: res });
      }
    );
  }
  render() {
    let self = this;
    let { datas, objs, analyze } = this.state;
    return <div>
      <Header></Header>
      <div className='showData_wrap'>
        <div className='select_wrap'>
          <select id='setData' className='btn btn-primary' onChange={(e) => self.setDataFn(e)}>
            <option value="" selected>请选择推荐数据集</option>
            {
              datas.map((item, index) => {
                return <option key={index} value={item.id}>{item.id}</option>
              })
            }
          </select>
          <select id='setObj' className='btn btn-primary'>
            <option value="" selected>请选择推荐对象</option>
            {
              objs.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
              })
            }
          </select>
          <select id = 'setRecommend' className='btn btn-primary'>
            <option>请选择推荐算法</option>
            <option value="UserCF">基于用户的协同过滤</option>
            <option value="ItemCF">基于物品的协调过滤</option>
            <option value="Cluster">层次聚类</option>
            <option value="Classify">分类算法</option>
          </select>
          <button type="button" className='btn btn-success' onClick={self.showResult}>查看结果</button>
        </div>
        <div className="pageTitle">{self.state.titleInfo}</div>
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <div id='lineChart' className='chartWrap'></div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div id='pieChart' className='chartWrap'></div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div id='barChart' className='chartWrap'></div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div id='scatterChart' className='chartWrap'></div>
          </div>
        </div>
        <div className="pageTitle">推荐结果分析</div>
        {JSON.stringify(analyze) !== '{}' && analyze.info.length > 0 ? 
        <div className="analyzeResult">
          <div className='topTitle'>{analyze.obj}最有可能会喜欢的是:</div>    
          {
            analyze.info.map((child, index) => {
              if (index < 10) {
                return (
                  <div className='topInfo'>{'TOP0'+(index-0+1)} {child[0]} 推荐指数 <Star size='36' score={child[1]}></Star></div>
                )
              }
            })
          }                                                                                                                                     
          {/* <div className='topInfo'>TOP01: {analyze.info[0][0]} 推荐指数 <Star size='36' score={analyze.info[0][1]}></Star></div> */}
          {/* <div className='topInfo'>TOP02: {analyze.info[1][0]} 推荐指数 <Star size='36' score={analyze.info[1][1]}></Star></div> */}
          {/* <div className='topInfo'>TOP03: {analyze.info[2][0]} 推荐指数 <Star size='36' score={analyze.info[2][1]}></Star></div> */}
        </div> : 
        <div className="analyzeResult">选择推荐对象，平台会给出相应的结果分析报告哦～</div>}
      </div>
    </div>;
  }
  componentDidMount() {
    let _self = this;
    _self.chooseChart('lineChart', 'line');
    _self.chooseChart('pieChart', 'pie');
    _self.chooseChart('barChart', 'bar');
    _self.chooseChart('scatterChart', 'scatter');
  }
}