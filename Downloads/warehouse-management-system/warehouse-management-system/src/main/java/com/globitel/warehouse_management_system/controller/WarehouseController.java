package com.globitel.warehouse_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.globitel.warehouse_management_system.model.dto.WarehouseResponseDTO;
import com.globitel.warehouse_management_system.model.dto.WarehousesDTO;
import com.globitel.warehouse_management_system.model.entity.Warehouses;
import com.globitel.warehouse_management_system.service.WarehouseService;

@RestController
@RequestMapping("warehouse")
public class WarehouseController {

	@Autowired
	private WarehouseService warehouseService;

	@GetMapping("/all") // pass
	public ResponseEntity<List<Warehouses>> getAllWarehouses() {
		List<Warehouses> warehouses = warehouseService.getAllWarehouses();
		return ResponseEntity.ok(warehouses);
	}

	@GetMapping("/all-warehouses") // pass
	public ResponseEntity<List<WarehouseResponseDTO>> AllWarehouses() {
		List<WarehouseResponseDTO> warehouses = warehouseService.AllWarehouses();
		return ResponseEntity.ok(warehouses);
	}

	@GetMapping("/find/{id}") // pass
	public ResponseEntity<Warehouses> getWarehouseById(@Validated @PathVariable Long id) {
		Warehouses warehouses = warehouseService.getWarehouseById(id);
		return warehouses != null ? ResponseEntity.ok(warehouses) : ResponseEntity.notFound().build();
	}

	@PostMapping("/create") // pass
	public ResponseEntity<Warehouses> createWarehouse(@RequestBody WarehousesDTO warehousesDTO) {
		Warehouses createdWarehouse = warehouseService.createWarehouse(warehousesDTO);
		return ResponseEntity.ok(createdWarehouse);
	}

	@PostMapping("/update/{id}") // pass
	public ResponseEntity<Warehouses> updateWarehouse(@PathVariable Long id, @RequestBody WarehousesDTO warehousesDTO) {
		Warehouses updatedWarehouses = warehouseService.updateWarehouse(id, warehousesDTO);
		return updatedWarehouses != null ? ResponseEntity.ok(updatedWarehouses) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/delete/{id}") // pass
	public ResponseEntity<Void> deleteWarehouse(@PathVariable Long id) {
		warehouseService.deleteWarehouse(id);
		return ResponseEntity.noContent().build();
	}
}
