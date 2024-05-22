// import { jsonToHtml } from "@contentstack/json-rte-serializer";



// const htmlValue = jsonToHtml({
//     "type": "doc",
//     "attrs": {},
//     "uid": "cf7212d11e7d400eb9b78c97fe85b032",
//     "children": [
//         {
//             "uid": "a60275fef38e4b5fa1be560620f9f900",
//             "type": "audience-pre",
//             "attrs": {
//                 "audiences": [
//                     "audience"
//                 ],
//                 "audienceId": "06ed680b225842198797edf649afa634",
//                 "checked": [
//                     "audience",
//                     "region",
//                     "state",
//                     "country"
//                 ],
//                 "expanded": []
//             },
//             "children": [
//                 {
//                     "text": "",
//                     "attrs": {
//                         "isPlaceHolder": true
//                     }
//                 }
//             ]
//         },
//         {
//             "uid": "d05b05ffb10a47c0a2f6a865eb41fb3a",
//             "type": "ul",
//             "children": [
//                 {
//                     "type": "li",
//                     "uid": "9d0af6f8bfef48f3baa151acf1070f54",
//                     "attrs": {},
//                     "children": [
//                         {
//                             "text": "A"
//                         }
//                     ]
//                 },
//                 {
//                     "uid": "4a97c7fa63ec46a9a03b19653da246d2",
//                     "type": "li",
//                     "attrs": {},
//                     "children": [
//                         {
//                             "uid": "a4d9c2f519584473a7aefcb8d96c5bba",
//                             "type": "audience-pre",
//                             "attrs": {
//                                 "audiences": [
//                                     "state"
//                                 ],
//                                 "audienceId": "076fd224fb834318ac206ccd378a65cc",
//                                 "checked": [
//                                     "state"
//                                 ],
//                                 "expanded": [
//                                     "audience"
//                                 ]
//                             },
//                             "children": [
//                                 {
//                                     "text": "",
//                                     "attrs": {
//                                         "isPlaceHolder": true
//                                     }
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "uid": "96fe1bf71ed0491faf3112a6104487e4",
//                     "type": "li",
//                     "children": [
//                         {
//                             "text": "B"
//                         }
//                     ],
//                     "attrs": {}
//                 },
//                 {
//                     "uid": "90b30e2b268949d083bce06896a3319b",
//                     "type": "li",
//                     "attrs": {},
//                     "children": [
//                         {
//                             "uid": "94f481f5ee9d40279025ff9aa1e6cd8c",
//                             "type": "audience-post",
//                             "attrs": {
//                                 "audienceId": "076fd224fb834318ac206ccd378a65cc"
//                             },
//                             "children": [
//                                 {
//                                     "text": "",
//                                     "attrs": {
//                                         "isPlaceHolder": true
//                                     }
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "uid": "15a39403e6884b6abef7edf183432302",
//                     "type": "li",
//                     "children": [
//                         {
//                             "text": "C"
//                         }
//                     ],
//                     "attrs": {}
//                 },
//                 {
//                     "uid": "b5c2c64aa598487fab9986d2627a29f0",
//                     "type": "li",
//                     "children": [
//                         {
//                             "text": "D"
//                         }
//                     ],
//                     "attrs": {}
//                 },
//                 {
//                     "uid": "9cb12b7a793b4114aee0f2ae0b18fd79",
//                     "type": "li",
//                     "children": [
//                         {
//                             "text": "E"
//                         }
//                     ],
//                     "attrs": {}
//                 }
//             ],
//             "id": "15892eab60cb463f9d3430a389834416",
//             "attrs": {}
//         },
//         {
//             "uid": "99b900dd87b948368d9b6d8e6d498895",
//             "type": "audience-post",
//             "attrs": {
//                 "audienceId": "06ed680b225842198797edf649afa634"
//             },
//             "children": [
//                 {
//                     "text": "",
//                     "attrs": {
//                         "isPlaceHolder": true
//                     }
//                 }
//             ]
//         }
//     ],
//     "_version": 1
// });

// console.log(htmlValue);


import express from 'express';
import bodyParser from 'body-parser';
import { jsonToHtml } from '@contentstack/json-rte-serializer';
import pretty from 'pretty';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
    try {
        const jsonInput = req.body.json;
        const jsonObj = JSON.parse(jsonInput);

        // Extract the json_rte object
        const jsonRte = jsonObj.json_rte;

        // Await the resolution of the Promise returned by jsonToHtml
        const htmlOutput = await jsonToHtml(jsonRte);

        // Format the HTML output using pretty
        const formattedHtml = pretty(htmlOutput);
        res.json({ html: formattedHtml }); // Send the formatted HTML output
        console.log(formattedHtml);
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


