using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.Models;

namespace Project.Controllers.ResidenceController
{
    [Route("api/residence")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class ResidencesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidencesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/residence/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetResidences()
        {
            if (_context.Residences == null)
            {
                return NotFound();
            }

            var residences =  await _context.Residences.ToListAsync();

            var listResidence = new List<object>();

            foreach (var residence in residences)
            {
                var owner = await _context.People.FindAsync(residence.OwnerId);
                listResidence.Add(new
                {
                    residenceId = residence.ResidenceId,
                    ownerName = owner.Name,
                    address = residence.Address,
                    memberNumber = residence.MemberNumber
                });
            }

            return listResidence;
        }


        // GET: api/residence/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetResidence(Guid id)
        {
            if (_context.Residences == null)
            {
                return NotFound();
            }
            var residence = await _context.Residences
                                .Include(r => r.People)
                                .FirstOrDefaultAsync(r => r.ResidenceId == id);

            if (residence == null)
            {
                return NotFound();
            }

            string ownerName = ""; 

            foreach (var person in residence.People)
            {
                if (person.PersonId == residence.OwnerId)
                {
                    ownerName = person.Name; 
                    break;
                }
            }

            var residenceInfo = new
            {
                residenceId = residence.ResidenceId,
                ownerName = ownerName,
                address = residence.Address,
                memberNumber = residence.MemberNumber,
                people = residence.People
            };

            return residenceInfo;
        }


        // GET: api/residence?name=?&address=
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<object>>> GetResidences(string? name, string? address)
        {
            if (_context.Residences == null)
            {
                return NotFound();
            }
            name = name ?? string.Empty;
            address = address ?? string.Empty;

            var residences = await _context.Residences
                            .Include(r => r.People)
                            .Where(r => r.People.Any(p => (p.PersonId == r.OwnerId && p.Name.Contains(name)))
                                        && r.Address.Contains(address))
                            .ToListAsync();

            var listResidence = new List<object>();

            foreach (var residence in residences)
            {
                string ownerName = "";

                foreach (var person in residence.People)
                {
                    if (person.PersonId == residence.OwnerId)
                    {
                        ownerName = person.Name;
                        break;
                    }
                }
                listResidence.Add(new
                {
                    residenceId = residence.ResidenceId,
                    ownerName = ownerName,
                    address = residence.Address,
                    memberNumber = residence.MemberNumber
                });
            }

            return listResidence;

        }


        // PUT: api/residence/[:id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidence(Guid id, Residence newResidence)
        {
            if (id != newResidence.ResidenceId)
            {
                return BadRequest();
            }
            // Check wheather person is in another residence ??
            var people = newResidence.People.ToList();
            string check = "";
            foreach (var person in people)
            {
                if (person.ResidenceId != null && person.ResidenceId != id)
                {
                    check = person.Name;
                    break;
                }
            }
            if (check != "")
            {
                return StatusCode(400, $"Cư dân {check} hiện đang trong hộ khẩu khác");
            }

            // Update new residence
            var currentResidence = await _context.Residences
                .Include(r => r.People)
                .FirstOrDefaultAsync(r => r.ResidenceId == id);
            currentResidence.MemberNumber = newResidence.MemberNumber;
            currentResidence.Address = newResidence.Address;
            currentResidence.OwnerId = newResidence.OwnerId;

            // Find removed person, added person 
            var removedPeople = currentResidence.People
                                .Where(p => !newResidence.People.Any(newPerson => newPerson.PersonId == p.PersonId))
                                .ToList();

            var addedPeople = newResidence.People
                                .Where(p => !currentResidence.People.Any(oldPerson => oldPerson.PersonId == p.PersonId))
                                .ToList();

            var changePeople = currentResidence.People
                                .Where(p => newResidence.People
                                .Any(newPerson => (newPerson.PersonId == p.PersonId 
                                && newPerson.OwnerRelationship != p.OwnerRelationship)))
                                .ToList();

            foreach (var p in removedPeople)
            {
                // Insert remove action to Records
                _context.Records.Add(new Record
                {
                    RecordId = Guid.NewGuid(),
                    ResidenceId = id,
                    PersonId = p.PersonId,
                    DateCreated = DateTime.Now,
                    Action = "Tách Khẩu",
                    OwnerRelationship = p.OwnerRelationship
                });

                // Update residence of removed person
                p.ResidenceId = null;
                p.OwnerRelationship = null;
            }

            foreach (var p in addedPeople)
            {
                // Insert add action to Records
                _context.Records.Add(new Record
                {
                    RecordId = Guid.NewGuid(),
                    ResidenceId = id,
                    PersonId = p.PersonId,
                    DateCreated = DateTime.Now,
                    Action = "Nhập khẩu",
                    OwnerRelationship = p.OwnerRelationship
                });

                // Update residence of added person
                var person = await _context.People.FindAsync(p.PersonId);
                person.ResidenceId = id;
                person.OwnerRelationship = p.OwnerRelationship;
            }

            foreach (var p in changePeople)
            {
                _context.Records.Add(new Record
                {
                    RecordId = Guid.NewGuid(),
                    ResidenceId = id,
                    PersonId = p.PersonId,
                    DateCreated = DateTime.Now,
                    Action = "Thay đổi quan hệ nhân khẩu",
                    OwnerRelationship = p.OwnerRelationship
                });
                foreach (var newP in newResidence.People)
                {
                    if (p.PersonId == newP.PersonId)
                    {
                        p.OwnerRelationship = newP.OwnerRelationship;
                        break;
                    }
                }

            }

            // Save DB_Context
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidenceExists(id))
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


        // POST: api/residence
        [HttpPost]
        public async Task<ActionResult<Residence>> PostResidence(Residence residence)
        {
            if (_context.Residences == null)
            {
                return Problem("Entity set 'ProjectContext.Residences'  is null.");
            }
            // Check wheather person is in another residence ??
            var people = residence.People.ToList();
            string check = "";
            foreach (var person in people)
            {
                if (person.ResidenceId != null)
                {
                    check = person.Name;
                    break;
                }
            }
            if (check != "")
            {
                return StatusCode(400, $"Cư dân {check} hiện đang trong hộ khẩu khác");
            }


            // Insert residence
            residence.ResidenceId = Guid.NewGuid();
            residence.People.Clear();
            _context.Residences.Add(residence);

            foreach (var p in people)
            {
                // Update residence of person
                var person = await _context.People.FindAsync(p.PersonId);
                person.ResidenceId = residence.ResidenceId;
                person.OwnerRelationship = p.OwnerRelationship;

                // Insert add action to Records
                _context.Records.Add(new Record
                {
                    RecordId = Guid.NewGuid(),
                    ResidenceId = residence.ResidenceId,
                    PersonId = p.PersonId,
                    DateCreated = DateTime.Now,
                    Action = "Nhập khẩu",
                    OwnerRelationship = p.OwnerRelationship
                });
            }
            // Save Db_Context
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }

            return CreatedAtAction("GetResidence", new { id = residence.ResidenceId }, residence);
        }


        // DELETE: api/residence/[:id]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResidence(Guid id)
        {
            if (_context.Residences == null)
            {
                return NotFound();
            }
            var residence = await _context.Residences.FindAsync(id);
            if (residence == null)
            {
                return NotFound();
            }

            var people = await _context.People.Where(p => p.ResidenceId == id).ToListAsync();

            foreach (var p in people)
            {
                p.ResidenceId = null;
                p.OwnerRelationship = null;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }

            _context.Residences.Remove(residence);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResidenceExists(Guid id)
        {
            return (_context.Residences?.Any(e => e.ResidenceId == id)).GetValueOrDefault();
        }
    }
}
