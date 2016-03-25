/*!
 *xengine
 *游戏场景类
 */
 (function (win){
 	//场景类
 	var _scene = win.Scene =function (arg){
 	
 		arg = arg || {};
 		//场景名称
 		this.name = arg.name || ("Unnamed_"+(++_scene.SID));
 		//位置信息
 		this.x = arg.x || 0;
 		this.y = arg.y || 0;
 		this.w = arg.w || 320;
 		this.h = arg.h || 200;
 		this.color = arg.color || "black";
 		//场景容器
 		this.holder = document.createElement("div");
 		this.holder.setAttribute("id","sc_"+this.name);
 		this.holder.setAttribute("style","position:absolute;overflow:hidden;left:0px;top:0px");
 		//绑定的canvas元素，以后的精灵都在这个canvas上进行绘制
 		this.cvs = document.createElement("canvas");
 		this.cvs.setAttribute("id","cv_"+this.name);
 		this.cvs.setAttribute("style","z-index:-1;position:absolute;left:0px;top:0px");
 		this.ctx = this.cvs.getContext("2d");
 		this.setPos();
 		this.setSize();
 		this.setColor(this.color);
 		this.holder.appendChild(this.cvs);
 		document.body.appendChild(this.holder);

 	};

 	win.Scene.prototype = {
 		//设置位置
 		setPos:function(x,y){
 			this.x = x || this.x;
 			this.y = y || this.y;
 			this.holder.style.left = this.x;
 			this.holder.style.top = this.y;
 		},
 		//设置大小
 		setSize:function(w,h){
 			this.w = w || this.w;
 			this.h = h || this.h;

 			this.holder.style.width = this.w+"px";
 			this.holder.style.height = this.h+"px";
 			this.cvs.setAttribute("width",this.w);
 			this.cvs.setAttribute("height",this.h);
 		},
 		//设置背景
 		setColor:function (color) {
 			this.color = color || "black";
 			this.holder.style.backgroundColor = this.color;
 		},
 		//更新场景
 		update:function(){
 			//更新所有精灵
 		},
 		//执行渲染
 		render:function(){
 			//渲染所有精灵
 		},
 		//清除背景
 		clear:function(){
 			this.ctx.clearRect(0,0,this.w,this.h);
 		},
 		//显示
 		show:function(){
 			this.holder.display = "inherit";
 		},
 		//隐藏
 		hide:function(){
 			this.holder.display = "none";
 		},
 		//设置背景，pattern:0(居中)，1（拉伸），默认（平铺）
 		setBGImg:function(imgURL,pattern){
 			this.holder.style.backgroundImage = "url("+imgURL+")";
 			switch(pattern){
 				case 0 :
 					this.holder.style.backgroundRepeat = "no-repeat";
 					this.holder.style.backgroundPostion = "center";
 					break;
 				case 1 :
 					this.holder.style.backgroundSize = this.w+"px"+this.h+"px";
 					break;
 			} 
 		},
 		//清除相关所有资源
 		clean:function(){
 			this.cvs.remove();
 			this.holder.remove();
 			this.cvs = this.holder = this.ctx = null; 
 		}
 	};
  //记录scene编号
  _scene.SID = 0;
 }(window));