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
    [Route("api/person")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly ProjectContext _context;

        public PeopleController(ProjectContext context)
        {
            _context = context;
        }


        // GET: api/person/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            if (_context.People == null)
            {
                return NotFound();
            }
            return await _context.People.ToListAsync();
        }


        // GET: api/person/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(Guid id)
        {
          if (_context.People == null)
          {
              return NotFound();
          }
            var person = await _context.People.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }


        // GET:api/person?name=
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople(string name)
        {
            if (_context.People == null)
            {
                return NotFound();
            }

            var people = await _context.People.Where(p => p.Name == name).ToListAsync();

            return people;
        }


        // PUT: api/person/[:id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(Guid id, Person person)
        {
            if (id != person.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
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


        // POST: api/person
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
          if (_context.People == null)
          {
              return Problem("Entity set 'ProjectContext.People'  is null.");
          }
          person.PersonId = Guid.NewGuid();
          _context.Entry(person).State |= EntityState.Added;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PersonExists(person.PersonId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPerson", new { id = person.PersonId }, person);
        }


        // DELETE: api/person/[:id]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(Guid id)
        {
            if (_context.People == null)
            {
                return NotFound();
            }
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonExists(Guid id)
        {
            return (_context.People?.Any(e => e.PersonId == id)).GetValueOrDefault();
        }
    }
}
