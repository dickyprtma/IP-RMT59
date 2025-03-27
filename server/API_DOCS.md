API Documentation
# Endpoints : 
List of available endpoints:

- GET /

## AUTHENTICATION

- POST /login
- POST /google-login

- POST /register
- GET /verify-email

## COURSES 
- GET /courses
- GET /courses/:id
- GET /courses/:courseId/materials

## USER COURSES
- POST /user-courses
- DELETE /user-courses
- GET /user-courses
- PATCH /user-courses

## KANJI
- POST /romaji-transliterator
- POST /kanji-transliterator
- POST /translate-to-japanese
- POST /translate-to-indonesia

---

### POST /login
#### Request:
- Body:
```json
{
    "email": "string",
    "password": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "message": "login success",
    "access_token": "string",
    "data": {
        "id": "integer"
    }
}
```
- 400 Bad Request:
```json
{
    "message": "email is required"
}
```
or
```json
{
    "message": "password is required"
}
```
- 401 Unauthorized:
```json
{
    "message": "email or password is invalid"
}
```
or
```json
{
    "message": "Please verify your email before logging in"
}
```

---

### POST /google-login
#### Request:
- Body:
```json
{
    "googleToken": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "message": "login success",
    "access_token": "string",
    "data": {
        "id": "integer"
    }
}
```
- 400 Bad Request:
```json
{
    "message": "googleToken is required"
}
```

---

### POST /register
#### Request:
- Body:
```json
{
    "email": "string",
    "password": "string"
}
```

#### Response:
- 201 Created:
```json
{
    "message": "register success",
    "data": {
        "email": "string"
    }
}
```
- 400 Bad Request:
```json
{
    "message": "email is required"
}
```
or
```json
{
    "message": "password is required"
}
```

---

### GET /verify-email
#### Request:
- Query Parameters:
```json
{
    "token": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "message": "Email verification successful"
}
```
- 400 Bad Request:
```json
{
    "message": "Token is required"
}
```
- 401 Unauthorized:
```json
{
    "message": "Invalid token"
}
```
- 404 Not Found:
```json
{
    "message": "User not found"
}
```

## COURSES

### GET /courses
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`

#### Response:
- 200 OK:
```json
{
    "data": [
        {
            "id": "integer",
            "title": "string",
            "description": "string",
            "price": "number",
            "createdAt": "string",
            "updatedAt": "string"
        }
    ]
}
```
- 401 Unauthorized:
```json
{
    "message": "Unauthorized"
}
```

---

### GET /courses/:id
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`

#### Response:
- 200 OK:
```json
{
    "data": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "price": "number",
        "createdAt": "string",
        "updatedAt": "string"
    }
}
```
- 401 Unauthorized:
```json
{
    "message": "Unauthorized"
}
```
- 404 Not Found:
```json
{
    "message": "Course not found"
}
```

---
### GET /courses/:courseId/materials
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`

#### Response:
- 200 OK:
```json
{
    "message": "materials retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "string",
            "imageUrl": "string",
            "videoUrl": "string",
            "duration": "00:39:23",
            "desc": "string",
            "CourseId": 1,
            "createdAt": "string",
            "updatedAt": "string"
        }
    ]
}
```
- 401 Unauthorized:
```json
{
    "message": "Unauthorized"
}
```
## USER COURSES

### POST /user-courses
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "userId": "integer",
    "courseId": "integer"
}
```

#### Response:
- 201 Created:
```json
{
    "UserId": "integer",
    "CourseId": "integer",
    "updatedAt": "string",
    "createdAt": "string",
    "favorite": "boolean"
}
```
- 400 Bad Request:
```json
{
    "message": "courseId is required"
}
```
- 404 Not Found:
```json
{
    "message": "error not found"
}
```
- 401 Unauthorized:
```json
{
    "message": "You need to verify your email first"
}
```

---

### DELETE /user-courses
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "userId": "integer",
    "courseId": "integer"
}
```

#### Response:
- 200 OK:
```json
{
    "message": "Course unenrolled successfully"
}
```
- 400 Bad Request:
```json
{
    "message": "courseId is required"
}
```
- 404 Not Found:
```json
{
    "message": "error not found"
}
```
- 401 Unauthorized:
```json
{
    "message": "You are not authorized to unenroll from this course"
}
```

---

### GET /user-courses
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`

#### Response:
- 200 OK:
```json
[
     {
        "id": 1,
        "title": "string",
        "desc": "string",
        "sensei": "string",
        "imageUrl": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "UserCourse": {
            "UserId": "integer",
            "CourseId": "integer",
            "favorite": "boolean",
            "createdAt": "string",
            "updatedAt": "string"
        }
    }
]
```
- 401 Unauthorized:
```json
{
    "message": "Unauthorized"
}
```

---

### PATCH /user-courses
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "userId": "integer",
    "courseId": "integer"
}
```

#### Response:
- 200 OK:
```json
{
    "message": "Course added to favorite"
}
```
or
```json
{
    "message": "Course removed from favorite"
}
```
- 400 Bad Request:
```json
{
    "message": "courseId is required"
}
```
- 404 Not Found:
```json
{
    "message": "error not found"
}
```

## KANJI

### POST /romaji-transliterator
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "romaji": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "transliteration": "string"
}
```
- 400 Bad Request:
```json
{
    "message": "Inputan tidak boleh kosong"
}
```

---

### POST /kanji-transliterator
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "kanji": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "transliteration": "string"
}
```
- 400 Bad Request:
```json
{
    "message": "Inputan tidak boleh kosong"
}
```
or
```json
{
    "message": "Inputan bukan kanji"
}
```

---

### POST /translate-to-japanese
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "text": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "translation": "string"
}
```
- 400 Bad Request:
```json
{
    "message": "Inputan tidak boleh kosong"
}
```

---

### POST /translate-to-indonesia
#### Request:
- Headers:
  - Authorization: Bearer `<access_token>`
- Body:
```json
{
    "text": "string"
}
```

#### Response:
- 200 OK:
```json
{
    "translation": "string"
}
```
- 400 Bad Request:
```json
{
    "message": "Inputan tidak boleh kosong"
}
```