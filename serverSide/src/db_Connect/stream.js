import pkg from 'stream-chat';
import "dotenv/config"
const { StreamChat } = pkg;


const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.log('STREAM_API_KEY and STREAM_API_SECRET notfound');
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertUser = async (userData) => {
    try {
        const streamData= await streamClient.upsertUser(userData)
        return streamData;
    } 
    catch (error) {
        console.error('Error upserting user:', error);
        throw error;       
    }
}

export const generateStreamToken = (userId) => {
    try {
        //ensure userId is a string
        const userIdString = String(userId);
        return streamClient.createToken(userIdString);
    } catch (error) {
        log.error('Error generating stream token:stream.js', error);
        throw error;
    }
}