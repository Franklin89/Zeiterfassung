using Backend.Database;
using Backend.Infrastructure;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Backend.Controllers
{
    [CustomAuthorize]
    public class TasksController : ApiController
    {
        // GET: api/Tasks
        public IEnumerable<Task> Get()
        {
            using (var db = new DatabaseContext())
            {
                return db.Tasks.ToList();
            }
        }

        // GET: api/Tasks/5
        public Task Get(int id)
        {
            using (var db = new DatabaseContext())
            {
                return db.Tasks.SingleOrDefault(t => t.Id == id);
            }
        }

        // POST: api/Tasks
        [CustomAuthorize(Users = "admin")]
        public void Post([FromBody]Task task)
        {
            using (var db = new DatabaseContext())
            {
                db.Tasks.Add(task);
                db.SaveChanges();
            }
        }

        // PUT: api/Tasks/5
        [CustomAuthorize(Users = "admin")]
        public void Put(int id, [FromBody]Task task)
        {
            using (var db = new DatabaseContext())
            {
                db.Entry(db.Tasks.Find(id)).CurrentValues.SetValues(task);
                db.SaveChanges();
            }
        }

        // DELETE: api/Tasks/5
        [CustomAuthorize(Users = "admin")]
        public void Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Tasks.Remove(db.Tasks.Find(id));
                db.SaveChanges();
            }
        }
    }
}
