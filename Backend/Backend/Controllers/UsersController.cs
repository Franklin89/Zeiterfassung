using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Backend.Database;
using Backend.Models;

namespace Backend.Controllers
{
    public class UsersController : ApiController
    {
        // GET api/users
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
                return db.Users.SingleOrDefault(x => x.Id == id);
            }
        }

        // POST api/values
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
        public void Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Users.Remove(db.Users.Find(id));
                db.SaveChanges();
            }
        }
    }
}
