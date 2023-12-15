using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Validations;
using Project.Models;
using Project.Models.Models;
using Project.Models.Services;

namespace Project.Controllers.ReceiptController
{
    [Route("api/residencereceipt")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class ResidenceReceiptsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidenceReceiptsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/residencereceipt/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<ResidenceReceiptInfo>>> GetResidenceReceipts()
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }
            var residenceReceipts = await _context.ResidenceReceipts
                                    .Include(r => r.Person)
                                    .ThenInclude(p => p.Residence)
                                    .Include(r => r.ResidencePayments)
                                    .ToListAsync();
            var receiptsInfor = new List<ResidenceReceiptInfo>();

            foreach (var receipt in residenceReceipts)
            {
                receiptsInfor.Add(new ResidenceReceiptInfo
                {
                    ResidenceReceiptId = receipt.ResidenceReceiptId,
                    PersonId = receipt.PersonId,
                    DateCreated = receipt.DateCreated,
                    Amount = receipt.Amount,
                    Description = receipt.Description,
                    ResidencePayments = receipt.ResidencePayments,
                    Name = receipt.Person.Name,
                    Address = receipt.Person.ResidenceId == null ? null : receipt.Person.Residence.Address
                });
            }

            return receiptsInfor;

        }


        // GET: api/residencereceipt/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<ResidenceReceiptInfo>> GetResidenceReceipt(Guid id)
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }

            var residenceReceipt = await _context.ResidenceReceipts
                                    .Include(r => r.Person)
                                    .ThenInclude(person => person.Residence)
                                    .Include(r => r.ResidencePayments)
                                    .FirstOrDefaultAsync(r => r.ResidenceReceiptId == id);

            if (residenceReceipt == null)
            {
                return NotFound();
            }

            var residenceReceiptInfor = new ResidenceReceiptInfo()
            {
                ResidenceReceiptId = residenceReceipt.ResidenceReceiptId,
                PersonId = residenceReceipt.PersonId,
                DateCreated = residenceReceipt.DateCreated,
                Amount = residenceReceipt.Amount,
                Description = residenceReceipt.Description,
                ResidencePayments = residenceReceipt.ResidencePayments,
                Name = residenceReceipt.Person.Name,
                Address = residenceReceipt.Person.Residence == null ? null : residenceReceipt.Person.Residence.Address
            };

            return residenceReceiptInfor;
        }

        // GET: api/residencereceipt?name={}&address={}&starttime={}&endtime={}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResidenceReceiptInfo>>> GetResidenceReceipts(string? name, string? address, DateTime? starttime, DateTime? endtime)
        {
            if (_context.ResidenceReceipts == null)
            {
                return NotFound();
            }

            name = name ?? string.Empty;
            address = address ?? string.Empty;
            starttime = starttime ?? DateTime.MinValue;
            endtime = endtime ?? DateTime.MaxValue;

            var residenceReceipts = await _context.ResidenceReceipts
                                        .Include (r => r.Person)
                                        .ThenInclude(p => p.Residence)
                                        .Include(r => r.ResidencePayments)
                                        .Where(p => p.Person.Name.Contains(name)
                                                    && p.Person.Residence.Address.Contains(address)
                                                    && starttime <= p.DateCreated
                                                    && p.DateCreated <= endtime)
                                        .ToListAsync();

            var receiptsInfor = new List<ResidenceReceiptInfo>();

            foreach (var receipt in residenceReceipts)
            {
                receiptsInfor.Add(new ResidenceReceiptInfo
                {
                    ResidenceReceiptId = receipt.ResidenceReceiptId,
                    PersonId = receipt.PersonId,
                    DateCreated = receipt.DateCreated,
                    Amount = receipt.Amount,
                    Description = receipt.Description,
                    ResidencePayments = receipt.ResidencePayments,
                    Name = receipt.Person.Name,
                    Address = receipt.Person.Residence == null ? null : receipt.Person.Residence.Address
                });
            }

            return receiptsInfor;
        }


        //PUT: api/residencereceipt/[:id]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidenceReceipt(Guid id, ResidenceReceipt newReceipt)
        {
            if (id != newReceipt.ResidenceReceiptId)
            {
                return BadRequest();
            }

            var currentReceipt = await _context.ResidenceReceipts.Include(r => r.ResidencePayments)
                                                                .FirstOrDefaultAsync(r => r.ResidenceReceiptId == id);

            // Update new receipt's attributes
            currentReceipt.PersonId = newReceipt.PersonId;
            currentReceipt.Amount = newReceipt.Amount;
            currentReceipt.DateCreated = newReceipt.DateCreated;
            currentReceipt.Description = newReceipt.Description;

            // Get removed | added payments
            var removedPayments = currentReceipt.ResidencePayments
                                    .Where(oldR => !newReceipt.ResidencePayments
                                    .Any(newR => newR.ResidenceFeeId == oldR.ResidenceFeeId
                                                 && newR.Amount == oldR.Amount))
                                    .ToList();

            var addedPayments = newReceipt.ResidencePayments
                                    .Where(newR => !currentReceipt.ResidencePayments
                                    .Any(oldR => oldR.ResidenceFeeId == newR.ResidenceFeeId
                                                 && oldR.Amount == newR.Amount))
                                    .ToList();

            // Remove | Add payments in context
            _context.ResidencePayments.RemoveRange(removedPayments);
            _context.ResidencePayments.AddRange(addedPayments);

            // Save Db_context
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
