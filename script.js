
const API_KEY="YOUR_OPENAI_API_KEY";
const chat=document.getElementById("chat");

/* ================= LOGIN ================= */

function login(){
const name=document.getElementById("username").value.trim();
if(!name) return;
localStorage.setItem("jjUser",name);
document.getElementById("login").style.display="none";
document.getElementById("app").style.display="flex";
loadChat();
}

function logout(){
localStorage.clear();
location.reload();
}

/* ================= MEMORY ================= */

function saveChat(){
localStorage.setItem("jjChat",chat.innerHTML);
}

function loadChat(){
chat.innerHTML=localStorage.getItem("jjChat")||"";
}

/* ================= ADD MESSAGE ================= */

function addMessage(text,type){
    const msg=document.createElement("div");
    msg.className="msg "+type;
    msg.innerText=text;

    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
    saveChat();
}

// animate bot response typing like ChatGPT with cursor effect
function addMessageAnimated(text){
    const msg=document.createElement("div");
    msg.className="msg bot bot-message"; // bot-message adds CSS typing animation
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;

    let i=0;
    const interval=setInterval(()=>{
        msg.innerText+=text.charAt(i);
        i++;
        chat.scrollTop=chat.scrollHeight;
        if(i>=text.length){
            clearInterval(interval);
            msg.classList.remove('bot-message'); // stop width animation
            saveChat();
        }
    },30); // adjust speed as desired
}


/* ================= SUGGESTION ================= */

function fill(text){
document.getElementById("userInput").value=text;
}

/* ================= ===== SMART NLP DATA (20+) ===== ================= */

