const Model = require('../../mocks/article/list');
module.exports = app => {
  return class AppController extends app.Controller {
    async indexPage() {
      const { ctx } = this;
      await ctx.render('home/home.js', Model.getPage(1, 10));
    }
    async loginPage(){
      const { ctx } = this;
      await ctx.render('login/login.js');
    }
    async registerPage(){
      const { ctx } = this;
      await ctx.render('register/register.js');
    }
    async homePage(){
      const { ctx } = this;
      if (ctx.cookies.get('username')) {
        await ctx.render('index/index.js');
      } else {
        await ctx.render('login/login.js', {info: '请登陆后查看'});
      }    
    }
    async showPage(){
      const { ctx } = this;
      if (ctx.cookies.get('username')) {
        await ctx.render('show/show.js'); 
      } else {
        await ctx.render('login/login.js', {info: '请登陆后查看'});
      }     
    }

    async register(){ // 平台用户注册
      const { ctx } = this;
      const data = this.ctx.query;
      let result = await this.app.mysql.insert('user', {username: data.username, phone: data.phone, pwd: data.pwd});
      if (result.affectedRows == 1) { 
        ctx.redirect('/');
      } else {
        // 注册失败
      }
    }
    async submit() { // 提交数据
      const { ctx } = this;
      const query = this.ctx.query.data;
      const _callback = ctx.query.callback;
      const userPhone = this.ctx.cookies.get("username");
      const userId = await this.app.mysql.query('select id from user where phone = ?', [userPhone]);
      if (userId.length > 0) {
        let result = await this.app.mysql.insert('uploadData', {data: query, uid: userId[0].id});
        if (result.affectedRows == 1) {
          ctx.type = 'text/javascript';
          ctx.body = _callback + '(' + JSON.stringify(result) + ')';
          // 提交数据成功 重定向到展示数据页面
        }
      } else {
        // 插入失败
      }
    }
    async login(){ // 平台用户登陆
      const { ctx } = this;
      const data = this.ctx.query;
      const result = await this.app.mysql.query('select pwd from user where phone = ?', [data.phone]);
      if (result[0].pwd === data.pwd) {
        ctx.cookies.set('username', data.phone, {maxAge: 1000*60*60*24});
        ctx.redirect('/');
      } else {
        // 登陆失败
      }
    }
    async getUploadData(){ // 获取用户上传数据
      const { ctx } = this;
      const _callback = ctx.query.callback;
      const userPhone = ctx.cookies.get("username");
      const userId = await this.app.mysql.query('select id from user where phone = ?', [userPhone]);
      if (userId.length > 0) {
        const result = await this.app.mysql.query('select * from uploadData where uid = ?', [userId[0].id]);
        ctx.type = 'text/javascript';
        ctx.body = _callback + '(' + JSON.stringify(result) + ')';
      }
    }
    async showRecommendObj(){ // 获取推荐对象集合
      const { ctx } = this;
      const _callback = ctx.query.callback;
      const dataId = ctx.query.dataId;
      const result = await this.app.mysql.query('select data from uploadData where id = ?', [dataId]);
      ctx.type = 'text/javascript';
      let obj = []; // 获取推荐对象集合
      let dataObj = JSON.parse(result[0].data);
      for(let o in dataObj){
        obj.push(o);
      }
      ctx.body = _callback + '(' + JSON.stringify(obj) + ')';
    }
   /*  async client() {
      const { ctx } = this;
      await ctx.renderClient('home/home.js', Model.getPage(1, 10));
    }

    async element() {
      const { ctx } = this;
      ctx.render('element/element.js', Model.getPage(1, 10));
    } */

   /*  async pager() {
      const { ctx } = this;
      const pageIndex = ctx.query.pageIndex;
      const pageSize = ctx.query.pageSize;
      ctx.body = Model.getPage(pageIndex, pageSize);
    } */
  };
};