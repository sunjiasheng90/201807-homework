(function () {
    let divBox = document.getElementsByClassName('lbtBox')[0],
        a = divBox.getElementsByTagName("a")[0],
        topBarNews = document.getElementsByClassName("topBar-news")[0],
        smallPic = topBarNews.getElementsByClassName("small-pic")[0],
        bigPic = document.getElementsByClassName("big-pic")[0],
        topBarMenu = document.getElementsByClassName("topBar-menu")[0],
        span = document.getElementsByClassName("hf-span")[0];


//页面右上方小轮播图
    let flag = -1,
        timer = setInterval(function () {
            flag *= -1;
            utils.css(a, {
                transition: 'transform 0.8s,opacity 0.8s'
            });
            utils.css(a, {
                transform: "translateY(-20px)",
                opacity: 0
            });
            setTimeout(() => {
                let str = ``;
                flag === -1 ? str = `<a class="top1" href="" >领取网易严选选宝箱</a>` : str = `<a class="top2" href="">安卓充值9.8折</a>`;
                divBox.innerHTML = str;
                a = divBox.getElementsByTagName("a")[0];
                utils.css(a, {
                    transform: "translateY(20px)",
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


//最上方小图片鼠标划上换成大图片
    topBarNews.onmouseenter = function () {
        utils.css(smallPic, "display", "none");
        utils.css(bigPic, {display: 'block'});
    };
    topBarNews.onmouseleave = function () {
        utils.css(smallPic, "display", "block");
        utils.css(bigPic, "display", "none");
    };

//网易游戏目录 鼠标划上效果
    span.onmouseenter = function () {
        utils.css(topBarMenu, {
            height: "530",
            transitionProperty: "height",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease"
        })
    };
    span.onmouseleave = function () {
        utils.css(topBarMenu, "height", "55");
        utils.css(topBarMenu, "transition", "");
        utils.css(topBarMenu, {
            height: "55",
            transition: ""
        })
    };
})();

(function () {
    let mySwiper = null;

    function bigBannerFn() {
        mySwiper = new Swiper('.swiper-container', {
            mousewheel: true,
            pagination: {
                el: '.hd .nav',
                type: "custom",
                renderCustom: function (swiper, current, total) {
                    let str = '',
                        t = '';
                    for (let i = 0; i < total; i++) {
                        switch (i) {
                            case 0:
                                t = '创造者计划';
                                break;
                            case 1:
                                t = '我的世界中国版';
                                break;
                            case 2:
                                t = '成为中国版开发者';
                                break;
                            case 3:
                                t = '合作伙伴';
                                break;
                            case 4:
                                t = '疑难解答';
                                break;
                        }
                        str += `<a href="javascript:;" class="nav0 ${current === i + 1 ? 'on' : ''}">${t}</a>`;
                    }
                    str += `<a href="javascript:;" class="btn-join" target="_blank"></a>`;
                    return str;
                }
            }
        });
        $('.nav').on('click', '.nav0', function () {
            let index = $(this).index();
            mySwiper.slideTo(index, 300, false)
        })
    }

    let litBannerFn = (function () {
        let $bigBox = $('.tips-slide'),
            $box = $('.tempWrap'),
            $oUl = $('.tempWrap>ul'),
            $leftBtn = $('.btn.left'),
            $rightBtn = $('.btn.right'),
            index = 0,
            boxW = $box[0].clientWidth,
            length = 0,
            timer = null;
        let getData = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    url: './data/developer_banner.json',
                    async: true,
                    success: resolve,
                    error: reject
                })
            })
        };
        let giveHtml = (data) => {
            let str = '';
            data = data.concat(data.slice(0, 4));
            data.forEach(({pic, title, des, flag}, index) => {
                str += `<li>
                             <span class="${flag ? 'long' : ''}"><img src="imgs/${pic}" alt=""></span>
                             <h6>${title}</h6>
                             <p>${des}</p>
                        </li>`;
            });
            $oUl.html(str);
            $oUl.css({width: data.length / 4 * boxW});
            length = data.length / 4;
        };
        let play = () => {
            if (utils.css($oUl[0], 'left') % boxW) return;
            index++;
            if (index <= -1) {
                $oUl.css({left: -boxW * (length - 1)});
                index = length - 2
            }
            if (index >= length) {
                $oUl.css({left: 0});
                index = 1
            }
            $oUl.animate({left: -boxW * index}, 300);
        };
        let autoPlay = () => {
            timer = setInterval(() => {
                play();
            }, 2000)
        };
        let eventFn = () => {
            $bigBox.on('mouseenter', function () {
                clearInterval(timer);
            }).on('mouseleave', function () {
                autoPlay();
            });
            $leftBtn.on('click', function () {
                if (utils.css($oUl[0], 'left') % boxW) return;
                index -= 2;
                play()
            });
            $rightBtn.on('click', function () {
                play()
            })
        };
        return {
            init: function () {
                getData().then((data) => {
                    giveHtml(data);
                    autoPlay();
                    eventFn();
                });
            }
        }
    })();

    function gdt() {
        let $bigOulBox = $('.part.part4>.tips'),
            $oUlBox = $('.tips-scroll'),
            $oUl = $('.tips-scroll>ul'),
            $oGdtBox = $('.gdt-box'),
            $oGdt = $('.gdt'),
            maxT = $oGdtBox[0].clientHeight - $oGdt[0].offsetHeight,
            maxUt = $oUl[0].clientHeight - $oUlBox[0].clientHeight,
            ut = 0;

        function dragStart(e) {
            e = e || window.event;
            e.preventDefault();
            this.startT = this.offsetTop;
            this.my = e.pageY;
            $(document).on('mousemove', dragMove);
            $(document).on('mouseup', dragEnd);
        }

        function dragMove(e) {
            e = e || window.event;
            e.preventDefault();
            let t = e.pageY - $oGdt[0].my + $oGdt[0].startT;
            t = t > maxT ? maxT : (t < 0 ? 0 : t);
            let oUlt = t / maxT * maxUt;
            $oGdt.css({top: t});
            $oUl.css({top: -oUlt})
        }

        function dragEnd() {
            $(document).off('mousemove', dragMove);
            $(document).off('mouseup', dragEnd);
        }

        $oGdt.on('mousedown', dragStart);
        $bigOulBox.on('mouseenter', function () {
            mySwiper.allowTouchMove = false;
            mySwiper.allowSlidePrev = false
        }).on('mouseleave', function () {
            mySwiper.allowTouchMove = true;
            mySwiper.allowSlidePrev = true
        });
        $oUlBox[0].onmousewheel = (e) => {
            e = e || window.event;
            if (e.wheelDelta > 0)
                ut -= 20;
            if (e.wheelDelta < 0)
                ut += 20;
            ut = ut > maxUt ? maxUt : (ut < 0 ? 0 : ut);
            let gdtT = ut / maxUt * maxT;
            $oUl.css({top: -ut});
            $oGdt.css({top: gdtT});
        }
    }

    function shareMore() {
        let $moreBtn = $('.morebtn'),
            $oUl = $('.NIE-share-more>ul');
        $moreBtn.on('mouseenter', function () {
            $oUl.show()
        }).on('mouseleave', function () {
            $oUl.hide()
        });
        $oUl.on('mouseenter', function () {
            $oUl.css({display: 'block'})
        }).on('mouseleave', function () {
            $oUl.hide()
        });
    }

    bigBannerFn();
    litBannerFn.init();
    gdt();
    shareMore();
})();