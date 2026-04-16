export class User {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }
}

export class Car {
  constructor(id, brand, model) {
    this.id = id;
    this.brand = brand;
    this.model = model;
  }
}

export class Reservation {
  constructor(id, userId, carId, startDate, endDate) {
    this.id = id;
    this.userId = userId;
    this.carId = carId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}