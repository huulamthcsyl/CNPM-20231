using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.Migrations
{
    /// <inheritdoc />
    public partial class V3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "Person");

            migrationBuilder.AddForeignKey(
                name: "Fk_Person_PersonId",
                table: "AbsentPerson",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "PersonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Fk_Person_PersonId",
                table: "AbsentPerson");

            migrationBuilder.AddForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "Person",
                column: "PersonId",
                principalTable: "AbsentPerson",
                principalColumn: "PersonId");
        }
    }
}
