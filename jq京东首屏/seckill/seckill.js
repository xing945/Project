// 倒计时
let seckillCountdown = (function () {
    let countDownCount = new Date('2020-07-12 18:00:00');
    setInterval(function () {
        let countTime = countDownCount.getTime() - new Date();
        let hour = Math.floor(countTime / 1000 / 60 / 60);
        let minute = Math.floor(countTime / 1000 / 60 % 60);
        let second = Math.floor(countTime / 1000 % 60);
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        $('.timmer__unit--hour').text(hour);
        $('.timmer__unit--minute').text(minute);
        $('.timmer__unit--second').text(second);
    }, 1000)
}())
// 中间的轮播图
let seckillList = (function () {
    $('.seckill-list').swiper({
        list: $('.seckill-wrapper-item'),
        width: 800,
        height: 260,
        type: 'animate',
        autoTime: 5000,
        showStopBtn: false,
    })
}())
// 右侧的轮播图
let seckillBrand = (function () {
    $('.seckill-brand').swiper({
        list: $('.seckill-brand-item'),
        width: 170,
        height: 240,
        type: 'animate',
        showChangeBtn: false,
    })
}())