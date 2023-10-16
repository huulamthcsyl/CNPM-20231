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
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleFeesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public VehicleFeesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/VehicleFees
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<VehicleFeeInfor>>> GetVehicleFees()
        {
          if (_context.VehicleFees == null)
          {
              return NotFound();
          }
            var vehicleFees = await _context.VehicleFees.ToListAsync();
            var vehiclePayments = await _context.VehiclePayments.ToListAsync();
            var vehicleFeesInfor = new List<VehicleFeeInfor>();

            foreach (var vehicleFee in vehicleFees)
            {
                vehicleFeesInfor.Add(new VehicleFeeInfor
                {
                    VehicleFeeId = vehicleFee.VehicleFeeId,
                    Name = vehicleFee.Name,
                    Cost = vehicleFee.Cost,
                    Quantity = vehiclePayments.Count(),
                    Sum = vehiclePayments.Select(p => p.Amount).Sum()
                });
            }

            return vehicleFeesInfor;
        }

        // GET: api/VehicleFees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleFee>> GetVehicleFee(Guid id)
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

            return vehicleFee;
        }

        // GET: api/VehicleFees?name=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleFeeInfor>>> GetVehicleFee(string name)
        {
            if (_context.VehicleFees == null)
            {
                return NotFound();
            }
            var vehicleFees = await _context.VehicleFees.Where(p => (p.Name == name)).ToListAsync();
            var vehiclePayments = await _context.VehiclePayments.ToListAsync();
            var vehicleFeesInfor = new List<VehicleFeeInfor>();

            foreach (var vehicleFee in vehicleFees )
            {
                vehicleFeesInfor.Add(new VehicleFeeInfor 
                {
                    VehicleFeeId = vehicleFee.VehicleFeeId,
                    Name = vehicleFee.Name,
                    Cost = vehicleFee.Cost,
                    Quantity = vehiclePayments.Where(p => (p.VehicleFeeId == vehicleFee.VehicleFeeId)).Count(),
                    Sum = vehiclePayments.Where(p => (p.VehicleFeeId == vehicleFee.VehicleFeeId)).Select(p => p.Amount).Sum()
                });
            }

            return vehicleFeesInfor;
        }

        // PUT: api/VehicleFees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleFee(Guid id, VehicleFee vehicleFee)
        {
            if (id != vehicleFee.VehicleFeeId)
            {
                return BadRequest();
            }

            _context.Entry(vehicleFee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleFeeExists(id))
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

        // POST: api/VehicleFees
        [HttpPost]
        public async Task<ActionResult<VehicleFee>> PostVehicleFee(VehicleFee vehicleFee)
        {
          if (_context.VehicleFees == null)
          {
              return Problem("Entity set 'ProjectContext.VehicleFees'  is null.");
          }
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

        // DELETE: api/VehicleFees/5
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
