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
    [Route("api/[controller]")]
    [ApiController]
    public class AbsentPersonsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public AbsentPersonsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/AbsentPersons
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<AbsentPerson>>> GetAbsentPeople()
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }

            return await _context.AbsentPeople.ToListAsync();
        }

        // GET: api/AbsentPersons/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<AbsentPerson>> GetAbsentPerson(Guid id)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }
            var absentPerson = await _context.AbsentPeople.FindAsync(id);

            return absentPerson;
        }

        // GET: api/AbsentPersons/?name=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AbsentPerson>>> GetAbsentPeople(string name)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }
            var absentPeople = await _context.AbsentPeople.ToListAsync();

            var p = absentPeople
                .Where(p => (p.Person.Name == name)).ToList();

            return p;
        }

        // POST: api/AbsentPersons
        [HttpPost]
        public async Task<ActionResult<AbsentPerson>> PostAbsentPerson(AbsentPerson absentPerson)
        {
            if (_context.AbsentPeople == null)
            {
                return Problem("Entity set 'ProjectContext.AbsentPeople'  is null.");
            }
            absentPerson.Person = null;
            var person = await _context.People.FindAsync(absentPerson.PersonId);
            person.Status = "Tạm vắng";
            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }
            _context.AbsentPeople.Add(absentPerson);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AbsentPersonExists(absentPerson.PersonId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAbsentPerson", new { id = absentPerson.PersonId }, absentPerson);
        }

        //PUT: api/AbsentPersons/[:id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAbsentPerson(Guid id, AbsentPerson absentPerson)
        {
            if (id != absentPerson.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(absentPerson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AbsentPersonExists(id))
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

        // DELETE: api/AbsentPersons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAbsentPerson(Guid id)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }
            var absentPerson = await _context.AbsentPeople.FindAsync(id);
            if (absentPerson == null)
            {
                return NotFound();
            }

            _context.AbsentPeople.Remove(absentPerson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AbsentPersonExists(Guid id)
        {
            return (_context.AbsentPeople?.Any(e => e.PersonId == id)).GetValueOrDefault();
        }
    }
}
