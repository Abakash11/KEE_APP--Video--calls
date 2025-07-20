import FriendRequest from "../models/FriendRequest.mjs"
import User from "../models/User.mjs"

export async function getRecomdatedUsers(req, res) {
    try {
        const userId=req.user._id
        const currentUser=req.user

        const recomendedUser= await User.find({
            $and:[
                {_id:{$ne:userId}},//exclude current user
                {_id:{$nin:currentUser.friends}},//exclude already friend
                {isOnborded:true}
            ]
        })
        res.status(200).json(recomendedUser)
        
    } catch (error) {
         console.log("error in getRecomdatedUsers",error);
         res.status(500).send('Internal Server Error')
         
    }
}

export async function getMyFriends(req, res) {
    try {
        const user= await User.findById(req.user._id).select('friends')
        .populate('friends','fullName profilePic netiveLanguage learningLanguage')
        res.status(200).send(user.friends)
    } catch (error) {
        console.log('error in getMyFriends contoller',error);
        res.status(500).send('Internal Server Error')
        
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId=req.user._id
        const resiverId=req.params.id
        console.log('myId:',myId);
        console.log('rsID:',resiverId);
        
        
        // Check if the receiverId is provided
        if (myId === resiverId) {
            return res.status(400).send('You cannot send a friend request to yourself');
        }
        // Check if the receiver user exists
        const resiverUser = await User.findById(resiverId);
        if (!resiverUser) {
            return res.status(404).send('Receiver user not found');
        }
        // Check if the receiver is already a friend
        if (resiverUser.friends.includes(myId)) {
            return res.status(400).send('You are already friends with this user');
        }
        // Check if a friend request already exists between the two users
        const exsistingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, receiver: resiverId },
                { sender: resiverId, receiver: myId }
            ]    
        })
        if (exsistingRequest) {
            return res.status(400).send('Friend request already sent or received');
        }
        // Create a new friend request
        const newFriendRequest = await FriendRequest.create({
            sender: myId,
            receiver: resiverId
        });

        res.status(201).json(newFriendRequest);
    } catch (error) {
        console.log('error in sendFriendRequest controller', error);
        res.status(500).send('Internal Server Error');  
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const myId=req.user._id.toString()
        const requestId=req.params.id
        
        // Check if the friend request exists
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).send('Friend request not found');
        }
        
        
        // Check if the current user is the receiver of the request
        if (friendRequest.receiver.toString() !== myId) {
            return res.status(403).send('You are not authorized to accept this friend request');
        }
        // Update the friend request status to accepted
        friendRequest.status = 'accepted';
        await friendRequest.save();
        
        // Add each other to friends list
        const senderId=friendRequest.sender
        await User.findByIdAndUpdate(myId,{$push:{friends:senderId}},{new:true})
        await User.findByIdAndUpdate(senderId,{$push:{friends:myId}},{new:true})




        res.status(200).json(friendRequest);
    } catch (error) {
        console.log('error in accpetFriendRequest controller', error);
        res.status(500).send('Internal Server Error');  
    }
}
export async function rejectFriendRequest(req, res) {
    try {
        const myId=req.user._id
        const requestId=req.params.id
        // Check if the friend request exists
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).send('Friend request not found');
        }
        // Check if the current user is the receiver of the request
        if (friendRequest.receiver.toString() !== myId) {
            return res.status(403).send('You are not authorized to reject this friend request');
        }
        // Update the friend request status to rejected
        friendRequest.status = 'rejected';
        await friendRequest.save();

        res.status(200).json(friendRequest);
    } catch (error) {
        console.log('error in rejectFriendRequest controller', error);
        res.status(500).send('Internal Server Error');  
    }
}
export async function getfriendRequests(req, res) {
    try {
        const myId=req.user._id
        const pendingRequests = await FriendRequest.find({
            receiver: myId,
            status: 'pending'
        }).populate('sender', 'fullName profilePic netiveLanguage learningLanguage');

        const acceptedRequests = await FriendRequest.find({
            receiver: myId,
            status: 'accepted'
        }).populate('sender', 'fullName profilePic netiveLanguage learningLanguage');


        res.status(200).json({pendingRequests,acceptedRequests});
    } catch (error) {
        console.log('error in getfriendRequests controller', error);
        res.status(500).send('Internal Server Error');  
    }
}

export async function ongoingFriendRequest(req, res) {
    try {
        const myId=req.user._id
        const ongoingRequests = await FriendRequest.find({
            $or: [
                { sender: myId, status: 'pending' },
                { receiver: myId, status: 'pending' }
            ]
        }).populate('receiver', 'fullName profilePic netiveLanguage learningLanguage');

        res.status(200).json(ongoingRequests);
    } catch (error) {
        console.log('error in ongoingFriendRequest controller', error);
        res.status(500).send('Internal Server Error');  
    }
}