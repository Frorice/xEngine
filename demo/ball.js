(function (){
  //从引擎的RendeObj继承
  window.Ball = function(name,r){
    //定义半径
    this.r = r||10;
    this.color = "white";
    this.prototype = new RenderObj(name);

  
  //重写update
  this.update = function(){

      this.prototype.moveStep();
      var w = this.owner.w,
          h = this.owner.h;
      //到达边界改变速度方向
      if(this.prototype.x<this.r||this.prototype.x>w-this.r){
        this.prototype.dx = -this.prototype.dx;
      }
      if(this.prototype.y<this.r||this.prototype.y>h-this.r){
        this.prototype.dy = -this.prototype.dy;
      }
      //调用父类方法
      this.prototype.update();
    };
  //重写render方法 
  this.render=function (ctx){
      //画球填充中心
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.prototype.x,this.prototype.y,this.r-3,0,Math.PI*2);
      ctx.fill();
      ctx.lineWidth = 2;
      //描边
      ctx.beginPath();
      ctx.strokeStyle = "#ffffff";
      ctx.arc(this.prototype.x,this.prototype.y,this.r,0,Math.PI*2);
      ctx.stroke();
      
    };
  }; 
})();