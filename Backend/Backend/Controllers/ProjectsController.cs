using Backend.Database;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Backend.Controllers
{
    public class ProjectsController : ApiController
    {
        // GET: api/Projects
        public IEnumerable<Project> Get()
        {
            using (var db = new DatabaseContext())
            {
                return db.Projects.ToList();
            }
        }

        // GET: api/Projects/5
        public Project Get(int id)
        {
            using (var db = new DatabaseContext())
            {
                return db.Projects.SingleOrDefault(t => t.Id == id);
            }
        }

        // POST: api/Projects
        public void Post([FromBody]Project Project)
        {
            using (var db = new DatabaseContext())
            {
                db.Projects.Add(Project);
                db.SaveChanges();
            }
        }

        // PUT: api/Projects/5
        public void Put(int id, [FromBody]Project Project)
        {
            using (var db = new DatabaseContext())
            {
                db.Entry(db.Projects.Find(id)).CurrentValues.SetValues(Project);
                db.SaveChanges();
            }
        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Projects.Remove(db.Projects.Find(id));
                db.SaveChanges();
            }
        }
    }
}
