import { Router, type IRouter } from 'express'
import { getAnimals, getAnimalById } from './animals.controller.js'

const router: IRouter = Router()

router.get('/', getAnimals)
router.get('/:id', getAnimalById)

export default router
