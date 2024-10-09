package com.globitel.warehouse_management_system.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.globitel.warehouse_management_system.model.dto.WarehouseResponseDTO;
import com.globitel.warehouse_management_system.model.dto.WarehousesDTO;
import com.globitel.warehouse_management_system.model.entity.User;
import com.globitel.warehouse_management_system.model.entity.Warehouses;
import com.globitel.warehouse_management_system.repository.WarehousesRepository;

@Service
public class WarehouseService {

	@Autowired
	private WarehousesRepository warehousesRepository;

	@Autowired
	private UserService userService;

	public List<Warehouses> getAllWarehouses() {
		return warehousesRepository.findAll();
	}

	public List<WarehouseResponseDTO> AllWarehouses() {
		List<Warehouses> warehouses = warehousesRepository.findAll();
		return warehouses.stream().map(warehouse -> {
			WarehouseResponseDTO responseDTO = new WarehouseResponseDTO();
			responseDTO.setId(warehouse.getId());
			responseDTO.setName(warehouse.getName());
			responseDTO.setDescription(warehouse.getDescription());
			responseDTO.setCreatedAt(warehouse.getCreatedAt());
			responseDTO.setCreatedBy(warehouse.getUser() != null ? warehouse.getUser().getUsername() : null);
			return responseDTO;
		}).collect(Collectors.toList());
	}

	public Warehouses getWarehouseById(long id) {
		return warehousesRepository.findById(id).orElse(null);
	}

	public Warehouses createWarehouse(WarehousesDTO warehousesDTO) throws IllegalArgumentException {
		Warehouses warehouses = new Warehouses();
		warehouses.setName(warehousesDTO.getName());
		warehouses.setDescription(warehousesDTO.getDescription());

		warehouses.setCreatedAt(new Date());

		Long userId = warehousesDTO.getUserId();
		User user = userService.getUserById(userId);

		if (user != null) {
			warehouses.setUser(user);
			return warehousesRepository.save(warehouses);
		} else {
			throw new IllegalArgumentException("User with id " + userId + " was not found");
		}
	}

	public Warehouses updateWarehouse(long id, WarehousesDTO warehousesDTO) {
		Optional<Warehouses> existingWarehouseOptional = warehousesRepository.findById(id);

		if (existingWarehouseOptional.isPresent()) {
			Warehouses existingWarehouse = existingWarehouseOptional.get();
			existingWarehouse.setName(warehousesDTO.getName());
			existingWarehouse.setDescription(warehousesDTO.getDescription());
			existingWarehouse.setUpdatedAt(new Date());

			return warehousesRepository.save(existingWarehouse);
		} else {
			return null;
		}
	}

	public void deleteWarehouse(long id) {
		warehousesRepository.deleteById(id);
	}
}
