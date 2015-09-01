namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Task : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tasks", "Project_Id", "dbo.Projects");
            DropIndex("dbo.Tasks", new[] { "Project_Id" });
            CreateTable(
                "dbo.TaskProjects",
                c => new
                    {
                        Task_Id = c.Int(nullable: false),
                        Project_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Task_Id, t.Project_Id })
                .ForeignKey("dbo.Tasks", t => t.Task_Id, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.Project_Id, cascadeDelete: true)
                .Index(t => t.Task_Id)
                .Index(t => t.Project_Id);
            
            DropColumn("dbo.Tasks", "Project_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tasks", "Project_Id", c => c.Int());
            DropForeignKey("dbo.TaskProjects", "Project_Id", "dbo.Projects");
            DropForeignKey("dbo.TaskProjects", "Task_Id", "dbo.Tasks");
            DropIndex("dbo.TaskProjects", new[] { "Project_Id" });
            DropIndex("dbo.TaskProjects", new[] { "Task_Id" });
            DropTable("dbo.TaskProjects");
            CreateIndex("dbo.Tasks", "Project_Id");
            AddForeignKey("dbo.Tasks", "Project_Id", "dbo.Projects", "Id");
        }
    }
}
