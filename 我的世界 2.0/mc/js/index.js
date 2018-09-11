/**
 * Created by Administrator on 2018/8/31.
 */


(function () {
    var clickVideo = document.getElementsByClassName("click_video")[0];
    var topBarRight = document.getElementsByClassName("topBar-right")[0];
    var divList = topBarRight.getElementsByTagName("div")[0];
    var divBox = document.getElementsByClassName('lbtBox')[0];
    var a = divBox.getElementsByTagName("a")[0];
    var closeBtn = document.getElementsByClassName("close_btn")[0];
    var videos = document.getElementsByClassName("videos")[0],
        hfVideo = videos.getElementsByTagName('video')[0];
    var item = document.getElementsByClassName("item")[0];

    var clear = document.getElementsByClassName("clear")[0];
    var topBarNews = document.getElementsByClassName("topBar-news")[0];
    var smallPic = topBarNews.getElementsByClassName("small-pic")[0];
    var bigPic = document.getElementsByClassName("big-pic")[0];
    var topBarMenu = document.getElementsByClassName("topBar-menu")[0];
    var span = document.getElementsByClassName("hf-span")[0];

    clickVideo.onclick = function () {
        utils.css(videos,{ display: "block"});
        utils.css(hfVideo,{autoplay:'autoplay'});
        hfVideo.play();
    };
    closeBtn.onclick = function () {
        utils.css(videos, "display", "none");
        hfVideo.pause();
    };

    item.onclick = function () {
        utils.css(item, "display", "none");
        utils.css(clear, "display", "block");
    };


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
        setTimeout(()=> {
            let str = ``;
            flag === -1 ? str = `<a class="top1" href="" >领取网易严选选宝箱</a>` : str = `<a class="top2" href="">安卓充值9.8折</a>`;
            divBox.innerHTML = str;
            a = divBox.getElementsByTagName("a")[0];
            utils.css(a, {
                transform: "translateY(30px)",
                opacity: 0
            });
            setTimeout(()=> {
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


    //最上方小图片鼠标划上换成大图片
    topBarNews.onmouseenter = function () {
        utils.css(smallPic,"display","none");
        utils.css(bigPic,"display","block");
    };
    topBarNews.onmouseleave  = function () {
        utils.css(smallPic,"display","block");
        utils.css(bigPic,"display","none");
    };

    //网易游戏目录 鼠标划上效果
    span.onmouseenter = function () {
        utils.css(topBarMenu,{
            height:"530",
            transitionProperty:"height",
            transitionDuration:"0.3s",
            transitionTimingFunction:"ease"
        })
    };
    span.onmouseleave  = function () {
        utils.css(topBarMenu,"height","55");
        utils.css(topBarMenu,"transition","");
        utils.css(topBarMenu,{
            height:"55",
            transition:""
        })
    };

})();
var ban = ~function () {
    var data = null,
        ban_box = document.getElementsByClassName('ban_box')[0],
        n = 0,
        ban_img = document.getElementsByClassName('ban_img')[0],
        boxW = utils.css(ban_img, 'width'),
        index = 0,
        timer = null,
        tipBox = utils.getByClass('tipBox', ban_box)[0],
        tips = tipBox.getElementsByTagName('li');

    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', './data/banner.json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                data = utils.toJson(xhr.responseText);
                giveHtml();
                autoPlay();
                evenFn();
                tipClick();
            }
        };
        xhr.send();
    }

    function giveHtml() {
        var str = ``;
        var tipStr = ``;
        // data = data || [];
        data.push(data[0]);
        data.forEach((item, index) => {
            var {a, pic} = item;
            str += `<li><a href="${a}"><img src="${pic}" alt=""></a></li>`;
            if (index < data.length - 1) {
                tipStr += `<li class=" ${index == 0 ? 'on' : ''}"></li>`;
            }
        });
        n = data.length;
        ban_img.innerHTML = str;
        ban_img.style.width = boxW * n + 'px';
        tipBox.innerHTML = tipStr;
    }


    function play() {
        if (utils.css(ban_img, 'left') % boxW != 0) return;
        index++;
        if (index == n) {
            utils.css(ban_img, 'left', 0);
            index = 1;
        }
        [...tips].forEach((item, index) => {
            utils.removeClass(item, 'on')
        });
        if (index == n - 1) {
            utils.addClass(tips[0], 'on')
        } else {
            utils.addClass(tips[index], 'on')
        }


        var curL = -boxW * index;
        myAnimate(ban_img, 1000, {left: curL})
    }

    function autoPlay() {
        timer = setInterval(function () {
            play();
        }, 3000)
    }

    function evenFn() {
        ban_box.onmouseenter = function () {
            clearInterval(timer);
        };
        ban_box.onmouseleave = function () {
            autoPlay();
        }
    }

    function tipClick() {
        for (let i = 0; i < tips.length; i++) {
            tips[i].onmousemove = function () {
                if (utils.css(ban_img, 'left') % boxW != 0) return;
                index = i - 1;
                play();
            }
        }
    }

    getData();
}();

var news = ~function () {
    var newsBox = document.getElementsByClassName('news_box')[0],
        nav = newsBox.getElementsByTagName('nav')[0],
        navul = nav.getElementsByTagName('ul')[0],
        navLis = navul.getElementsByTagName('li'),
        navA = nav.getElementsByTagName('a')[0],
        bodyBox = newsBox.getElementsByClassName('bodyBox')[0],
        body = bodyBox.getElementsByClassName('body')[0],
        uls = body.getElementsByTagName('ul'),
        n = 0,
        boxW = utils.css(body, 'width'),
        k = uls.length;
    body.style.width = boxW * k + 'px';
    [...navLis].forEach((item, index) => {
        item.onmouseover = function () {
            n = index;
            $(item).addClass('on');
            $(item).siblings().removeClass();
            // console.log(n);
            Fn();
            this.running = true;
        }
    });

    function Fn() {
        [...uls].forEach((item, index) => {
            if (n > 0) {
                $(body).css({
                    left: -boxW * n
                })
            } else {
                $(body).css({
                    left: 0
                })
            }
        })
    }

}();

var share = ~function () {
    var bigBox = document.getElementsByClassName('ewm_box')[0],
        btnBox = bigBox.getElementsByClassName('ewm_tab')[0],
        btns = btnBox.getElementsByTagName("a"),
        body = bigBox.getElementsByClassName('ewm_img')[0],
        wxBody = body.getElementsByClassName('ewm_wx')[0],
        boxW = utils.css(wxBody, 'width'),
        n = 0;

    [...btns].forEach((item, index) => {
        item.onmouseover = function () {
            n = index;
            $(item).addClass('on');
            $(item).siblings().removeClass();
            console.log(btns);
            Fn();
        }
    });

    function Fn() {
        [...btns].forEach((item, index) => {
            if (n > 0) {
                $(body).css({
                    left: -boxW * n
                })
            } else {
                $(body).css({
                    left: 0
                })
            }
        })
    }

}();
function zy() {
    var playLi = document.getElementsByClassName('playLi')[0],
        tli = playLi.getElementsByTagName('li'),
        playB = document.getElementsByClassName('playBox')[0],
        oUl = playB.getElementsByTagName('ul'),
        $playLi = $('.playBox li'),
        $play = $('.playz'),
        $close = $('.playImg a'),
        $playF = $('.playFirst');
    [...tli].forEach((item, index) => {
        item.onmouseenter = function () {
            $([...oUl]).hide();
            // debugger;
            $(oUl[index]).show();
            $(item).addClass('current');
            $(item).siblings().removeClass('current');
        }
    });

    $playLi.each((index, item) => {
        item.onclick = function () {
            $play.addClass('show');
        }
    });
    $close.on('click', function () {
        $play.removeClass('show');
    });

    function giveHtml(data) {
        data = data||[];
        var str = '';
        data.forEach((item)=>{
            str+=`  <li>
                <div class="playImg">
                    <img src="${item.img}" alt="" class="p1_1">
                    <div class="playMask">
                        <span class="line"></span>
                        <p class="playP1">${item.title}</p>
                        <p class="playP2">${item.text}</p>
                    </div>
                </div>
                <p class="playLike">${item.like}</p>
            </li>`;
        });
        $playF.html(str);
    }
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            type:'get',
            url:'./json/data.json',
            success:function (data) {
                resolve(data);
            },
            error:function (res) {
                reject(res)
            }
        })
    });
    p.then(function (data) {
        giveHtml(data);
    })
}
zy();
var videoPart = (function () {
    var part4 = utils.getByClass('part4')[0],
        video_nav = utils.getByClass('video_nav', part4)[0],
        video_content = utils.getByClass('video_content', part4)[0],
        videoNavLis = video_nav.getElementsByTagName('li'),
        videoRUls = video_content.getElementsByTagName('ul'),
        video_like = utils.getByClass('video_like',video_content),
        alert_box = utils.getByClass('alert_box')[0],
        alert_wrap = utils.getByClass('alert_wrap',alert_box)[0],
        alert_content = utils.getByClass('alert_content',alert_box)[0],
        alert_esc = alert_box.getElementsByTagName('a'),
        alertVideoWrap = utils.getByClass('videoAlertWrap')[0],
        alertVideo = utils.getByClass('alert_video',alertVideoWrap)[0],
        myVideo = alertVideo.getElementsByTagName('video')[0],
        videoBtn = alertVideo.getElementsByTagName('a')[0] ,
        videoL = utils.getByClass('video_l')[0];
    var voteTime = 0;

    function getData(ul ,url) {
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && /^[23]\d{2}$/.test(xhr.status)){
                data = utils.toJson(xhr.responseText);
                giveHTML(ul, data);
                vote(ul);
                imgBtn(ul);
            }
        };
        xhr.send();
    }
    function giveHTML(ul,data) {
        var str = '';
        data.forEach((item)=>{
            var {img_pic,p3,p4,like} = item;
            str += `<li>
                        <div class="video_img">
                            <div class="myLoad"></div>
                            <div class="myImg hidden">
                                <img src=${img_pic} alt="">
                            </div>
                            <p class="video_p3">${p3}</p>
                            <p class="video_p4">${p4}</p>
                            <div class="video_hm">
                                <div class="video_btn"></div>
                            </div>
                        </div>
                         <p class="video_p5 video_like">
                                <span>${like}</span>
                         </p>
                    </li>`
        });
        ul.innerHTML = str;
        var myLoad = utils.getByClass('myLoad',ul),
            myImg = utils.getByClass('myImg',ul),
            myImgs = ul.getElementsByTagName('img');
        [...myImgs].forEach((item,index)=>{
            item.onload=()=>{
                utils.addClass(myLoad[index],'hidden');
                utils.removeClass(myImg[index], 'hidden')
            }
        })
    }
    function setAlert(ele) {
        utils.css(ele,{
            left:utils.clientW() / 2 + 'px',
            top:utils.clientH() / 2 +'px',
            marginLeft: -ele.offsetWidth/2 + 'px',
            marginTop: -ele.offsetHeight/2 + 'px'
        })
    }
    function vote(ul) {
        var video_like = utils.getByClass('video_like',ul),
            videoHm = utils.getByClass('video_hm',ul);
        [...video_like].forEach((item,index)=>{
            item.onclick = function (e) {
                e = e || window.event;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                if(voteTime > 4 ){
                    alert_content.innerHTML = '今天投票已超过5次，请明天再投！';
                }else{
                    item.num = Number(item.innerText);
                    item.num++;
                    item.innerHTML = `<span>${item.num}</span>`;
                    voteTime++;
                }
                utils.css(alert_box,{
                    opacity:1,
                    display:'block'
                });
                setAlert(alert_wrap);
            };
            item.onmouseenter = function () {
                utils.css(videoHm[index],{
                    opacity: 0,
                    height: 0
                })
            };
            item.onmouseleave = function () {
                utils.css(videoHm[index],{
                    opacity: 1,
                    height: 124
                })
            }
        } )
    }
    function imgBtn(ul) {
        var imgsBox = utils.getByClass('video_img',ul),
            videoHm = utils.getByClass('video_hm',ul);
        videoL.onclick = function () {
            utils.css(alertVideoWrap,{
                opacity:1,
                display:'block'
            });
            setAlert(alertVideo);
            utils.css(myVideo,{
                autoplay:'autoplay'
            });
            myVideo.play();
        };
        [...imgsBox].forEach((item,index) => {
            item.onmouseenter = function (e) {
                utils.css(videoHm[index], {
                    opacity: 0,
                    height: 0
                })
            };
            item.onmouseleave = function (e) {
                utils.css(videoHm[index], {
                    opacity: 1,
                    height: 124
                })
            };
            item.onclick = function () {
                utils.css(alertVideoWrap,{
                    opacity:1,
                    display:'block'
                });
                setAlert(alertVideo);
                utils.css(myVideo,{
                    autoplay:'autoplay'
                });
                myVideo.play();
            }
        });
    }
    function initData() {
        [...videoRUls].forEach((item,index)=>{
            getData(item,`./json/data${index + 1}.json`);
        });
    }
    function alertEsc() {
        [...alert_esc].forEach(function (item) {
            item.onclick = function () {
                utils.css(alert_box, {
                    opacity: 0,
                    display: 'none'
                })
            }
        })
    }
    function tabs() {
        utils.css(videoNavLis[0], {backgroundImage: " url('image/video_bg_eaa14b3.png')",backgroundRepeat:'no-repeat',color: '#fff' });
        [...videoNavLis].forEach((item, index) => {
            item.onmouseenter = () => {
                [...videoNavLis].forEach((item) => {
                    utils.css(item, {backgroundImage: '',backgroundRepeat:'',color: '#000' });
                });
                utils.css(item,{backgroundImage: " url('image/video_bg_eaa14b3.png')",backgroundRepeat:'no-repeat',color: '#fff' });
                [...videoRUls].forEach((item) => {
                    utils.addClass(item, 'hidden')
                });
                utils.removeClass(videoRUls[index], 'hidden');
            }
        })
    }
    function setVideoBtn() {
        videoBtn.onclick = function () {
            utils.css(alertVideoWrap,{
                opacity:0,
                display:'none'
            });
            myVideo.pause();
        };
    }
    function init() {
        initData();
        alertEsc();
        tabs();
        setVideoBtn();
    }
    return {
        init:init,
    }
})();
videoPart.init();

