<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Quiz</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<style>

body{
background:#f4f6fb;
font-family:system-ui;
}

.quiz-app{
max-width:500px;
margin:auto;
background:white;
min-height:100vh;
}

/* header */

.quiz-header{
display:flex;
align-items:center;
padding:14px 16px;
border-bottom:1px solid #eee;
}

.back-btn{
font-size:20px;
margin-right:12px;
color:#333;
}

/* timer */

.timer-box{
padding:16px;
}

.progress{
height:6px;
border-radius:10px;
}

/* question */

.question-card{
background:#f8f9ff;
padding:20px;
border-radius:12px;
font-size:18px;
font-weight:600;
margin-bottom:20px;
}

/* options */

.option{
display:flex;
align-items:center;
padding:12px 14px;
border:1px solid #e4e6ef;
border-radius:10px;
margin-bottom:12px;
cursor:pointer;
transition:0.25s;
}

.option:hover{
background:#f1f3ff;
}

.option input{
margin-right:10px;
}

/* correct wrong animation */

.correct{
background:#d4edda !important;
border-color:#28a745;
}

.wrong{
background:#f8d7da !important;
border-color:#dc3545;
}

/* next button */

.next-btn{
width:100%;
margin-top:10px;
}

/* result popup */

#resultPopup{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.7);
display:flex;
align-items:center;
justify-content:center;
}

.result-box{
background:white;
padding:30px;
border-radius:12px;
text-align:center;
width:90%;
max-width:400px;
}

</style>

</head>

<body>

<div id="app" class="quiz-app">

<!-- HEADER -->

<div class="quiz-header">

<a href="index.html" class="back-btn">
<i class="bi bi-arrow-left"></i>
</a>

<h6 class="m-0">{{quizTitle}}</h6>

</div>

<!-- TIMER -->

<div class="timer-box">

<div class="d-flex justify-content-between mb-2">

<span>Timer {{time}}</span>
<span>{{current+1}}/{{questions.length}}</span>

</div>

<div class="progress">

<div class="progress-bar bg-primary" :style="{width:progress+'%'}"></div>

</div>

</div>

<div class="container pb-4">

<!-- QUESTION -->

<div class="question-card">
{{currentQuestion.question}}
</div>

<!-- OPTIONS -->

<label
v-for="(opt,i) in currentQuestion.options"
:key="i"
class="option"
:class="optionClass(i)"
>

<input type="radio"
name="option"
:disabled="answered"
@click="selectOption(i)"
>

<span>{{opt}}</span>

</label>

<button class="btn btn-primary next-btn" @click="nextQuestion">
Next Question
</button>

</div>


<!-- RESULT -->

<div id="resultPopup" v-if="showResult">

<div class="result-box">

<h4>{{quizTitle}}</h4>

<h1>{{score}} / {{questions.length}}</h1>

<button class="btn btn-success mt-3" onclick="location.href='index.html'">
Back Home
</button>

</div>

</div>

</div>

<script>

const {createApp}=Vue

createApp({

data(){

return{

quizTitle:"Quiz",

questions:[],

current:0,

score:0,

selected:null,

answered:false,

time:5,

progress:100,

timer:null,

showResult:false

}

},

computed:{

currentQuestion(){

return this.questions[this.current] || {}

}

},

methods:{

startTimer(){

this.time=5

this.progress=100

clearInterval(this.timer)

this.timer=setInterval(()=>{

this.time--

this.progress-=20

if(this.time<=0){

clearInterval(this.timer)

this.nextQuestion()

}

},1000)

},

selectOption(i){

if(this.answered) return

this.selected=i

this.answered=true

clearInterval(this.timer)

if(i===this.currentQuestion.answer){

this.score++

}

},

optionClass(i){

if(!this.answered) return ""

if(i===this.currentQuestion.answer) return "correct"

if(i===this.selected) return "wrong"

return ""

},

nextQuestion(){

clearInterval(this.timer)

this.answered=false

this.selected=null

this.current++

if(this.current<this.questions.length){

this.startTimer()

}else{

this.showResult=true

}

}

},

mounted(){

fetch("data/quiz-data.json")

.then(res=>res.json())

.then(data=>{

const params=new URLSearchParams(location.search)

const quizId=params.get("quiz")

const quiz=data.quizzes.find(q=>q.id===quizId)

this.quizTitle=quiz.title

this.questions=quiz.questions

this.startTimer()

})

}

}).mount("#app")

</script>

</body>
</html>
