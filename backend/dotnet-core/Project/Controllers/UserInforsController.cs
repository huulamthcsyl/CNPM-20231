using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserInforsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public UserInforsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet()]
        public async Task<ActionResult<UserInfor>> GetUserInfor()
        {
          if (_context.UserInfor == null)
          {
              return NotFound();
          }
            var userInfor = await _context.UserInfor.FirstOrDefaultAsync();

            if (userInfor == null)
            {
                return NotFound();
            }

            return userInfor;
        }

        // PUT: api/users
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserInfor(UserInfor userInfor)
        {
            _context.Entry(userInfor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserInforExists(userInfor.UserId))
                {
                    return NotFound("error");
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(204, "success");
        }

        // POST: api/UserInfors
        [HttpPost]
        public async Task<ActionResult<UserInfor>> PostUserInfor(UserInfor userInfor)
        {
          if (_context.UserInfor == null)
          {
              return Problem("Entity set 'ProjectContext.UserInfor'  is null.");
          }            
            
            userInfor.UserId = Guid.NewGuid();
            _context.UserInfor.Add(userInfor);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserInforExists(userInfor.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(201, userInfor);
        }

        // DELETE: api/UserInfors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserInfor(Guid id)
        {
            if (_context.UserInfor == null)
            {
                return NotFound();
            }
            var userInfor = await _context.UserInfor.FindAsync(id);
            if (userInfor == null)
            {
                return NotFound();
            }

            _context.UserInfor.Remove(userInfor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserInforExists(Guid id)
        {
            return (_context.UserInfor?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
