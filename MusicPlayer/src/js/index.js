// 主入口文件
import MusicPlayer from './music.js'

const musicPlayer = new MusicPlayer(
	document.getElementsByClassName('wrapper')[0]
)
musicPlayer.init()
