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
    [Route("api/vehiclereceipt")]
    [ApiController]
    public class VehicleReceiptsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public VehicleReceiptsController(ProjectContext context)
        {
            _context = context;
        }


        // GET: api/vehiclereceipt/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<VehicleReceipt>>> GetVehicleReceipts()
        {
          if (_context.VehicleReceipts == null)
          {
              return NotFound();
          }
            return await _context.VehicleReceipts.ToListAsync();
        }


        // GET: api/vehiclereceipt/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleReceipt>> GetVehicleReceipt(Guid id)
        {
          if (_context.VehicleReceipts == null)
          {
              return NotFound();
          }
            var vehicleReceipt = await _context.VehicleReceipts.FindAsync(id);

            if (vehicleReceipt == null)
            {
                return NotFound();
            }

            return vehicleReceipt;
        }


        // PUT: api/vehiclereceipt/[_id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleReceipt(Guid id, VehicleReceipt vehicleReceipt)
        {
            if (id != vehicleReceipt.VehicleReceiptId)
            {
                return BadRequest();
            }

            _context.Entry(vehicleReceipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleReceiptExists(id))
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


        // POST: api/vehiclereceipt
        [HttpPost]
        public async Task<ActionResult<VehicleReceipt>> PostVehicleReceipt(VehicleReceipt vehicleReceipt)
        {
          if (_context.VehicleReceipts == null)
          {
              return Problem("Entity set 'ProjectContext.VehicleReceipts'  is null.");
          }

            var paymentList = vehicleReceipt.VehiclePayments.ToList();
            vehicleReceipt.VehicleReceiptId = Guid.NewGuid();

            vehicleReceipt.VehiclePayments.Clear();
            _context.VehicleReceipts.Add(vehicleReceipt);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VehicleReceiptExists(vehicleReceipt.VehicleReceiptId))
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
                _context.VehiclePayments.Add(new VehiclePayment
                {
                    VehicleFeeId = payment.VehicleFeeId,
                    VehicleReceiptId = vehicleReceipt.VehicleReceiptId,
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

            return CreatedAtAction("GetVehicleReceipt", new { id = vehicleReceipt.VehicleReceiptId }, vehicleReceipt);
            ;
        }

        // DELETE: api/VehicleReceipts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleReceipt(Guid id)
        {
            if (_context.VehicleReceipts == null)
            {
                return NotFound();
            }
            var vehicleReceipt = await _context.VehicleReceipts.FindAsync(id);
            if (vehicleReceipt == null)
            {
                return NotFound();
            }

            _context.VehicleReceipts.Remove(vehicleReceipt);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleReceiptExists(Guid id)
        {
            return (_context.VehicleReceipts?.Any(e => e.VehicleReceiptId == id)).GetValueOrDefault();
        }
    }
}
