
# Blogz

**Blogz** is a modern, responsive web application where users can create, view, and share blogs. Built using the MERN stack (MongoDB, Express, React, Node.js), Blogz offers a seamless experience for users to manage their content efficiently.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration system.
- **Create & Manage Blogs:** Users can create, edit, delete, and view their blogs.
- **Real-time Updates:** Real-time updates using Socket.io.
- **Likes & Comments:** Users can like and comment on blogs, with counts dynamically updated.
- **Responsive Design:** Optimized for all devices.
- **Rich Text Editor:** Use Editor.js for formatting blog content.

## Demo

[Live Demo](https://blogz-1.vercel.app) 

## Installation

To run the Blogz website locally, follow these steps:

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (local or remote)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MVKarthikReddy/Blogz.git
   cd blogz/BlogzServer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the `backend/` directory and add the following:**

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the backend server:**

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../BlogzClient
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the frontend development server:**

   ```bash
   npm run dev
   ```

The application should now be running on `http://localhost:5173`.

## Usage

1. **Register a new account** or **log in** with an existing one.
2. **Create a new blog** by clicking on the "Create Blog" button.
3. **View, edit, or delete your blogs** from your dashboard.
4. **Interact with other blogs** by liking or commenting on them.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux for state management
  - Editor.js for rich text editing
  - CSS Modules / SASS for styling

- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Socket.io for real-time communication

## API Endpoints

### Auth

- **POST /api/auth/signup** - Register a new user
- **POST /api/auth/signin** - Log in an existing user

### Blogs

- **POST /api/blogs** - Create a new blog
- **GET /api/blogs** - Get all blogs
- **GET /api/blogs/:id** - Get a single blog by ID
- **PUT /api/blogs/:id** - Update a blog by ID
- **DELETE /api/blogs/:id** - Delete a blog by ID

### Likes

- **POST /api/likes/:blogId** - Like a blog

### Comments

- **POST /api/comments/:blogId** - Comment on a blog

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature-name
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature-name
   ```

5. **Submit a pull request.**
