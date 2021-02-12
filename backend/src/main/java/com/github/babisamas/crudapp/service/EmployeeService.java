package com.github.babisamas.crudapp.service;

import com.github.babisamas.crudapp.dto.EmployeeDto;
import com.github.babisamas.crudapp.model.Employee;
import com.github.babisamas.crudapp.repository.EmployeesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeesRepository repository;
    ModelMapper modelMapper = new ModelMapper();

    EmployeeService(EmployeesRepository repository) {
        this.repository = repository;
    }

    public void add(EmployeeDto dto) {
        repository.save(modelMapper.map(dto, Employee.class));
    }

    public void delete(long id) {
        repository.deleteById(id);
    }

    public List<EmployeeDto> getEmployees() {
        return ((List<Employee>) repository
                .findAll())
                .stream()
                .map(this::convertToEmployeeDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto getEmployById(long id) {
        Optional<Employee> employee = repository.findById(id);
        return employee.map(value -> modelMapper.map(value, EmployeeDto.class)).orElse(null);
    }

    private EmployeeDto convertToEmployeeDto(Employee employee) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(employee, EmployeeDto.class);
    }
}
