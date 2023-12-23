using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
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
        public async Task<ActionResult<object>> GetRecord(Guid id)
        {
            if (_context.Records == null)
            {
                return NotFound();
            }
            var @record = await _context.Records
                        .Include(r => r.Person)
                        .Where(r => r.ResidenceId == id)
                        .OrderBy(r => r.DateCreated)
                        .ToListAsync();

            var residence = await _context.Residences.FindAsync(id);
            string ownerName = "";

            foreach (var person in residence.People)
            {
                if (person.PersonId == residence.OwnerId)
                {
                    ownerName = person.Name;
                    break;
                }
            }

            var listRecord = new List<object>();


            foreach (var r in @record)
            {
                listRecord.Add(new
                {
                    personName = r.Person.Name,
                    personId = r.Person.PersonId,
                    dateOfBirth = r.Person.DateOfBirth,
                    identityCardNumber = r.Person.IdentityCardNumber,
                    ownerRelationship = r.OwnerRelationship,
                    datecreated = r.DateCreated,
                    action = r.Action,
                });
            }
            var result = new
            {
                ownerName = ownerName,
                address = residence.Address,
                records = listRecord.ToList()
            };

            return result;
        }

        private bool RecordExists(Guid id)
        {
            return (_context.Records?.Any(e => e.RecordId == id)).GetValueOrDefault();
        }
    }
}
