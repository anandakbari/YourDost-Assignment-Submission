# Todo List Application

A full-stack todo list application built with Node.js, Express.js, and vanilla JavaScript with a modern, responsive UI.

## 🚀 Live Demo

**Backend API**: https://yourdost-assignment-submission.onrender.com
**Frontend**: https://yourdost-assignment-submission.onrender.com

## ✨ Features

### Backend Features
- **CRUD Operations** - Create, Read, Update, Delete todos
- **File-based Storage** - JSON file storage system
- **Input Validation** - Server-side validation for all fields
- **Error Handling** - Comprehensive error handling middleware
- **RESTful API** - Clean REST API endpoints
- **Priority System** - 4-level priority system (High, Medium-High, Medium-Low, Low)
- **Due Date Management** - Set and track due dates
- **Repeat Tasks** - Daily recurring task support
- **Task Completion** - Mark tasks as completed/incomplete

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **File System** - JSON-based data storage
- **dotenv** - Environment variable management

### Frontend
- **Vanilla JavaScript** - Client-side scripting
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with flexbox
- **HTML5** - Semantic markup
- **Font Awesome** - Icons

## 📡 API Endpoints

### Base URL
```
https://yourdost-assignment-submission.onrender.com
```

### Todos Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/todos` | Get all todos | None | `{todos: [...]}` |
| `POST` | `/todos` | Create a new todo | `{name, dueDate?, priority?, isRepeating?}` | `{todo: {...}}` |
| `GET` | `/todos/:id` | Get a specific todo | None | `{todo: {...}}` |
| `PUT` | `/todos/:id` | Update a todo | `{name?, completed?, dueDate?, priority?, isRepeating?}` | `{todo: {...}}` |
| `DELETE` | `/todos/:id` | Delete a todo | None | `{todo: {...}}` |

### Request/Response Examples

#### Create Todo (POST /todos)
```javascript
// Request
{
  "name": "Complete project documentation",
  "dueDate": "2024-12-01",
  "priority": 1,
  "isRepeating": false
}

// Response (201)
{
  "todo": {
    "id": "1700000000000abc123",
    "name": "Complete project documentation",
    "completed": false,
    "dueDate": "2024-12-01",
    "priority": 1,
    "isRepeating": false,
    "createdAt": "2024-11-18T10:30:00.000Z"
  }
}
```

#### Get All Todos (GET /todos)
```javascript
// Response (200)
{
  "todos": [
    {
      "id": "1700000000000abc123",
      "name": "Complete project documentation",
      "completed": false,
      "dueDate": "2024-12-01",
      "priority": 1,
      "isRepeating": false,
      "createdAt": "2024-11-18T10:30:00.000Z"
    }
  ]
}
```

#### Update Todo (PUT /todos/:id)
```javascript
// Request
{
  "completed": true
}

// Response (200)
{
  "todo": {
    "id": "1700000000000abc123",
    "name": "Complete project documentation",
    "completed": true,
    "dueDate": "2024-12-01",
    "priority": 1,
    "isRepeating": false,
    "createdAt": "2024-11-18T10:30:00.000Z"
  }
}
```

## 📋 Todo Schema

```javascript
{
  "id": "string",           // Unique identifier (auto-generated)
  "name": "string",         // Todo name (max 20 characters, required)
  "completed": "boolean",   // Completion status (default: false)
  "dueDate": "string",      // Due date in YYYY-MM-DD format (default: today)
  "priority": "number",     // Priority level 1-4 (1=High, 2=Med-High, 3=Med-Low, 4=Low)
  "isRepeating": "boolean", // Daily repeat flag (default: false)
  "createdAt": "string"     // ISO timestamp (auto-generated)
}
```

## 🎯 Priority Levels

| Priority | Value | Label | Color | Icon |
|----------|--------|-------|-------|------|
| High | 1 | High | Red | 🚩 |
| Medium-High | 2 | Med-High | Orange | 🟠 |
| Medium-Low | 3 | Med-Low | Yellow | 🟡 |
| Low | 4 | Low | Green | 🟢 |

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd Task_manager-node.js/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
# Create .env file (optional)
PORT=3000
```

4. **Start development server**
```bash
npm run dev
```

5. **Start production server**
```bash
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- API: http://localhost:3000/todos

### Project Structure
```
backend/
├── controller/         # Route controllers
│   └── todos.js       # Todo CRUD operations
├── data/              # JSON data storage
│   └── todos.json     # Todo data file
├── db/                # Database utilities
│   └── fileStorage.js # File system operations
├── errors/            # Error handling
│   └── custom_error.js
├── middleware/        # Express middleware
│   ├── async.js       # Async wrapper
│   ├── errorhandler.js
│   └── notfound.js
├── public/            # Static frontend files
│   ├── index.html     # Main HTML file
│   ├── main.css       # Stylesheet
│   ├── browser-app.js # Frontend JavaScript
│   └── task.html      # Task edit page
├── routes/            # API routes
│   └── todos.js       # Todo routes
├── app.js             # Express app setup
├── package.json       # Dependencies
└── README.md          # This file
```

## 🚀 Deployment

### Render Deployment

1. **Build Command**: `npm install`
2. **Start Command**: `npm start`
3. **Environment Variables**: 
   - `PORT` (auto-provided by Render)
   - `NODE_ENV=production`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `HOST` | Server host | 0.0.0.0 |
| `NODE_ENV` | Environment | development |

## 🧪 API Testing

### Using cURL

**Get all todos:**
```bash
curl https://yourdost-assignment-submission.onrender.com/todos
```

**Create a todo:**
```bash
curl -X POST https://yourdost-assignment-submission.onrender.com/todos \
  -H "Content-Type: application/json" \
  -d '{"name":"Test task","priority":1}'
```

**Update a todo:**
```bash
curl -X PUT https://yourdost-assignment-submission.onrender.com/todos/ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a todo:**
```bash
curl -X DELETE https://yourdost-assignment-submission.onrender.com/todos/ID
```


## 🔧 Development Scripts

```bash
npm start     # Start production server
npm run dev   # Start development server with nodemon
```

## 📝 Error Handling

The API returns appropriate HTTP status codes:

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation errors)
- **404** - Not Found
- **500** - Internal Server Error

Error response format:
```javascript
{
  "msg": "Error message description"
}
```