namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateModel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TaskProjects", "Task_Id", "dbo.Tasks");
            DropForeignKey("dbo.TaskProjects", "Project_Id", "dbo.Projects");
            DropIndex("dbo.TaskProjects", new[] { "Task_Id" });
            DropIndex("dbo.TaskProjects", new[] { "Project_Id" });
            AddColumn("dbo.Tasks", "ProjectId", c => c.Int(nullable: false));
            AddColumn("dbo.UserTasks", "TaskId", c => c.Int(nullable: false));
            CreateIndex("dbo.Tasks", "ProjectId");
            CreateIndex("dbo.UserTasks", "TaskId");
            AddForeignKey("dbo.Tasks", "ProjectId", "dbo.Projects", "Id", cascadeDelete: false);
            AddForeignKey("dbo.UserTasks", "TaskId", "dbo.Tasks", "Id", cascadeDelete: false);
            DropTable("dbo.TaskProjects");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TaskProjects",
                c => new
                    {
                        Task_Id = c.Int(nullable: false),
                        Project_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Task_Id, t.Project_Id });
            
            DropForeignKey("dbo.UserTasks", "TaskId", "dbo.Tasks");
            DropForeignKey("dbo.Tasks", "ProjectId", "dbo.Projects");
            DropIndex("dbo.UserTasks", new[] { "TaskId" });
            DropIndex("dbo.Tasks", new[] { "ProjectId" });
            DropColumn("dbo.UserTasks", "TaskId");
            DropColumn("dbo.Tasks", "ProjectId");
            CreateIndex("dbo.TaskProjects", "Project_Id");
            CreateIndex("dbo.TaskProjects", "Task_Id");
            AddForeignKey("dbo.TaskProjects", "Project_Id", "dbo.Projects", "Id", cascadeDelete: false);
            AddForeignKey("dbo.TaskProjects", "Task_Id", "dbo.Tasks", "Id", cascadeDelete: false);
        }
    }
}
