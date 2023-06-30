import express from 'express';
import path from 'path';
//***In ES modules, you can use the import.meta.url
// property to get the URL of the current module file.
// You can then manipulate this URL to extract the directory path */
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// //****END ******/

// // Connection of DATABASE
// import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

// const db=mongoose.connection;
// db.on("error", console.error.bind(console, "Connection Error: "));
// db.once("open",()=>{console.log("Database Connection Successful.")});
// //Connection End...//

const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'components'));
app.get('/',(req,res)=>{
    res.render('home');
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}.`);
})