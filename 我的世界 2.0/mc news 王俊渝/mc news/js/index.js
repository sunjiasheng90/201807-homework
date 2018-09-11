(function () {
    var topBarRight = document.getElementsByClassName("topBar-right")[0];
    var divList = topBarRight.getElementsByTagName("div")[0];
    var divBox = document.getElementsByClassName('lbtBox')[0];
    var a = divBox.getElementsByTagName("a")[0];


    var flag = -1;
    var timer = setInterval(function () {
        flag *= -1;
        utils.css(a, {
            transition: 'transform 0.8s,opacity 0.8s'
        });
        utils.css(a, {
            transform: "translateY(-30px)",
            opacity: 0
        });
        setTimeout(() => {
            let str = ``;
            flag === -1 ? str = `<a class="top1" href="" >领取网易严选选宝箱</a>` : str = `<a class="top2" href="">安卓充值9.8折</a>`;
            divBox.innerHTML = str;
            a = divBox.getElementsByTagName("a")[0];
            utils.css(a, {
                transform: "translateY(30px)",
                opacity: 0
            });
            setTimeout(() => {
                utils.css(a, {
                    transition: 'transform 0.8s,opacity 0.8s'
                });
                utils.css(a, {
                    transform: "translateY(0)",
                    opacity: 1
                });
            }, 20);
        }, 800);
    }, 3000);

})();

var side_show = utils.getByClass('side-show')[0],
    side = utils.getByClass('side')[0],
    close = utils.getByClass('close')[0],
    act_dot = utils.getByClass('act_dot')[0],
    dotSpan = act_dot.getElementsByTagName('span'),
    act_box = utils.getByClass('act_box')[0],
    ewm_tab = utils.getByClass('ewm_tab')[0],
    ewm_tabA = ewm_tab.getElementsByTagName('a'),
    ewm_img = utils.getByClass('ewm_img')[0];


side_show.onclick = function () {
  utils.css(side_show,{'right': '-50px'});
    setTimeout(function () {
        utils.css(side,{'right':'0'})
    },600)
};
close.onclick = function () {
    utils.css(side,{'right':'-350px'});
    setTimeout(function () {
        utils.css(side_show,{'right':'0'})
    },600)
};
function removeon(ele) {
    [...ele].forEach((item)=>{
        utils.removeClass(item,'on')
    })
}

[...dotSpan].forEach((item,index)=>{
    item.myIndex = index;
   item.onmouseenter = function () {
       removeon(dotSpan);
       utils.addClass(item,'on');
       utils.css(act_box,{'left':`${-item.myIndex * 212}px`})
   }
});
[...ewm_tabA].forEach((item,index)=>{
   item.myIndex = index;
   item.onmouseenter = function () {
       removeon(ewm_tabA);
       utils.addClass(item,'on');
       utils.css(ewm_img,{'left':`${-item.myIndex * 110}px`})
   }
});

function sideBanner() {
    let myL = 0,
        maxMyL = -(utils.getCss(act_box,'width') - 212),
        nextMyL = 0,
        dotIndex = 0;
    setInterval(function () {
        myL = utils.getCss(act_box,'left');
        if(myL <= maxMyL)myL = 212;
        nextMyL = myL - 212;
        dotIndex = Math.abs(nextMyL / 212);
        removeon(dotSpan);
        utils.addClass(dotSpan[dotIndex],'on');
        utils.css(act_box,{'left':`${nextMyL}px`})
    },3000)
}
sideBanner();