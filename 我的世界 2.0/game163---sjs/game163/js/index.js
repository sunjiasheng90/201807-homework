function game163_1() {
    function banFn() {
        let $ban_max = $('.banner_max'),
            $ban_box = $ban_max.children('.banner_box'),
            ban = $ban_box[0].getElementsByClassName('banner'),
            $tip_box = $ban_max.children('.tip_box'),
            tip = $tip_box[0].getElementsByClassName('tip'),
            n = 0,
            index = 0,
            timer = null;

        function getData() {
            $.post('./data/ban.json', function (data) {
                console.log(data);
                giveHtml(data);

                autoPlay();
                eventFN();

            })
        }

        getData();
        function giveHtml(data) {
            let strBan = '',
                strTip = '';
            for (let i = 0; i < data.length; i++) {
                let {
                    bgImg,
                    Ahref,
                    top,
                    right,
                    title1,
                    title2,
                    title3
                } = data[i];
                strBan += `<li class="banner" style="background-image: url('${bgImg}');">
            <a href="${Ahref}">
                <div class="info" style="position: absolute; top:${top}; right:${right};">
                    <h2>${title1}</h2>
                    <h3>${title2}</h3>
                    <p>${title3}</p>
                    <i></i>
                </div>
            </a>
        </li>`;
                strTip += `<li class="tip"></li>`;
            }
            $ban_box.html(strBan);
            $tip_box.html(strTip);
            n = data.length;
            $(ban[0]).addClass('current');
            $(tip[0]).addClass('current');
        }

        function play() {
            index++;
            if (index == n) {
                index = 0
            }
            $(ban).eq(index).addClass('current').siblings().removeClass('current');
            $(tip).eq(index).addClass('current').siblings().removeClass('current');
        }

        function autoPlay() {
            timer = setInterval(function () {
                play()
            }, 3000)
        }


        function eventFN() {
            [...tip].forEach((item, ind) => {
                item.onclick = function () {
                    console.log(tip);
                    clearInterval(timer);
                    $([...ban][ind]).addClass('current').siblings().removeClass('current');
                    $([...tip][ind]).addClass('current').siblings().removeClass('current');
                    index = ind;
                    autoPlay();
                }
            })
        }
    }
    banFn();
    function gameList() {
        let $gameMore =$('header .top .more'),
            n = 0;
        $gameMore.on('click',function () {
            console.log(this,n);
            if (n == 0) {
                $(this).addClass('current');
                n = 1
            } else {
                $(this).removeClass('current');
                n = 0
            }
        })

    }
    gameList();



}
function game163_2() {
    function tapFn() {
        let $tabTit=$('.tab_box .title_box .title'),
            $tabPic=$('.tab_box .pic_box .pic');

        $tabTit.on('click',function () {
            $tabPic.eq($(this).index()).addClass('cur').siblings().removeClass('cur');
            $(this).addClass('cur').siblings().removeClass('cur');
        })



    }
    tapFn();
}
game163_1();
game163_2();
