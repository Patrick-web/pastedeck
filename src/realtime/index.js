//send text paste
export function emitTextBasedPaste(paste) {
  console.log("Emit Paste")
  console.log(paste)
  window.socket.emit("new-paste", paste)
}

//send code paste


//send image paste


//send file paste
