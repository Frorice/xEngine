(function(){
  var g = new Game();
  //创建游戏场景
  function initGame(){
    //获取场景管理器
    var scm = new SceneManager();
    g.sceneManager = scm;
    //创建场景
    var sc = scm.createScene({"w":"1280", "h":600});
    sc.setColor("rgba(0,0,0,0)");
    initRenderObj(sc);
  }
  //创建游戏精灵
  function initRenderObj(sc){
    //随机创建20个小球
    for(var i = 0;i < 20;i++){

      var obj = sc.createRObj(Ball);
      //设置随机位置
      obj.prototype.moveTo(Math.random()*1200,Math.random()*600);
      //设置随机速度0~3
      obj.prototype.dx = Math.random()*2;
      obj.prototype.dy = Math.random()*2;
      //设置随机颜色
      obj.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
    }
  }
  //初始游戏
  initGame();

  g.run(50);
})();