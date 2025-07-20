import { generateStreamToken } from "../db_Connect/stream.js";

export default async function getStreamToken(req, res) {
try {
    const token=generateStreamToken(req.user.id)
    res.status(200).json({
        token: token,
        message: 'Stream token generated successfully'
    });
} catch (error) {
    console.log('Error generating stream token:chat.controllers', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to generate stream token'
    });
    
}
}