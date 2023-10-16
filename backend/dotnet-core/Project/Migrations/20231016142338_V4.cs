using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.Migrations
{
    /// <inheritdoc />
    public partial class V4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Fk_Person_PersonId",
                table: "AbsentPerson");

            migrationBuilder.DropPrimaryKey(
                name: "Pk_AbsentPerson_PersonId",
                table: "AbsentPerson");

            migrationBuilder.AddColumn<Guid>(
                name: "AbsentPersonId",
                table: "AbsentPerson",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "Pk_AbsentPersonId_AbsentIdId",
                table: "AbsentPerson",
                column: "AbsentPersonId");

            migrationBuilder.CreateIndex(
                name: "IX_AbsentPerson_PersonId",
                table: "AbsentPerson",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "AbsentPerson",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "PersonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "AbsentPerson");

            migrationBuilder.DropPrimaryKey(
                name: "Pk_AbsentPersonId_AbsentIdId",
                table: "AbsentPerson");

            migrationBuilder.DropIndex(
                name: "IX_AbsentPerson_PersonId",
                table: "AbsentPerson");

            migrationBuilder.DropColumn(
                name: "AbsentPersonId",
                table: "AbsentPerson");

            migrationBuilder.AddPrimaryKey(
                name: "Pk_AbsentPerson_PersonId",
                table: "AbsentPerson",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "Fk_Person_PersonId",
                table: "AbsentPerson",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "PersonId");
        }
    }
}
