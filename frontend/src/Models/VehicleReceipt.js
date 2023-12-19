export class VehicleReceipt {
  constructor(
    dateCreated,
    amount,
    description,
    personId
  ) {
    this.description = description;
    this.dateCreated = dateCreated;
    this.amount = amount;
    this.personId = personId;
  }
}