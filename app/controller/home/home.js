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
    async submit(){ // 提交数据
      const { ctx } = this;
      const query = this.ctx.query.data;
      await this.app.mysql.insert('info', {attr: query, uid:1});
    }
    async login(){ // 平台用户登陆
      const { ctx } = this;
      const data = this.ctx.query;
      let result = await this.app.mysql.query('select pwd from user where phone = ?', [data.phone]);
      if (result[0].pwd === data.pwd) {
        ctx.cookies.set('username', data.phone, {maxAge: 1000*60*60*24});
        ctx.redirect('/');
      } else {
        // 登陆失败
      }
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