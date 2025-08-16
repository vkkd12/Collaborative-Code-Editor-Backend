# Collaborative Code Editor API (ChatGPT)

A backend API for a real-time collaborative code editor, powered by Node.js, Express, MongoDB, and WebSockets. This project enables multiple users to edit code together, with authentication, file/project management, and operational transforms for conflict-free collaboration.

## Features
- Real-time code collaboration (WebSocket)
- User authentication (JWT)
- Project and file management
- MongoDB for persistent storage
- Dockerized for easy deployment

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB
- Docker (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd collaborative-code-editor-api_chatgpt/Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example` if available) with your environment variables.
4. Start the server:
   ```bash
   npm start
   ```

### Running with Docker
1. Build and start all services:
   ```bash
   cd docker
   docker-compose up --build
   ```
2. The API will be available at `http://localhost:3000`

## API Documentation
See [`docs/api-documentation.md`](docs/api-documentation.md) for detailed endpoints and usage.

## WebSocket Events
See [`docs/websocket-events.md`](docs/websocket-events.md) for real-time event details.

## Testing
Run unit and integration tests:
```bash
npm test
```

## Folder Structure
- `src/` - Main source code
- `docker/` - Docker and compose files
- `docs/` - API and WebSocket documentation
- `tests/` - Unit, integration, and socket tests

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Contact
For questions or support, contact KQNAUJIA@GMAIL.COM.
