import express from 'express';
import things from './things.js';
import bodyParser from 'body-parser'

const app = express();

app.get('/hello', (req, res) => {
    res.send("Hello world");
});

app.post('/hello', (req, res) => {
    res.send("You just called the post method of '/hello'")
})

app.all('/test', (req, res) => {
    res.send("HTTP method doesn't have any effect on this route!");
});

app.get('/:id', (req, res) => {
    res.send("The id you specified is: " + req.params.id);
});

app.get('/things/:name/:id', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
})

app.get(/^\/things\/([0-9]{5})$/, (req, res) =>{
   res.send('id: ' + req.params[0]);
});

app.use('/things', (req, res, next) => {
    console.log("A new request received at: " + Date.now());
    console.log("Start");
    next();
})

app.use('/things', things);


app.use('/things', (req, res, next) =>{
   console.log('End');
});

// Other routes here
app.get('*', (req, res) => {
   res.send('Sorry, this is an invalid URL.');
});



//Body Parser

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false}))

//To parse json
app.use(bodyParser.json())

//route တစ်ခုချင်းစီအတွက်လည်း middleware ထည့်လို့ရတယ်
//bodyparser လိုမျို့းသုံးထားရင် global middleware ဖြစ်သွားပြီ
//router တစ်ခုချင်းစီကိုလည်း middleware ထည့်လို့တယ


//Same with express
//express မှာလည်း url, json တွေကို parse လုပ်ပေးနိုင်တယ်
app.use(express.urlencoded({extended: false}))
app.use(express.json)

// json format ကိုပြောင်းပေးတယ်။


app.listen(3000);