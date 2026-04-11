import { Router, type IRouter } from 'express'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { authorize } from '../../middlewares/authorize.middleware.js'
import { getRequests, approveRequest, rejectRequest, getStats } from './admin.controller.js'

const router: IRouter = Router()

router.get('/stats', authenticate, authorize('SUPER_ADMIN'), getStats)
router.get('/requests', authenticate, authorize('SUPER_ADMIN'), getRequests)
router.patch('/requests/:requestId/approve', authenticate, authorize('SUPER_ADMIN'), approveRequest)
router.patch('/requests/:requestId/reject', authenticate, authorize('SUPER_ADMIN'), rejectRequest)

export default router
