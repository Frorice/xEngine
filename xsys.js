/*! 
 *  xengine
 *  游戏系统类
 */

 (function(win){
 	var _FState = win.FrameState = {
 		//最大帧数
 		maxFrame : 0,
 		//最小帧数
 		minFrame : 9999,
 		//即时帧数
 		currFrame: 0,
 		//当前时间
 		currTime : 0,
 		//每帧流逝的时间
 		elapseTime:0,
 		//用于统计每秒开始时间
 		_sTime : 0,
 		//统计每秒总帧数
 		_sTFrame : 0,
 		//启动帧状态检测器
 		start:function (){
 			this.currTime = this._sTime = new Date();
 		},
 		//每帧在游戏循环前调用此方法。更新和计算帧数
 		update:function (){
 			var fTime = new Date();
 			if(fTime-this._sTime>=1000){
 				//当前帧数
 				this.currFrame = this._sTFrame;
 				//计算最大帧数
 				this.maxFrame = (this.currFrame>this.maxFrame)?this.currFrame:this.maxFrame;
 				//计算最小帧数
 				this.minFrame = (this.currFrame<this.minFrame)?this.currFrame:this.minFrame;
 				this._sTFrame = 0;
 				this._sTime = fTime; 
 			}else{
 				++this._sTFrame;
 			}
 			this.elapseTime = fTime-this.currTime;
 			this.currTime = fTime;
 		}

 	};
 }(window));