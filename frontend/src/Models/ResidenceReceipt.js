export class ResidenceReceipt {
  constructor(
    dateCreated,
    amount,
    description,
    residencePayments,
    personId, 
    address
  ) {
    this.description = description;
    this.dateCreated = dateCreated;
    this.amount = amount;
    this.residencePayments = residencePayments;
    this.personId = personId;
    this.address = address;
  }
}
