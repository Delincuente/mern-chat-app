# Chat App - Real-Time MERN Messaging Platform

A full-featured, real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js), featuring instant message delivery, image sharing, and user presence tracking. This project demonstrates modern full-stack development practices, including secure authentication, state management with Zustand, and real-time communication via Socket.io.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS & DaisyUI (for premium, responsive components)
- **State Management**: Zustand (lightweight, scalable state)
- **Real-time**: Socket.io-client
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Real-time**: Socket.io (Server-side)
- **Authentication**: JSON Web Token (JWT) with HTTP-only Cookies
- **File Storage**: Cloudinary (for profile pictures and chat images)
- **Security**: Bcrypt (password hashing), CORS, Cookie-parser

---

## ✨ Features

### 👤 User Management
- **Secure Authentication**: Signup and Login with field validation and password hashing.
- **JWT Protection**: Secured routes using HTTP-only cookies to prevent XSS.
- **Profile Customization**: Users can upload and update their profile pictures via Cloudinary integration.
- **Auth Persistence**: "Check Auth" mechanism to maintain sessions across page refreshes.

### 💬 Messaging System
- **Real-time Chat**: Instant message delivery using Socket.io.
- **Image Sharing**: Support for sending images within chat threads.
- **Chat History**: Persistent storage of messages in MongoDB.
- **Unread Counters**: (Logical structure present in frontend stores).

### 🌐 System & UX
- **Presence Tracking**: Real-time "Online/Offline" status indicators for all users.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Themes**: Integrated DaisyUI themes for a polished look.
- **Global Search**: Search through users to start new conversations.

---

## 📂 Project Structure

```text
chat-app/
├── backend/                # Express Server
│   ├── src/
│   │   ├── controllers/    # Business logic for routes
│   │   ├── lib/            # Utilities (DB connection, Socket.io, Cloudinary)
│   │   ├── middleware/     # Auth protection & error handlers
│   │   ├── models/         # Mongoose schemas (User, Message)
│   │   ├── routes/         # API endpoint definitions
│   │   └── seeds/          # Database seeding scripts
│   └── .env.example        # Environment template
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Axios instance and utils
│   │   ├── pages/          # Full-page views (Home, Login, Profile)
│   │   ├── store/          # Zustand state stores (useAuthStore, useChatStore)
│   │   └── App.jsx         # Main routing and entry point
│   └── tailwind.config.js  # Styling configuration
└── package.json            # Root orchestration scripts
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account (for image uploads)

### Step-by-Step Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Delincuente/mern-chat-app.git
   cd mern-chat-app
   ```

2. **Install Dependencies**:
   ```bash
   # Install root dependencies (if any)
   npm install

   # Install Backend dependencies
   cd backend
   npm install

   # Install Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_super_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=development
   ```

4. **Seed the Database (Optional)**:
   The project includes a seed route to populate initial users.
   Run the backend and visit: `http://localhost:5000/seeds/users`

---

## 🏃 Usage

### Running Locally
**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📡 API Documentation

### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/signup` | Create a new user account | No |
| POST | `/api/auth/login` | Authenticate user & get token | No |
| POST | `/api/auth/logout` | Clear auth cookie | No |
| GET | `/api/auth/check` | Validate current session | Yes |
| PUT | `/api/auth/update-profile` | Update profile picture (Cloudinary) | Yes |

### Message Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/message/users` | Get list of all users for sidebar | Yes |
| GET | `/api/message/:id` | Fetch chat history with a user | Yes |
| POST | `/api/message/:id/send` | Send a text/image message | Yes |

---

## 🗄️ Database Design

### User Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `email` | String | Unique email for login |
| `fullName` | String | User's display name |
| `password` | String | Hashed password (min 6 chars) |
| `profilePic` | String | URL to image (Cloudinary) |

### Message Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `senderId` | ObjectId | Reference to `User` |
| `receiverId` | ObjectId | Reference to `User` |
| `text` | String | Content of the message |
| `image` | String | URL to shared image (Optional) |

---

## 🔐 Authentication & Security
- **JWT**: Tokens are generated upon login and stored in an **HTTP-only cookie**, protecting against script-based token theft.
- **Middleware**: The `protectRoute` middleware ensures that only authenticated users can access messaging and profile features.
- **Password Hashing**: Uses `bcrypt` with 10 salt rounds.
- **Payload Limits**: Backend handles large base64 image strings with increased JSON limits (`100mb`).

---

## 📦 Deployment
The project is configured for easy deployment:
- **Build**: Run `npm run build` from the root to install all dependencies and build the frontend production bundle.
- **Production Static Serving**: The backend is configured to serve the `frontend/dist` folder in production mode (`NODE_ENV=production`).
- **Platforms**: Recommended deployment on **Render**, **Railway**, or a **VPS** using PM2.

---

## 📜 Scripts & Commands

### Root
- `npm run build`: Full build process (backend install + frontend build).
- `npm start`: Starts the production backend server.

### Backend
- `npm run dev`: Starts the server with `nodemon` for auto-reloads.
- `npm start`: Runs the server using standard `node`.

### Frontend
- `npm run dev`: Launches Vite development server.
- `npm run build`: Generates optimized production assets.

---

## 🚧 Future Improvements
- [ ] Group Chat functionality.
- [ ] Message Read/Seen status.
- [ ] Voice and Video calling via WebRTC.
- [ ] Message reactions and emoji picker.
- [ ] Push notifications for offline users.

---

## 🤝 Contributing
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## ⚖️ License
Distributed under the **ISC License**. See `LICENSE` for more information.

---

## ✍️ Author
**Hardik Butani**  
- GitHub: [@Delincuente](https://github.com/Delincuente)
- LinkedIn: [Hardik Butani](https://www.linkedin.com/in/hardik-butani-81816b231/)