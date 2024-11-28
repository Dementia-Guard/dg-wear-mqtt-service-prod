import mongoose from 'mongoose';
import envConfig from './envConfig.js';

// Use environment variables for MongoDB URI
const mongoURI = envConfig.mongo.uri;

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Define SensorData schema
const sensorDataSchema = new mongoose.Schema({
    receivedAt: { type: Date, default: Date.now },
    data: Object,
});

export const SensorData = mongoose.model('SensorData', sensorDataSchema);
