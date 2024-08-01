# Shopping List Project

## Table of Contents

1. [Installation](#installation)
   - [Ensure Dependencies](#ensure-dependencies)
   - [Database Setup](#database-setup)
2. [Cloning the Project](#cloning-the-project)
3. [Running the Project](#running-the-project)
   - [Client](#client)
   - [Server](#server)
4. [Web Flow](#web-flow)
   - [Regular Functionality](#regular-functionality)
   - [Additional Functionality](#additional-functionality)
5. [Technologies Used](#technologies-used)

## Installation

### Ensure Dependencies
   - Install `Node.js` version 20:
     ```bash
     nvm install 20
     nvm use 20
     ```
   - Ensure `SQL Server` is installed on your machine.

### Database Setup
   - Create a database named `shopping_list` in `SQL Server`.

## Cloning the Project

Clone the repository using HTTPS:
```bash
git clone https://github.com/shiralima/shopping-list.git
```

Clone the repository using SSH:
```bash
git clone git@github.com:shiralima/shopping-list.git
```

## Run Project

### Client
cd client && npm install && npm run dev

### Server
cd server && npm install && npm run dev

### Database
change the password in the .env file to match your sql sever password (DB_PASSWORD variable and in the `ormconfig`: password: process.env.DB_PASSWORD || 'YOUR_SQL_SERVER_PASSWORD').

## Web Flow
### Regular Functionality
- Add products to specific categories.
- After adding a product, it will be displayed under the category it was added to.
- If there are no products in a category, it will not be displayed.
- "Finish Order" button to save all selected products to the database.
- "Total Items" title to see all products across all categories.
- If two products are added to the same category, their quantities will be combined instead of adding a new product.
- Responsive design.

### Additional Functionality
- Handle errors and success actions with alerts (create context and component to handle this process).
- "Clear order" button to clear all the products

## Technologies Used

- **TypeScript (TS)**
- **React**
- **React Context**: Used for state management, managing categories and products, and handling server interactions.
- **Vite**: Build tool for faster development and bundling.
- **Material-UI (MUI)**: Component library for design and UI components, used for responsive and beautiful web design.
- **TypeORM**: ORM library for TypeScript, used for database interactions and entity management.
- **SQL Server**
- **Node.js**: Backend, with a structured approach using controllers and services for separation of concerns.