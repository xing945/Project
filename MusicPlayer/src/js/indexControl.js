/**
 * 索引类
 */
export default class Index{
    constructor(len){
        this.index = 0;  //当前的索引值
        this.len = len;  // 数据的长度 
    }
    /**
     * 这个方法用来取上一个索引（上一首）
     */
    prev(){
        return this.get(-1);
    }
    /**
     * 这个方法用来取下一个索引（下一首）
     */
    next(){
        return this.get(1);
    }
    /**
     * 用来获取索引
     * @param {*} val +1 或者 -1
     */
    get(val){
        this.index = (this.index + val + this.len) % this.len;
        return this.index;
    }
}