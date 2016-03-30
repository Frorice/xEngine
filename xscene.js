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
    //保存所有的监听器
    this.listeners = [];
    //记录所有的渲染对象
    this.rObjs = [];
    //命名的渲染对象，便于根据名称快速查找对象
    this.namedRObjs = {};
 	};

 	win.Scene.prototype = {
    createRObj:function(className,arg){
      className = className || win.RenderObj;
      var obj = new className();
      this.addRObj(obj);
      return obj;
    },
    //添加到rObjs中
    addRObj:function(renderObj){
      renderObj.owner = this;
      this.rObjs.push(renderObj);
      this.namedRObjs[renderObj.name] = renderObj;
    },
    //删除对象
    removeRObj:function(renderObj){
      this.removeRObjByName(renderObj.name);
    },
    //根据名称设置对象删除标记
    removeRObjByName:function(name){
      this.namedRObjs[name] && (this.namedRObjs[name].canRemove=true||true);
    },
    //移除所有置可移除标记的对象
    removeAllCanRemove:function(){
      for(var i=0;i<this.rObjs.length;i++){
        var o = this.rObjs[i];
        if(o.canRemove){
          delete this.namedRObjs[o.name];
          this.rObjs.splice(i,1);
        }
      }
    },
    //根据名称查找对象
    getRObjByName:function (name){
      return this.namedRObjs[name];
    },
    //清除所有渲染对象
    clearRObj:function(){
      this.rObjs = [];
      this.namedRObjs = [];
    },
    //添加监听器
    addListener:function (ln){
      this.listeners.push(ln);
    },
    //清空监听器列表
    clearListener:function(){
      this.listeners.length = 0;
    },
    //更新场景
    update:function(){
      for(var i = 0;i<this.rObjs.length;i++){
        this.rObjs[i].update();
      }
      this.removeAllCanRemove();
    },
    //执行渲染
    render:function (){
      var ltns = this.listeners;
      //先清除场景，再渲染
      this.clear();
      
      this.renderRObj();
      
    },
    //渲染所有对象
    renderRObj:function (){
      for(var i = 0,len = this.rObjs.length;i<len;i++){
        this.ctx.save();
        this.rObjs[i].prototype.isVisible&&this.rObjs[i].render(this.ctx);
        this.ctx.restore();
      }
    },
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