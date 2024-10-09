package com.globitel.warehouse_management_system.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globitel.warehouse_management_system.model.dto.SupplyDocumentDTO;
import com.globitel.warehouse_management_system.model.dto.SupplyDocumentResponseDTO;
import com.globitel.warehouse_management_system.model.entity.Items;
import com.globitel.warehouse_management_system.model.entity.SupplyDocument;
import com.globitel.warehouse_management_system.model.entity.User;
import com.globitel.warehouse_management_system.model.entity.Warehouses;
import com.globitel.warehouse_management_system.repository.SupplyDocumentRepository;

@Service
public class SupplyDocumentService {

	@Autowired
	private SupplyDocumentRepository supplyDocumentRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private ItemsService itemsService;

	@Autowired
	private WarehouseService warehouseService;

	public List<SupplyDocument> getAllSupplyDocuments() {
		return supplyDocumentRepository.findAll();
	}

	public List<SupplyDocumentResponseDTO> AllSupplyDocument() {
		List<SupplyDocument> supplyDocuments = supplyDocumentRepository.findAll();

		return supplyDocuments.stream().map(supplyDocument -> {
			SupplyDocumentResponseDTO supplyDocumentResponseDTO = new SupplyDocumentResponseDTO();

			supplyDocumentResponseDTO.setId(supplyDocument.getId());
			supplyDocumentResponseDTO.setName(supplyDocument.getName());
			supplyDocumentResponseDTO.setSubject(supplyDocument.getSubject());
			supplyDocumentResponseDTO.setStatus(supplyDocument.getStatus());
			supplyDocumentResponseDTO.setCreatedAt(supplyDocument.getCreatedAt());
			supplyDocumentResponseDTO
					.setCreatedBy(supplyDocument.getUser() != null ? supplyDocument.getUser().getUsername() : null);
			return supplyDocumentResponseDTO;

		}).collect(Collectors.toList());
	}

	public List<SupplyDocumentDTO> getAllSupplyDocumentsWithUserDetails() {
		return supplyDocumentRepository.findAllSupplyDocumentsWithUserDetails();
	}

	public SupplyDocument getSupplyDocumentById(Long id) {
		return supplyDocumentRepository.findById(id).orElse(null);
	}

	public SupplyDocument createSupplyDocuments(SupplyDocumentDTO supplyDocumentDTO) throws IllegalArgumentException {
		SupplyDocument supplyDocument = new SupplyDocument();

		// Set simple fields
		supplyDocument.setName(supplyDocumentDTO.getName());
		supplyDocument.setSubject(supplyDocumentDTO.getSubject());
		supplyDocument.setStatus(supplyDocumentDTO.getStatus());
		supplyDocument.setCreatedAt(new Date());

		// Fetch related entities
		Long userId = supplyDocumentDTO.getUserId();
		Long itemsId = supplyDocumentDTO.getItemId();
		Long warehouseId = supplyDocumentDTO.getWarehouseId();

		User user = userService.getUserById(userId);
		Items items = itemsService.getItemById(itemsId);
		Warehouses warehouses = warehouseService.getWarehouseById(warehouseId);

		if (user == null) {
			throw new IllegalArgumentException("User with id " + userId + " was not found");
		}
		if (items == null) {
			throw new IllegalArgumentException("Item with id " + itemsId + " was not found");
		}
		if (warehouses == null) {
			throw new IllegalArgumentException("Warehouse with id " + warehouseId + " was not found");
		}

		// Set the fetched entities
		supplyDocument.setUser(user);
		supplyDocument.setItem(items);
		supplyDocument.setWarehouse(warehouses);

		// Save and return the supply document
		return supplyDocumentRepository.save(supplyDocument);
	}

	public SupplyDocument createSupplyDocuments(Map<String, Object> payload) throws IllegalArgumentException {
		ObjectMapper mapper = new ObjectMapper();
		SupplyDocument supplyDocuments = mapper.convertValue(payload.get("supplyDocuments"), SupplyDocument.class);

		Long userId = Long.valueOf(payload.get("userId").toString());
		Long itemsId = Long.valueOf(payload.get("itemsId").toString());
		Long warehouseId = Long.valueOf(payload.get("warehouseId").toString());

		User user = userService.getUserById(userId);
		Items items = itemsService.getItemById(itemsId);
		Warehouses warehouses = warehouseService.getWarehouseById(warehouseId);

		if (warehouses != null) {
			supplyDocuments.setUser(user);
			supplyDocuments.setItem(items);
			supplyDocuments.setWarehouse(warehouses);
			return supplyDocumentRepository.save(supplyDocuments);
		} else {
			throw new IllegalArgumentException("Warehouse with id " + warehouseId + " was not found");
		}
	}

	public SupplyDocument updateSupplyDocument(long id, SupplyDocumentDTO supplyDocumentDTO) {
		Optional<SupplyDocument> existingSupplyDocumentsOptional = supplyDocumentRepository.findById(id);

		if (existingSupplyDocumentsOptional.isPresent()) {
			SupplyDocument existingwarehouse = existingSupplyDocumentsOptional.get();

			if (supplyDocumentDTO.getName() != null)
				existingwarehouse.setName(supplyDocumentDTO.getName());

			if (supplyDocumentDTO.getSubject() != null)
				existingwarehouse.setSubject(supplyDocumentDTO.getSubject());

			if (supplyDocumentDTO.getStatus() != null)
				existingwarehouse.setStatus(supplyDocumentDTO.getStatus());

			existingwarehouse.setUpdatedAt(new Date());

			return supplyDocumentRepository.save(existingwarehouse);
		} else {
			return null;
		}
	}

	public void deleteSupplyDocument(long id) {
		supplyDocumentRepository.deleteById(id);
	}
}
