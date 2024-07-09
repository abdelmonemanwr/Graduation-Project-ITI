using ShippingSystem.DTOs.WeightOption;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShippingSystem.Services
{
    public class WeightOptionService
    {
        private readonly IGenericRepository<WeightOption> _repository;
        private readonly ShippingContext _context; // Replace ShippingContext with your actual DbContext class name

        public WeightOptionService(IGenericRepository<WeightOption> repository, ShippingContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<WeightOption>> GetAllWeightOptions()
        {
            return await _repository.GetAll();
        }

        public async Task<WeightOption> GetWeightOptionById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<WeightOption> AddOrUpdateWeightOption(WeightOptionDTO weightOptionDto)
        {
            // Check if a WeightOption record already exists
            var existingWeightOption = _context.WeightOptions.FirstOrDefault();

            if (existingWeightOption != null)
            {
                // If a record exists, prevent insertion of another record
                throw new InvalidOperationException("You cannot add another WeightOption record. Update the existing record instead.");
            }

            // Create new WeightOption record
            var newWeightOption = new WeightOption
            {
                AdditionalKgPrice = weightOptionDto.AdditionalKgPrice,
                MaximumWeight = weightOptionDto.MaximumWeight
            };

            await _repository.Add(newWeightOption);
            await _repository.Save();

            return newWeightOption;
        }

        public async Task<WeightOption> UpdateWeightOption(int id, WeightOptionDTO weightOptionDto)
        {
            var weightOption = await _repository.GetById(id);

            if (weightOption == null)
            {
                throw new KeyNotFoundException($"WeightOption with Id {id} not found");
            }

            weightOption.AdditionalKgPrice = weightOptionDto.AdditionalKgPrice;
            weightOption.MaximumWeight = weightOptionDto.MaximumWeight;

            _repository.Update(weightOption);
            await _repository.Save();

            return weightOption;
        }

        public async Task DeleteWeightOption(int id)
        {
            var weightOption = await _repository.GetById(id);

            if (weightOption == null)
            {
                throw new KeyNotFoundException($"WeightOption with Id {id} not found");
            }

            _repository.Delete(weightOption);
            await _repository.Save();
        }
    }
}
