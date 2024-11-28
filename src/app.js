import express from 'express'
const app = express();
import { connectMQTT } from './Config/mqttConfig.js';
import { saveToRealtimeDB, saveToFirestore } from './Service/firebaseService.js';
import { saveToMongoDB } from './Service/mongoService.js';
import envConfig from './Config/envConfig.js';

const clientId = 'emqx_subscriber_' + Math.random().toString(16).substring(2, 8);
const { topic, qos } = envConfig.mqtt;

// Connect to the broker
const client = connectMQTT({ clientId });
const PORT = envConfig.sub_port; // Port for Express server

// Subscribe to the topic
client.subscribe(topic, { qos }, (error) => {
    if (error) {
        console.error('Subscribe error:', error);
    } else {
        console.log(`Subscribed to topic '${topic}'`);
    }
});

// Handle incoming messages
client.on('message', async (receivedTopic, message) => {
    const messageData = message.toString();
    console.log(`Received Message on ${receivedTopic}: ${messageData}`);

    try {
        const parsedData = JSON.parse(messageData);
        const deviceId = parsedData.dgWearId;
        const timestamp = Date.now();

        // Save to Firebase Realtime Database
        await saveToRealtimeDB(deviceId, timestamp, parsedData);

        // Save to Firestore
        // await saveToFirestore(timestamp, parsedData);

        // Save to MongoDB
        await saveToMongoDB(timestamp, parsedData);
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

//route for health check
app.get('/', (req, res) => {
    res.status(200).json({ code:200,sucess:true,status: 'online',data:{message:"subscriber is online"} });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});