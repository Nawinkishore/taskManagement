import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.get('/status', (req, res) => {
    return res.json({
        success: true,
        message: "Success"
    })
}
)
app.use('/api',router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
