using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ShippingSystem.DTOs;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using ShippingSystem.UnitOfWorks;

public class EmployeeService
{
  
    private readonly IUnitOfWork unit;
    private readonly IMapper mapper;
    private readonly UserManager<ApplicationUser> userManager;

    public EmployeeService(IUnitOfWork _unit,IMapper _mapper,UserManager<ApplicationUser> _userManager)
    {
        unit = _unit;
        mapper = _mapper;
        userManager = _userManager;
    }

    public async Task<List<EmployeeDTO>> GetAllEmployees()
    {
        var employees = await unit.EmployeeRepository.GetActiveEmployee();
        return mapper.Map<List<EmployeeDTO>>(employees);
    }

    public async Task<EmployeeDTO> GetEmployeeById(string id)
    {
        var employee = await unit.EmployeeRepository.GetById(id);

        if(employee == null) 
        {
            return null;
        }

        return mapper.Map<EmployeeDTO>(employee);
    }

    public async Task<IdentityResult> AddEmployee(EmployeeDTO employeeDto)
    {
        var employee = mapper.Map<Employee>(employeeDto);

        //await userManager.UserValidators
        var result = await userManager.CreateAsync(employee, employeeDto.Password); // Replace with appropriate password handling
        if (!result.Succeeded)
        {
            return result;
        }

        // Assign roles to the new employee

        if (employeeDto.Roles != null) 
        {
            var rolesResult = await userManager.AddToRolesAsync(employee, employeeDto.Roles);
            if (!rolesResult.Succeeded)
            {
                throw new Exception($"Failed to assign roles to user '{employee.FullName}'.");
            }

        }

        return result; 

        // No need to await AssertConfigurationIsValid because it returns void
        //mapper.ConfigurationProvider.AssertConfigurationIsValid();
    }

    public async Task<IdentityResult> UpdateEmployee(string id ,EmployeeDTO employeeDto)
    {
        var employee = await unit.EmployeeRepository.GetById(id);

        var current_roles = await userManager.GetRolesAsync(employee);


        if (employeeDto.Roles != null)
        {
            await userManager.RemoveFromRolesAsync(employee, current_roles);
            var rolesResult = await userManager.AddToRolesAsync(employee, employeeDto.Roles);
            if (!rolesResult.Succeeded)
            {
                throw new Exception($"Failed to assign roles to user '{employee.FullName}'.");
            }

        }
        employee.FullName = employeeDto.FullName;
        //employee.UserName = employeeDto.UserName;
        employee.Email = employeeDto.Email;
        employee.PhoneNumber = employeeDto.Phone;
        if(employee.Branch != null  )
        {
            employee.Branch.Id = employeeDto.BranchId ?? employee.Branch.Id;
            //employee.Branch.Name = employeeDto.BranchName ?? employee.Branch.Name;
        }
        else if (employee.Branch == null && employeeDto.BranchId.HasValue)
        {
            employee.Branch = new Branch { Id = employeeDto.BranchId.Value };
            //employee.Branch.Name = employeeDto.BranchName ?? employee.Branch.Name;
        }
        employee.Status = employeeDto.Status;


        var result = await userManager.UpdateAsync(employee);

        //await unit.EmployeeRepository.Update(employee);
        //await unit.Save();
        if (!string.IsNullOrEmpty(employeeDto.Password))
        {
            var token = await userManager.GeneratePasswordResetTokenAsync(employee);
            var passwordResult = await userManager.ResetPasswordAsync(employee, token, employeeDto.Password);
            if (!passwordResult.Succeeded)
            {
                throw new Exception($"Failed to update password for user '{employeeDto.FullName}'.");
            }
        }
        return result;
    }

    public async Task<bool> DeleteEmployee(string id)
    {
        var employee = await unit.EmployeeRepository.GetById(id);

        if(employee == null)
        {
            return false;
        }

       var result =  await unit.EmployeeRepository.DisableEmployee(id);

        if (result == false)
            return false;
        try
        {
            await unit.EmployeeRepository.Save();

            return true;
        }

        catch (Exception ex) 
        {
            return false;
        }
      
    }

   public async Task<EmployeeDTO> GetEmployeeByName(string name)
    {
        var employee = await unit.EmployeeRepository.GetEmployeeByName(name);

        if (employee == null)
        {
            return null;
        }

        return mapper.Map<EmployeeDTO>(employee);
    }

    public async Task<EmployeeDTO> GetEmployeeByEmail(string email)
    {
        var employee = await unit.EmployeeRepository.GetEmployeeByEmail(email);

        if (employee == null)
        {
            return null;
        }

        return mapper.Map<EmployeeDTO>(employee);
    }
}
