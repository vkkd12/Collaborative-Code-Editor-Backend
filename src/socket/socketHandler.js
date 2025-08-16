import Events from './collaborationEvents.js';
// In-memory file state per room
const roomFileState = {};
import { joinRoom, leaveRoom } from './roomManager.js';

export default function attachSocket(io) {
  io.on('connection', (socket) => {
    socket.on(Events.JOIN_ROOM, ({ roomId }) => {
      socket.join(roomId);
      joinRoom(roomId, socket.id);
      socket.to(roomId).emit(Events.SYNC, {
        message: 'A user joined',
        socketId: socket.id
      });
      // If no state yet, load from DB
      if (!roomFileState[roomId]) {
        import('../models/File.js').then(({ default: File }) => {
          File.findOne({ _id: roomId }).then(file => {
            roomFileState[roomId] = file?.content || '';
          });
        });
      }
    });

    // SYNC request: send latest file content to requesting socket
    socket.on('collab:sync:request', async ({ roomId }) => {
      // Serve latest in-memory state if available
      if (roomFileState[roomId] !== undefined) {
        socket.emit(Events.SYNC, { content: roomFileState[roomId] });
      } else {
        // Fallback: load from DB
        try {
          const { default: File } = await import('../models/File.js');
          const file = await File.findOne({ _id: roomId });
          socket.emit(Events.SYNC, { content: file?.content || '' });
        } catch (err) {
          socket.emit(Events.ERROR, { message: 'Failed to sync file content' });
        }
      }
    });

    socket.on(Events.LEAVE_ROOM, ({ roomId }) => {
      socket.leave(roomId);
      leaveRoom(roomId, socket.id);
    });

    socket.on(Events.OPERATION, ({ roomId, op }) => {
      // Broadcast to others; persistence happens via HTTP endpoint
      socket.to(roomId).emit(Events.OPERATION, { op, from: socket.id });
      // Apply op to in-memory state
      if (roomFileState[roomId] === undefined) roomFileState[roomId] = '';
      if (op.type === 'insert') {
        roomFileState[roomId] = roomFileState[roomId].slice(0, op.index) + (op.text || '') + roomFileState[roomId].slice(op.index);
      }
      if (op.type === 'delete') {
        roomFileState[roomId] = roomFileState[roomId].slice(0, op.index) + roomFileState[roomId].slice(op.index + (op.length || 0));
      }
    });

    socket.on('disconnect', () => {
      // Remove the socket from all joined rooms
      const joinedRooms = io.sockets.adapter.sids.get(socket.id) || [];
      joinedRooms.forEach((rid) => leaveRoom(rid, socket.id));
      // Optionally: clean up roomFileState if no users left (not implemented for simplicity)
    });
  });
}