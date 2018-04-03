(function(){
  'use strict';

  const WIDTH = document.documentElement.clientWidth-20,
        HEIGHT = document.documentElement.clientHeight-20,
        POINT = 60;
  var canvas, ctx, circleArr = [];

  // 定义线条：开始xy坐标，结束xy坐标，线条透明度
  var Line = function(x, y, _x, _y, o){
    this.beginX = x;
    this.beginY = y;
    this.closeX = _x;
    this.closeY = _y;
    this.o = o;
  }
  // 定义点：圆心xy坐标，半径，每帧移动xy的距离
  var Circle = function(x, y, r, moveX, moveY){
    this.x = x;
    this.y = y;
    this.r = r;
    this.moveX = moveX;
    this.moveY = moveY;
  }

  // 绘制圆点
  var drawCircle = function(ctx, x, y, r, moveX, moveY){
    let circle = new Circle(x,y,r,moveX,moveY);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
    return circle;    
  }
  // 绘制线条
  var drawLine = function(ctx, x, y, _x, _y, o){
    let line = new Line(x,y,_x,_y,o);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,'+ o +')';
    ctx.moveTo(line.beginX, line.beginY);
    ctx.lineTo(line.closeX, line.closeY);
    ctx.closePath();
    ctx.stroke();   
  }
  var draw = function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (var i = 0; i < POINT; i++) {
      drawCircle(ctx, circleArr[i].x, circleArr[i].y, circleArr[i].r);
    }
    for (var i = 0; i < POINT; i++) {
      for (var j = 0; j < POINT; j++) {
        if (i + j < POINT) {
          var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
            B = Math.abs(circleArr[i+j].y - circleArr[i].y);
          var lineLength = Math.sqrt(A*A + B*B);
          var C = 1/lineLength*7-0.009;
          var lineOpacity = C > 0.03 ? 0.03 : C;
          if (lineOpacity > 0) {
            drawLine(ctx, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
          }
        }
      }
    }
  }
  // 初始化生成圆点
  var init = function(id){
    for(let i = 0; i < POINT; i++){
      circleArr.push(drawCircle(ctx, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40))
    }
    draw();
  }
  // 生成max和min之前的随机数
  var num = function(max, _min){
    let min = arguments[1] || 0;
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  var BgAnimation = function(id){
    canvas = document.getElementById(id);
    canvas.width = WIDTH, canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; // 笔触颜色宽度
    ctx.strokeWidth = 2.5;
    ctx.fillStyle = 'rgba(64,224,208,0.5)';

    init(); 
    setInterval(function () {
      for (let i = 0; i < POINT; i++) {
        var cir = circleArr[i];
        cir.x += cir.moveX;
        cir.y += cir.moveY;
        if (cir.x > WIDTH) cir.x = 0;
        else if (cir.x < 0) cir.x = WIDTH;
        if (cir.y > HEIGHT) cir.y = 0;
        else if (cir.y < 0) cir.y = HEIGHT;
        
      }
      draw();
    }, 16);
  }
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = BgAnimation;
  } else {
    window.BgAnimation = BgAnimation;
  }
}());