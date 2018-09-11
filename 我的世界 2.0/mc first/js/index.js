
(function () {
    /**
     * Created by Administrator on 2018/9/3.
     */
    var videoBtn = document.getElementsByClassName("video_btn")[0];
    var videos = document.getElementsByClassName("videos")[0],
        hfVideo = videos.getElementsByTagName('video')[0];
    var closeBtn = document.getElementsByClassName("close_btn")[0];
    var topBarNews = document.getElementsByClassName("topBar-news")[0];
    var smallPic = topBarNews.getElementsByClassName("small-pic")[0];
    var bigPic = document.getElementsByClassName("big-pic")[0];
    var topBarMenu = document.getElementsByClassName("topBar-menu")[0];
    var span = document.getElementsByClassName("hf-span")[0];

    videoBtn.onclick = function () {
        utils.css(videos,{ display: "block"});
        utils.css(hfVideo,{autoplay:'autoplay'});
        hfVideo.play();
    };
    closeBtn.onclick = function () {
        utils.css(videos, "display", "none");
        hfVideo.pause();
    };


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
function sjsWrap() {
    let gallery_box = document.getElementsByClassName('gallery_container')[0],
        wrapper_box = document.getElementsByClassName('wrapper')[0],
        gallery = gallery_box.getElementsByClassName('gallery_item'),
        btnBtn = document.getElementsByClassName('btn_box')[0],
        leftBtn = btnBtn.getElementsByClassName('left_btn')[0],
        rightBtn = btnBtn.getElementsByClassName('right_btn')[0],
        tipBox = document.getElementsByClassName('tip_box')[0],
        tips = tipBox.getElementsByClassName('tip'),
        leftBox = document.getElementsByClassName('left_flotage')[0],
        leftBoxBtn = leftBox.getElementsByClassName('btn')[0],
        regBtn = leftBox.getElementsByClassName('reg_btn')[0],
        rightBox = document.getElementsByClassName('right_flotage')[0],
        rightBoxBtn = rightBox.getElementsByClassName('btn')[0],
        dialog = document.getElementsByClassName('dialog')[0],
        dialogBtn = dialog.getElementsByClassName("dialog_close")[0],
        clientW = document.documentElement.clientWidth || document.body.clientWidth,
        clientH = document.documentElement.clientHeight || document.body.clientHeight,
        n = gallery.length,
        index = 0,
        flag = 0,
        flagBtn = 0,
        timer = null;


    /*3d轮播图*/
    function banner() {
        function play() {
            if (flag)return;
            flag = 1;
            gallery_box.addEventListener('transitionend', function () {
                flag = 0
            }, false);
            index++;
            index = index == n ? 0 : index;
            index = index == -1 ? n - 1 : index;
            if (index == n - 1) {
                let pre = gallery[index].previousElementSibling;
                let nex = gallery[0];
                $(gallery).removeClass('middle leftSide rightSide');
                $(gallery[index]).addClass('middle');
                $(pre).addClass('leftSide');
                $(nex).addClass('rightSide');
            } else if (index == 0) {
                let pre = gallery[n - 1];
                let nex = gallery[index].nextElementSibling;
                $(gallery).removeClass('middle leftSide rightSide');
                $(gallery[index]).addClass('middle');
                $(pre).addClass('leftSide');
                $(nex).addClass('rightSide');
            } else {
                let pre = gallery[index].previousElementSibling;
                let nex = gallery[index].nextElementSibling;
                $(gallery).removeClass('middle leftSide rightSide');
                $(gallery[index]).addClass('middle');
                $(pre).addClass('leftSide');
                $(nex).addClass('rightSide');
            }


            if (index == -1) {
                $(tips[n - 1]).addClass('active').siblings().removeClass('active');
            } else {
                $(tips[index]).addClass('active').siblings().removeClass('active');
            }
        }

        function autoPlay() {
            timer = setInterval(function () {
                play();
            }, 2000)
        }

        autoPlay();
        wrapper_box.onmouseenter = function () {
            $(btnBtn).css({display: 'block'});
            clearInterval(timer)
        };
        wrapper_box.onmouseleave = function () {
            $(btnBtn).css({display: 'none'});
            autoPlay();
        };
        leftBtn.onclick = function () {
            if (flag)return;
            index -= 2;
            play();
        };
        rightBtn.onclick = function () {
            play();
        };
        [...tips].forEach((item, ind) => {
            item.onclick = function () {
                index = ind - 1;
                play();
            }
        });
    }

    banner();
    /*左右浮动模块*/


    function leftRightBoxFn() {
        window.onscroll = function () {
            let sT = document.documentElement.scrollTop || document.body.scrollTop;
            if (sT < clientH) {
                flagBtn = 0
            }
            if (flagBtn)return;
            if (sT > clientH) {
                $(leftBox).css({
                    left: 30
                });
                $(rightBox).css({
                    right: 30
                })
            } else {
                $(leftBox).css({
                    left: -210
                });
                $(rightBox).css({
                    right: -210
                })
            }


        };
        leftBoxBtn.onclick = function () {
            flagBtn = 1;
            let temp = $(leftBoxBtn).parent();
            $(temp).css({
                left: -210
            });
        };
        rightBoxBtn.onclick = function () {
            let temp = $(rightBoxBtn).parent();
            $(temp).css({
                right: -210
            })
        };
    }

    leftRightBoxFn();

    /*快速注册*/
    function dialogFn() {
        regBtn.onclick = function () {
            $(dialog).css({
                display: 'block'
            })
        };


        dialogBtn.onclick = function () {
            $(dialog).css({
                display: 'none'
            })
        };
    }

    dialogFn();

}
sjsWrap();