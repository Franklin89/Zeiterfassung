namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changetimerecording : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserTasks", "Time", c => c.Double(nullable: false));
            AddColumn("dbo.UserTasks", "Date", c => c.DateTime(nullable: false));
            DropColumn("dbo.UserTasks", "Start");
            DropColumn("dbo.UserTasks", "End");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserTasks", "End", c => c.DateTime(nullable: false));
            AddColumn("dbo.UserTasks", "Start", c => c.DateTime(nullable: false));
            DropColumn("dbo.UserTasks", "Date");
            DropColumn("dbo.UserTasks", "Time");
        }
    }
}