const knowledgeBase = [

{keys:["hi","hello","hey","hii"], answer:"Welcome to BLAZE AI 👋"},
{keys:["who are you","your name"], answer:"I am BLAZE AI 🤖 Your Smart Assistant."},
{keys:["services","what do you do"], answer:"AI answers, Image generation, File reading, Voice support."},
{keys:["time","current time"], answer:()=>`Time: ${new Date().toLocaleTimeString()}`},
{keys:["date","today date"], answer:()=>`Date: ${new Date().toLocaleDateString()}`},

{keys:["ai","artificial intelligence"], answer:"AI makes machines think like humans."},
{keys:["machine learning","ml"], answer:"Machine Learning (ML) is a subset of artificial intelligence that focuses on building systems capable of learning from data and making decisions with minimal human intervention. It encompasses various algorithms like regression, classification, clustering, and reinforcement learning, which can be applied across industries such as healthcare, finance, and transportation to analyze patterns and predict outcomes."},
{keys:["deep learning"], answer:"Deep Learning is an advanced branch of ML that leverages multi-layered neural networks to model complex patterns in data. These deep neural networks are especially powerful for tasks such as image and speech recognition, natural language processing, and autonomous driving, as they can automatically discover intricate features from raw data through layers of nonlinear transformations."},

{keys:["frontend"], answer:"Frontend = UI built with HTML, CSS, JavaScript."},
{keys:["backend"], answer:"Backend handles server & database logic."},
{keys:["full stack"], answer:"Full Stack = Frontend + Backend + Database."},

{keys:["database"], answer:"Database stores data using MySQL, MongoDB etc."},
{keys:["cloud"], answer:"Cloud computing provides online servers like AWS & Azure."},
{keys:["cyber security"], answer:"Cyber Security protects systems from hackers."},

{keys:["blockchain"], answer:"Blockchain is a secure distributed ledger technology."},
{keys:["crypto","cryptocurrency"], answer:"Crypto like Bitcoin uses blockchain technology."},

{keys:["app development"], answer:"App development builds mobile apps using Flutter/React Native."},
{keys:["web development"], answer:"Web development builds modern websites & apps."},

{keys:["seo"], answer:"SEO improves website ranking on Google."},
{keys:["freelancing"], answer:"Freelancing means working independently for clients."},

{keys:["career"], answer:"Tech careers: Developer, AI Engineer, Data Scientist, Cyber Expert."},
{keys:["motivation","motivate"], answer:"Consistency + Hard Work = Success 💪"},
{keys:["bye","goodbye"], answer:"Bye 👋 Thanks for using BLAZE AI!"},

{keys:["motivate"], answer:"Consistency builds success 💪"},
{keys:["how are you"], answer:"I am doing great, thanks for asking!"},
{keys:["sojith"], answer:"He is studing in kkdgms .He is a gana singer .He is popularly known as KUMARI VEDAN "},
{keys:["humanities first batch"], answer:"1.nishok 2.manikandan 3.balaji 4.sabarish 5.veera mani 6.sooraj 7.raghava hari8.godwin rabins 9.mithun"},
{keys:["jj techz"],answer:"JJ TECHZ is a dynamic and innovative web development company committed to helping businesses grow through modern technology solutions. With creativity, technical expertise, and a passion for innovation, JJ TECHZ aims to transform ideas into powerful digital experiences.JJ TECHZ was founded by J.JAFRO, a visionary entrepreneur with a strong interest in web technologies and digital innovation. As the Founder J. Jafro established the company with a clear mission to deliver high-quality, reliable, and affordable web solutions for businesses of all sizes. His leadership and forward-thinking mindset continue to guide the company toward excellence.Supporting this vision is the Co-Founder, S. Akilesh, whose dedication and technical knowledge play a vital role in the company’s growth.", image:"jj.png"}, 
{keys:["kkdgms"], answer:"KKDGMS-KanniyaKumari District Government Model School.It is a residential school.There are more than 400 students are studying ",image:"jamcet.jpg"},

// additional educational data entries
{keys:["html"], answer:"HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags like <html>, <head>, <body>, <div> to structure content."},
{keys:["css"], answer:"CSS (Cascading Style Sheets) is used to style HTML elements, controlling layout, colors, fonts, and responsive design."},
{keys:["javascript language"], answer:"JavaScript is a programming language that enables interactive web pages and is an essential part of web applications."},
{keys:["python"], answer:"Python is a high-level, interpreted language known for its readability and wide use in web development, data science, and automation."},
{keys:["java"], answer:"Java is an object-oriented programming language used for building platform-independent applications running on the Java Virtual Machine (JVM)."},
{keys:["c++"], answer:"C++ is a powerful general-purpose language with support for low-level memory manipulation, commonly used in system/software development and game programming."},
{keys:["data structures"], answer:"Data structures like arrays, linked lists, stacks, queues, trees, and graphs organize and store data efficiently for various algorithms."},
{keys:["algorithms"], answer:"Algorithms are step-by-step procedures for calculations; examples include sorting (quick sort, merge sort) and searching (binary search)."},
{keys:["object oriented programming","oop"], answer:"OOP is a paradigm based on objects and classes, encapsulation, inheritance, and polymorphism to model real-world concepts."},
{keys:["functional programming"], answer:"Functional programming treats computation as the evaluation of mathematical functions and avoids changing state or mutable data."},
{keys:["version control"], answer:"Version control systems like Git track changes to code, allow collaboration, and manage project history."},
{keys:["git"], answer:"Git is a distributed version control system used to manage project source code, allowing commits, branching, and merging."},
{keys:["docker"], answer:"Docker packages applications into containers, enabling consistent environments across development, testing, and production."},
{keys:["kubernetes"], answer:"Kubernetes automates deployment, scaling, and management of containerized applications across clusters of machines."},
{keys:["rest api"], answer:"REST API (Representational State Transfer) uses HTTP methods to perform CRUD operations on resources represented in JSON or XML."},
{keys:["json"], answer:"JSON (JavaScript Object Notation) is a lightweight data-interchange format commonly used in web APIs."},
{keys:["xml"], answer:"XML (eXtensible Markup Language) is a markup language used for encoding documents in a format that is both human- and machine-readable."},
{keys:["mobile development"], answer:"Mobile development builds applications for smartphones and tablets using native or cross-platform tools."},
{keys:["database normalization"], answer:"Normalization organizes database schemas to reduce redundancy and dependency by dividing tables into smaller ones and defining relationships."},
{keys:["sql"], answer:"SQL (Structured Query Language) is used to communicate with relational databases to perform queries and manage data."},
{keys:["nosql"], answer:"NoSQL databases like MongoDB, Cassandra, and Redis provide flexible schemas for unstructured or semi-structured data."},
{keys:["ai ethics"], answer:"AI ethics addresses moral issues like bias, privacy, and transparency when developing and deploying artificial intelligence."},
{keys:["natural language processing","nlp"], answer:"NLP enables machines to understand, interpret, and generate human language through techniques like tokenization and sentiment analysis."},
{keys:["computer vision"], answer:"Computer vision allows computers to interpret and process visual information from the world, such as images and videos."},
{keys:["robotics"], answer:"Robotics integrates engineering and computer science to design machines capable of performing tasks autonomously or semi-autonomously."},
{keys:["internet of things","iot"], answer:"IoT connects everyday objects to the internet, enabling data exchange and remote control."},
{keys:["cybersecurity","security"], answer:"Cybersecurity involves protecting systems and networks from digital attacks, malware, and data breaches."},
{keys:["cloud computing","cloud"], answer:"Cloud computing delivers computing services—servers, storage, databases, networking, etc.—over the internet on a pay-as-you-go basis."},
{keys:["big data"], answer:"Big Data refers to extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations."},
{keys:["deepfake"], answer:"Deepfake uses deep learning techniques to create realistic but fake audio or video content, raising ethical concerns."},
{keys:["quantum computing"], answer:"Quantum computing uses principles of quantum mechanics to perform certain calculations much faster than classical computers."},
{keys:["blockchain technology"], answer:"Blockchain technology enables secure, transparent, and tamper-proof ledgers by chaining blocks of transactional data."},
];

/* ================= NLP MATCH ENGINE ================= */

