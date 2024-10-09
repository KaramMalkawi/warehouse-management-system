package com.globitel.warehouse_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globitel.warehouse_management_system.model.dto.SupplyDocumentDTO;
import com.globitel.warehouse_management_system.model.entity.SupplyDocument;

@Repository
public interface SupplyDocumentRepository extends JpaRepository<SupplyDocument, Long> {

	@Query(value = "select s FROM SupplyDocument s JOIN s.user u", nativeQuery = false)
	List<SupplyDocumentDTO> findAllSupplyDocumentsWithUserDetails();

}
