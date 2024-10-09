package com.globitel.warehouse_management_system.model.entity;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "users")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@Column(name = "username", nullable = false, unique = true)
	private String username;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@JsonIgnore
	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "user_type")
	private String userType;

	@Column(name = "created_at", updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	private List<Warehouses> warehouses;

	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	private List<SupplyDocument> supplyDocuments;

	// Default constructor
	public User() {
	}

	// Constructor with all fields
	public User(long id, String firstName, String lastName, String username, String email, String password,
			String userType, Date createdAt, Date updatedAt, List<Warehouses> warehouses,
			List<SupplyDocument> supplyDocuments) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.userType = userType;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.warehouses = warehouses;
		this.supplyDocuments = supplyDocuments;
	}

	// Builder-based constructor
	private User(Builder builder) {
		this.id = builder.id;
		this.firstName = builder.firstName;
		this.lastName = builder.lastName;
		this.username = builder.username;
		this.email = builder.email;
		this.password = builder.password;
		this.userType = builder.userType;
		this.createdAt = builder.createdAt;
		this.updatedAt = builder.updatedAt;
		this.warehouses = builder.warehouses;
		this.supplyDocuments = builder.supplyDocuments;
	}

	// Static Builder class
	public static class Builder {
		private long id;
		private String firstName;
		private String lastName;
		private String username;
		private String email;
		private String password;
		private String userType;
		private Date createdAt;
		private Date updatedAt;
		private List<Warehouses> warehouses;
		private List<SupplyDocument> supplyDocuments;

		public Builder() {
		}

		public Builder id(long id) {
			this.id = id;
			return this;
		}

		public Builder firstName(String firstName) {
			this.firstName = firstName;
			return this;
		}

		public Builder lastName(String lastName) {
			this.lastName = lastName;
			return this;
		}

		public Builder username(String username) {
			this.username = username;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder password(String password) {
			this.password = password;
			return this;
		}

		public Builder userType(String userType) {
			this.userType = userType;
			return this;
		}

		public Builder createdAt(Date createdAt) {
			this.createdAt = createdAt;
			return this;
		}

		public Builder updatedAt(Date updatedAt) {
			this.updatedAt = updatedAt;
			return this;
		}

		public Builder warehouses(List<Warehouses> warehouses) {
			this.warehouses = warehouses;
			return this;
		}

		public Builder supplyDocuments(List<SupplyDocument> supplyDocuments) {
			this.supplyDocuments = supplyDocuments;
			return this;
		}

		public User build() {
			return new User(this);
		}
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
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

	public List<Warehouses> getWarehouses() {
		return warehouses;
	}

	public void setWarehouses(List<Warehouses> warehouses) {
		this.warehouses = warehouses;
	}

	public List<SupplyDocument> getSupplyDocuments() {
		return supplyDocuments;
	}

	public void setSupplyDocuments(List<SupplyDocument> supplyDocuments) {
		this.supplyDocuments = supplyDocuments;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
