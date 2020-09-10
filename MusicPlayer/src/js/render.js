import { blurImg } from './gaussBlur.js';

/**
 * 渲染图片
 * @param {*} src 图片路径
 */
function renderImg(src){
    blurImg(src); //给body添加背景图片
    const img = document.querySelector('.songImg img');
    img.src = src;
}
/**
 * 渲染信息
 * @param {*} data 音乐信息
 */
function renderInfo(data){
    const infoChild = document.querySelector('.songInfo').children;
    infoChild[0].innerHTML = data.name;
    infoChild[1].innerHTML = data.singer;
    infoChild[2].innerHTML = data.album;
}
/**
 * 渲染是否喜欢
 * @param {*} isLike 是否喜欢
 */
function renderIsLike(isLike){
    const lis = document.querySelectorAll('.control li');
    lis[0].className = isLike ? 'liking' : '';
}

export default function(data){
    renderImg(data.image);
    renderInfo(data);
    renderIsLike(data.isLike)
}
