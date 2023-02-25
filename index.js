import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import { loginValidation, postCreateValidation, registerValidation } from "./validations/index.js";
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { getMe, login, register } from "./controllers/UserController.js";
import { getAll, getOne, create, update, remove } from "./controllers/PostController.js";

mongoose.connect('mongodb+srv://Power_1234:Power_1234@bel-post.q5fie2q.mongodb.net/bio-post?retryWrites=true&w=majority')
    .then(() => console.log('DB OK!'))
    .catch((err) => console.log('DB error', err))
const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads${req.file.originalname}`
    })
})
app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, create)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, update)
app.delete('/posts/:id', checkAuth, remove)

app.listen(4444, (err) => {
    if (err) return console.log(err)
    console.log('Server ok!')
})
