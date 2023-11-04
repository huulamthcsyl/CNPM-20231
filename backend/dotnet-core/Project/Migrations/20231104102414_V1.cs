using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Residence",
                columns: table => new
                {
                    ResidenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MenberNumber = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Residence_ResidenceId", x => x.ResidenceId);
                });

            migrationBuilder.CreateTable(
                name: "ResidenceFee",
                columns: table => new
                {
                    ResidenceFeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsObligatory = table.Column<bool>(type: "bit", nullable: false),
                    Cost = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_ResidenceFee_ResidenceFeeId", x => x.ResidenceFeeId);
                });

            migrationBuilder.CreateTable(
                name: "UserAccount",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_UserAccount_UserName", x => x.UserName);
                });

            migrationBuilder.CreateTable(
                name: "UserInfor",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdentityCardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<bool>(type: "bit", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_UserInfor_UserId", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "VehicleFee",
                columns: table => new
                {
                    VehicleFeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cost = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_VehicleFee_VehicleFeeId", x => x.VehicleFeeId);
                });

            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    PersonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ResidenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdentityCardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<bool>(type: "bit", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeTown = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerRelationship = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_Person_PersonId", x => x.PersonId);
                    table.ForeignKey(
                        name: "Fk_Person_ResidenceId",
                        column: x => x.ResidenceId,
                        principalTable: "Residence",
                        principalColumn: "ResidenceId");
                });

            migrationBuilder.CreateTable(
                name: "AbsentPerson",
                columns: table => new
                {
                    AbsentPersonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PersonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_AbsentPersonId_AbsentIdId", x => x.AbsentPersonId);
                    table.ForeignKey(
                        name: "Fk_AbsentPerson_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                });

            migrationBuilder.CreateTable(
                name: "Record",
                columns: table => new
                {
                    RecordId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ResidenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PersonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_Record_RecordId", x => x.RecordId);
                    table.ForeignKey(
                        name: "Fk_Record_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Fk_Record_ResidenceId",
                        column: x => x.ResidenceId,
                        principalTable: "Residence",
                        principalColumn: "ResidenceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResidenceReceipt",
                columns: table => new
                {
                    ResidenceReceiptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PersonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pk_ResidenceReceipt_ResidenceReceiptId", x => x.ResidenceReceiptId);
                    table.ForeignKey(
                        name: "Fk_ResidenceReceipt_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                });

            migrationBuilder.CreateTable(
                name: "Vehicle",
                columns: table => new
                {
                    VehicleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PersonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LicensePlate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.VehicleId);
                    table.ForeignKey(
                        name: "Fk_Vehicle_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResidencePayment",
                columns: table => new
                {
                    ResidenceFeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ResidenceReceiptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidencePayment", x => new { x.ResidenceReceiptId, x.ResidenceFeeId });
                    table.ForeignKey(
                        name: "Fk_ResidencePayment_ResidenceFeeId",
                        column: x => x.ResidenceFeeId,
                        principalTable: "ResidenceFee",
                        principalColumn: "ResidenceFeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Fk_ResidenceReceipt_ResidenceReceiptId",
                        column: x => x.ResidenceReceiptId,
                        principalTable: "ResidenceReceipt",
                        principalColumn: "ResidenceReceiptId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VehicleReceipt",
                columns: table => new
                {
                    VehicleReceiptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VehicleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleReceipt", x => x.VehicleReceiptId);
                    table.ForeignKey(
                        name: "Fk_VehicleReceipt_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicle",
                        principalColumn: "VehicleId");
                });

            migrationBuilder.CreateTable(
                name: "VehiclePayment",
                columns: table => new
                {
                    VehicleFeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VehicleReceiptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehiclePayment", x => new { x.VehicleReceiptId, x.VehicleFeeId });
                    table.ForeignKey(
                        name: "Fk_VehiclePayment_VehicleFeeId",
                        column: x => x.VehicleFeeId,
                        principalTable: "VehicleFee",
                        principalColumn: "VehicleFeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Fk_VehiclePayment_VehicleReceiptId",
                        column: x => x.VehicleReceiptId,
                        principalTable: "VehicleReceipt",
                        principalColumn: "VehicleReceiptId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AbsentPerson_PersonId",
                table: "AbsentPerson",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Person_ResidenceId",
                table: "Person",
                column: "ResidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Record_PersonId",
                table: "Record",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Record_ResidenceId",
                table: "Record",
                column: "ResidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_ResidencePayment_ResidenceFeeId",
                table: "ResidencePayment",
                column: "ResidenceFeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ResidenceReceipt_PersonId",
                table: "ResidenceReceipt",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_PersonId",
                table: "Vehicle",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_VehiclePayment_VehicleFeeId",
                table: "VehiclePayment",
                column: "VehicleFeeId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleReceipt_VehicleId",
                table: "VehicleReceipt",
                column: "VehicleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AbsentPerson");

            migrationBuilder.DropTable(
                name: "Record");

            migrationBuilder.DropTable(
                name: "ResidencePayment");

            migrationBuilder.DropTable(
                name: "UserAccount");

            migrationBuilder.DropTable(
                name: "UserInfor");

            migrationBuilder.DropTable(
                name: "VehiclePayment");

            migrationBuilder.DropTable(
                name: "ResidenceFee");

            migrationBuilder.DropTable(
                name: "ResidenceReceipt");

            migrationBuilder.DropTable(
                name: "VehicleFee");

            migrationBuilder.DropTable(
                name: "VehicleReceipt");

            migrationBuilder.DropTable(
                name: "Vehicle");

            migrationBuilder.DropTable(
                name: "Person");

            migrationBuilder.DropTable(
                name: "Residence");
        }
    }
}
