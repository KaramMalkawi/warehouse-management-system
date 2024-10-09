package com.globitel.warehouse_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.globitel.warehouse_management_system.model.dto.SupplyDocumentDTO;
import com.globitel.warehouse_management_system.model.dto.SupplyDocumentResponseDTO;
import com.globitel.warehouse_management_system.model.entity.SupplyDocument;
import com.globitel.warehouse_management_system.service.SupplyDocumentService;

@RestController
@RequestMapping("supply_document")
public class SupplyDocumentController {
	@Autowired
	private SupplyDocumentService supplyDocumentService;

	@GetMapping("/all")
	public ResponseEntity<List<SupplyDocument>> getAllSupplyDocuments() {
		List<SupplyDocument> supplyDocuments = supplyDocumentService.getAllSupplyDocuments();
		return ResponseEntity.ok(supplyDocuments);
	}

	@GetMapping("/all-supply-documents") // pass
	public ResponseEntity<List<SupplyDocumentResponseDTO>> AllSupplyDocuments() {
		List<SupplyDocumentResponseDTO> supplyDocument = supplyDocumentService.AllSupplyDocument();
		return ResponseEntity.ok(supplyDocument);
	}

	@GetMapping("/user")
	public ResponseEntity<List<SupplyDocumentDTO>> getAllSupplyDocumentsWithUserDetails() {
		List<SupplyDocumentDTO> supplyDocumentDTOs = supplyDocumentService.getAllSupplyDocumentsWithUserDetails();
		return ResponseEntity.ok(supplyDocumentDTOs);
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<SupplyDocument> getSupplyDocumentById(@PathVariable Long id) {
		SupplyDocument supplyDocument = supplyDocumentService.getSupplyDocumentById(id);
		return supplyDocument != null ? ResponseEntity.ok(supplyDocument) : ResponseEntity.notFound().build();
	}

	@PostMapping("/create") // pass
	public ResponseEntity<SupplyDocument> createWarehouse(@RequestBody SupplyDocumentDTO supplyDocumentDTO) {
		SupplyDocument createdSupplyDocument = supplyDocumentService.createSupplyDocuments(supplyDocumentDTO);
		return ResponseEntity.ok(createdSupplyDocument);
	}

	@PostMapping("/update/{id}")
	public ResponseEntity<SupplyDocument> updateSupplyDocument(@PathVariable Long id,
			@RequestBody SupplyDocumentDTO supplyDocumentDTO) {
		SupplyDocument updatedSupplyDocument = supplyDocumentService.updateSupplyDocument(id, supplyDocumentDTO);
		return updatedSupplyDocument != null ? ResponseEntity.ok(updatedSupplyDocument)
				: ResponseEntity.notFound().build();
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteSupplyDocument(@PathVariable Long id) {
		supplyDocumentService.deleteSupplyDocument(id);
		return null;
	}
}