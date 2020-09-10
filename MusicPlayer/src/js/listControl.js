/**
 * 控制列表切换展示
 * @param {*} data 数据
 * @param {*} wrap 父元素
 */
export default function listControl(data, wrap) {
	const list = document.createElement('div'),
		dl = document.createElement('dl'),
		dt = document.createElement('dt'),
		close = document.createElement('div')
	const musicList = [] //存储所有的歌曲对就的dom
	// 设置类名
	list.className = 'list'
	dt.innerHTML = '播放列表'
	close.classList = 'close'
	close.innerHTML = '关闭'
	dl.appendChild(dt)
	// 循环数据添加dd标签
	data.forEach((item, index) => {
		const dd = document.createElement('dd')
        dd.innerHTML = item.name
        // 切换类名
        dd.addEventListener('touchend',()=>{
            changeSelect(index);
        })
		dl.appendChild(dd)
		musicList.push(dd)
	})
	wrap.appendChild(list)
	list.appendChild(dl)
	list.appendChild(close)
	// 设置列表隐藏
	const disY = list.offsetHeight
    list.style.transform = `translateY(${disY}px)`
    // 点击关闭消失
    close.addEventListener('touchend',slideDown);
    // 默认让第一首歌曲选中状态
    changeSelect(0);
	/**
	 * 滑动显示
	 */
	function slideUp() {
		list.style.transition = '.2s'
		list.style.transform = 'translateY(0)'
	}
	/**
	 * 滑动隐藏
	 */
	function slideDown() {
		list.style.transition = '.2s'
		list.style.transform = `translateY(${disY}px)`
	}
	/**
	 * 切换选中元素
	 * @param {*} index 索引
	 */
	function changeSelect(index) {
		for (let i = 0; i < musicList.length; i++) {
			musicList[i].className = ''
		}
		musicList[index].className = 'active'
	}
	return {
		dom: list,
		musicList,
		slideUp,
		slideDown,
		changeSelect,
	}
}
