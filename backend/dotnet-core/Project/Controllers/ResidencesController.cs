using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidencesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidencesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/Residences
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Residence>>> GetResidences()
        {
          if (_context.Residences == null)
          {
              return NotFound();
          }
            return await _context.Residences.ToListAsync();
        }

        // GET: api/Residences/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<Residence>> GetResidence(Guid id)
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

            return residence;
        }

        // GET: api/Residences?name=
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Residence>>> GetResidences(string name)
        {
            if (_context.Residences == null)
            {
                return NotFound();
            }

            var residences = await _context.Residences.ToListAsync();
            var r = residences
                .Where(p => (p.OwnerName == name))
                .ToList();
        
            return r;
        }

        // PUT: api/Residences/[:id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidence(Guid id, Residence newResidence)
        {
            if (id != newResidence.ResidenceId)
            {
                return BadRequest();
            }
            // Check wheather person is in another residence ??
            var people = newResidence.People.ToList();
            bool check = false;
            foreach (var person in people)
            {
                if (person.ResidenceId != null && person.ResidenceId != id)
                {
                    check = true;
                    break;
                }
            }
            if (check == true)
            {
                return Problem("Cannot create residence. Person is currently in another residence!");
            }

            // Update new residence
            var currentResidence = await _context.Residences.FindAsync(id);
            currentResidence.MenberNumber = newResidence.MenberNumber;
            currentResidence.Address = newResidence.Address;
            currentResidence.OwnerName = newResidence.OwnerName;

            // Find removed person, added person 
            var removedPerson = currentResidence.People
                .Where(p => !newResidence.People.Any(newPerson => newPerson.PersonId == p.PersonId))
                .ToList();

            var addedPerson = newResidence.People
                .Where(p => !currentResidence.People.Any(oldPerson => oldPerson.PersonId == p.PersonId))
                .ToList();
            
            foreach (var p in removedPerson)
            {
                // Update residence of removed person
                var person = await _context.People.FindAsync(p.PersonId);
                person.ResidenceId = null;
                person.OwnerRelationship = null;

                // Insert remove action to Records
                _context.Records.Add(new Record
                {
                    RecordId = Guid.NewGuid(),
                    ResidenceId = id,
                    PersonId = person.PersonId,
                    DateCreated = DateTime.Now,
                    Action = "Tách Khẩu"
                });
            }

            foreach (var p in addedPerson)
            {
                // Update residence of added person
                var person = await _context.People.FindAsync(p.PersonId);
                person.ResidenceId = id;
                person.OwnerRelationship = p.OwnerRelationship;

                // Insert add action to Records
                _context.Records.Add(new Record
                {
                    RecordId = Guid.NewGuid(),
                    ResidenceId = id,
                    PersonId = person.PersonId,
                    DateCreated = DateTime.Now,
                    Action = "Nhập khẩu"
                });
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

        // POST: api/Residences
        [HttpPost]
        public async Task<ActionResult<Residence>> PostResidence(Residence residence)
        {
          if (_context.Residences == null)
          {
              return Problem("Entity set 'ProjectContext.Residences'  is null.");
          }
            // Check wheather person is in another residence ??
            var people = residence.People.ToList();
            bool check = false;
            foreach (var person in people)
            {
                if (person.ResidenceId != null)
                {
                    check = true;
                    break;
                }
            }
            if (check == true) 
            {
                return Problem("Cannot create residence. Person is currently in another residence!");
            }

            // Insert residence
            residence.ResidenceId = Guid.NewGuid();
            residence.People.Clear();
            _context.Residences.Add(residence);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ResidenceExists(residence.ResidenceId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

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
                    Person = p
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

        // DELETE: api/Residences/[:id]
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

            var people = await _context.People.ToListAsync();

            foreach (var p in people)
            {
                var person = await _context.People.FindAsync(p.PersonId);
                person.ResidenceId = null;
                person.OwnerRelationship = null;
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
