package com.globitel.warehouse_management_system.model.dto;

import java.util.Date;

public class ItemsDTO {
	private Long id;
	private String name;
	private String description;
	private int quantity;
	private Long warehouseId;
	private Date createdAt;
	private Date updatedAt;

	public ItemsDTO() {
	}

	public ItemsDTO(Long id, String name, String description, int quantity, Long warehouseId, Date createdAt,
			Date updatedAt) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.quantity = quantity;
		this.warehouseId = warehouseId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
