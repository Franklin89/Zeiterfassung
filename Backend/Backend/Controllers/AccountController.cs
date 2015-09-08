using Backend.Database;
using System.Web.Http;
using System.Linq;
using System.Web;
using Backend.Infrastructure;

namespace Backend.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        [Route("account/login")]
        public IHttpActionResult GetTasksByProject([FromBody]string username, [FromBody]string passwordHash)
        {
            using (var db = new DatabaseContext())
            {
                var user = db.Users.SingleOrDefault(u => u.Username == username);
                if(user != null && user.Password == passwordHash)
                {
                    return Ok(new Token(username, HttpContext.Current.Request.UserHostAddress).Encrypt());
                }

                return NotFound();
            }
        }
    }
}
