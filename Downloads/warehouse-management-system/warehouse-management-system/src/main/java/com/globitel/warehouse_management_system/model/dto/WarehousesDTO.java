package com.globitel.warehouse_management_system.model.dto;

import java.util.Date;

public class WarehousesDTO {
	private String name;
	private String description;
	private Long userId;
	private Date createdAt;
	private Date updatedAt;

	public WarehousesDTO() {

	}

	public WarehousesDTO(String name, String description, Long userId, Date createdAt, Date updatedAt) {
		this.name = name;
		this.description = description;
		this.userId = userId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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
