using ShippingSystem.DTOs.VillageCost;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShippingSystem.Services
{
    public class VillageCostService
    {
        private readonly IGenericRepository<VillageCost> _repository;
        private readonly ShippingContext _context; // Replace ApplicationDbContext with your actual DbContext class name

        public VillageCostService(IGenericRepository<VillageCost> repository, ShippingContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<VillageCost>> GetAllVillageCosts()
        {
            return await _repository.GetAll();
        }

        public async Task<VillageCost> GetVillageCostById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<VillageCost> AddVillageCost(VillageCostDTO villageCostDto)
        {
            // Check if a VillageCost record already exists
            var existingVillageCost = _context.VillageCosts.FirstOrDefault();

            if (existingVillageCost != null)
            {
                // If a record exists, prevent insertion of another record
                throw new InvalidOperationException("You cannot add another VillageCost record. Update the existing record instead.");
            }

            // Create new VillageCost record
            var newVillageCost = new VillageCost
            {
                Price = villageCostDto.Price
            };

            await _repository.Add(newVillageCost);
            await _repository.Save();

            return newVillageCost;
        }

        public async Task<VillageCost> UpdateVillageCost(int id, VillageCostDTO villageCostDto)
        {
            var villageCost = await _repository.GetById(id);

            if (villageCost == null)
            {
                throw new KeyNotFoundException($"VillageCost with Id {id} not found");
            }

            villageCost.Price = villageCostDto.Price;

            _repository.Update(villageCost);
            await _repository.Save();

            return villageCost;
        }

        public async Task DeleteVillageCost(int id)
        {
            var villageCost = await _repository.GetById(id);

            if (villageCost == null)
            {
                throw new KeyNotFoundException($"VillageCost with Id {id} not found");
            }

            _repository.Delete(villageCost);
            await _repository.Save();
        }
    }
}
