import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не мение 6 символов').isLength({ min: 6 }),
]
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не мение 6 символов').isLength({ min: 6 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Не верная ссылка на аватарку').optional().isURL()
]
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Не верный формат тегов введите массив').optional().isString(),
    body('imageUrl', 'Не верная ссылка на изображение').optional().isString()
]
