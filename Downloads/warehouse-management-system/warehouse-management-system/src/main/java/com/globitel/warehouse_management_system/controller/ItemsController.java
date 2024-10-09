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

import com.globitel.warehouse_management_system.model.dto.ItemsDTO;
import com.globitel.warehouse_management_system.model.entity.Items;
import com.globitel.warehouse_management_system.service.ItemsService;

@RestController
@RequestMapping("/items")
public class ItemsController {
	@Autowired
	private ItemsService itemsService;

	@GetMapping("/all") // pass
	public ResponseEntity<List<Items>> getAllItems() {
		List<Items> items = itemsService.getAllItems();
		return ResponseEntity.ok(items);
	}

	@GetMapping("/find/{id}") // pass
	public ResponseEntity<Items> getItemById(@PathVariable Long id) {
		Items items = itemsService.getItemById(id);
		if (items != null) {
			return ResponseEntity.ok(items);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/create") // pass
	public ResponseEntity<Items> createItem(@RequestBody ItemsDTO itemsDTO) {
		Items createItems = itemsService.createItem(itemsDTO);
		return ResponseEntity.ok(createItems);
	}

	@PostMapping("/update/{id}") // pass
	public ResponseEntity<Items> updateItem(@PathVariable Long id, @RequestBody ItemsDTO itemsDto) {
		Items updateItem = itemsService.updateItem(id, itemsDto);
		if (updateItem != null) {
			return ResponseEntity.ok(updateItem);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/delete/{id}") // pass
	public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
		itemsService.deleteItem(id);
		return ResponseEntity.noContent().build();
	}

}
