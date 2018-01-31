import React, { Component } from 'react';
import Header from 'component/header/header.jsx';
import fetchJsonp from 'fetch-jsonp';
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
        this.submitData = this.submitData.bind(this);
        this.getFormatData = this.getFormatData.bind(this);
    }

    componentDidMount() {
        let editor = ace.edit(this.refs.codeEditor);
        editor.getSession().setMode('ace/mode/javascript');
        editor.setTheme('ace/theme/monokai');
    }

    render() {
        let self = this;
        return <div>
            <Header></Header>
            <div className='editPanel'>
                <div ref="codeEditor" className='codeEditor'></div>
                <div className='panel-info'>
                    <button className='editBtn' onClick={this.submitData}>提交数据</button>
                    <div></div>
                    <button className='editBtn' onClick={this.getFormatData}>格式化数据</button>
                </div>
            </div>
        </div>;
    }
    getFormatData(){
        let self = this;
        let editor = ace.edit(self.refs.codeEditor);
        let data = editor.getValue();
        let format = jsBeautify.js_beautify(data, { indent_size: 2 });
        editor.setValue(format);
    }
    // 提交用户上传数据
    submitData(){
        let self = this;
        let data = ace.edit(self.refs.codeEditor).getValue();
        // 格式化后进行校验 校验通过进行处理
        fetchJsonp('http://127.0.0.1:7001/submit?data='+data)
        .then(function(response) { return response.json();})
        .then(res => {
            console.log(res);
            if (res) {
                window.location.href='http://127.0.0.1:7001/showPage';
            }
        });
    }
}