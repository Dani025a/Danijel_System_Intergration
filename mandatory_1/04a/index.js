const http = require('http');

let messageCount = 0;

function sendSSE(res) {
    messageCount++;
    res.write(`data: Message ${messageCount} from server\n\n`);
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    sendSSE(res);

    const intervalId = setInterval(() => {
        sendSSE(res);
    }, 3000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
