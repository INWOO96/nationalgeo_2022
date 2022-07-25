Vue.component("header-el", {
    data : () => {
        return {
            menuItem : [
                "animal", "history", "environment", "science", "travel"
            ]
        }
    },
    template : `
    <header>
        <div class="logo">
            <router-link to="/">
                <img src="./img/toplogo.png" alt="">
            </router-link>
        </div>
        <div class="menu">
            <ul>
                <li v-for="list in menuItem">
                    <router-link :to="'/'+ list">{{ list }}</router-link>
                </li>
            </ul>
        </div>
        <div class="mypage">
            <ul>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
            </ul>
        </div>
        <div class="resBtn">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    `
});

const pageMain = {
    data : () => {
        return {
            movieItem : [
                ["animal.mp4", "animal"],
                ["history.mp4", "history"],
                ["environment.mp4", "environment"],
                ["science.mp4", "science"],
                ["travel.mp4", "travel"],
            ],
            randomIndex : Math.floor(Math.random() * 5)
        }
    },
    created(){ /* 초기 화면상에 던질 수 있는 데이터를 처리하는 곳 */ },
    mounted(){ /* created()보다는 늦지만 초기 함수구문으로 정의할 수 있는 구성 (jQuery 구문도 정의하여 적용 가능한 위치) */ },
    template : `
    <section id="main">
        <!-- autoplay loop : 반복재생, muted : 음소거, playsinline : ios에서도 돌아가게 만듬 -->
        <video :src="'./video/'+ movieItem[randomIndex][0]" autoplay loop muted playsinline></video>
        <!-- video_dark로 가독성 떨어지는 효과 막을것임 -->
        <div class="video_dark"></div>
        
        <div class="wrap">
            <div class="main_cont">
                <div class="content">
                    <img src="./img/yellowFrame.png" alt="">
                    <h2>{{movieItem[randomIndex][1]}}</h2>
                </div>
            </div>
        </div>
    </section>
    `
}
//data 패턴(2차 배열) = [이미지, 타이틀]
const pageAnimal = pageFormat("animals", "animal", 12);
const pageHistory = pageFormat("history", "history", 12);
const pageEnvironment = pageFormat("environment", "environ", 12);
const pageScience = pageFormat("science", "science", 12);
const pageTravel = pageFormat("travel", "travel", 12);
function pageFormat(path, image, size) {
    return {
        data : () => {
            return {item : arrayByType(path, image, size)}
        },
        template : commonMenuMove(path)
    }
}
function arrayByType(path, image, size) {
    const arr = [];
    for ( let i = 0; i < size; i++ ) {
        arr[i] = [image + "_news_" + (i + 1) + ".jpg", image + "_news_" + (i + 1), path];
    }
    return arr;
}
function commonMenuMove(title) {
    console.log(title);
    return `
    <section id="sub_item">
        <div class="wrap">
            <h2>${title}</h2>
            <div class="content">
                <div v-for="list in item" class="box">
                    <div class="bg_img" :style="'background-image:url(./img/' + list[2] + '/'+ list[0] +')'"></div>
                    <div class="info"><h3>{{list[1]}}</h3></div>
                </div>
            </div>
        </div>
    </section>
    `
}


const reRoutes = [
    {
        path : "/", // 최초화면이라는 뜻
        component : pageMain
    },
    {
        path : "/animal",
        component : pageAnimal
    },
    {
        path : "/history",
        component : pageHistory
    },
    {
        path : "/environment",
        component : pageEnvironment
    },
    {
        path : "/science",
        component : pageScience
    },
    {
        path : "/travel",
        component : pageTravel
    }
];
const router1 = new VueRouter({
    routes : reRoutes
});

const footer = {
    template : 
    `
        <footer>
            <p>Copyrights &copy; National Geographic</p>
        </footer>
    `
}


new Vue({
    el : "#app",
    router : router1, // VueRouter 객체를 넣어준다.
    components : {
        "footer-el" : footer
    }
});

// dom이라서 무조건 스크립트 밑에 깔아야한다. 그래야 먹는다.
const $body = document.querySelector("body");
const $menu = document.querySelector("header .menu");
const $resBtn = document.querySelector("header .resBtn");

//반응형 메뉴 햄버거 아이콘 클릭시
$resBtn.addEventListener("click", function(){
    const $active_resBtn = $resBtn.classList.contains("active");
    if (!$active_resBtn) {
        $body.classList.add("showMenu");
        $menu.classList.add("active");
        $resBtn.classList.add("active");
        menuList();
    }
    else {
        $body.classList.remove("showMenu");
        $menu.classList.remove("active");
        $resBtn.classList.remove("active");
    }
});

//반응형 메뉴 리스트 클릭시
const menuList = () => {
    const $menuList = document.querySelectorAll("header .menu.active li");
    for ( const v of $menuList ) {
        console.log(v);
        v.addEventListener("click", () => {
            $body.classList.remove("showMenu");
            $menu.classList.remove("active");
            $resBtn.classList.remove("active");
        });
    }
    const $logo = document.querySelector("body.showMenu .logo");
    $logo.addEventListener("click", () => {
        $body.classList.remove("showMenu");
        $menu.classList.remove("active");
        $resBtn.classList.remove("active");
    });
};