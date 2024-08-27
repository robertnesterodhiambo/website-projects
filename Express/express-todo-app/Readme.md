# Todo API

This is a simple Todo API built using Express.js. It allows you to create, update, view, and delete todo items. The API uses an in-memory "database" for storing todos, making it suitable for testing and development purposes.

## Features

- **Get all todos**: Retrieve a list of all todos.
- **Create a new todo**: Add a new todo item to the list.
- **Update an existing todo**: Modify the details of an existing todo.
- **Delete a todo**: Remove a todo from the list.

## Prerequisites

- Node.js (v12.x or later)
- npm (v6.x or later)

## Installation

1. Download the code and navigate to the project directory.

    ```bash
    cd path/to/your/project
    ```

2. Install the required dependencies.

    ```bash
    npm install
    ```

## Usage

1. Start the server.

    ```bash
    node app.js
    ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

### Get all todos

- **URL:** `/todos`
- **Method:** `GET`
- **Response:**
    - `200 OK`: Returns a JSON array of all todo items.

### Create a new todo

- **URL:** `/todos`
- **Method:** `POST`
- **Request Body:** JSON object with the todo details.
    - Example:
      ```json
      {
          "title": "Buy groceries",
          "description": "Milk, Bread, Eggs"
      }
      ```
- **Response:**
    - `201 Created`: Returns the created todo item with an assigned `id`.

### Update an existing todo

- **URL:** `/todos/:id`
- **Method:** `PUT`
- **Request Body:** JSON object with the updated todo details.
    - Example:
      ```json
      {
          "title": "Buy groceries and vegetables",
          "description": "Milk, Bread, Eggs, Carrots, Tomatoes"
      }
      ```
- **Response:**
    - `200 OK`: Returns the updated todo item.
    - `404 Not Found`: If the todo with the specified `id` does not exist.

### Delete a todo

- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **Response:**
    - `204 No Content`: If the todo is successfully deleted.
    - `404 Not Found`: If the todo with the specified `id` does not exist.
