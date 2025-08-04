# 🚀 Full Stack Blog Application

## 📝 Project Overview

This project is a full-stack **blog application** that lets users create, read, update, and delete their own blog posts.
The front end interacts with a **REST API** built with **Node.js** and **Express**, which performs **CRUD operations**
on a **PostgreSQL database**.

### ✨ Key Features

* **User Authentication:** Securely register, log in, and log out.
* **Content Management:** Create, edit, and delete your own blog posts.
* **Content Filtering:** Easily browse and filter blog posts by category.
* **Full-Stack:** The application is a complete solution, from the front-end interface to the back-end database.

### 🛠️ Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Deployment:** Render

## 💻 Getting Started

To get a copy of this project up and running on your local machine, follow these steps.

### ⚙️ Installation

1. **Clone the repository** and navigate to the project directory:

```bash
git clone https://github.com/KamilWo/step8up-week8-node-express-blog
cd step8up-week8-node-express-blog
```

2. **Install dependencies:**

```bash
npm install
```
or
```bash
yarn install
```

3. **Set up the database:**

* Open PostgreSQL and create a database for the application.
* Copy the `.env.example` file and rename it to `.env`.
* Update the environment variables in the `.env` file with your database credentials.

4. **Seed the database** with sample data (optional):

```bash
npm run seed
```
or
```bash
yarn run seed
```

5. **Run the application locally:**

```bash
npm start
```
or
```bash
yarn start
```

6. **View the application:**
   Open your web browser and navigate to `http://localhost:3000`.

## ☁️ Deployment

This application is deployed on **Render**. The backend is hosted as a web service, and the front end is deployed as a
static site.

The PostgreSQL database is also hosted on Render. If you're deploying this yourself, make sure to update your database
connection settings in the `.env` file to match your hosting provider.

## 📚 Resources

* [Render Deployment Guide](https://render.com/docs/deploy-an-express-app)
* [Express Documentation](https://expressjs.com/)
* [Sequelize Documentation](https://sequelize.org/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
