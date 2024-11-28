import { SensorData } from '../Config/DbCon.js';

export const saveToMongoDB = async (timestamp, data) => {
    try {
        const sensorDataDocument = new SensorData({
            receivedAt: timestamp,
            data,
        });
        await sensorDataDocument.save();
        // console.log('Data saved to MongoDB.');
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
    }
};
