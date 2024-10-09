package com.globitel.warehouse_management_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.globitel.warehouse_management_system.model.dto.RegisterUserDto;
import com.globitel.warehouse_management_system.model.entity.User;
import com.globitel.warehouse_management_system.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	public Optional<User> getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public User updateUser(Long id, RegisterUserDto registerUserDto) {
		User existingUser = userRepository.findById(id).orElse(null);
		if (existingUser != null) {
			if (registerUserDto.getFirstName() != null)
				existingUser.setFirstName(registerUserDto.getFirstName());

			if (registerUserDto.getLastName() != null)
				existingUser.setLastName(registerUserDto.getLastName());

			if (registerUserDto.getUserType() != null)
				existingUser.setUserType(registerUserDto.getUserType());

			if (registerUserDto.getEmail() != null)
				existingUser.setEmail(registerUserDto.getEmail());

			if (registerUserDto.getUsername() != null)
				existingUser.setUsername(registerUserDto.getUsername());

			if (registerUserDto.getPassword() != null)
				existingUser.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));

			return userRepository.save(existingUser);
		}
		return null;
	}

	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

}
