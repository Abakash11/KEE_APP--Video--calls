import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.mjs';
import { getMyFriends, getRecomdatedUsers,sendFriendRequest ,acceptFriendRequest, rejectFriendRequest,getfriendRequests,ongoingFriendRequest} from '../controllers/user.controller.mjs';


const router = express.Router();
router.use(authMiddleware)

router.get('/',getRecomdatedUsers)
router.get("/friends", getMyFriends);

router.post('/friendRequest/:id',sendFriendRequest)
router.put('/friendRequest/:id/accept',acceptFriendRequest)

router.put('/friendRequest/:id/reject',rejectFriendRequest)
router.get('/getFriendRequests', getfriendRequests);

router.get('/ongoingFriendRequest',ongoingFriendRequest);


export default router;