using Backend.Database;
using Backend.Infrastructure;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Backend.Controllers
{
    [CustomAuthorize]
    public class UserTasksController : ApiController
    {
        // GET: api/UserTasks
        public IEnumerable<UserTask> Get()
        {
            using (var db = new DatabaseContext())
            {
                return db.UserTasks.ToList();
            }
        }

        // GET: api/UserTasks/5
        public UserTask Get(int id)
        {
            using (var db = new DatabaseContext())
            {
                return db.UserTasks.SingleOrDefault(t => t.Id == id);
            }
        }

        // POST: api/UserTasks
        public void Post([FromBody]UserTask UserTask)
        {
            using (var db = new DatabaseContext())
            {
                db.UserTasks.Add(UserTask);
                db.SaveChanges();
            }
        }

        // PUT: api/UserTasks/5
        public void Put(int id, [FromBody]UserTask UserTask)
        {
            using (var db = new DatabaseContext())
            {
                db.Entry(db.UserTasks.Find(id)).CurrentValues.SetValues(UserTask);
                db.SaveChanges();
            }
        }

        // DELETE: api/UserTasks/5
        public void Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.UserTasks.Remove(db.UserTasks.Find(id));
                db.SaveChanges();
            }
        }
    }
}
