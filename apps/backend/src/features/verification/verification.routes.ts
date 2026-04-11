import { Router, type IRouter } from 'express'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { authorize } from '../../middlewares/requireRole.middleware.js'
import { getMyRequest, createRequest, cancelMyRequest } from './verification.controller.js'

const router: IRouter = Router()

router.post('/requests', authenticate, authorize('VISITOR', 'VERIFIED_USER'), createRequest)
router.get('/mine', authenticate, authorize('VISITOR', 'VERIFIED_USER', 'FOUNDATION_ADMIN'), getMyRequest)
router.patch('/requests/mine/cancel', authenticate, authorize('VISITOR', 'VERIFIED_USER'), cancelMyRequest)

export default router
