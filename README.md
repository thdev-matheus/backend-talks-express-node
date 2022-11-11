# Talks API Documentation

## Content Table

- [Talks API Documentation](#ontrip-api-documentation)
  - [Content Table](#content-table)
  - [1. Overview](#1-overview)
    - [1.1. Project Creator](#11-project-creator)
  - [2. Entity Relationship Diagram](#2-entity-relationship-diagram)
  - [3. Authentication](#3-authentication)
  - [4. Endpoints](#4-endpoints)

---

## 1. Overview

This API was structured with the aim of being the back-end part of the Talks application, a front-end project made by Matheus Vieira (Theus).

Talks is a social network based on posts, likes and comments. Therefore, the structure of this API is based on three main CRUD (Create-Read-Update-Delete):

- **Users**
- **Posts**
- **Comments**

Some other routes and entities were necessary, due to all the possible data and relationships of these three main entities like Likes and Notifications.

These were the main technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Docker](https://www.docker.com/)

**Base URL: https://localhost:3001** mudar o link pelo amor de Deus

### 1.1. Project Creator

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/th-matheus/" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/109465340?v=4" width="100px;" alt="Foto do Theus no GitHub"/><br>
        <sub>
          <b>Matheus Vieira</b>
        </sub>
      </a>
    </td>
    
  </tr>
</table>

---

## 2. Entity Relationship Diagram

[ Back to the top ](#content-table)

![ERD](https://i.ibb.co/BKN15VV/Talks-diagram.jpg)

---

## 3. Authentication

[ Back to the top ](#content-table)

Some routes need authentication. The authentication used is the Bearer Token type.

The token is automatically generated upon user login.

Thus, to access routes with authentication, it is necessary to have a user and be logged in with the user.

Also, some routes require the user to be the owner of the post, comment, or like in order to make the request.

Read the documentation for each route to understand which authentications are required.

---

## 4. Endpoints

[ Back to the top ](#content-table)

### Index

- [Users](#1-users)
- [Login](#2-login)
- [Posts](#3-posts)
- [Comments](#4-comments)
- [Likes](#5-likes)
- [Notifications](#6-notifications)

---

## 1. **Users**

[ Back to endpoints index ](#index)

The User object is defined as:

| **Field**    | **Type** | **Description**                                              |
| ------------ | -------- | ------------------------------------------------------------ |
| id           | string   | User's unique identifier                                     |
| firstName    | string   | User first name                                              |
| lastName     | string   | User last name                                               |
| email        | string   | User e-mail                                                  |
| password     | string   | User password                                                |
| birthdate    | string   | User's date of birth                                         |
| isAdm        | boolean  | Defines whether a user is an administrator or not            |
| isActive     | boolean  | Defines whether a user is active or not                      |
| isVerified   | boolean  | Defines if the user has verified the registered email or not |
| profileImage | string   | User's profile photo file sent in the request                |
| bio          | string   | A small user definition                                      |
| createdAt    | Date     | User creation date                                           |
| updatedAt    | Date     | User update date                                             |

<br>

### **Endpoints**

| **Method** | **Route**       | **Description**                                 |
| ---------- | --------------- | ----------------------------------------------- |
| POST       | /users          | Creates a user                                  |
| GET        | /users          | List all users                                  |
| GET        | /users/:userId  | Lists a user using its ID as a parameter        |
| PATCH      | /users/validate | Update isVerified field to true                 |
| PATCH      | /users/:userId  | Updates a user using its ID as a parameter      |
| DELETE     | /users/:userId  | Soft-deletes a user using its ID as a parameter |

<br>

## POST /users

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
{
  "firstName": "Ícarus",
  "lastName": "Maximus",
  "email": "max.icarus@gmail.com",
  "password": "Icarus!1234",
  "birthdate": "1991-06-28",
  "bio": "Just a single guy"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
  "firstName": "Ícarus",
  "lastName": "Maximus",
  "email": "max.icarus@gmail.com",
  "bio": "Just a single guy",
  "birthdate": "1991-06-28T00:00:00.000Z",
  "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
  "isAdm": false,
  "createdAt": "2022-09-24T17:48:08.984Z",
  "updatedAt": "2022-09-24T17:48:08.984Z",
  "isActive": true,
  "isVerified": false
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "The bio field is mandatory",
  "image": "https://http.cat/400"
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message",
  "image": "https://http.cat/400"
}
```

<br>

**Status 409 - Email already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This email already exists",
  "image": "https://http.cat/409"
}
```

#

## GET /users

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
[
  {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  },
  ...
]
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

#

## GET /users/:userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
  "firstName": "Ícarus",
  "lastName": "Maximus",
  "email": "max.icarus@gmail.com",
  "bio": "Just a single guy",
  "birthdate": "1991-06-28T00:00:00.000Z",
  "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
  "isAdm": false,
  "createdAt": "2022-09-24T17:48:08.984Z",
  "updatedAt": "2022-09-24T17:48:08.984Z",
  "isActive": true,
  "isVerified": false
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found",
  "image": "https://http.cat/404"
}
```

<br>

**Status 401 - Account is deactivated**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Account deleted, please contact customer service",
  "image": "https://http.cat/401"
}
```

<br>
#

## PATCH /users/validate

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhldXN0aC5kZXZAZ21haWwuY29tIiwiaWQiOiJlMTRkODBjOS1hMTQ4LTQyMDgtOGFhOS0zNTRhMTZkYTE0NTkiLCJpYXQiOjE2NjQwNDE2ODgsImV4cCI6MTY2NDIxNDQ4OH0.SMx0exifh8iAIufcBjYRO3FH8k7BE0W485PtklNopNh"
}
```

<br>

#### Expected Responses:

<br>

**Status 202 - Accepted**

```json
{
  "message": "Email successfully validated"
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Token is missing",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - E-mail not registered**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Email not registered in database",
  "image": "https://http.cat/404"
}
```

<br>

#

## PATCH /users/:userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- User must be owner of the account
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

**Request body example**

```json
{
  "firstName": "Ikarus",
  "oldPassword": "Icarus!1234"
}
```

- At least one field and oldPassword is required
- User will be able to update bio, birthdate, firstName, lastName, password and profileImage

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
  "firstName": "Ikarus",
  "lastName": "Maximus",
  "email": "max.icarus@gmail.com",
  "bio": "Just a single guy",
  "birthdate": "1991-06-28T00:00:00.000Z",
  "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
  "isAdm": false,
  "createdAt": "2022-09-24T17:48:08.984Z",
  "updatedAt": "2022-09-24T17:48:08.984Z",
  "isActive": true,
  "isVerified": false
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message",
  "image": "https://http.cat/400"
}
```

<br>

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found",
  "image": "https://http.cat/404"
}
```

<br>

**Status 401 - Account is deactivated**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Inactive account",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid password**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Incorrect password",
  "image": "https://http.cat/401"
}
```

<br>

#

## DELETE /users/:userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "User disabled successfully"
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found",
  "image": "https://http.cat/404"
}
```

<br>

**Status 400 - User already desactivated**

```json
{
  "status": "Error",
  "code": 400,
  "message": "User already desactivated",
  "image": "https://http.cat/400"
}
```

<br>

---

## 2. **Login**

[ Back to endpoints index ](#index)

The Login object is defined as:

| **Field** | **Type** | **Description** |
| --------- | -------- | --------------- |
| email     | string   | User email      |
| password  | string   | User password   |

<br>

### **Endpoints**

| **Method** | **Route** | **Description** |
| ---------- | --------- | --------------- |
| POST       | /login    | Login user      |

<br>

#

## POST /login

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: None
- Content-type: application/json

**Request body example**

```json
{
  "email": "max.icarus@gmail.com",
  "password": "Icarus!1234"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxNGQ4MGM5LWExNDgtNDIwOC04YWE5LTM1NGExNmRhMTQ1OSIsImVtYWlsIjoibWF0aGV1c3RoLmRldkBnbWFpbC5jb20iLCJpYXQiOjE2NjQwNDYwMTgsImV4cCI6MTY2NDEzMjQxOH0.MgyJAM0ikeSTKMpZkqb4oD3iV-51UY52tCuk7zvJl84",
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7582",
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T19:00:17.940Z",
    "firstName": "Icarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "just a single guy",
    "birthdate": "1991-06-28",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isActive": true,
    "isVerified": true,
    "isAdm": false
  }
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "The following fields are mandatory: email, password",
  "image": "https://http.cat/400"
}
```

<br>

**Status 401 - Invalid email or password**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid email or password"
}
```

<br>

---

## 3. **Posts**

[ Back to endpoints index ](#index)

# Posts

The Post object is defined as:

| **Field** | **Type**  | **Description**                   |
| --------- | --------- | --------------------------------- |
| id        | string    | Accommodation's unique identifier |
| user      | User      | user owner of the post            |
| comments  | Comment[] | comment list                      |
| likes     | Like[]    | Like list                         |
| createdAt | Date      | Post creation date                |
| updatedAt | Date      | Post update date                  |
| text      | string    | Post text                         |
| image     | string    | Post image, if any                |

<br>

### **Endpoints**

| **Method** | **Route**           | **Description**                                           |
| ---------- | ------------------- | --------------------------------------------------------- |
| POST       | /posts              | Creates an post                                           |
| GET        | /posts              | Lists all posts                                           |
| GET        | /posts/:postId      | Lists an post using its ID as a parameter                 |
| GET        | /posts/user/:userId | lists all posts by a user                                 |
| PATCH      | /posts/:postId      | Updates an accommodation using its ID as a parameter      |
| DELETE     | /posts/:postId      | Soft-deletes an accommodation using its ID as a parameter |

<br>

#

## POST /posts

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "text": "Post test"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "id": "c0be2c74-74a8-4630-8456-661e416cdccd",
  "text": "Post test",
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  },
  "image": null,
  "createdAt": "2022-09-24T19:57:29.005Z",
  "updatedAt": "2022-09-24T19:57:29.005Z"
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found",
  "image": "https://http.cat/404"
}
```

<br>

**Status 400 - Invalid post**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Send a text or image to post",
  "image": "https://http.cat/400"
}
```

<br>

#

## GET /posts

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
[
  {
    "id": "c0be2c74-74a8-4630-8456-661e416cdccd",
    "text": "Post test",
    "user": {
      "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
      "firstName": "Ícarus",
      "lastName": "Maximus",
      "email": "max.icarus@gmail.com",
      "bio": "Just a single guy",
      "birthdate": "1991-06-28T00:00:00.000Z",
      "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
      "isAdm": false,
      "createdAt": "2022-09-24T17:48:08.984Z",
      "updatedAt": "2022-09-24T17:48:08.984Z",
      "isActive": true,
      "isVerified": false
    },
    "image": null,
    "createdAt": "2022-09-24T19:57:29.005Z",
    "updatedAt": "2022-09-24T19:57:29.005Z"
  },
  ...
]
```

<br>

#### Error Responses:

- No errors expected

#

## GET /posts/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "id": "c0be2c74-74a8-4630-8456-661e416cdccd",
  "text": "Post test",
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  },
  "image": null,
  "createdAt": "2022-09-24T19:57:29.005Z",
  "updatedAt": "2022-09-24T19:57:29.005Z"
}
```

<br>

#### Error Responses:

<br>

**Status 400 - postId is Missing**

```json
{
  "status": "Error",
  "code": 400,
  "message": "The postId is missing",
  "image": "https://http.cat/400"
}
```

<br>

**Status 404 - Post not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Post not found"
}
```

<br>

#

## GET /posts/user/userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
[
  {
    "id": "c0be2c74-74a8-4630-8456-661e416cdccd",
    "text": "Post test",
    "user": {
      "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
      "firstName": "Ícarus",
      "lastName": "Maximus",
      "email": "max.icarus@gmail.com",
      "bio": "Just a single guy",
      "birthdate": "1991-06-28T00:00:00.000Z",
      "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
      "isAdm": false,
      "createdAt": "2022-09-24T17:48:08.984Z",
      "updatedAt": "2022-09-24T17:48:08.984Z",
      "isActive": true,
      "isVerified": false
    },
    "image": null,
    "createdAt": "2022-09-24T19:57:29.005Z",
    "updatedAt": "2022-09-24T19:57:29.005Z"
  },
  ...
]
```

<br>

#### Error Responses:

<br>

**Status 400 - userId is Missing**

```json
{
  "status": "Error",
  "code": 400,
  "message": "The userId is missing",
  "image": "https://http.cat/400"
}
```

<br>

**Status 404 - Post not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Post not found",
  "image": "https://http.cat/404"
}
```

<br>

#

## PATCH /posts/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "text": "update post"
}
```

- At least one field is required

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "id": "c0be2c74-74a8-4630-8456-661e416cdccd",
  "createdAt": "2022-09-24T19:57:29.005Z",
  "updatedAt": "2022-09-24T20:16:08.269Z",
  "text": "update post",
  "image": null,
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 400 - No changes to update**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Send a text or image to update post",
  "image": "https://http.cat/400"
}
```

<br>

**Status 404 - Post not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Post not found",
  "image": "https://http.cat/404"
}
```

<br>

#

## DELETE /posts/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- User must be the owner of the post
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Post deleted successfully"
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - User is not owner of the post**

```json
{
  "status": "Error",
  "code": 401,
  "message": "A post can only be deleted by its respective owner",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - Post not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "post not found",
  "image": "https://http.cat/404"
}
```

<br>

---

## 4. **Comments**

[ Back to endpoints index ](#index)

# Comments

The Comment object is defined as:

| **Field** | **Type** | **Description**           |
| --------- | -------- | ------------------------- |
| id        | string   | Comment unique identifier |
| post      | Post     | Post being commented on   |
| user      | User     | User who is commenting    |
| text      | string   | Comment text              |
| createdAt | Date     | Comment creation date     |
| updatedAt | Date     | Comment update date       |

<br>

### **Endpoints**

| **Method** | **Route**            | **Description**        |
| ---------- | -------------------- | ---------------------- |
| POST       | /comments/:postId    | Creates a new comment  |
| GET        | /comments/:postId    | Read all post comments |
| PATCH      | /comments/:commentId | Update a comment       |
| DELETE     | /comments/:bookingId | Delete a comment       |

<br>

#

## POST /comments/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "text": "comment test"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "id": "0ad27d1d-3c5d-43d4-a522-996b953460db",
  "text": "comment test",
  "createdAt": "2022-09-24T20:39:42.928Z",
  "updatedAt": "2022-09-24T20:39:42.928Z",
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Send a comment",
  "image": "https://http.cat/400"
}
```

<br>

#

## GET /comments/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
[
	{
    "id": "0ad27d1d-3c5d-43d4-a522-996b953460db",
    "text": "comment test",
    "createdAt": "2022-09-24T20:39:42.928Z",
    "updatedAt": "2022-09-24T20:39:42.928Z",
    "user": {
      "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
      "firstName": "Ícarus",
      "lastName": "Maximus",
      "email": "max.icarus@gmail.com",
      "bio": "Just a single guy",
      "birthdate": "1991-06-28T00:00:00.000Z",
      "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
      "isAdm": false,
      "createdAt": "2022-09-24T17:48:08.984Z",
      "updatedAt": "2022-09-24T17:48:08.984Z",
      "isActive": true,
      "isVerified": false
    }
  },
  ...
]
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

#

## PATCH /comments/:commentId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "text": "comment update"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "id": "a02d0093-76b3-481a-8edf-da38324a8ce2",
  "text": "Comment update",
  "createdAt": "2022-09-24T20:55:26.165Z",
  "updatedAt": "2022-09-24T20:55:30.716Z",
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - comment not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "comment not found",
  "image": "https://http.cat/404"
}
```

<br>

#

## DELETE /comments/:commentId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Comment deleted successfuly"
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - Comment not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Comment not found",
  "image": "https://http.cat/404"
}
```

<br>

---

## 5. **Likes**

[ Back to endpoints index ](#index)

# Likes

The Like object is defined as:

| **Field** | **Type** | **Description**             |
| --------- | -------- | --------------------------- |
| id        | string   | Unique like id              |
| post      | Post     | Post being liked            |
| user      | User     | User who is liking the post |

<br>

### **Endpoints**

| **Method** | **Route**      | **Description**     |
| ---------- | -------------- | ------------------- |
| POST       | /likes/:postId | Creates a new like  |
| GET        | /likes/:postId | Read all post likes |
| DELETE     | /likes/:postId | Delete a like       |

<br>

#

## POST /likes/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "id": "c7c4a40a-d372-4d82-945a-d721d2d9ba78",
  "user": {
    "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
    "firstName": "Ícarus",
    "lastName": "Maximus",
    "email": "max.icarus@gmail.com",
    "bio": "Just a single guy",
    "birthdate": "1991-06-28T00:00:00.000Z",
    "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    "isAdm": false,
    "createdAt": "2022-09-24T17:48:08.984Z",
    "updatedAt": "2022-09-24T17:48:08.984Z",
    "isActive": true,
    "isVerified": false
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - Post not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Post not found",
  "image": "https://http.cat/404"
}
```

<br>

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found",
  "image": "https://http.cat/404"
}
```

<br>

**Status 400 - Post already Liked by user**

```json
{
  "status": "Error",
  "code": 400,
  "message": "This post has already been liked by this user",
  "image": "https://http.cat/400"
}
```

<br>

#

## GET /likes/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
[
	{
		"id": "f15251cf-f151-4096-b81e-5362d6896e20",
		"user": {
      "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
      "firstName": "Ícarus",
      "lastName": "Maximus",
      "email": "max.icarus@gmail.com",
      "bio": "Just a single guy",
      "birthdate": "1991-06-28T00:00:00.000Z",
      "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
      "isAdm": false,
      "createdAt": "2022-09-24T17:48:08.984Z",
      "updatedAt": "2022-09-24T17:48:08.984Z",
      "isActive": true,
      "isVerified": false
    }
	},
  ...
]
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - Post not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Post not found",
  "image": "https://http.cat/404"
}
```

<br>

## DELETE /likes/:postId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Like deleted successfuly"
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 404 - Like not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Like not found",
  "image": "https://http.cat/404"
}
```

<br>

---

## 6. **Notifications**

[ Back to endpoints index ](#index)

# Notifications

The Notification object is defined as:

| **Field**    | **Type** | **Description**                                 |
| ------------ | -------- | ----------------------------------------------- |
| id           | string   | Notification unique identifier                  |
| ownerUser    | User     | User who owns the notification                  |
| launcherUser | User     | Notification launcher user                      |
| post         | Post     | Notification post                               |
| type         | string   | Setting the notification type (like or comment) |
| createdAt    | Date     | Notification date                               |

<br>

### **Endpoints**

| **Method** | **Route**      | **Description**            |
| ---------- | -------------- | -------------------------- |
| GET        | /notifications | Read all user notification |

<br>

#

## GET /notifications

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
[
	{
		"id": "0cfcaec4-b571-42a6-9fd7-7b5ce0283a2a",
		"type": "comment",
		"created_at": "2022-09-24T20:39:42.943Z",
		"launcherUser": {
      "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
      "firstName": "Ícarus",
      "lastName": "Maximus",
      "email": "max.icarus@gmail.com",
      "bio": "Just a single guy",
      "birthdate": "1991-06-28T00:00:00.000Z",
      "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
      "isAdm": false,
      "createdAt": "2022-09-24T17:48:08.984Z",
      "updatedAt": "2022-09-24T17:48:08.984Z",
      "isActive": true,
      "isVerified": false
    },
		"post": {
			"id": "175c1c30-0b3a-40cd-806b-fc4db55bf681",
			"createdAt": "2022-09-24T20:39:06.694Z",
			"updatedAt": "2022-09-24T20:39:06.694Z",
			"text": "Post test",
			"image": null,
			"user": {
        "id": "e14d80c9-a148-4208-8aa9-354a16da7852",
        "firstName": "Ícarus",
        "lastName": "Maximus",
        "email": "max.icarus@gmail.com",
        "bio": "Just a single guy",
        "birthdate": "1991-06-28T00:00:00.000Z",
        "profileImage": "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
        "isAdm": false,
        "createdAt": "2022-09-24T17:48:08.984Z",
        "updatedAt": "2022-09-24T17:48:08.984Z",
        "isActive": true,
        "isVerified": false
      }
		}
	},
  ...
]
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token",
  "image": "https://http.cat/401"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token",
  "image": "https://http.cat/401"
}
```

<br>

---

<br/>

<div align="center">
  <img src="https://i.ibb.co/mFsmSYf/folks.jpg"/>
</div>

<br/>

---
