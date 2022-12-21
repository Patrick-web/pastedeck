import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  // Send a message to the connected client
  socket.emit('connection-success', { message: 'You have successfully connected to the server' });

  socket.broadcast.emit('new-client-connected', { message: 'A new client has connected', id: socket.id });

  socket.on("new-paste", data => {
    console.log(data)
    io.emit('new-paste', data);
  })

  socket.on("disconnect", (reason) => {
    io.emit('client-disconneted', { message: `A Client disconnected`, id: socket.id });
  });
});


await serve(io.handler(), {
  port: 4000,
});
