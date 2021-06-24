# 反應力小遊戲

## 來源
參考Huang Jamie的youtube影片和github的程式碼，了解程式原理並做出適當修改
https://github.com/HuangJamison/Portfolio_Code/tree/master/Javascript%E5%AF%AB%E4%B8%80%E5%80%8B%E5%8F%8D%E6%87%89%E5%8A%9B%E5%B0%8F%E9%81%8A%E6%88%B2

https://www.youtube.com/watch?v=nvg4vGI5AI4

包含

1. 點擊螢幕開始遊戲
2. 顯示成績
3. 紀錄最佳紀錄

## 技術手段

html
```  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test your reaction!!</title>
    <link rel="stylesheet" href="./game.css"/>
</head>
<body>
    <div class="text">點擊一下螢幕，開始測驗你的反應力，畫面變色時請點擊螢幕</div>
    <ul class="score_board">
        <h4>反應力就是你的超能力</h4>
        <li>第1名:從缺</li>
        <li>第2名:從缺</li>
        <li>第3名:從缺</li>
        <li>第4名:從缺</li>
        <li>第5名:從缺</li>
    </ul>
    <button class="again again_hide">再玩一次!</button>
    <script src="./game.js"></script>
</body>
</html>
```
css
```
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
```
網頁預設
```
body {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background:#4119f3; 
    height: 500px;
}
```
```
.text{
    color: #fff;
    font-weight: normal;
    padding: 20px 40px;
    letter-spacing: 0.3em;
    text-shadow: 0 0 10px rgba(0,0,0,0.4);
    cursor: pointer;
}
.again{
    color: white;
    background: rgba(0,0,0,0);
    padding: 10px 20px;
    transition: all .5s;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #666;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
}
.again:hover{
    background-color: rgb(13, 212, 185);
    color: black;
    font-weight: 700;
    font-size: 16px;
}
.again_hide{
    display: none;
}
.body_change{
    background-color: #1fb800; 
}
```
記分板(css)
```
.score_board{   
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    padding: 0px 10px;
    letter-spacing: 0.3em;
    text-shadow: 0 0 10px rgba(0,0,0,0.8);
    cursor: pointer;
    display: none;
    margin-bottom: 20px;
}

```
javascript
```
let bg_change = false; // 開始時的背景是否改變
let btn_show = false; // 結束遊戲即可為true
let game_stop = false; // 遊戲中止判定
let time_start = 0;
let bg_ori = '#4119f3';
let high_score = [];
```
背景顏色改變
```
function background_change(){
    if (bg_change === false){
        let color_arr = [] 
        for (let i=0; i<3;i++){
            let random = Math.random()*150;
            color_arr.push(random); 
        }
        // 隨機顏色
        document.querySelector("body").style.backgroundColor = `rgb(${color_arr[0]},${color_arr[1]},${color_arr[2]})`;
        bg_change = true; //變色
        time_start = new Date(); // 計時開始
    }   
}
```
背景顏色重置
```
function background_remove() {
    if (bg_change === true){
        document.querySelector("body").style.backgroundColor = bg_ori;
        bg_change = false; 
    }    
}
```
button出現遊戲暫停
```
function show_btn() {
    if (btn_show === false){
        document.querySelector(".again").classList.remove("again_hide");
        btn_show = true;
        game_stop = true; // button出現遊戲暫停
    }
}
function hide_btn() {
    if (btn_show === true){
        document.querySelector(".again").classList.add("again_hide");
        btn_show = false;
        game_stop = false; // button消失遊戲開始
    }
}
```
遊戲開始
```
function start() {
    // 前置條件
    if (game_stop) return //如有任何開關為開啟即返回,不得開始
    else{
        // 當觸發即變色與計時
        document.querySelector("body").addEventListener("click",
            function() {
                // 先有個計時器 1~3秒 三秒後作換色
                window.setTimeout(background_change, (Math.floor(Math.random()*5+3))*1000);
                document.removeEventListener("click",start);  //避免再次觸發start
            }
        )
    }
}
// game& timer
```
遊戲內容
```
function game() {
    document.querySelector("body").addEventListener("click",
        function(e) {
            if ((bg_change === true) && (btn_show === false) && (game_stop === false) ){ //符合條件才會去計算時間
                let time_end = new Date() ;
                let score = ((time_end - time_start)/1000);
                alert(`你的成績為：${score}`);
                react_score(score);
                show_btn(); // 此時button出現，再玩一次 遊戲中止
                show_score();
            }else if((bg_change === false) && (btn_show === false) && (game_stop === false) ){
                alert("心急煮不了熱稀飯啊！");
                background_change(); // 讓bg_change變成true
                show_btn(); // 遊戲中止 
            }
            document.querySelector(".text").innerText="點擊再玩一次，開始測驗你的反應力!!";
        } 
    )
}
```
反應時間判斷
```
function show_score() {
    const score_li = document.querySelectorAll("li");
    for(let i=0;i<high_score.length;i++){
        score_li[i].innerText = `第 ${i+1} 名: ${high_score[i]}`;
    }
    document.querySelector('.score_board').style.display = "inline-block"; // 顯示成績
}
function sort_score(high_score, score) {
    // 從最後一個開始比
    for(let i= high_score.length-1; i>=0;i--){
        if(score > high_score[i]){
            return i+1;
        }
    }
    return 0; 
}
```
反應時間紀錄榜
```
function react_score(score) {
    document.querySelector("h4").innerText = "你已經超越榜上玩家，更新榜上紀錄";
    if(high_score.length < 1){ // array為空
        high_score.push(score);
    }else{
        if (score < high_score[high_score.length-1]){
            let insert_index = sort_score(high_score,score);
            high_score.splice(insert_index,0,score); //在Inserst_index插入score
            high_score.splice(5); //取前五個
        }else if(high_score.length < 5){
            // 小於個數仍可放進array
            high_score.push(score);
        }else{ //甚麼都沒有 
            document.querySelector("h4").innerText = "請繼續努力，榜上留名指日可待！";
        }
    }
}
```
遊戲重置
```
function reset() {
    document.querySelector(".again").addEventListener("click",
        function(e) {
            //確認狀況為遊戲中止
            if (game_stop === true){
                //重置
                document.querySelector(".text").innerText = "開始測驗你的反應力，畫面變色時請點擊螢幕";
                document.querySelector('.score_board').style.display = "none";
                hide_btn(); // game_top = false
                background_remove();
                e.stopImmediatePropagation(); // 讓其停止回報以免觸發body的click
                // 重置完成
            }
        }
    )
}
```
程式本體
```
start();
document.querySelector("body").addEventListener("click",
    function (e) {
        if (e.target.tagName === 'BODY' || e.target.tagName === 'DIV'){ //如果tagName =BODY才開始遊戲
            game();
        }else if (e.target.tagName === 'BUTTON'){
            reset();
        }
    }
)
```

