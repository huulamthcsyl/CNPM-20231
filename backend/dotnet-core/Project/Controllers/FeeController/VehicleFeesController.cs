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
using Project.Models.Services;

namespace Project.Controllers.FeeController
{
    [Route("api/vehiclefee")]
    [ApiController]
    [Authorize(Roles = "user")]
    public class VehicleFeesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public VehicleFeesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/vehiclefee/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<VehicleFeeInfo>>> GetVehicleFees()
        {
            if (_context.VehicleFees == null)
            {
                return NotFound();
            }
            var vehicleFees = await _context.VehicleFees
                               .Include(v => v.VehiclePayments)
                               .ToListAsync();
            var vehicleFeesInfo = new List<VehicleFeeInfo>();

            foreach (var vehicleFee in vehicleFees)
            {
                vehicleFeesInfo.Add(new VehicleFeeInfo
                {
                    VehicleFeeId = vehicleFee.VehicleFeeId,
                    Name = vehicleFee.Name,
                    Cost = vehicleFee.Cost,
                    PaidQuantity = vehicleFee.VehiclePayments.Count(),
                    Total = vehicleFee.VehiclePayments.Sum(p => p.Amount)
                });
            }

            return vehicleFeesInfo;
        }


        // GET: api/vehiclefee/[:id]
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleFeeInfo>> GetVehicleFee(Guid id)
        {
            if (_context.VehicleFees == null)
            {
                return NotFound();
            }
            var vehicleFee = await _context.VehicleFees 
                                .Include(v => v.VehiclePayments)
                                .FirstOrDefaultAsync(v => v.VehicleFeeId == id);

            if (vehicleFee == null)
            {
                return NotFound();
            }

       
            var vehicleFeeInfo = new VehicleFeeInfo
            {
                VehicleFeeId = vehicleFee.VehicleFeeId,
                Name = vehicleFee.Name,
                Cost = vehicleFee.Cost,
                PaidQuantity = vehicleFee.VehiclePayments.Count(),
                Total = vehicleFee.VehiclePayments.Sum(p => p.Amount),
            };

            return vehicleFeeInfo;
        }


        // GET: api/vehiclefee?name=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleFeeInfo>>> GetVehicleFee(string? name)
        {
            if (_context.VehicleFees == null)
            {
                return NotFound();
            }

            name = name ?? string.Empty;

            var vehicleFees = await _context.VehicleFees
                    .Include(v => v.VehiclePayments)
                    .Where(p => p.Name.Contains(name)).ToListAsync();

            var vehicleFeesInfo = new List<VehicleFeeInfo>();

            foreach (var vehicleFee in vehicleFees)
            {
                vehicleFeesInfo.Add(new VehicleFeeInfo
                {
                    VehicleFeeId = vehicleFee.VehicleFeeId,
                    Name = vehicleFee.Name,
                    Cost = vehicleFee.Cost,
                    PaidQuantity = vehicleFee.VehiclePayments.Count(),
                    Total = vehicleFee.VehiclePayments.Sum(p => p.Amount)
                });
            }

            return vehicleFeesInfo;
        }


        // PUT: api/vehiclefee/[:id]
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutVehicleFee(Guid id, VehicleFee vehicleFee)
        //{
        //    if (id != vehicleFee.VehicleFeeId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(vehicleFee).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!VehicleFeeExists(id))
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


        // POST: api/vehiclefee
        [HttpPost]
        public async Task<ActionResult<VehicleFee>> PostVehicleFee(VehicleFee vehicleFee)
        {
            if (_context.VehicleFees == null)
            {
                return Problem("Entity set 'ProjectContext.VehicleFees'  is null.");
            }
            var fee = await _context.VehicleFees.FirstOrDefaultAsync(f => f.Name == vehicleFee.Name);
            if (fee != null)
            {
                return StatusCode(400, "Khoản thu đã tồn tại");
            }

            vehicleFee.VehicleFeeId = Guid.NewGuid();

            _context.VehicleFees.Add(vehicleFee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VehicleFeeExists(vehicleFee.VehicleFeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVehicleFee", new { id = vehicleFee.VehicleFeeId }, vehicleFee);
        }


        // DELETE: api/vehiclefee/[:id]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleFee(Guid id)
        {
            if (_context.VehicleFees == null)
            {
                return NotFound();
            }
            var vehicleFee = await _context.VehicleFees.FindAsync(id);
            if (vehicleFee == null)
            {
                return NotFound();
            }

            _context.VehicleFees.Remove(vehicleFee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleFeeExists(Guid id)
        {
            return (_context.VehicleFees?.Any(e => e.VehicleFeeId == id)).GetValueOrDefault();
        }
    }
}
