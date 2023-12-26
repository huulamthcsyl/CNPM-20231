using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.Models;

namespace Project.Controllers.ReceiptController
{
    [Route("api/vehiclereceipt")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class VehicleReceiptsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public VehicleReceiptsController(ProjectContext context)
        {
            _context = context;
        }


        // GET: api/vehiclereceipt/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetVehicleReceipts()
        {
            if (_context.VehicleReceipts == null)
            {
                return NotFound();
            }
            var vehicleReceipts = await _context.VehicleReceipts
                            .Include(r => r.Vehicle)
                            .ThenInclude(v => v.Person)
                            .ToListAsync();

            var listReceipt = new List<object>();

            foreach (var receipt in vehicleReceipts)
            {
                listReceipt.Add(new
                {
                    vehicleReceiptId = receipt.VehicleReceiptId,
                    dateCreated = receipt.DateCreated,
                    amount = receipt.Amount,
                    description = receipt.Description,
                    licensePlate = receipt.Vehicle.LicensePlate,
                    personName = receipt.Vehicle.Person.Name
                });
            }

            return listReceipt;
        }


        // GET: api/vehiclereceipt/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetVehicleReceipt(Guid id)
        {
            if (_context.VehicleReceipts == null)
            {
                return NotFound();
            }
            var vehicleReceipt = await _context.VehicleReceipts
                                        .Include(r => r.Vehicle)
                                        .ThenInclude(v => v.Person)
                                        .Include(r => r.VehiclePayments)
                                        .ThenInclude(vp => vp.VehicleFee)
                                        .FirstOrDefaultAsync(r => r.VehicleReceiptId == id);

            if (vehicleReceipt == null)
            {
                return NotFound();
            }

            var listPayment = new List<object>();

            foreach (var payment in vehicleReceipt.VehiclePayments)
            {
                listPayment.Add(new
                {
                    amount = payment.Amount,
                    feeName = payment.VehicleFee.Name,
                    feeId = payment.VehicleFeeId
                });
            };

            var receipt = new
            {
                vehicleReceiptId = vehicleReceipt.VehicleReceiptId,
                dateCreated = vehicleReceipt.DateCreated,
                amount = vehicleReceipt.Amount,
                description = vehicleReceipt.Description,
                licensePlate = vehicleReceipt.Vehicle.LicensePlate,
                vehicleId = vehicleReceipt.VehicleId,
                personName = vehicleReceipt.Vehicle.Person.Name,
                listPayment = listPayment
            };

            return receipt;
        }


        // GET: api/vehiclereceipt?licenseplate={}&name={}&starttime={}&endtime={}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetResidenceReceipts(string? licenseplate, string? name, DateTime? starttime, DateTime? endtime)
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }

            licenseplate = licenseplate ?? string.Empty;
            name = name ?? string.Empty;
            starttime = starttime ?? DateTime.MinValue;
            endtime = endtime ?? DateTime.MaxValue;

            var vehicleReceipts = await _context.VehicleReceipts
                                            .Include(r => r.Vehicle)
                                            .ThenInclude(v => v.Person)
                                            .Where(p => p.Vehicle.LicensePlate.Contains(licenseplate)
                                                    && p.Vehicle.Person.Name.Contains(name)
                                                    && starttime <= p.DateCreated
                                                    && p.DateCreated <= endtime)
                                            .ToListAsync();

            var listReceipt = new List<object>();

            foreach (var receipt in vehicleReceipts)
            {
                listReceipt.Add(new
                {
                    vehicleReceiptId = receipt.VehicleReceiptId,
                    dateCreated = receipt.DateCreated,
                    amount = receipt.Amount,
                    description = receipt.Description,
                    licensePlate = receipt.Vehicle.LicensePlate,
                    personName = receipt.Vehicle.Person.Name
                });
            }

            return listReceipt;
        }

        // GET: api/vehiclereceipt?licenseplate={}&name={}&starttime={}&endtime={}&id=
        [HttpGet("feeid")]
        public async Task<ActionResult<IEnumerable<object>>> GetResidenceReceipts(string? licenseplate, string? name,  DateTime? starttime, DateTime? endtime, Guid id)
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }

            licenseplate = licenseplate ?? string.Empty;
            name = name ?? string.Empty;
            starttime = starttime ?? DateTime.MinValue;
            endtime = endtime ?? DateTime.MaxValue;

            var vehicleReceipts = await _context.VehicleReceipts
                                            .Include(r => r.Vehicle)
                                            .ThenInclude(v => v.Person)
                                            .Include(v => v.VehiclePayments)
                                            .Where(p => p.VehiclePayments.Any(vp => vp.VehicleFeeId == id)
                                                    && p.Vehicle.LicensePlate.Contains(licenseplate)
                                                    && p.Vehicle.Person.Name.Contains(name)
                                                    && starttime <= p.DateCreated
                                                    && p.DateCreated <= endtime)
                                            .ToListAsync();

            var listReceipt = new List<object>();

            var check = 0;

            foreach (var receipt in vehicleReceipts)
            {
                if (check == 1) break;
                foreach (var payment in receipt.VehiclePayments)
                {
                    if (payment.VehicleFeeId == id)
                    {
                        listReceipt.Add(new
                        {
                            vehicleReceiptId = receipt.VehicleReceiptId,
                            dateCreated = receipt.DateCreated,
                            amount = payment.Amount,
                            description = receipt.Description,
                            licensePlate = receipt.Vehicle.LicensePlate,
                            personName = receipt.Vehicle.Person.Name
                        });
                        check = 1;
                        break;
                    }
                }
                
            }

            return listReceipt;
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
                                    .Any(newR => newR.VehicleFeeId != oldR.VehicleFeeId
                                                 || newR.Amount != oldR.Amount))
                                    .ToList();

            var addedPayments = newReceipt.VehiclePayments
                                    .Where(newR => currentReceipt.VehiclePayments
                                    .Any(oldR => oldR.VehicleFeeId != newR.VehicleFeeId
                                                 || oldR.Amount != newR.Amount))
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
