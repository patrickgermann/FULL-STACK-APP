# Full Stack App with React and a REST API
Treehouse Project #10

## Course Database Backend

Backend API to read/write to a SQLite Database with Course information.
- Defined API calls for Frontend app.

## Course Manager Frontend

Course Manager to create, update and delete Courses.

- Authentication by E-Mail and Password.
- Users not signed-in can see all available courses.
- Signed-In users can create new courses and update/delete their own courses.

## Instructions to deploy app
You need to deploy and start the API first:

1. Navigate to project folder and open Terminal
2. Open API subfolder: `cd api`
3. Install modules using npm: `npm install`
4. Seed the SQLite database: `npm run seed`
5. Launch the API project: `npm start` 

The API will be running on `localhost:5000`

6. Now open a new Terminal for the project folder
7. Open API subfolder: `cd client`
8. Install modules using npm: `npm install`
9. Launch the API project: `npm start` 

The React Client will open a browser page for `localhost:3000`

Now API and client are up and running, you can start using it!

## Technology
### Frontend
React, JSX, Create React App, React Router, React Context API, React authentication, React Markdown, and working with APIs.

### Backend
Node & npm, Express, Sequelize, SQLite3