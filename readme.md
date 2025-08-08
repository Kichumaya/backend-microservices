# Backend Microservices Assignment

## Overview
This project is a Node.js microservices-based backend with three independent services:

1. User Service – Handles orders.
2. Admin Service – Handles product.
3. Gateway Service – Routes API requests to the correct service (reverse proxy).

Each service runs on its own port and communicates via the Gateway Service.

--------

## Folder Structure

backend-microservices/
│
├── gateway-service/ # Routes API calls to User/Admin services
│ ├── server.js
│ └── package.json
│
├── user-service/ # Handles orders
│ ├── data.json
│ ├── server.js
│ └── package.json
│
├── admin-service/ # Handles products
│ ├── data.json
│ ├── server.js
│ └── package.json
│
└── README.md

--------

## Install dependencies for each service

• Gateway Service
cd gateway-service
npm install

• User Service
cd user-service
npm install

• Admin Service
cd admin-service
npm install

--------

## Start the services in seperate terminal

• Start Gateway Service
cd gateway-service
node server.js

• Start User Service
cd user-service
node server.js

• Start Admin Service
cd admin-service
node server.js

--------

## API Gateway

Through Gateway (http://localhost:5000)

# User Service

GET /user/ – Health check
GET /user/orders – Get all orders
GET /user/orders/:id – Get order by ID
POST /user/orders – Create new order
PUT /user/orders/:id – Update order
DELETE /user/orders/:id – Delete order by ID
DELETE /user/orders/ – Delete all orders

--------

# Admin Service

GET /admin/ – Health check
GET /admin/products – Get all products
GET /admin/products/:id – Get product by ID
POST /admin/products – Create new product
PUT /admin/products/:id – Update product
DELETE /admin/products/:id – Delete product by ID
DELETE /admin/products/ – Delete all products

--------

Note: I provided the Postman API collection so you can directly check this by adding in the postman

# Ports: 
    Gateway Service: 5000
    User Service: 5001
    Admin Service: 5002

--------