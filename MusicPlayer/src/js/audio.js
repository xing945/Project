export default class AudioManage{
    constructor(){
        this.audio = new Audio(); //创建一个audio实例
        this.status = 'pause'; //歌曲的状态，默认为暂停
    }
    /**
     * 加载音乐
     * @param {src} 地址
     */
    load(src){
        this.audio.src = src; // 设置音乐路径
        this.audio.load(); //加载音乐
    }
    /**
     * 开始音乐
     */
    play(){
        this.audio.play();
        this.status = 'play'; 
    }
    /**
     * 暂停音乐
     */
    pause(){
        this.audio.pause();
        this.status = 'pause';
    }
    /**
     * 音乐播放完成事件
     */
    end(fn){
        this.audio.onended = fn;
    }
    /**
     * 跳到音乐的某个时间点
     * @param {*} time 时间
     */
    playTo(time){
        this.audio.currentTime = time;
    }
}