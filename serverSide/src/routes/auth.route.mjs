import Router from 'express'
import { login, logout, singup,onbording } from '../controllers/auth.controllers.mjs'
import { authMiddleware } from '../middleware/auth.middleware.mjs'

const router=Router()

router.post('/signup',singup)
router.post('/login',login)
router.get('/logout',logout)
router.post('/onbording',authMiddleware,onbording)
router.get('/me',authMiddleware,(req,res)=>{
    res.status(200).json({
        user: req.user,
        message: 'User fetched successfully'
    })
})

export default router