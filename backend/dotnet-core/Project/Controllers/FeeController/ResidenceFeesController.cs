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

namespace Project.Controllers.FeeController
{
    [Route("api/residencefee")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class ResidenceFeesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ResidenceFeesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/residencefee/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetResidenceFees()
        {
            if (_context.ResidenceFees == null)
            {
                return NotFound();
            }

            var fees = await _context.ResidenceFees
                        .Include(r => r.ResidencePayments)
                        .ToListAsync();
            var feesInfo = new List<object>();

            foreach (var fee in fees)
            {
                feesInfo.Add(new
                {
                    ResidenceFeeId = fee.ResidenceFeeId,
                    Name = fee.Name,
                    IsObligatory = fee.IsObligatory,
                    Cost = fee.Cost,
                    PaidQuantity = fee.ResidencePayments.Count(),
                    Total = fee.ResidencePayments.Sum(p => p.Amount),
                });
            }
            return feesInfo;
        }


        // GET: api/residencefee?name=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetResidenceFee(string? name)
        {
            if (_context.ResidenceFees == null)
            {
                return NotFound();
            }

            name = name ?? string.Empty;

            var fees = await _context.ResidenceFees
                    .Include (r => r.ResidencePayments)
                    .Where(p => p.Name.Contains(name)).ToListAsync();
            var feesInfo = new List<object>();

            foreach (var fee in fees)
            {
                feesInfo.Add(new
                {
                    ResidenceFeeId = fee.ResidenceFeeId,
                    Name = fee.Name,
                    IsObligatory = fee.IsObligatory,
                    Cost = fee.Cost,
                    PaidQuantity = fee.ResidencePayments.Count(),
                    Total = fee.ResidencePayments.Sum(p => p.Amount),
                });
            }
            return feesInfo;
        }

        // GET: api/residencefee/{:id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetResidenceFee(Guid id)
        {
            if (_context.ResidenceFees == null)
            {
                return NotFound();
            }

            var residenceFee = await _context.ResidenceFees
                                .Include(fee => fee.ResidencePayments) 
                                .ThenInclude(payment => payment.ResidenceReceipt)
                                .FirstOrDefaultAsync(rFee => rFee.ResidenceFeeId == id);

            if (residenceFee == null)
            {
                return NotFound();
            }

            var residenceFeeInfo = new  
            {
                ResidenceFeeId = residenceFee.ResidenceFeeId,
                Name = residenceFee.Name,
                IsObligatory = residenceFee.IsObligatory,
                Cost = residenceFee.Cost,
                PaidQuantity = residenceFee.ResidencePayments.Count(),
                Total = residenceFee.ResidencePayments.Sum(p => p.Amount),
            };

            return residenceFeeInfo;
        }


        // PUT: api/residencefee/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutResidenceFee(Guid id, ResidenceFee residenceFee)
        //{
        //    if (id != residenceFee.ResidenceFeeId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(residenceFee).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ResidenceFeeExists(id))
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


        // POST: api/residencefee
        [HttpPost]
        public async Task<ActionResult<ResidenceFee>> PostResidenceFee(ResidenceFee residenceFee)
        {
            if (_context.ResidenceFees == null)
            {
                return Problem("Entity set 'ProjectContext.ResidenceFees'  is null.");
            }
            var fee = await _context.ResidenceFees.FirstOrDefaultAsync(f => f.Name == residenceFee.Name);
            if (fee != null)
            {
                return StatusCode(400, "Khoản thu đã tồn tại");
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
