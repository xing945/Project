(function(){
    let menuList = [{
        titles: ['家用电器'],
        content: {
            tabs: ['家电馆', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['手机', '运营商', '数码'],
        content: {
            tabs: ['手机'],
            subs: [{
                title: '手机',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '手表',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['电脑', '办公'],
        content: {
            tabs: ['家电馆', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['家居', '家具', '家装', '厨具'],
        content: {
            tabs: ['家居', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }];
    renderMenuList(menuList);
    /**
     * 渲染列表
     * @param {*} data 数据
     */
    function renderMenuList(data){
        let str = '';
        for(let i = 0; i < data.length; i++){
            let title = data[i].titles;
            str += `<li>${title.map(function (ele) {
                return `<a href="">${ele}</a>`;
            }).join('<span>/</span>')}</li>`;
        }
        $('.fs-menu').html(str);
    }
    /**
     * 渲染右侧内容
     * @param {*} content 内容
     */
    function renderContent(data) {
        var tabsNav = $('<div class="tabs-nav"></div>')
        var cateBox = $('<div class="cate-box"></div>')
        data.tabs.forEach(function (tab) {
            $(`<a href="#">${tab}<i class="iconfont"></i></a>`)
                .appendTo(tabsNav);
        })
        data.subs.forEach(function (sub) {
            var oDl = $("<dl class='cate-item'></dl>");
            $(`<dt>
            <a href="#">${sub.title}
                <i class="iconfont"></i>
            </a>
        </dt>`).appendTo(oDl);
            var oDD = $("<dd></dd>");
            sub.items.forEach(function(item){
                $(`<a href="">${item}</a>`).appendTo(oDD);
            })
            oDl.append(oDD).appendTo(cateBox);
        })
        $(".menu-content").empty().append(tabsNav).append(cateBox);
    }
    // 切换类名
    $('.fs-menu').on('mouseenter', 'li', function () {
        $('.menu-on').removeClass('menu-on');
        $(this).addClass('menu-on');
        let index = $(this).index();
        renderContent(menuList[index].content);
        $('.menu-content').show();
    })
    $('.fs-1').mouseleave(function () {
        $('.menu-on').removeClass('menu-on');
        $('.menu-content').hide()
    })
}())