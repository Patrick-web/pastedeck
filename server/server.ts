import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

const io = new Server({
  cors: {
    origin: false,
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8,
});

let clients = []

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  clients.push(socket.id)

  socket.emit('connection-success', { message: 'You have successfully connected to the server :roocket', clients: clients });

  socket.broadcast.emit('new-client-connected', { message: 'A new client has connected', id: socket.id });

  socket.on("new-paste", data => {
    console.log(data)
    io.emit('new-paste', data);
  })

  socket.on("disconnect", (reason) => {
    clients = clients.filter(client => client != socket.id)
    io.emit('client-disconneted', { message: `A Client disconnected`, id: socket.id });
  });
});

io.on("disconnect")

await serve(io.handler(), {
  port: 4000,
});
