package com.github.babisamas.crudapp.repository;

import com.github.babisamas.crudapp.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeesRepository extends CrudRepository<Employee, Long> {
}
