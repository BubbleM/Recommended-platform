const Model = require('../../mocks/article/list');
module.exports = app => {
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      // await ctx.render('home/home.js', Model.getPage(1, 2));
      await ctx.render('index/index.js')
    }

    async home(){
      const { ctx } = this;
      await ctx.render('home/home.js', Model.getPage(1, 2));
    }

    async login(){
      const { ctx } = this;
      await ctx.render('login/login.js');
    }

    async register(){
      const { ctx } = this;
      await ctx.render('register/register.js');
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