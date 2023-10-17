using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Validations;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/residencereceipt")]
    [ApiController]
    public class ResidenceReceiptsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidenceReceiptsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/residencereceipt/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<ResidenceReceipt>>> GetResidenceReceipts()
        {
          if (_context.ResidenceReceipts == null)
          {
              return NotFound();
          }
            return await _context.ResidenceReceipts.ToListAsync();
        }


        // GET: api/residencereceipt/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<ResidenceReceipt>> GetResidenceReceipt(Guid id)
        {
          if (_context.ResidenceReceipts == null)
          {
              return NotFound();
          }
            var residenceReceipt = await _context.ResidenceReceipts.FindAsync(id);

            if (residenceReceipt == null)
            {
                return NotFound();
            }

            return residenceReceipt;
        }

        // GET: api/residencereceipt?name={}&address={}&starttime={}&endtime={}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResidenceReceipt>>> GetResidenceReceipts(string name, string adress, DateTime starttime, DateTime endtime )
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }

            var residenceReceipts = await _context.ResidenceReceipts
                                        .Where(p => (p.Person.Name == name && p.Person.Residence.Address == adress
                                               && starttime <= p.DateCreated && p.DateCreated <= endtime))
                                        .ToListAsync();

            return residenceReceipts;
        }


        //PUT: api/residencereceipt/[:id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidenceReceipt(Guid id, ResidenceReceipt newReceipt)
        {
            if (id != newReceipt.ResidenceReceiptId)
            {
                return BadRequest();
            }

            var currentReceipt = await _context.ResidenceReceipts.FindAsync(id);

            if (currentReceipt == null)
            {
                return NotFound();
            }

            // Update new receipt
            currentReceipt.Amount = newReceipt.Amount;
            currentReceipt.DateCreated = newReceipt.DateCreated;
            currentReceipt.Description = newReceipt.Description;

            var removedPayments = currentReceipt.ResidencePayments
                                    .Where(oldR => newReceipt.ResidencePayments
                                    .Any(newR => (newR.ResidenceFeeId != oldR.ResidenceFeeId && newR.Amount != oldR.Amount)))
                                    .ToList();
            var addedPayments = newReceipt.ResidencePayments
                                    .Where(newR => currentReceipt.ResidencePayments
                                    .Any(oldR => (oldR.ResidenceFeeId != newR.ResidenceFeeId && oldR.Amount != newR.Amount)))
                                    .ToList();

            _context.ResidencePayments.RemoveRange(removedPayments);
            _context.ResidencePayments.AddRange(addedPayments);
                
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidenceReceiptExists(id))
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


        // POST: api/residencereceipt
        [HttpPost()]
        public async Task<ActionResult<ResidenceReceipt>> PostResidenceReceipt(ResidenceReceipt residenceReceipt)
        {
          if (_context.ResidenceReceipts == null)
          {
              return Problem("Entity set 'ProjectContext.ResidenceReceipts'  is null.");
          }
            var paymentList = residenceReceipt.ResidencePayments.ToList();

            residenceReceipt.ResidenceReceiptId = Guid.NewGuid();
            residenceReceipt.ResidencePayments.Clear();

            _context.ResidenceReceipts.Add(residenceReceipt);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ResidenceReceiptExists(residenceReceipt.ResidenceReceiptId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            foreach (var payment in paymentList)
            {
                _context.ResidencePayments.Add(new ResidencePayment
                {
                    ResidenceFeeId = payment.ResidenceFeeId,
                    ResidenceReceiptId = residenceReceipt.ResidenceReceiptId,
                    Amount = payment.Amount,
                });
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }

            return CreatedAtAction("GetResidenceReceipt", new { id = residenceReceipt.ResidenceReceiptId }, residenceReceipt);
        }


        // DELETE: api/residencereceipt/[:id]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResidenceReceipt(Guid id)
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }
            var residenceReceipt = await _context.ResidenceReceipts.FindAsync(id);
            if (residenceReceipt == null)
            {
                return NotFound();
            }

            _context.ResidenceReceipts.Remove(residenceReceipt);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResidenceReceiptExists(Guid id)
        {
            return (_context.ResidenceReceipts?.Any(e => e.ResidenceReceiptId == id)).GetValueOrDefault();
        }
    }
}
