# PosiVibes

Welcome to PosiVibes – a full-stack social media application built with the MERN stack.

## Overview

PosiVibes is an open-source social media application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It aims to spread positivity and connect people in a friendly and uplifting online community.

## Features

- **User Authentication:** Secure user registration and login functionality.
- **Profile Management:** Customize your profile with a profile picture, bio, and more.
- **Positive Vibes Sharing:** Share uplifting experiences, quotes, and positive moments.

- Register: Sign up to create your own PosiVibes account.
- Login: Log in to your PosiVibes account with valid login information.
- Posting: Share your thoughts, experiences, or creative content with the community.
- Like: Like posts that you enjoy from other users.
- Repost: Repost inspiring or interesting posts.
- Comment: Interact with other users through comments on posts.
- Follow: Follow other users to see their content in your feed.
- Chat: Send direct messages and communicate with other users.

## Installation

To run PosiVibes locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/fikiap23/Posivibes-v2.git
   cd Posivibes-v2
   ```

### Project Structure

The project is organized into two main folders:

### Frontend

The frontend folder contains the React application.

#### Getting Started with Frontend

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit [http://localhost:5000](http://localhost:5000) to use the PosiVibes frontend.

### Backend

The backend folder contains the Node.js and Express.js server.

#### Getting Started with Backend

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder with the following content:

   ```
   PORT = 3000
   MONGO_URI = your mongo uri
   JWT_SECRET=jwtSecret
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   NODE_ENV = development
   ```

   Make sure to `replace` the placeholders (your_mongo_uri, jwtSecret, your_cloudinary_cloud_name, your_cloudinary_api_key, your_cloudinary_api_secret) with your actual MongoDB URI, JWT secret, Cloudinary credentials.

4. Start the backend development server:

   ```bash
   npm run dev
   ```

5. The backend server will run on [http://localhost:3000](http://localhost:3000).

## Contributing

We welcome contributions from the community. To contribute to PosiVibes, follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Create a pull request on GitHub.

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The PosiVibes team would like to thank the open-source community for their continuous support and contributions.

Feel free to reach out to us at [fikiaprian23@gmail.com](mailto:fikiaprian23@gmail.com) for any questions or concerns.

Visit us at [https://posivibes.site](https://posivibes.site) and start spreading positive vibes! 😊✨
