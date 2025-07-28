# Full Stack Tech Blog Application

## Challenge

This week, you've learned how to build a complete **back-end solution** with **CRUD operations** connected to a **MySQL database**. You've also explored how to interact with this backend using **API calls from a web page (front-end)**.

Now, it's time to put your skills into practice and build your first **backend application**!

### Your Task

You will develop a REST API for a **blogging platform** that allows users to:

- **Read** blog articles and filter them by categories.
- **Register** and log in to manage their content.
- **Create, update, and delete** their own blog posts.

For real-world examples, check out:

- [Medium](https://medium.com/)
- [TechCrunch](https://techcrunch.com/)

### Deployment

Once completed, you will **deploy your application** to [Render](https://render.com/). 🚀 Good luck!

## Key Learnings

- Developing **CRUD operations** in a full stack application.
- Running and testing a **Node.js/Express backend** with a **MySQL database** with Postman
- Deploying a **full stack database-driven application** to **Render**.

## User Story

_As a user, I want to register and log in to a blogging platform so that I can create, update, and delete my own blog posts. I also want to browse and filter blog posts by category._

## Acceptance Criteria

1. Users should be able to **register, log in, and log out** securely.
2. Users should be able to **create, update, and delete** their own blog posts.
3. Blog posts should be **filtered by category** for easy navigation.
4. The application should be **deployed** on [Render](https://render.com/) and accessible online.
5. The front-end should interact with the API to **dynamically display and update** blog content.
6. Instructions for running the application are included.
7. A demo video of the script running is submitted.

## Getting Started

### Installation Steps

1. **Clone the repository** and navigate to the project directory.
2. **Copy the `.env.example` file** and rename it to `.env`, then update the environment variables.
3. **Open MySQL and create the database:**

```bash
mysql -u root -p
```

4. **Install dependencies**

```bash
npm install
```

5. **Seed the database with test data (if applicable):**

```bash
npm run seed
```

6. **Run the application locall**

```bash
npm start
```

7. **Visit the application in your browser**

```browser
http://localhost:3001
```

## Deploying to Render

1. Create an account on [Render](https://render.com/).
2. Set up a **web service** for your **backend**.
3. Use **Render's MySQL database hosting** or an external MySQL provider such as:
   - [PlanetScale](https://planetscale.com/)
   - [ClearDB (via Heroku)](https://elements.heroku.com/addons/cleardb)
4. Update your **database connection settings** in `.env` to match your MySQL provider.
5. Deploy your **front-end** (if separate) using **Render Static Sites** or another hosting service.

## Resources

- [Render Deployment Guide](https://render.com/docs/deploy-an-express-app)
- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
