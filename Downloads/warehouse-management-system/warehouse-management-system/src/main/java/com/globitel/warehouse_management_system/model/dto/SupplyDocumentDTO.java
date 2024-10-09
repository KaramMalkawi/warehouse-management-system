package com.globitel.warehouse_management_system.model.dto;

import java.util.Date;

public class SupplyDocumentDTO {
	private String name;
	private String subject;
	private String status;
	Long userId;
	Long warehouseId;
	Long itemId;
	private Date createdAt;
	private Date updatedAt;

	public SupplyDocumentDTO() {

	}

	public SupplyDocumentDTO(String name, String subject, String status, Long userId, Long warehouseId, Long itemId,
			Date createdAt, Date updatedAt) {
		this.name = name;
		this.subject = subject;
		this.status = status;
		this.userId = userId;
		this.warehouseId = warehouseId;
		this.itemId = itemId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
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
