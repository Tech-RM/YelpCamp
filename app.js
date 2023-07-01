import express from 'express';
import { v4 as uuid } from 'uuid';
import  methodOverride  from 'method-override';
import path from 'path';
//***In ES modules, you can use the import.meta.url
// property to get the URL of the current module file.
// You can then manipulate this URL to extract the directory path */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createCampDocument, deleteDocumentAndData, getCollectionAndDocuments, getDocumentAndData, updateDocumentData } from './utility/firebase/firebase.utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//****END ******/

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

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/campground',async(req,res)=>{
    const camps= await getCollectionAndDocuments();
    res.render('campgrounds',{camps});
})
app.post('/campground',async(req,res)=>{
    const data=req.body.campground;
    const reply=await createCampDocument({id: uuid(),...data});
    res.redirect(302,`/campground/${reply.id}`);
})
app.get('/campground/new',async(req,res)=>{
    res.render('newCampground');
})
app.get('/campground/:id',async(req,res)=>{
    const {id}=req.params;
    const camp= await getDocumentAndData(id);
    res.render('showCampground',{camp});
})
app.get('/campground/:id/edit',async(req,res)=>{
    const {id}=req.params;
    const camp= await getDocumentAndData(id);
    res.render('editCampground',{camp});
})
app.put('/campground/:id',async(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    await updateDocumentData({id,...data});
    res.redirect(302,`/campground/${id}`);
})
app.delete('/campground/:id',async(req,res)=>{
    const {id}=req.params;
    await deleteDocumentAndData(id);
    res.redirect(302,"/campground");
})
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}.`);
})