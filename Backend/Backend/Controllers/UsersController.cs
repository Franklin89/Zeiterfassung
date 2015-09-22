using Backend.Database;
using Backend.Infrastructure;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Data.Entity;

namespace Backend.Controllers
{
    [CustomAuthorize]
    public class UsersController : ApiController
    {
        // GET api/users
        [CustomAuthorize(Users = "admin")]
        public IEnumerable<User> Get()
        {
            using (var db = new DatabaseContext())
            {
                return db.Users.ToList();
            }
        }

        // GET api/users/5
        public User Get(int id)
        {
            using (var db = new DatabaseContext())
            {
                return db.Users
                         .Include(x => x.Projects)
                         .Include(x => x.UserTasks)
                         .SingleOrDefault(x => x.Id == id);
            }
        }

        // POST api/values
        [CustomAuthorize(Users = "admin")]
        public void Post([FromBody]User user)
        {
            using (var db = new DatabaseContext())
            {
                db.Users.Add(user);
                db.SaveChanges();
            }
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]User user)
        {
            using (var db = new DatabaseContext())
            {
                db.Entry(db.Users.Find(id)).CurrentValues.SetValues(user);
                db.SaveChanges();
            }
        }

        // DELETE api/values/5
        [CustomAuthorize(Users = "admin")]
        public void Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Users.Remove(db.Users.Find(id));
                db.SaveChanges();
            }
        }

        [HttpGet]
        [Route("api/users/GetByUsername/{username}")]
        public User GetByUsername(string username)
        {
            using (var db = new DatabaseContext())
            {
                return db.Users.SingleOrDefault(p => p.Username == username);
            }
        }
    }
}
