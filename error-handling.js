import express from 'express';

const app = express();

app.get('/error-handling', (req, res) => {
    res.send("Handling UnhandledRejection Exception");
});

//Unhandle promise rejection
let errorThrownFunction = () => {
    return new Promise((resolve, reject) => {
        // resolve("Connection success..");
        reject("Connection fail!!....");
    });
};

let errorHandlerMethod = async () => {
    try {
        let result = await errorThrownFunction();
        console.log(result);
        
    } catch (error) {
        throw new Error(error);
        //promise error ကို catch မလုပ်ထားလျှင် unhandle rejection exception တက်တယ်။
        //errro ကို handle လုပ်ခြင်းတစ်မျိုးပဲ 
        // console.log(error);
    }
};
errorHandlerMethod();


//process handle က globally unhandled rejctiong တွေကို handle လုပ်ပေးတာ
//သို့သော် try/catch ဖြင့် unhandled rejection တစ်ခုချင်းစီကို handle လုပ်တာပိုကောင်းပါတယ်။
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandle Rejectoin: ', reason);
});

process.on('uncaughtException', (reason) => {
    console.log("Uncaugh Exceptoin: ", reason);
    //perform clean up
    process.exit(1);
})

/**
 * Error handling (unhadledRejection) လို error တွေကို catch လုပ်တဲ့အခါ
 * <li> 1. Local (catch by developer) </li>
 * <li> 2. Global (catch by Express)</li>
 * ဆိုပြီးနှစ်မျုိုးရှိတယ်
 * Local ကတော့ရှင်းတယ် try/catch  သုံးပြီး catch လုပ်တာ next() နဲ့ erro parse လို့ရတယ်။
 * Global (express middleware) ကတော့ local က လာတဲ့ next() တွေကို handle လုပ်ပေးတယ်
 * 
 */

//express build-in  error handling middleware
throw new Error("Unexpected crash!");
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // safest to restart app
});

app.use((err, req, res, next) => {
    console.log('express build-in handler: ', err.message);
    res.status(500).json({message: "Internal Server Error."})
});


const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)


app.listen(3000);