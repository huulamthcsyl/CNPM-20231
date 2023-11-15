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
    [Authorize]
    public class RecordsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public RecordsController(ProjectContext context)
        {
            _context = context;
        }


        // GET: api/record
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
        {
            if (_context.Records == null)
            {
                return NotFound();
            }
            return await _context.Records.ToListAsync();
        }


        // GET: api/record/residence/[:residenceId]
        [HttpGet("residence")]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecord(Guid id)
        {
            if (_context.Records == null)
            {
                return NotFound();
            }
            var @record = await _context.Records.Where(r => r.ResidenceId == id).ToListAsync();

            return @record;
        }

        // PUT: api/Records/5
        //        [HttpPut("{id}")]
        //        public async Task<IActionResult> PutRecord(Guid id, Record @record)
        //        {
        //            if (id != @record.RecordId)
        //            {
        //                return BadRequest();
        //            }

        //            _context.Entry(@record).State = EntityState.Modified;

        //            try
        //            {
        //                await _context.SaveChangesAsync();
        //            }
        //            catch (DbUpdateConcurrencyException)
        //            {
        //                if (!RecordExists(id))
        //                {
        //                    return NotFound();
        //                }
        //                else
        //                {
        //                    throw;
        //                }
        //            }

        //            return NoContent();
        //        }

        //        // POST: api/Records
        //        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //        [HttpPost]
        //        public async Task<ActionResult<Record>> PostRecord(Record @record)
        //        {
        //          if (_context.Records == null)
        //          {
        //              return Problem("Entity set 'ProjectContext.Records'  is null.");
        //          }
        //            _context.Records.Add(@record);
        //            try
        //            {
        //                await _context.SaveChangesAsync();
        //            }
        //            catch (DbUpdateException)
        //            {
        //                if (RecordExists(@record.RecordId))
        //                {
        //                    return Conflict();
        //                }
        //                else
        //                {
        //                    throw;
        //                }
        //            }

        //            return CreatedAtAction("GetRecord", new { id = @record.RecordId }, @record);
        //        }

        //        // DELETE: api/Records/5
        //        [HttpDelete("{id}")]
        //        public async Task<IActionResult> DeleteRecord(Guid id)
        //        {
        //            if (_context.Records == null)
        //            {
        //                return NotFound();
        //            }
        //            var @record = await _context.Records.FindAsync(id);
        //            if (@record == null)
        //            {
        //                return NotFound();
        //            }

        //            _context.Records.Remove(@record);
        //            await _context.SaveChangesAsync();

        //            return NoContent();
        //        }

        private bool RecordExists(Guid id)
        {
            return (_context.Records?.Any(e => e.RecordId == id)).GetValueOrDefault();
        }
    }
}
