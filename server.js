const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors")
 
app.use(cors())

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({extended:true}));

require("./server/routes/instapoll.routes")(app);

const server = app.listen(port, ()=>console.log(`Running on port: ${port}`))



//I ADDED THIS
const io = require('socket.io')(server, {cors:true})

// emitters - passes data where it needs to go (emit)
// on - trigger -- listening for a particular event, and when that event happens we perform an action

// Name of the trigger
io.on('connection', socket => {
    console.log(`Your socketID is: ${socket.id}`)

    socket.on('chat', msg => {
        console.log("Got the message: " + msg);
        io.emit('post chat', msg)
    })
    
    socket.on('pollQ-server', msg => {
        console.log("Got the pollQ: " + msg);
        io.emit('pollQ-client', msg)
    })
    socket.on('pollA-server', msg => {
        console.log("Got the pollA: " + msg);
        io.emit('pollA-client', msg)
    })
})