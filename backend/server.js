require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();
app.use(express.json());
app.use(cors());

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

app.post("/message", (req, res) => {
    pusher.trigger("chat", "message", { text: req.body.text });
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));
