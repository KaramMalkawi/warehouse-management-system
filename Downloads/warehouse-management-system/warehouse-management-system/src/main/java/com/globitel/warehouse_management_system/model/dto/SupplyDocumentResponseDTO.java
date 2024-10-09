package com.globitel.warehouse_management_system.model.dto;

import java.util.Date;

public class SupplyDocumentResponseDTO {
	private Long id;
	private String name;
	private String subject;
	private String status;
	private Date createdAt;
	private String createdBy;

	public SupplyDocumentResponseDTO() {

	}

	public SupplyDocumentResponseDTO(Long id, String name, String subject, String status, Date createdAt,
			String createdBy) {
		this.id = id;
		this.name = name;
		this.subject = subject;
		this.status = status;
		this.createdAt = createdAt;
		this.createdBy = createdBy;
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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

}
