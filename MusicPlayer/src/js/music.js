import render from './render.js'
import Index from './indexControl.js'
import AudioManage from './audio.js'
import listControl from './listControl.js'
import { Bar, Drag } from './bar.js'
/**
 * 音乐播放类
 */
export default class MusicPlayer {
	constructor(dom) {
		this.wrap = dom //播放器的容器
		this.dataList = [] // 存储请求的数据
		this.indexObj = null //索引值对象（用于切歌）
		this.audioManage = new AudioManage() // 创建一个播放音乐实例
		this.rotateTimer = null //用于旋转的定时器
		this.listMusic = null //列表对象
		this.curIndex = 0 //当前播放歌曲的索引值
		// 进度条
		this.Bar = new Bar()
	}
	/**
	 * 初始化
	 */
	init() {
		this.getDom() // 获取元素
		this.getData('../mock/data.json') // 请求数据
	}
	/**
	 * 获取元素
	 */
	getDom() {
		this.record = document.querySelector('.songImg img') //旋转图片
		this.controlBtns = document.querySelectorAll('.control li') //底部导航里的按钮
	}
	/**
	 * 请求数据
	 * @param {*} url 地址
	 */
	async getData(url) {
		const resp = await fetch(url, {
			method: 'get',
		})
		if (resp.status === 200) {
			const result = await resp.json()
			this.dataList = result
			// 列表切歌
			this.listPlay()
			//给索引值对象赋值
			this.indexObj = new Index(result.length)
			// 请求过来数据之后渲染
			this.loadMusic(this.indexObj.index)
			// 控制音乐播放切换
            this.musicControl()
            // 进度条
            this.dragBar();
		} else {
			console.log('数据请求失败')
		}
	}
	/**
	 * 加载音乐
	 * @param {*} index 索引
	 */
	loadMusic(index) {
		// 渲染
		render(this.dataList[index])
		// 加载音乐
		this.audioManage.load(this.dataList[index].audioSrc)
		// 进度条
		this.Bar.renderAllTime(this.dataList[index].duration)

		//播放音乐（只有音乐的状态为play的时候才能播放）
		if (this.audioManage.status === 'play') {
			this.audioManage.play() //播放
			//按钮状态变成播放状态
			this.controlBtns[2].className = 'playing'
			// 旋转唱片 开始旋转
			this.imgRotate(0)
			// 进度条
			this.Bar.move(0)
		}
		//改变列表里歌曲的选中状态
		this.listMusic.changeSelect(index)
		//存储当前歌曲对应的索引值
		this.curIndex = index
	}
	/**
	 * 控制音乐
	 */
	musicControl() {
		// 点击喜欢
		this.controlBtns[0].addEventListener('touchend', () => {
			if (this.dataList[this.indexObj.index].isLike) {
				this.dataList[this.indexObj.index].isLike = false
				this.controlBtns[0].className = ''
			} else {
				this.dataList[this.indexObj.index].isLike = true
				this.controlBtns[0].className = 'liking'
			}
		})
		// 上一首
		this.controlBtns[1].addEventListener('touchend', () => {
			this.audioManage.status = 'play'
			// 切换上一首
			this.loadMusic(this.indexObj.prev())
		})
		// 播放与暂停
		this.controlBtns[2].addEventListener('touchend', () => {
			// 如果当前是播放状态就让它暂停
			if (this.audioManage.status === 'play') {
				this.audioManage.pause() //暂停
				this.controlBtns[2].className = '' //按钮变成暂停状态
				this.stopRotate() //暂停旋转
				// 停止进度条
				this.Bar.stop()
			} else {
				this.audioManage.play() //播放
				this.controlBtns[2].className = 'playing' //按钮变成播放状态
				// 旋转唱片
				const deg = this.record.dataset.rotate || 0
				this.imgRotate(deg)
				// 开始进度条
				this.Bar.move()
			}
		})
		// 下一首
		this.controlBtns[3].addEventListener('touchend', () => {
			this.audioManage.status = 'play'
			// 切换下一首
			this.loadMusic(this.indexObj.next())
		})
	}
	/**
	 * 旋转唱片
	 * @param {*} deg 角度
	 */
	imgRotate(deg) {
		if (this.rotateTimer) {
			return
		}
		this.rotateTimer = setInterval(() => {
			deg = +deg + 0.2
			this.record.style.transform = `rotate(${deg}deg)`
			//把旋转的角度存到标签身上，为了暂停后继续播放能取到
			this.record.dataset.rotate = deg
		}, 1000 / 60)
	}
	/**
	 * 停止旋转
	 */
	stopRotate() {
		clearInterval(this.rotateTimer)
		this.rotateTimer = null
	}
	/**
	 * 列表切歌
	 */
	listPlay() {
		//把listControl对象赋值给this.listMusic
		this.listMusic = listControl(this.dataList, this.wrap)
		//列表按钮添加点击事件
		this.controlBtns[4].addEventListener('touchend', () => {
			this.listMusic.slideUp()
		})
		// 歌曲列表添加事件
		this.listMusic.musicList.forEach((item, index) => {
			item.addEventListener('touchend', () => {
				// 如果点击的是选中的状态则什么都不做
				if (this.curIndex === index) {
					return
				}
				//歌曲要变成播放状态
				this.audioManage.status = 'play'
				//索引值对象身上的当前索引值要更新
				this.indexObj.index = index
				//加载点击对应的索引值的那首歌曲
				this.loadMusic(index)
				// 列表消失
				this.listMusic.slideDown()
			})
		})
	}
	/**
	 * 进度条拖拽功能
	 */
	dragBar() {
        let circle = new Drag(document.querySelector('.circle'))
		//按下圆点。进度条停止
		circle.start = () => {
			this.Bar.stop()
		}
		// 拖拽圆点
		circle.move = (per) => {
			this.Bar.update(per)
        }
		//抬起圆点
		circle.end = (per) => {
            let cutTime = per * this.dataList[this.indexObj.index].duration
            this.audioManage.playTo(cutTime)
            this.audioManage.play()
			this.Bar.move(per)
			let deg = this.record.dataset.rotate || 0
			this.imgRotate(deg) //旋转图片
			this.controlBtns[2].className = 'playing' //按钮状态变成播放状态
		}
	}
}

