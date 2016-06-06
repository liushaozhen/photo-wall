/**
 * Created by Administrator on 2016/4/9.
 * 拖拽库
 */

/**
 * 鼠标按下
 * @param e  事件对象
 */
function down(e){
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx= e.pageX;
    this.my= e.pageY;
    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
    }else{
        this.MOVE=move.bind(this);
        this.UP=up.bind(this);//这个eles中不是ie，所以可以用bind，不考虑ie兼容
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();//去掉默认行为
    selfRun.call(this,"selfdragstart",e);
}
/**
 * 鼠标移动
 * @param e  事件对象
 */
function move(e){
    this.style.left=this.x+ e.pageX-this.mx+"px";
    this.style.top=this.y+ e.pageY-this.my+"px";
    selfRun.call(this,"selfdraging",e);
}

/**
 * 鼠标松开
 * @param e 事件对象
 */
function up(e){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    selfRun.call(this,"selfdragend",e);
}
