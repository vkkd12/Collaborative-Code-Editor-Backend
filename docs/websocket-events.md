# WebSocket Events Documentation

This document describes the WebSocket events used for real-time collaboration in the Collaborative Code Editor backend.

## Connection
- **connect**: Client connects to the collaboration server.
- **disconnect**: Client disconnects from the server.

---

## Room Management
- **join_room**
  - Client joins a collaboration room.
  - **Payload:** `{ roomId, userId }`
  - **Response:** Room state, current users.

- **leave_room**
  - Client leaves a collaboration room.
  - **Payload:** `{ roomId, userId }`

---

## Code Editing
- **edit_code**
  - Client sends code changes (operational transform).
  - **Payload:** `{ roomId, userId, changes }`
  - **Broadcast:** Changes are sent to all other clients in the room.

- **code_update**
  - Server broadcasts code updates to all clients in the room.
  - **Payload:** `{ roomId, changes, updatedContent }`

---

## Cursor & Presence
- **cursor_move**
  - Client updates cursor position.
  - **Payload:** `{ roomId, userId, position }`
  - **Broadcast:** Cursor position to other clients.

- **user_presence**
  - Server notifies about user join/leave or activity.
  - **Payload:** `{ roomId, users: [userId, ...] }`

---

## File & Project Actions
- **file_create** / **file_delete** / **file_rename**
  - Notify clients about file changes in the project.
  - **Payload:** `{ roomId, action, fileInfo }`

- **project_update**
  - Notify clients about project changes.
  - **Payload:** `{ roomId, action, projectInfo }`

---

## Error Handling
- **error**
  - Server sends error messages to clients.
  - **Payload:** `{ message }`

---

## Example Event Flow
1. User joins a room (`join_room`).
2. User edits code (`edit_code`), server broadcasts (`code_update`).
3. User moves cursor (`cursor_move`), server broadcasts position.
4. User leaves room (`leave_room`).

---

## Notes
- All events use JSON payloads.
- Authentication is required for all collaboration events.
- For more details, see API documentation or source code.

## Contact
For questions or support, contact KQNAUJIA@GMAIL.COM.
