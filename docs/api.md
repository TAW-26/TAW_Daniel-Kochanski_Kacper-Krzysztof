### AUTH

POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "123456"
}

---

POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "123456"
}

---

### CARS

POST http://localhost:3000/cars
Content-Type: application/json

{
  "brand": "BMW",
  "model": "X5"
}

---

GET http://localhost:3000/cars

---

GET http://localhost:3000/cars/{id}

---

GET http://localhost:3000/cars/filter?brand=BMW

---

PUT http://localhost:3000/cars/{id}
Content-Type: application/json

{
  "brand": "Audi",
  "model": "A4"
}

---

DELETE http://localhost:3000/cars/{id}

---

### USERS (JWT REQUIRED)

GET http://localhost:3000/users
Authorization: Bearer <TOKEN>

---

DELETE http://localhost:3000/users/{id}
Authorization: Bearer <TOKEN>

---

### RESERVATIONS (JWT REQUIRED)

GET http://localhost:3000/reservations
Authorization: Bearer <TOKEN>

---

GET http://localhost:3000/reservations/user/{userId}
Authorization: Bearer <TOKEN>

---

POST http://localhost:3000/reservations
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "carId": "{carId}",
  "startDate": "2026-01-01",
  "endDate": "2026-01-05"
}