// compute basic similarity score between two strings using longest common substring length
function similarity(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();
    let max = 0;
    for(let i=0;i<a.length;i++){
        for(let j=0;j<b.length;j++){
            let l = 0;
            while(a[i+l] && b[j+l] && a[i+l]===b[j+l]) l++;
            if(l>max) max=l;
        }
    }
    return max / Math.max(a.length, b.length);
}

function checkLocal(input){
    input = input.toLowerCase();
    const words = input.split(" ");

    // direct match first
    for(let item of knowledgeBase){
        for(let key of item.keys){
            if(words.includes(key) || input.includes(key)){
                // bump usage count if tracking
                item.usage = (item.usage||0)+1;
                return typeof item.answer==="function" ? item.answer() : item.answer;
            }
        }
    }

    // fuzzy search if no exact key
    let best = {score:0, item:null};
    for(let item of knowledgeBase){
        for(let key of item.keys){
            const score = similarity(input, key);
            if(score>best.score && score>0.4){ // threshold
                best = {score, item};
            }
        }
    }
    if(best.item){
        best.item.usage = (best.item.usage||0)+1;
        return typeof best.item.answer==="function" ? best.item.answer() : best.item.answer;
    }

    return null;
}

/* ================= USER DATA LEARNING ================= */

function loadUserData(){
    const data = JSON.parse(localStorage.getItem('jjData') || '[]');
    for(const item of data){
        knowledgeBase.push(item);
    }
}

function saveUserData(entry){
    const data = JSON.parse(localStorage.getItem('jjData') || '[]');
    data.push(entry);
    localStorage.setItem('jjData', JSON.stringify(data));
}

// load stored lessons on startup
loadUserData();


/* ================= AI ================= */

async function getAI(prompt){

try{
const res=await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+API_KEY
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}]
})
});

const data=await res.json();
return data.choices[0].message.content;

}catch(err){
return "SORRY,I AM STILL LEARNING";
}
}

/* ================= SEND MESSAGE ================= */

async function sendMessage(){

const input=document.getElementById("userInput");
const text=input.value.trim();
if(!text) return;

addMessage(text,"user");
input.value="";

let localReply=checkLocal(text);

if(localReply){
    addMessage(localReply,"bot");
} else {
    // show typing animation similar to ChatGPT
    const typingElem = showTyping();
    const reply = await getAI(text);
    typingElem.remove();
    addMessageAnimated(reply);
    // save the new question/answer pair for future local use
    const entry = { keys: [text.toLowerCase()], answer: reply };
    saveUserData(entry);
    knowledgeBase.push(entry);
}
}

/* ================= IMAGE ================= */

function generateImage(){

let promptText=prompt("Enter Image Prompt:");
if(!promptText) return;

addMessage("Image: "+promptText,"user");

setTimeout(()=>{
addMessage("","bot");
chat.lastChild.innerHTML=
`<img src="https://source.unsplash.com/500x300/?${encodeURIComponent(promptText)}"
style="width:100%;border-radius:10px">`;
},1500);
}

/* ================= FILE ================= */

function readFile(event){

const file=event.target.files[0];
if(!file) return;

const reader=new FileReader();
reader.onload=function(e){
addMessage("File Content:\n"+e.target.result,"bot");
};
reader.readAsText(file);
}

/* ================= VOICE ================= */

function startVoice(){

if(!('webkitSpeechRecognition'in window))
return alert("Voice not supported");

const recognition=new webkitSpeechRecognition();
recognition.lang="en-US";
recognition.start();

recognition.onresult=function(e){
document.getElementById("userInput").value=
e.results[0][0].transcript;
sendMessage();
};
}

/* ================= EXTRA FEATURES ================= */

function clearChat(){
chat.innerHTML="";
localStorage.removeItem("jjChat");
}

function toggleTheme(){
    document.body.classList.toggle("light");
}

// allow manual addition of knowledge via prompt
function addKnowledge(){
    const phrase = prompt("Enter the question or keyword you want to teach the bot:");
    if(!phrase) return;
    const answer = prompt("Enter the response the bot should give:");
    if(!answer) return;
    const entry = { keys: [phrase.toLowerCase()], answer };
    saveUserData(entry);
    knowledgeBase.push(entry);
    alert("Knowledge added successfully!");
}

function downloadChat(){
const text=chat.innerText;
const blob=new Blob([text],{type:"text/plain"});
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;
a.download="chat.txt";
a.click();
URL.revokeObjectURL(url);
}

/* ================= AUTO LOGIN ================= */

if(localStorage.getItem("jjUser")){
document.getElementById("login").style.display="none";
document.getElementById("app").style.display="flex";
loadChat();
}

/* ================= TYPING LOADER ================= */

function showTyping(){

const typing=document.createElement("div");
typing.className="msg bot";

typing.innerHTML=`
<div class="typing">
<span></span>
<span></span>
<span></span>
</div>
`;

chat.appendChild(typing);
chat.scrollTop=chat.scrollHeight;

return typing;
}
