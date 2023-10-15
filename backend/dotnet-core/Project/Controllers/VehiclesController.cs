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
    public class VehiclesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public VehiclesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/Vehicles
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            if (_context.Vehicles == null)
            {
                return NotFound();
            }
            return await _context.Vehicles.ToListAsync();
        }

        // GET: api/Vehicles/5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicle(string LicensePlate)
        {
          if (_context.Vehicles == null)
          {
              return NotFound();
          }
            var vehicles = await _context.Vehicles.ToListAsync();

            if (vehicles == null)
            {
                return NotFound();
            }

            var listVehicle = vehicles
                .Where(p =>  p.LicensePlate == LicensePlate) 
                .ToList();

            return listVehicle;
        }

        // PUT: api/Vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(Guid id, Vehicle vehicle)
        {
            if (id != vehicle.VehicleId)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // POST: api/Vehicles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
          if (_context.Vehicles == null)
          {
              return Problem("Entity set 'ProjectContext.Vehicles'  is null.");
          }
          vehicle.VehicleId = Guid.NewGuid();
            _context.Vehicles.Add(vehicle);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VehicleExists(vehicle.VehicleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVehicle", new { id = vehicle.VehicleId }, vehicle);
        }

        // DELETE: api/Vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {
            if (_context.Vehicles == null)
            {
                return NotFound();
            }
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleExists(Guid id)
        {
            return (_context.Vehicles?.Any(e => e.VehicleId == id)).GetValueOrDefault();
        }
    }
}
