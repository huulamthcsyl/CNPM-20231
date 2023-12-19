using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.Models;

namespace Project.Controllers.ResidenceController
{
    [Route("api/record")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class RecordsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public RecordsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/record/residence/[:residenceId]
        [HttpGet("residence/{id}")]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecord(Guid id)
        {
            if (_context.Records == null)
            {
                return NotFound();
            }
            var @record = await _context.Records
                        .Include(r => r.Person)
                        .Where(r => r.ResidenceId == id).ToListAsync();

            return @record;
        }

        private bool RecordExists(Guid id)
        {
            return (_context.Records?.Any(e => e.RecordId == id)).GetValueOrDefault();
        }
    }
}
