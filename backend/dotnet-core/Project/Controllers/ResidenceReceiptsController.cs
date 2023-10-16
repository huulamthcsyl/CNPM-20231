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
    [Route("api/receipt")]
    [ApiController]
    public class ResidenceReceiptsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidenceReceiptsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/receipt/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<ResidenceReceipt>>> GetResidenceReceipts()
        {
          if (_context.ResidenceReceipts == null)
          {
              return NotFound();
          }
            return await _context.ResidenceReceipts.ToListAsync();
        }


        // GET: api/receipt/[:id]
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


        //// PUT: api/receipt/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutResidenceReceipt(Guid id, ResidenceReceipt residenceReceipt)
        //{
        //    if (id != residenceReceipt.ResidenceReceiptId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(residenceReceipt).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ResidenceReceiptExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}


        // POST: api/receipt
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


        // DELETE: api/receipt/5
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
