import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось получить все статьи'
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndUpdate({
            _id: postId
        }, {
            $inc: { viewsCount: 1}
        }, {
            returnDocument: 'after'
        }, (err, doc) => {
            if(err) {
                return res.status(500).json({
                    message: 'Не удалось вернуть статью'
                })
            }
            if(!doc) {
                return res.status(400).json({
                    message: 'Статья не найдена'
                })
            }
            res.json(doc)
        })
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось получить все статьи'
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete({
            _id: postId
        }, (err, doc) => {
            if(err) {
                return res.status(500).json({
                    message: 'Не удалось удалить статью'
                })
            }
            if(!doc) {
                return res.status(400).json({
                    message: 'Статья не найдена'
                })
            }
            res.json({
                success: true
            })
        })

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось получить все статьи'
        })
    }
}
export const create = async (req, res) => {
    try {
        const document = PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })

        const post = await document.save()
        res.json(post)
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne({
            _id: postId
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags
        })

        res.json({
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}
