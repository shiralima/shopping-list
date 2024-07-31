# Shopping List Project

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
   - [Ensure Dependencies](#ensure-dependencies)
   - [Database Setup](#database-setup)
3. [Cloning the Project](#cloning-the-project)
4. [Environment Configuration](#environment-configuration)
5. [Module Installation](#module-installation)
6. [Running the Project](#running-the-project)
   - [Start the Server and Client](#start-the-server-and-client)
   - [Access the Applications](#access-the-applications)
7. [Additional Information](#additional-information)

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
git clone https://github.com/yourusername/shopping-list-project.git
```

## Technologies Used

- **TypeScript (TS)**
- **React**
- **React Context**: Used for state management, managing categories and products, and handling server interactions.
- **Vite**: Build tool for faster development and bundling.
- **Material-UI (MUI)**: Component library for design and UI components, used for responsive and beautiful web design.
- **TypeORM**: ORM library for TypeScript, used for database interactions and entity management.
- **SQL Server**
- **Node.js**: Backend, with a structured approach using controllers and services for separation of concerns.