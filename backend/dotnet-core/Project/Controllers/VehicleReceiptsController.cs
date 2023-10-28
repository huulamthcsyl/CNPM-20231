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
        public async Task<ActionResult<IEnumerable<VehicleReceiptInfor>>> GetVehicleReceipts()
        {
          if (_context.VehicleReceipts == null)
          {
              return NotFound();
          }
            var vehicleReceipts = await _context.VehicleReceipts.ToListAsync();
            var receiptsInfor = new List<VehicleReceiptInfor>();

            foreach (var receipt in vehicleReceipts)
            {
                receiptsInfor.Add(new VehicleReceiptInfor 
                {
                    VehicleReceiptId = receipt.VehicleReceiptId,
                    VehicleId = receipt.VehicleId,
                    DateCreated = receipt.DateCreated,
                    Amount = receipt.Amount,    
                    Description = receipt.Description,
                    VehiclePayments = receipt.VehiclePayments,
                    LicensePlate = receipt.Vehicle.LicensePlate,
                    OwnerName = receipt.Vehicle.Person.Name
                });
            }

            return receiptsInfor;
        }


        // GET: api/vehiclereceipt/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleReceiptInfor>> GetVehicleReceipt(Guid id)
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

            var vehicleReceiptInfor = new VehicleReceiptInfor()
            {
                VehicleReceiptId = vehicleReceipt.VehicleReceiptId,
                VehicleId = vehicleReceipt.VehicleId,
                DateCreated = vehicleReceipt.DateCreated,
                Amount = vehicleReceipt.Amount,
                Description = vehicleReceipt.Description,
                VehiclePayments = vehicleReceipt.VehiclePayments,
                LicensePlate = vehicleReceipt.Vehicle.LicensePlate,
                OwnerName = vehicleReceipt.Vehicle.Person.Name
            };

            return vehicleReceiptInfor;
        }


        // GET: api/vehiclereceipt?licenseplate={}&address={}&starttime={}&endtime={}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleReceiptInfor>>> GetResidenceReceipts(string? licenseplate, DateTime? starttime, DateTime? endtime)
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }

            licenseplate = licenseplate ?? string.Empty;
            starttime = starttime ?? DateTime.MinValue;
            endtime = endtime ?? DateTime.MaxValue;

            var vehicleReceipts = await _context.VehicleReceipts
                                        .Where(p => (p.Vehicle.LicensePlate.Contains(licenseplate)
                                                    && starttime <= p.DateCreated 
                                                    && p.DateCreated <= endtime))
                                        .ToListAsync();

            var receiptsInfor = new List<VehicleReceiptInfor>();

            foreach (var receipt in vehicleReceipts)
            {
                receiptsInfor.Add(new VehicleReceiptInfor
                {
                    VehicleReceiptId = receipt.VehicleReceiptId,
                    VehicleId = receipt.VehicleId,
                    DateCreated = receipt.DateCreated,
                    Amount = receipt.Amount,
                    Description = receipt.Description,
                    VehiclePayments = receipt.VehiclePayments,
                    LicensePlate = receipt.Vehicle.LicensePlate,
                    OwnerName = receipt.Vehicle.Person.Name
                });
            }

            return receiptsInfor;
        }


        // PUT: api/vehiclereceipt/[_id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleReceipt(Guid id, VehicleReceipt newReceipt)
        {
            if (id != newReceipt.VehicleReceiptId)
            {
                return BadRequest();
            }


            var currentReceipt = await _context.VehicleReceipts.FindAsync(id);

            // Update new receipt's attributes
            currentReceipt.VehicleReceiptId = newReceipt.VehicleReceiptId;
            currentReceipt.Amount = newReceipt.Amount;
            currentReceipt.DateCreated = newReceipt.DateCreated;
            currentReceipt.Description = newReceipt.Description;

            // Get removed | added payments
            var removedPayments = currentReceipt.VehiclePayments
                                    .Where(oldR => newReceipt.VehiclePayments
                                    .Any(newR => (newR.VehicleFeeId != oldR.VehicleFeeId
                                                 || newR.Amount != oldR.Amount)))
                                    .ToList();

            var addedPayments = newReceipt.VehiclePayments
                                    .Where(newR => currentReceipt.VehiclePayments
                                    .Any(oldR => (oldR.VehicleFeeId != newR.VehicleFeeId
                                                 || oldR.Amount != newR.Amount)))
                                    .ToList();

            // Remove | Add payments in context
            _context.VehiclePayments.RemoveRange(removedPayments);
            _context.VehiclePayments.AddRange(addedPayments);

            // Save Db_context
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
