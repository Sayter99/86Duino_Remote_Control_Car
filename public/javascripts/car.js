function move(cmd) {
    socket.emit('move', { 'cmd': cmd });
};