(function () {
    let removeAllClass = function (eles, str) {
        [...eles].forEach(item => {
            utils.removeClass(item, str)
        })
    };

    function left() {
        let headTit = document.getElementsByClassName('head_tit')[0],
            htAs = headTit.getElementsByTagName('a'),
            gsBox = document.getElementsByClassName('gs_box')[0];
        htAs[0].onmouseenter = function () {
            removeAllClass(htAs, 'on');
            this.className = 'on';
            myAnimate(gsBox, 375, {left: 0});
        };
        htAs[1].onmouseenter = function () {
            removeAllClass(htAs, 'on');
            this.className = 'on';
            myAnimate(gsBox, 375, {left: -428})
        };
    }

    left();

    function right() {
        let tjWrap = document.getElementsByClassName('tj_wrap')[0],
            tab = tjWrap.getElementsByClassName('tab')[0],
            otAs = tab.getElementsByTagName('a'),
            subNav = tjWrap.getElementsByClassName('subNav ')[0],
            onAs = subNav.getElementsByTagName('a'),
            tuJian = tjWrap.getElementsByClassName('tujian')[0],
            oPic = tuJian.getElementsByClassName('pic')[0],
            oPicImg = oPic.getElementsByTagName('img')[0],
            oSum = tuJian.getElementsByClassName('sum')[0],
            sideNav = tjWrap.getElementsByClassName('sideNav')[0],
            osAs = sideNav.getElementsByTagName('a'),
            data = null,
            xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status))
                data = utils.toJson(xhr.responseText);
        };
        xhr.send();
        data.forEach((item, index) => {
            if (index !== 1) {
                let subStr = ``;
                item.forEach((item, itemIndex) => {
                    subStr += `<a href="javascript:;" class="${itemIndex === 0 ? 'on' : ''}">
                    <img src="imgs/${item.img}" alt="">
                </a>`;
                    if (index === 0) {
                        onAs[itemIndex].onclick = function () {
                            removeAllClass(onAs, 'on');
                            this.className = 'on';
                            oPicImg.src = `imgs/${item.img}`;
                            oSum.innerHTML = `<div class="desc">
                        <p>
                            <em>${item.name}</em>
                            ${item.des}
                        </p>
                    </div>
                    <div class="peifang">
                        <p>合成配方：</p>
                        <div class="ge">
                            <i><img src="imgs/${item.img}" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                        </div>
                        <i class="arror">
                            <em></em>
                            <em></em>
                            <em></em>
                            <em></em>
                            <em></em>
                        </i>
                        <span class="img">
                        <img src="imgs/${item.img}" alt="">
                        </span>
                    </div>`;
                        };
                    }
                });
                otAs[index].onclick = function () {
                    utils.css(subNav, {width: 313});
                    utils.css(oSum, {width: 235});
                    sideNav.style.display = 'none';
                    removeAllClass(otAs, 'on');
                    this.className = 'on';
                    subNav.innerHTML = subStr;
                    item.forEach((item, itemIndex) => {
                        let sumStr = ``;
                        sumStr = `<div class="desc">
                        <p>
                            <em>${item.name}</em>
                            ${item.des}
                        </p>
                    </div>`;
                        if (item.has === '1') {
                            sumStr += `<div class="peifang">
                        <p>合成配方：</p>
                        <div class="ge">
                            <i><img src="imgs/${item.img}" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                            <i><img src="" alt=""></i>
                        </div>
                        <i class="arror">
                            <em></em>
                            <em></em>
                            <em></em>
                            <em></em>
                            <em></em>
                        </i>
                        <span class="img">
                        <img src="imgs/${item.img}" alt="">
                        </span>
                    </div>`;
                        }
                        if (itemIndex === 0) {
                            oPicImg.src = `imgs/${item.img}`;
                            oSum.innerHTML = sumStr;
                        }
                        onAs[itemIndex].onclick = function () {
                            removeAllClass(onAs, 'on');
                            this.className = 'on';
                            oPicImg.src = `imgs/${item.img}`;
                            oSum.innerHTML = sumStr;
                        }
                    });
                }
            } else {
                otAs[1].onclick = function () {
                    utils.css(subNav, {width: 260});
                    utils.css(oSum, {width: 203});
                    sideNav.style.display = 'block';
                    removeAllClass(otAs, 'on');
                    this.className = 'on';
                    item.forEach((item, index) => {
                        let subStr = ``;
                        item.forEach((item, itemIndex) => {
                            subStr += `<a href="javascript:;" class="${itemIndex === 0 ? 'on' : ''}">
                    <img src="imgs/${item.img}" alt="">
                </a>`
                        });
                        if (index === 0) {
                            subNav.innerHTML = subStr;
                            item.forEach((item, itemIndex) => {
                                if (itemIndex === 0) {
                                    oPicImg.src = `imgs/${item.img}`;
                                    oSum.innerHTML = `<div class="desc">
                                                         <p>
                                                           <em>${item.name}</em>
                                                               ${item.des}
                                                         </p>
                                                      </div>`;
                                }
                                onAs[itemIndex].onclick = function () {
                                    removeAllClass(onAs, 'on');
                                    this.className = 'on';
                                    oPicImg.src = `imgs/${item.img}`;
                                    oSum.innerHTML = `<div class="desc">
                                                         <p>
                                                           <em>${item.name}</em>
                                                               ${item.des}
                                                         </p>
                                                      </div>`;
                                };
                            });
                        }
                        osAs[index].onclick = function () {
                            removeAllClass(osAs, 'on');
                            this.className = 'on';
                            subNav.innerHTML = subStr;
                            item.forEach((item, itemIndex) => {
                                if (itemIndex === 0) {
                                    oPicImg.src = `imgs/${item.img}`;
                                    oSum.innerHTML = `<div class="desc">
                                                         <p>
                                                           <em>${item.name}</em>
                                                               ${item.des}
                                                         </p>
                                                      </div>`;
                                }
                                onAs[itemIndex].onclick = function () {
                                    removeAllClass(onAs, 'on');
                                    this.className = 'on';
                                    oPicImg.src = `imgs/${item.img}`;
                                    oSum.innerHTML = `<div class="desc">
                                                         <p>
                                                           <em>${item.name}</em>
                                                               ${item.des}
                                                         </p>
                                                      </div>`;
                                }
                            });
                        };
                    })
                };
            }
        });
    }

    right();
})();

