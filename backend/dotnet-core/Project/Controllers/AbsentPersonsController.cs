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
    [Route("api/absent")]
    [ApiController]
    public class AbsentPersonsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public AbsentPersonsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/absent
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<AbsentPerson>>> GetAbsentPeople()
        {
          if (_context.AbsentPeople == null)
          {
              return NotFound();
          }
            return await _context.AbsentPeople.ToListAsync();
        }

        // GET: api/absent/[:personId]
        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<AbsentPerson>>> GetAbsentPerson(Guid personId)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }
            var absentPeople = await _context.AbsentPeople.Where(p => (p.PersonId == personId)).ToListAsync();

            return absentPeople;
        }

        //GET: api/absent/?name=
        [HttpGet("name")]
        public async Task<ActionResult<IEnumerable<AbsentPerson>>> GetAbsentPeople(string name)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }
            var absentPeople = await _context.AbsentPeople.Where(ap => (ap.Person.Name == name)).ToListAsync();

            return absentPeople;
        }


        // POST: api/absent
        [HttpPost]
        public async Task<ActionResult<AbsentPerson>> PostAbsentPerson(AbsentPerson absentPerson)
        {
          if (_context.AbsentPeople == null)
          {
              return Problem("Entity set 'ProjectContext.AbsentPeople'  is null.");
          }
            absentPerson.AbsentPersonId = Guid.NewGuid();
            _context.AbsentPeople.Add(absentPerson);
            var person = await _context.People.FindAsync(absentPerson.PersonId);
            person.Status = "Tạm Vắng";
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


        // PUT: api/absent/5
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


        // DELETE: api/absent/5
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
