(function(){
  var g = new Game();
  //创建游戏场景
  function initGame(){
    //获取场景管理器
    var scm = new SceneManager();
    g.sceneManager = scm;
    //创建场景
    var sc = scm.createScene([{"w":400, "h":300}]);
    initRenderObj(sc);
  }
  //创建游戏精灵
  function initRenderObj(sc){
    //随机创建20个小球
    for(var i = 0;i < 20;i++){

      var obj = sc.createRObj(Ball);
      //设置随机位置
      obj.prototype.moveTo(Math.random()*360+20,Math.random()*360+20);
      //设置随机速度0~3
      obj.prototype.dx = Math.random()*3;
      obj.prototype.dy = Math.random()*3;
      //设置随机颜色
      obj.color = "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";
    }
  }
  //初始游戏
  initGame();

  g.run(50);
})();