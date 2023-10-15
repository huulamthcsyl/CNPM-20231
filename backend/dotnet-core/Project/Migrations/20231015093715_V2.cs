using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "AbsentPerson");

            migrationBuilder.AddForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "Person",
                column: "PersonId",
                principalTable: "AbsentPerson",
                principalColumn: "PersonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "Person");

            migrationBuilder.AddForeignKey(
                name: "Fk_AbsentPerson_PersonId",
                table: "AbsentPerson",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "PersonId");
        }
    }
}
