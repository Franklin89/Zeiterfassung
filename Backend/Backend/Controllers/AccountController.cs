using Backend.Database;
using System.Web.Http;
using System.Linq;
using System.Web;
using Backend.Infrastructure;
using Backend.Models;

namespace Backend.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        [Route("api/account/login")]
        public IHttpActionResult Login([FromBody]Credentials credentials)
        {
            using (var db = new DatabaseContext())
            {
                var user = db.Users.SingleOrDefault(u => u.Username == credentials.Username);
                if(user != null && user.Password == credentials.PasswordHash)
                {
                    return Ok(new Token(credentials.Username, HttpContext.Current.Request.UserHostAddress).Encrypt());
                }

                return Unauthorized();
            }
        }
    }
}
