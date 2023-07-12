import express from 'express';
import ejsMate from 'ejs-mate';
import  methodOverride  from 'method-override';
import path from 'path';
//***In ES modules, you can use the import.meta.url
// property to get the URL of the current module file.
// You can then manipulate this URL to extract the directory path */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import handleAsyncError from './utility/errorHandling/asyncErrorHandling.js';
import ExpressError from './utility/Express/expressError.js';
import validateCampData from './utility/JoiValidation/validateFields.js';
import { createNewCampground, deleteCampground, getAllCampgrounds, getParticularCampgroundData, updateCampground } from './utility/mongoose/mongoose.utils.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//****END ******/


const app=express();

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'components'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/campground',handleAsyncError(async(req,res)=>{
    const camps= await getAllCampgrounds();
    res.render('campgrounds',{camps});
}))
app.post('/campground',validateCampData,handleAsyncError(async(req,res)=>{
    const data=req.body;
    const camp=await createNewCampground(data);
    res.render('showCampground',{camp});
}))
app.get('/campground/new',handleAsyncError(async(req,res)=>{
    res.render('newCampground');
}))
app.get('/campground/:id',handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const camp= await getParticularCampgroundData(id);
    res.render('showCampground',{camp});
}))
app.get('/campground/:id/edit',handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const camp= await getParticularCampgroundData(id);
    res.render('editCampground',{camp});
}))
app.put('/campground/:id',validateCampData,handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    await updateCampground({id,...data});
    res.redirect(302,`/campground/${id}`);
}))
app.delete('/campground/:id',handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    await deleteCampground(id);
    res.redirect(302,"/campground");
}))
app.all('/*',(req,res,next)=>{
    next(new ExpressError("Page not found",404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500,message="You encountered an error from custom function",stack}=err;
    res.status(statusCode).render("errorPage",{message,stack});
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}.`);
})