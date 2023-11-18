﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project.Models;
using Project.Models.Models;
using System.Security.Claims;
using Project.Models.Services;
using Microsoft.AspNetCore.Authorization;
using XSystem.Security.Cryptography;
using XAct;

namespace Project.Controllers.UserController
{
    [Route("api/account")]
    [ApiController]
    [Authorize]
    public class UserAccountsController : ControllerBase
    {
        private readonly ProjectContext _context;
        private readonly IConfiguration _configuration;

        public UserAccountsController(ProjectContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Api for testing: get all account
        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserAccount>>> GetUserAccounts()
        {
            if (_context.UserAccounts == null)
            {
                return NotFound();
            }
            var userAccounts = await _context.UserAccounts.ToListAsync();

            return userAccounts;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Logins(UserAccount account)
        {
            var md5Password = EncryptMD5(account.Password);
            var user = await _context.UserAccounts.FirstOrDefaultAsync(p =>
                                (p.UserName == account.UserName && p.Password == md5Password));
            if (user == null)
            {
                return Ok(new
                {
                    Success = false,
                    Message = "Invalid username/password"
                });
            }
            else return Ok(new
            {
                Success = true,
                Message = "Success",
                Data = new
                {
                    Token = GenerateToken(account),
                    Id = user.UserId
                }
            }); ;
        }

        // PUT: api/account/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(Guid id, Password password)
        {
            if (id != password.Id)
            {
                return BadRequest();
            }

            var userAccount = await _context.UserAccounts.FindAsync(id);
            if (userAccount.Password != EncryptMD5(password.OldPassWord))
            {
                return StatusCode(201, new
                {
                    Success = false,
                    Message = "Invalid old password"
                });
            }
            else
            {
                userAccount.Password = EncryptMD5(password.NewPassWord);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return StatusCode(400, ex.Message);
                }
                return StatusCode(201, new
                {
                    Success = true,
                    Message = "Success"
                });
            }
        }

        // POST: api/account/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> PostUserAccount(UserAccount userAccount)
        {
          if (_context.UserAccounts == null)
          {
              return Problem("Entity set 'ProjectContext.UserAccounts'  is null.");
          }
            var account = await _context.UserAccounts.FirstOrDefaultAsync(p => p.UserName == userAccount.UserName);
            if (account != null) 
            {
                return Problem("username existed");
            }
            userAccount.UserId = Guid.NewGuid();
            userAccount.Password = EncryptMD5(userAccount.Password);

            var userInfo = new UserInfo();
            userInfo.UserId = userAccount.UserId;

            _context.UserAccounts.Add(userAccount);
            _context.UserInfos.Add(userInfo);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserAccountExists(userAccount.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(201, userAccount);
        }

        // DELETE: api/account/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAccount(Guid id)
        {
            if (_context.UserAccounts == null)
            {
                return NotFound();
            }
            var userAccount = await _context.UserAccounts.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }

            _context.UserAccounts.Remove(userAccount);
            await _context.SaveChangesAsync();

            return NoContent();
        }
            
        private bool UserAccountExists(Guid id)
        {
            return (_context.UserAccounts?.Any(e => e.UserId == id)).GetValueOrDefault();
        }

        private string GenerateToken(UserAccount userAccount)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserName", userAccount.UserName),
                    new Claim("Id", userAccount.UserId.ToString()),
                    new Claim("TokenId", Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, "admin")
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescription);
            return jwtTokenHandler.WriteToken(token);
        }

        private string EncryptMD5(string password)
        {
            /// Disabled during the software's building and testing phase
            ///
            //StringBuilder hash = new StringBuilder();
            //MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            //byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(password));

            //for (int i = 0; i < bytes.Length; i++)
            //{
            //    hash.Append(bytes[i].ToString("x2"));
            //}
            //return hash.ToString();

            return password;
        }
    }
}
