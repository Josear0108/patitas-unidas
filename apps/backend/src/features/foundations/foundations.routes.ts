import { Router, type IRouter } from 'express'
import { getFoundations, getFoundationById } from './foundations.controller.js'

const router: IRouter = Router()

router.get('/', getFoundations)
router.get('/:id', getFoundationById)

export default router
