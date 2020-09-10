import AudioManage from './audio.js'
/**
 * 进度条
 */
export class Bar {
	constructor() {
		this.durTime = 0 //存储总时间
		this.frameId = null //定时器
		this.startTime = 0 //开始播放的时间
		this.lastPercent = 0 // 上次已经走的百分比
		this.getDom() //获取元素
	}
	/**
	 * 获取元素
	 */
	getDom() {
		this.curTime = document.querySelector('.curTime')
		this.circle = document.querySelector('.circle')
		this.frontBg = document.querySelector('.frontBg')
		this.totalTime = document.querySelector('.totalTime')
	}
	/**
	 * 渲染总时间
	 * @param {*} time 时间
	 */
	renderAllTime(time) {
		this.durTime = time // 更新总时间
        time = this.formatTime(time) //修改格式
		this.totalTime.innerHTML = time
	}
	/**
	 * 时间格式
	 */
	formatTime(time) {
        time = Math.round(time)
		//266	->	04:26
		let m = Math.floor(time / 60) // 分
        let s = time % 60 // 秒
		m = m < 10 ? '0' + m : m
		s = s < 10 ? '0' + s : s
		return m + ':' + s
	}
	move(per) {
        let This = this
		//用户传百分比了，按用户的走；用户没有传按this.lastPercent走
		this.lastPercent = per === undefined ? this.lastPercent : per
		//播放的时候切换到下一首，再按暂停是无效。由于上次的定时器没有清掉
		cancelAnimationFrame(this.frameId)
		this.startTime = new Date().getTime()
		//计算时间与进度条走的百分比
		function frame() {
			let curTime = new Date().getTime()
			//当前歌曲播放的百分比，考虑到暂停后播放，所以需要加上上次播放的百分比
			let per = This.lastPercent + (curTime - This.startTime) / (This.durTime * 1000)
			if (per <= 1) {
				//这个条件成立说明，当前歌曲还没有播放完
				This.update(per)
			} else {
				// 清除
				cancelAnimationFrame(This.frameId)
			}
            This.frameId = requestAnimationFrame(frame)
		}
		frame()
	}
	update(per) {
		//更新左侧时间
		let time = this.formatTime(per * this.durTime)
        this.curTime.innerHTML = time
		//更新进度条位置
		this.frontBg.style.width = per * 100 + '%'
		//更新圆点位置
        let l = per * this.circle.parentNode.offsetWidth
		this.circle.style.transform = `translateX(${l}px)`
	}
	stop() {
		cancelAnimationFrame(this.frameId)
		let stopTime = new Date().getTime()
		//从第2次暂停后就不对了，原因是没有加上前几次的时间。与上面计算 per的道理是一样的
		this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000)
	}
}
/**
 * 拖拽进度条
 */
export class Drag {
	constructor(obj) {
		this.obj = obj
		this.startPointX = 0
		this.startLeft = 0
		this.percent = 0
		this.init()
	}
	init() {
		// 添加一个初始的位移值，目的是默认的时候能取到它
        this.obj.style.transform = 'translateX(0)'
        // 拖拽开始
        this.obj.addEventListener('touchstart',(e)=>{
            this.startPointX = e.changedTouches[0].pageX;
            this.startLeft = parseFloat(this.obj.style.transform.split('(')[1]);
            // 留给用户调用
            this.start && this.start(); 
        })
        // 拖拽进行中
        this.obj.addEventListener('touchmove',e=>{
            let disPointX = e.changedTouches[0].pageX - this.startPointX;
            let l = disPointX + this.startLeft;
            // 判断边界
            if(l < 0){
                l = 0;
            }else if(l > this.obj.offsetParent.offsetWidth){
                l = this.obj.offsetParent.offsetWidth
            }
            this.obj.style.transform = `translateX(${l}px)`;
            //拖拽的百分比，存储起来
            this.percent = l / this.obj.offsetParent.offsetWidth; 
            //给用户提供一个对外的方法
            this.move && this.move(this.percent);
            // 阻止默认事件
            e.preventDefault();
        })
        this.obj.addEventListener('touchend', () => {
            //给用户提供一个对外的方法
            this.end && this.end(this.percent) 
        })
	}
}
