using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ProjectContext _context;

        public AccountController(ProjectContext context)
        {
            _context = context;
        }

        // POST: api/account/login 
        [HttpPost("login")]
        public async Task<IActionResult> Validation(UserAccount userAccount)
        {
            if (_context.UserAccount == null)
            {
                return NotFound();
            }

            var account = await _context.UserAccount
                            .Where(p => (p.UserName == userAccount.UserName && p.Password == userAccount.Password))
                            .FirstOrDefaultAsync();
            if (account == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid username, password",
                    data = null
                });
            }

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                data = null
            });
        }

        // POST: api/account
        [HttpPost]
        public async Task<IActionResult> PostUserAccount(UserAccount userAccount)
        {
            if (_context.UserAccount == null)
            {
                return Problem("Entity set 'ProjectContext.UserAccount'  is null.");
            }
            _context.UserAccount.Add(userAccount);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserAccountExists(userAccount.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Done");
        }

        // PUT: api/account
        [HttpPut]
        public async Task<IActionResult> PutUserAccount(Password password)
        {
            var account = await _context.UserAccount
                            .Where(p  => p.Password == password.OldPassword).FirstOrDefaultAsync();

            if (account == null)
            {
                return Ok(false);
            }

            account.Password = password.NewPassword;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(400, e.Message);
            }

            return Ok(true);
        }

        private bool UserAccountExists(string userName)
        {
            return (_context.UserAccount?.Any(e => e.UserName == userName)).GetValueOrDefault();
        }

    }
}
