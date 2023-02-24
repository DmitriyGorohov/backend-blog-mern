import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не мение 6 символов').isLength({ min: 6 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Не верная ссылка на аватарку').optional().isURL()
]
