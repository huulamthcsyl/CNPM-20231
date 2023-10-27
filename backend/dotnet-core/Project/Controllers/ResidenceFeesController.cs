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
    [Route("api/residencefee")]
    [ApiController]
    public class ResidenceFeesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidenceFeesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/residencefee/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<ResidenceFee>>> GetResidenceFees()
        {
          if (_context.ResidenceFees == null)
          {
              return NotFound();
          }
            var paymentList = await _context.ResidencePayments.ToListAsync();
            var fees = await _context.ResidenceFees.ToListAsync();
            var feesInfor = new List<ResidenceFeeInfor>();

            foreach (var fee in fees)
            {
                feesInfor.Add(new ResidenceFeeInfor
                {
                    ResidenceFeeId = fee.ResidenceFeeId,
                    Name = fee.Name,
                    IsObligatory = fee.IsObligatory,
                    Cost = fee.Cost,
                    PaidQuantity = paymentList.Where(p => (p.ResidenceFeeId == fee.ResidenceFeeId)).Count(),
                    Total = paymentList.Where(p => (p.ResidenceFeeId == fee.ResidenceFeeId)).Select(p => p.Amount).Sum()
                });
            }
            return feesInfor;
        }


        // GET: api/residencefee?name=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResidenceFeeInfor>>> GetResidenceFee(string name)
        {
            if (_context.ResidenceFees == null)
            {
                return NotFound();
            }

            name = name ?? string.Empty;
            
            var paymentList = await _context.ResidencePayments.ToListAsync();
            var fees = await _context.ResidenceFees.Where(p => (p.Name.Contains(name))).ToListAsync();
            var feesInfor = new List<ResidenceFeeInfor>();

            foreach (var fee in fees)
            {
                feesInfor.Add(new ResidenceFeeInfor
                {
                    ResidenceFeeId = fee.ResidenceFeeId,
                    Name = fee.Name,
                    IsObligatory = fee.IsObligatory,
                    Cost = fee.Cost,
                    PaidQuantity = paymentList.Where(p => (p.ResidenceFeeId == fee.ResidenceFeeId)).Count(),
                    Total = paymentList.Where(p => (p.ResidenceFeeId == fee.ResidenceFeeId)).Select(p => p.Amount).Sum()
                });
            }
            return feesInfor;
        }


        // PUT: api/residencefee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidenceFee(Guid id, ResidenceFee residenceFee)
        {
            if (id != residenceFee.ResidenceFeeId)
            {
                return BadRequest();
            }

            _context.Entry(residenceFee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidenceFeeExists(id))
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


        // POST: api/residencefee
        [HttpPost]
        public async Task<ActionResult<ResidenceFee>> PostResidenceFee(ResidenceFee residenceFee)
        {
          if (_context.ResidenceFees == null)
          {
              return Problem("Entity set 'ProjectContext.ResidenceFees'  is null.");
          }
            residenceFee.ResidenceFeeId = Guid.NewGuid();
            _context.ResidenceFees.Add(residenceFee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ResidenceFeeExists(residenceFee.ResidenceFeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetResidenceFee", new { id = residenceFee.ResidenceFeeId }, residenceFee);
        }


        // DELETE: api/residencefee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResidenceFee(Guid id)
        {
            if (_context.ResidenceFees == null)
            {
                return NotFound();
            }
            var residenceFee = await _context.ResidenceFees.FindAsync(id);
            if (residenceFee == null)
            {
                return NotFound();
            }

            _context.ResidenceFees.Remove(residenceFee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResidenceFeeExists(Guid id)
        {
            return (_context.ResidenceFees?.Any(e => e.ResidenceFeeId == id)).GetValueOrDefault();
        }
    }
}
