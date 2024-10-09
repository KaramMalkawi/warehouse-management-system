package com.globitel.warehouse_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globitel.warehouse_management_system.model.entity.Warehouses;

@Repository
public interface WarehousesRepository extends JpaRepository<Warehouses, Long> {

}
