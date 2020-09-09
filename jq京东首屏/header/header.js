;(function() {
	// logo
	let logo = (function() {
		let $logo = $('.logo')
		let $logoBg = $('.logo-bg')
		//  logo 鼠标移入，动画开启
		$logo.hover(
			function() {
				$logoBg.fadeIn().removeClass('hover-out')
				if ($logoBg.hasClass('hover-in')) {
					return false
				}
				$logoBg
					.css({
						// 重新的获取动图资源
						backgroundImage:
							'url(http://img1.360buyimg.com/da/jfs/t1/31918/19/6335/274370/5c90a8beEefd9bfb9/e24970e34ce77262.gif?v=' +
							Math.random() +
							')',
					})
					.addClass('hover-in')
					.removeClass('animate-end')
				setTimeout(function() {
					// 当动画结束之后 添加上class 类名animate-end
					$logoBg.addClass('animate-end')
					// 动画结束之后 只有鼠标hover出去之后才会消失
					$('.hover-out').fadeOut()
				}, 4000)
			},
			function() {
				//  如果hover出去 并且当前的动画已经结束 则让logo消失
				$('.animate-end')
					.fadeOut()
					.removeClass('hover-in')
				// 当hover移除 添加hover-out类名
				$logoBg.addClass('hover-out')
			}
		)
	})()
	// search
	let search = (function() {
		let timer = null
		// placeholdersData
		let placeholdersData = ['小饼干', '仔仔面', '商务小布鞋']
		setInterval(function() {
			$('#search-inp').attr(
				'placeholder',
				placeholdersData[
					Math.floor(Math.random() * placeholdersData.length)
				]
			)
		}, 2000)
		// 搜索列表
		$('#search-inp')
			.on('input', function() {
				let val = $(this).val()
				// 数据请求的防抖处理
				clearTimeout(timer)
				if (val) {
					// 防抖  防止每次按下键盘的时候都去获取数据
					timer = setTimeout(function() {
						getData(val)
					}, 500)
				}
			})
			.focus(function() {
				// 如果鼠标聚焦在搜索框内  判断搜索框里面是否含有数据 如果含有 则获取列表数据并显示列表
				let val = $(this).val()
				if (val) {
					getData(val)
				}
			})
		// 鼠标移出搜索区域则列表消失
		let mouseTimer = null
		$('.search-box')
			.mouseleave(function() {
				mouseTimer = setTimeout(function() {
					$('.search-list').hide()
				}, 500)
			})
			.mouseenter(function() {
				clearTimeout(mouseTimer)
			})
		// 点击确认
		$('.search-list').on('click', 'li', function(e) {
			let vals = $(e.target).text()
			$('#search-inp').val(vals)
			$(this)
				.parent()
				.hide()
        })
        /**
         * 获取数据
         * @param {*} datas 数据
         */
        function getData(datas) {
            $.ajax({
                url: 'https://suggest.taobao.com/sug',
                type: 'get',
                dataType: 'jsonp',
                data: {
                    code: 'utf-8',
                    q: datas,
                    callback: 'renderList',
                },
            })
        }
        /**
         * 渲染页面
         * */
        window.renderList = function (data) {
            data = data.result;
            let str = '';
            for (let i = 0; i < data.length; i++) {
                str += `<li>${data[i][0]}</li>`;
            }
            $('.search-list').html(str).show();
        }
	})()
})()
