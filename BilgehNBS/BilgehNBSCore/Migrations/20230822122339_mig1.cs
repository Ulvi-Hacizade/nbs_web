using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BilgehNBSCore.Migrations
{
    public partial class mig1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IdCardInformations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    Patronymic = table.Column<string>(nullable: true),
                    FatherName = table.Column<string>(nullable: true),
                    PassportNumber = table.Column<string>(nullable: true),
                    BirthAddress = table.Column<string>(nullable: true),
                    BirthDate = table.Column<string>(nullable: true),
                    RegistrationAddress = table.Column<string>(nullable: true),
                    GivenOrganizatoin = table.Column<string>(nullable: true),
                    MaritalStatus = table.Column<string>(nullable: true),
                    BloodType = table.Column<string>(nullable: true),
                    Height = table.Column<string>(nullable: true),
                    EyeColor = table.Column<string>(nullable: true),
                    GivenDate = table.Column<string>(nullable: true),
                    ExpireDate = table.Column<string>(nullable: true),
                    Pin = table.Column<string>(nullable: true),
                    ActivationDate = table.Column<string>(nullable: true),
                    DeActivationReason = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdCardInformations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersonTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PersonTypeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersonWithTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PerssonTypeId = table.Column<int>(nullable: false),
                    PersonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonWithTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RelativeTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RelativeTypeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelativeTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    CreatorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkerParent",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Note = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkerParent", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsAttended = table.Column<bool>(nullable: false),
                    IdCardInformationId = table.Column<int>(nullable: true),
                    PersonWithTypeId = table.Column<int>(nullable: true),
                    ChildCount = table.Column<int>(nullable: false),
                    IsGuestInviter = table.Column<bool>(nullable: false),
                    IsReception = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_IdCardInformations_IdCardInformationId",
                        column: x => x.IdCardInformationId,
                        principalTable: "IdCardInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_PersonWithTypes_PersonWithTypeId",
                        column: x => x.PersonWithTypeId,
                        principalTable: "PersonWithTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Crossings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CrossingTime = table.Column<DateTime>(nullable: false),
                    InputOrOutput = table.Column<bool>(nullable: true),
                    PersonWithTypeId = table.Column<int>(nullable: true),
                    CarNumber = table.Column<string>(nullable: true),
                    IsDriver = table.Column<bool>(nullable: false),
                    Permanent = table.Column<bool>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    CreatorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crossings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Crossings_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Crossings_PersonWithTypes_PersonWithTypeId",
                        column: x => x.PersonWithTypeId,
                        principalTable: "PersonWithTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(nullable: true),
                    RoleId = table.Column<int>(nullable: true),
                    CreatorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Worker",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCardInformationId = table.Column<int>(nullable: true),
                    PersonWithTypeId = table.Column<int>(nullable: true),
                    WorkerParentId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Worker", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Worker_IdCardInformations_IdCardInformationId",
                        column: x => x.IdCardInformationId,
                        principalTable: "IdCardInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Worker_PersonWithTypes_PersonWithTypeId",
                        column: x => x.PersonWithTypeId,
                        principalTable: "PersonWithTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Worker_WorkerParent_WorkerParentId",
                        column: x => x.WorkerParentId,
                        principalTable: "WorkerParent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Relativetype = table.Column<string>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: true),
                    IdCardInformationId = table.Column<int>(nullable: true),
                    PersonWithTypeId = table.Column<int>(nullable: true),
                    IsReception = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Families_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Families_IdCardInformations_IdCardInformationId",
                        column: x => x.IdCardInformationId,
                        principalTable: "IdCardInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Families_PersonWithTypes_PersonWithTypeId",
                        column: x => x.PersonWithTypeId,
                        principalTable: "PersonWithTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCardInformationId = table.Column<int>(nullable: true),
                    PersonWithTypeId = table.Column<int>(nullable: true),
                    EventParticipants = table.Column<bool>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Guests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Guests_IdCardInformations_IdCardInformationId",
                        column: x => x.IdCardInformationId,
                        principalTable: "IdCardInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Guests_PersonWithTypes_PersonWithTypeId",
                        column: x => x.PersonWithTypeId,
                        principalTable: "PersonWithTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Crossings_CreatorId",
                table: "Crossings",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Crossings_PersonWithTypeId",
                table: "Crossings",
                column: "PersonWithTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_IdCardInformationId",
                table: "Employees",
                column: "IdCardInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PersonWithTypeId",
                table: "Employees",
                column: "PersonWithTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Families_EmployeeId",
                table: "Families",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Families_IdCardInformationId",
                table: "Families",
                column: "IdCardInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Families_PersonWithTypeId",
                table: "Families",
                column: "PersonWithTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_EmployeeId",
                table: "Guests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_IdCardInformationId",
                table: "Guests",
                column: "IdCardInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_PersonWithTypeId",
                table: "Guests",
                column: "PersonWithTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_CreatorId",
                table: "UserRoles",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId",
                table: "UserRoles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CreatorId",
                table: "Users",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_IdCardInformationId",
                table: "Worker",
                column: "IdCardInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_PersonWithTypeId",
                table: "Worker",
                column: "PersonWithTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_WorkerParentId",
                table: "Worker",
                column: "WorkerParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Crossings");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Guests");

            migrationBuilder.DropTable(
                name: "PersonTypes");

            migrationBuilder.DropTable(
                name: "RelativeTypes");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Worker");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "WorkerParent");

            migrationBuilder.DropTable(
                name: "IdCardInformations");

            migrationBuilder.DropTable(
                name: "PersonWithTypes");
        }
    }
}
