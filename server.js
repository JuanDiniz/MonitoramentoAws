require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configura AWS SDK
AWS.config.update({
    region: 'us-east-2', // Altere para a região apropriada
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS();

app.post('/track-click', async (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).send('Link is required');
    }

    const params = {
        Message: JSON.stringify({ link, timestamp: new Date() }),
        TopicArn: process.env.SNS_TOPIC_ARN
    };

    try {
        await sns.publish(params).promise();
        res.status(200).send('Click registered');
    } catch (error) {
        console.error('Error publishing to SNS:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