//快速注册
(function f() {
    var quickReg = document.getElementsByClassName("quick_reg")[0];
    var closeBtn2 = document.getElementsByClassName("close_btn2")[0];
    var inputZh = document.getElementsByClassName("input_zh")[0];
    var option = document.getElementsByTagName("option")[0];
    var deleteBtn = document.getElementsByClassName("delete_btn")[0];
    var errBox = document.getElementsByClassName("error_box")[0];
    var errTil = document.getElementsByClassName("err_til")[0];
    var p2One = document.getElementsByClassName("p2_01")[0];

    //点击 注册框，出现快速注册页面
    p2One.onclick = function () {
        utils.css(quickReg,"display","block");
    };


//点击关闭按钮关闭
    closeBtn2.onclick = function () {
        utils.css(quickReg, "display", "none");
    };

//账号输入
    var str = "";
    inputZh.oninput = function () {
        utils.css(errBox,"display","none");
        if(/.com/.test(inputZh.value)){
            str = `${inputZh.value}`;
        }else{
            str = `${inputZh.value}@163.com `;
        }
        option.innerHTML = str;

    };
    inputZh.onblur = function () {
        inputZh.value = str;
        option.innerHTML = "@163.com";
        judge();
    };
    deleteBtn.onclick = function () {
        inputZh.value = "";
    };

    function judge() {
        if (/^\d/.test(inputZh.value)){
            utils.css(errBox,"display","block");
            errTil.innerHTML = "账号须由字母开头";
        }
    }

})();

