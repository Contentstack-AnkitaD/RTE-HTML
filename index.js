import express from 'express';
import bodyParser from 'body-parser';
import { jsonToHtml } from '@contentstack/json-rte-serializer';
import pretty from 'pretty';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
    try {
        const jsonInput = req.body.json;
        const jsonObj = JSON.parse(jsonInput).json_rte;  // Assuming the JSON structure
        const htmlOutput = jsonToHtml(jsonObj);
         // Format the HTML output using pretty
         const formattedHtml = pretty(htmlOutput);
         res.json({ html: formattedHtml }); // Send the formatted HTML output
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
