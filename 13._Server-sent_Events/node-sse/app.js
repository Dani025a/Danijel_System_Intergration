import express from "express";
import cors from "cors";

const app = express();

app.use(express.static("public"));

app.use(cors());


app.get("/synchronize-time", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
    });

    setInterval(() => sendTimeToClient(res), 1000);
});


function sendTimeToClient(res) {
    const time = new Date().toISOString();
    res.write(`data: ${time} \n\n`);
}


const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
