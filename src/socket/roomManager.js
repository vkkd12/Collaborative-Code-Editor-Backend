const rooms = new Map(); // roomId -> { users: Set(socketId), fileId }

export function joinRoom(roomId, socketId) {
  const room = rooms.get(roomId) || { users: new Set(), fileId: null };
  room.users.add(socketId);
  rooms.set(roomId, room);
}

export function leaveRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.users.delete(socketId);
  if (room.users.size === 0) {
    rooms.delete(roomId);
  }
}

export function getRoom(roomId) {
  return rooms.get(roomId);
}