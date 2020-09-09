;(function() {
	$.fn.extend({
		swiper: function(options) {
			let slider = new Slider(options, this)
			slider.init()
		},
	})
	/**
	 * 构造轮播图
	 * @param {*} options 配置对象
	 * @param {*} wrap 父元素
	 */
	function Slider(options, wrap) {
		// 配置默认值
		this.wrap = wrap || $('body')
		this.list = options.list || []
		// 轮播图的数量
		this.listLength = options.list.length
		this.width = options.width || this.wrap.width()
		this.height = options.height || this.wrap.height()
		// 轮播图的动画类型
		this.type = options.type || 'fade'
		// 轮播图的左右按钮
		this.showChangeBtn =
			options.showChangeBtn || options.showChangeBtn == undefined
				? true
				: options.showChangeBtn
		// 轮播图的小圆点
		this.showStopBtn =
			options.showStopBtn || options.showStopBtn == undefined
				? true
				: options.showStopBtn
		// 轮播图间隔时间
		this.autoTime = options.autoTime || 1000
		// 是否自动轮播
		this.isAuto =
			options.isAuto || options.isAuto == undefined
				? true
				: options.isAuto
		this.flag = 0 // 锁
		this.curIndex = 0 // 轮播图的索引值
		this.timer = null // 轮播图的定时器
		this.init = function() {
			// 构造轮播图结构
			this.createDom()
			// 初始化样式
			this.initStyle()
			// 绑定事件
			this.bindEvent()
			// 自动轮播
			if (this.isAuto) {
				this.autoChange()
			}
		}
	}
	/**
	 * 构造轮播图结构
	 */
	Slider.prototype.createDom = function() {
		let sliderWrapper = $('<div class="slider-wrapper"></div>')
		let sliderList = $('<ul class="slider-list"></ul>')
		let leftBtn = $('<div class="slider-btn left-btn">&lt;</div>')
		let rightBtn = $('<div class="slider-btn right-btn">&gt;</div>')
		let spotBtn = $('<div class="spot-btn"></div>')
		for (let i = 0; i < this.list.length; i++) {
			$('<li class="slider-item"></li>')
				.append(this.list[i])
				.appendTo(sliderList)
			$('<span></span>').appendTo(spotBtn)
		}
		// 无缝轮播
		if (this.type === 'animate') {
			$('<li class="slider-item"></li>')
				.append($(this.list[0]).clone())
				.appendTo(sliderList)
		}
		sliderWrapper
			.append(sliderList)
			.append(leftBtn)
			.append(rightBtn)
			.append(spotBtn)
			.appendTo(this.wrap)
			.addClass('slider-' + this.type)
	}
	/**
	 * 初始化样式
	 */
	Slider.prototype.initStyle = function() {
		// 设置轮播图的大小
		$('.slider-wrapper', this.wrap)
			.css({
				width: this.width,
				height: this.height,
			})
			.find('.slider-item')
			.css({
				width: this.width,
				height: this.height,
			})
		// 如果是淡入淡出效果的话
		if (this.type === 'fade') {
			$('.slider-item', this.wrap)
				.hide()
				.eq(this.curIndex)
				.show()
		} else if (this.type === 'animate') {
			$('.slider-list', this.wrap).css({
				width: this.width * (this.listLength + 1),
			})
		}
		if (!this.showChangeBtn) {
			$('.slider-btn', this.wrap).hide()
		} else {
			$('.slider-btn', this.wrap).show()
		}
		if (!this.showStopBtn) {
			$('.spot-btn', this.wrap).hide()
		} else {
			$('.spot-btn', this.wrap).show()
		}
		// 设置小圆点的样式
		$('.spot-btn > span', this.wrap)
			.eq(this.curIndex)
			.addClass('active')
	}
	/**
	 * 绑定事件
	 */
	Slider.prototype.bindEvent = function() {
		var self = this
		//左边按钮
		$('.left-btn', this.wrap).on('click', function() {
			if (self.flag) {
				return false
			}
			self.flag = true
			if (self.curIndex === 0) {
				if (self.type === 'animate') {
					$('.slider-list', self.wrap).css({
						left: -self.width * self.listLength,
					})
				}
				self.curIndex = self.listLength - 1
			} else {
				self.curIndex--
			}
			self.change()
		})
		// 右边按钮
		$('.right-btn', this.wrap).on('click', function() {
			if (self.flag) {
				return false
			}
			self.flag = true
			// 如果当前图片的索引值为最后一张图片的索引值  则点击右侧按钮的时候显示第一张图片 索引值为0
			if (self.type === 'fade' && self.curIndex === self.listLength - 1) {
				self.curIndex = 0
			} else if (
				self.type === 'animate' &&
				self.curIndex === self.listLength
			) {
				$('.slider-list', self.wrap).css({
					left: 0,
				})
				self.curIndex = 1
			} else {
				self.curIndex++
			}
			self.change()
		})
		// 移入小圆点
		$('.spot-btn > span', this.wrap).on('mouseenter', function() {
			if (self.flag) {
				return false
			}
			self.flag = true
			self.curIndex = $(this).index()
			self.change()
		})
		// 移入移出轮播图区域
		$('.slider-wrapper', this.wrap).hover(
			function() {
				clearInterval(self.timer)
			},
			function() {
				if (self.isAuto) {
					self.autoChange()
				}
			}
		)
	}
	/**
	 * 样式上的切换
	 */
	Slider.prototype.change = function() {
		var self = this
		// 如果是淡入淡出的动画 则为所有的轮播内容添加动画效果 上一张图片淡出  当前图片淡入
		if (this.type === 'fade') {
			$('.slider-item', this.wrap)
				.fadeOut()
				.eq(this.curIndex)
				.fadeIn(function() {
					self.flag = false
				})
		} else if (this.type === 'animate') {
			$('.slider-list', this.wrap).animate(
				{
					left: -this.width * this.curIndex,
				},
				function() {
					self.flag = false
				}
			)
		}
		// 切换小圆点
		$('.spot-btn > span', this.wrap)
			.removeClass('active')
			.eq(this.curIndex % this.listLength)
			.addClass('active')
	}
	/**
	 * 自动轮播
	 */
	Slider.prototype.autoChange = function() {
		this.timer = setInterval(() => {
			$('.right-btn', this.wrap).click()
		}, this.autoTime)
	}
})()
