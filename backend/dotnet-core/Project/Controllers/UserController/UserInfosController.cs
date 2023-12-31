﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.Models;

namespace Project.Controllers.UserController
{
    [Route("api/user")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class UserInfosController : ControllerBase
    {
        private readonly ProjectContext _context;

        public UserInfosController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/UserInfos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfo>> GetUserInfo(Guid id)
        {
          if (_context.UserInfos == null)
          {
              return NotFound();
          }
            var userInfo = await _context.UserInfos.FindAsync(id);

            if (userInfo == null)
            {
                return NotFound();
            }

            return userInfo;
        }

        // PUT: api/UserInfos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserInfo(Guid id, UserInfo userInfo)
        {
            if (id != userInfo.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool UserInfoExists(Guid id)
        {
            return (_context.UserInfos?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
