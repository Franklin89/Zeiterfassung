using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Linq;
using Backend.Database;
using Backend.Models;
using System.Web;
using System;

namespace Backend.Infrastructure
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            try
            {
                const string tokenName = "api-token";

                // Check if api token is set in the header
                if (actionContext.Request.Headers.Contains(tokenName))
                {
                    var tokenString = actionContext.Request.Headers.GetValues(tokenName).First();
                    Token token = Token.Decrypt(tokenString);

                    User user;

                    // Check that user exists on db
                    using (var db = new DatabaseContext())
                    {
                        user = db.Users.SingleOrDefault(u => u.Username == token.Username);
                    }

                    if (user != null)
                    {
                        // Check that the IP Address is the same
                        bool requestIPMatchesTokenIP = token.IP.Equals(GetClientIp(actionContext));
                        
                        if (!requestIPMatchesTokenIP)
                        {
                            actionContext.Response = actionContext.Request.CreateErrorResponse(
                                        HttpStatusCode.Unauthorized,
                                        "IP does not match!");
                            return;
                        }

                        // Check Users collection
                        var users = Users.Split(',').ToList();

                        if(Users.Count() > 0 && !users.Contains(user.Username))
                        {
                            actionContext.Response = actionContext.Request.CreateErrorResponse(
                                        HttpStatusCode.Unauthorized,
                                        "User is not authorized for this operation!");
                            return;
                        }
                    }
                    else
                    {
                        actionContext.Response = actionContext.Request.CreateErrorResponse(
                                        HttpStatusCode.Unauthorized,
                                        "User not in DB!");
                        return;
                    }
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateErrorResponse(
                                        HttpStatusCode.Unauthorized,
                                        "Please specify your api-token!");
                    return;
                }
            }
            catch(Exception exception)
            {
                actionContext.Response = actionContext.Request
                    .CreateErrorResponse(
                    HttpStatusCode.InternalServerError,
                    "Internal Server Errror: Something went wrong during the authorization!");
                return;
            }   
        }

        private string GetClientIp(HttpActionContext actionContext)
        {
            var ip = ((HttpContextWrapper)actionContext.Request.Properties["MS_HttpContext"]).Request.UserHostAddress;
            return ip;
        }
    }
}