package com.globitel.warehouse_management_system.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.globitel.warehouse_management_system.model.dto.ItemsDTO;
import com.globitel.warehouse_management_system.model.entity.Items;
import com.globitel.warehouse_management_system.model.entity.Warehouses;
import com.globitel.warehouse_management_system.repository.ItemsRepository;

@Service
public class ItemsService {

	@Autowired
	ItemsRepository itemsRepository;

	@Autowired
	WarehouseService warehouseService;

	public List<Items> getAllItems() {
		return itemsRepository.findAll();
	}

	public Items getItemById(long id) {
		Optional<Items> item = itemsRepository.findById(id);
		return item.orElse(null);
	}

	public Items createItem(ItemsDTO itemsDTO) throws IllegalArgumentException {
		Items items = new Items();
		items.setName(itemsDTO.getName());
		items.setDescription(itemsDTO.getDescription());
		items.setQuantity(itemsDTO.getQuantity());

		items.setCreatedAt(new Date());

		Long warehouseId = itemsDTO.getWarehouseId(); // Long.valueOf(payload.get("warehouseId").toString());
		Warehouses warehouses = warehouseService.getWarehouseById(warehouseId);

		if (warehouses != null) {
			items.setWarehouse(warehouses);
			return itemsRepository.save(items);
		} else {
			throw new IllegalArgumentException("Warehouse with id " + warehouseId + " was not found");
		}
	}

	public Items updateItem(long id, ItemsDTO itemsDto) {
		Optional<Items> existingItemOptional = itemsRepository.findById(id);

		if (existingItemOptional.isPresent()) {
			Items existingItem = existingItemOptional.get();

			existingItem.setName(itemsDto.getName());

			existingItem.setDescription(itemsDto.getDescription());

			existingItem.setQuantity(itemsDto.getQuantity());

			existingItem.setUpdatedAt(new Date());

			return itemsRepository.save(existingItem);
		} else {
			return null;
		}
	}

	public void deleteItem(long id) {
		itemsRepository.deleteById(id);
	}

}
