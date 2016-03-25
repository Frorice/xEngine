/*！
 *xengine
 *游戏主体框架类
 *
 */
 (function (win){
 	//游戏主类
 	var _game = win.Game = function(){
 		//保存所有的监听器
 		this.listeners = [];
    this.paused = false;
 	};
 	//程序事件监听器
 	var _appEventListener = win.AppEventListener = function(param){
 
 		//监听器是否生效
 		this.enabled = true;
 		this.onBeforeRender = param["beforeRender"]||this.onBeforeRender;
 		this.onAfterRender = param["afterRender"]||this.onAfterRender;
 

 
 	};


 	win.Game.prototype = {
 		//添加监听器
 		addListener:function(ln){
 			this.listeners.push(ln);
 		},
 		//删除所有监听器
 		clearLintener:function(){
 			this.listeners.length = 0;
 		},
 		//游戏主循环
 		mainloop:function(){
 			//执行游戏主循环
 			var ltns = this.listeners;
 			//触发监听器渲染前事件
 			for(var i = 0;i<ltns.length;i++){
 				ltns[i].enabled&&ltns[i].onBeforeRender();
 			}
 			//触发监听器渲染后事件
 			for(var i = 0;i<ltns.length;i++){
 				ltns[i].enabled&&ltns[i].onAfterRender();
 			}
 		},
 		//执行游戏
 		run:function(fps){
 			//设定默认fps为60帧每秒
 			fps = fps||60;
 			var self = this;
 			var spf = (1000/fps)|0;
 			//开启帧数跟踪
 			FrameState.start();
 			self.tHand = setInterval(function(){
 				//更新帧状态
 				FrameState.update();
 				if(!self.paused){

 					self.mainloop();
 				}
 			},spf);
 		},
 		//暂停游戏
 		pause:function(){
 			this.paused = true;
 		},
 		//终止游戏
 		stop:function(){
 			clearInterval(this.tHand);
 		}
 	};
 
 	//游戏主循环执行渲染操作前触发
 	win.AppEventListener.prototype.onBeforeRender = function(){return true;};
 	//游戏主循环执行渲染操作后触发
 	win.AppEventListener.prototype.onAfterRender = function(){return true;};

 }(window));	