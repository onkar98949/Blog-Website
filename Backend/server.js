const express = require('express')
const app = express();
const port = 8000;
const mongoose = require('mongoose')
const registered = require('./Schema')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
const Post = require('./PostSchema')

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'))

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await registered.findOne({email});

        if(existingUser){
            return res.status(400).json('User Already exists')
        }

        const newUser = registered({
            email,
            password
        })

        await newUser.save();
        res.json(newUser)

    } catch (err) {
        res.status(400).json('Please Retry')
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await registered.findOne({ email, password })
        
        if (userData) {
            jwt.sign({ email, id: userData._id }, 'seceret123', {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('ok')
            })
        }else{
            return  res.status(400).json({error:'Wrong Credentials'})
        }


    } catch (error) {
        res.status(400).json({error:'Wrong Credentials'})
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, 'seceret123', {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, 'seceret123', {}, async(err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author:info.id
        })
        res.json(postDoc);
    });

})

app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author',['email']).sort({createdAt:-1});
    res.json(posts)
})

app.get('/post/:id',async(req,res)=>{
    const {id}= req.params;
    const postDoc = await Post.findById(id).populate('author',['email']);
    res.json(postDoc);
    
})

app.put('/post',uploadMiddleware.single('file'),async(req,res)=>{
    let newPath = null;
    if(req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath); 
    }
    const { token } = req.cookies;
    jwt.verify(token, 'seceret123', {}, async(err, info) => {
        if (err) throw err;
        const {id, title, summary, content } = req.body
        const postDoc = await Post.findById(id);
        
        const isAuthor = JSON.stringify(postDoc.author)===JSON.stringify(info.id); 
        if(!isAuthor){
            return res.status(400).json('You are not the Author');
        }
        await postDoc.updateOne({title,summary,content,cover:newPath? newPath:postDoc.cover,})
        
        res.json(postDoc);
    });

})


mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => { console.log('Db Connected'); })
    .catch((err) => { err })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})