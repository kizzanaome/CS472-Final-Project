# NodeJS-Project

A simple products application consisting of:
- server: a simple backend RESTful API built with Node.js + Express that supports READ operations for products and CRUD operations (Create, Read, Update, Delete) for reviews. It uses a JSON file as a lightweight database, making it ideal for prototyping.
- client: a modern frontend application built with React, TypeScript, and Vite, designed to fetch and display products and their associated reviews from the server


## Features

for server:
- READ operations for Products
- CRUD operations for Reviews associated with products
- Data is stored in a local products.json file
- RESTful API structure
- Built with Express.js

for client:
- Displays a list of products fetched from an API
- Displays reviews for each product
- Clean UI with reusable components
- Type-safe with TypeScript
- Fast dev server with Vite


## Requirements

for server
- Node.js v14+
- Express

for client
- react
- typscript
- vite
- fetch for API requests
- Bootstrap for styling


## Getting started

clone the repository
```
git clone https://github.com/kizzanaome/CS472-Final-Project.git
cd CS472-Final-Project
```

#### for server:
Install the dependencies

```
cd server
npm install
```

start the server
```
npm run dev
```

The app will start at http://localhost:3000 as set in the app.

#### for client:
Install the dependencies

```
cd client
npm install
```

start the server
```
npm run dev
```

The app will start at http://localhost:5173 by default.


## API Endpoints

Products Endpoints: Read

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/products`           | Get all products     |
| GET    | `/products/:id`       | Get a single product |
| GET    | `/products/search?q=` | Search for a product |


Reviews CRUD (linked to Products)

| Method | Endpoint                           | Description                   |
| ------ | ---------------------------------- | ----------------------------- |
| GET    | `/products/:id/reviews`            | Get all reviews for a product |
| POST   | `/products/:id/reviews`            | Add a review to a product     |
| PUT    | `/products/:productId/reviews/:id` | Update a review               |
| DELETE | `/products/:productId/reviews/:id` | Delete a review               |


by: Naome Kizza
GitHub: @kizzanaome
