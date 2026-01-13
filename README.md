# NodeJS Simple Starter Kit

A simple Node.js starter project using MongoDB and environment variables.

---

## Prerequisites

Install the following before starting:

- Node.js (v16 or later)
- npm (comes with Node.js)
- MongoDB (Local or MongoDB Atlas)

Check installation:

node -v
npm -v
Installation

## Install project dependencies:

npm install

Environment Setup

Create a .env file in the root directory and add:

PORT=3000
MONGODB_URL=mongodb://localhost:27017/your_database_name


MongoDB Atlas example:

MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname

## Run the Application

Start the development server:

npm run dev

##  Project Structure

controllers/
models/
tests/
utils/
app.js
index.js
package.json
.env
README.md
