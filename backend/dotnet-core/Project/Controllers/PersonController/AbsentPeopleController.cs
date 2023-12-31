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

namespace Project.Controllers.PersonController
{
    [Route("api/absent")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class AbsentPeopleController : ControllerBase
    {
        private readonly ProjectContext _context;

        public AbsentPeopleController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/absent/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAbsentPeople()
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }
            var absentPeople = await _context.AbsentPeople.Include(ap => ap.Person).ToListAsync();

            var listAbsent = new List<object>();

            foreach (var absentperson in absentPeople)
            {
                listAbsent.Add(new
                {
                    absent = absentperson,
                    person = absentperson.Person
                });
            }
            return listAbsent;
        }


        // GET: api/absent/[:id]
        [HttpGet()]
        public async Task<ActionResult<object>> GetAbsentPerson(Guid id)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }

            var absentPerson = await _context.AbsentPeople
                            .Include(p => p.Person)
                            .FirstOrDefaultAsync(p => p.AbsentPersonId == id);

            var residence = await _context.Residences.FindAsync(absentPerson.PersonId);

            var absent = new
            {
                absent = absentPerson,
                person = absentPerson.Person,
                address = residence == null ? null : residence.Address
            };
            return absent;
        }
        

        //GET: api/absent/person?name=
        [HttpGet("person")]
        public async Task<ActionResult<IEnumerable<object>>> GetAbsentPeople(string? name)
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }

            name = name ?? string.Empty;

            var absentPeople = await _context.AbsentPeople
                .Include(a => a.Person)
                .Where(ap => ap.Person.Name.Contains(name))
                .ToListAsync();

            var listAbsent = new List<object>();

            foreach (var absentperson in absentPeople)
            {
                listAbsent.Add(new
                {
                    absent = absentperson,
                    person = absentperson.Person
                });
            }
            return listAbsent;

        }


        //GET: api/absent/person
        [HttpGet("person/all")]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            if (_context.AbsentPeople == null)
            {
                return NotFound();
            }

            var people = await _context.AbsentPeople
                        .Include(a => a.Person)
                        .Select(p => p.Person)
                        .Distinct().ToListAsync();

            return people;

        }


        // POST: api/absent
        [HttpPost]
        public async Task<ActionResult<AbsentPerson>> PostAbsentPerson(AbsentPerson absentPerson)
        {
            if (_context.AbsentPeople == null)
            {
                return Problem("Entity set 'ProjectContext.AbsentPeople'  is null.");
            }
            var person = await _context.People.FindAsync(absentPerson.PersonId);

            if (person == null)
            {
                return NotFound();
            }

            if (person.Status == "Tạm trú")
            {
                return StatusCode(400, "Không thể đăng kí tạm vắng cho cư dân đang tạm trú");
            }

            person.Status = "Tạm Vắng";

            absentPerson.AbsentPersonId = Guid.NewGuid();

            _context.AbsentPeople.Add(absentPerson);

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateException)
            {
                if (AbsentPersonExists(absentPerson.AbsentPersonId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAbsentPerson", new { id = absentPerson.AbsentPersonId }, absentPerson);
        }


        // PUT: api/absent/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAbsentPerson(Guid id, AbsentPerson absentPerson)
        {
            if (id != absentPerson.AbsentPersonId)
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
