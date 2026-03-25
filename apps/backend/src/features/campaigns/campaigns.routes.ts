import { Router, type IRouter } from 'express'
import { getCampaigns, getCampaignById, getCampaignBySlug } from './campaigns.controller.js'

const router: IRouter = Router()

router.get('/', getCampaigns)
router.get('/slug/:slug', getCampaignBySlug)
router.get('/:id', getCampaignById)

export default router
