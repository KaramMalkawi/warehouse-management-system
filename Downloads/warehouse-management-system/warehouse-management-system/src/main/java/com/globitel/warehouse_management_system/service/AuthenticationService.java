package com.globitel.warehouse_management_system.service;

import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.globitel.warehouse_management_system.model.dto.LoginUserDto;
import com.globitel.warehouse_management_system.model.dto.RegisterUserDto;
import com.globitel.warehouse_management_system.model.entity.User;
import com.globitel.warehouse_management_system.repository.UserRepository;

@Service
public class AuthenticationService {

	private UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;

	public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
	}

	public User signup(RegisterUserDto input) {
		User user = new User.Builder().firstName(input.getFirstName()).lastName(input.getLastName())
				.username(input.getUsername()).email(input.getEmail())
				.password(passwordEncoder.encode(input.getPassword())).userType(input.getUserType()).build();

		user.setCreatedAt(new Date());

		System.out.println(user);

		return userRepository.save(user);
	}

	public User authenticate(LoginUserDto input) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword()));

		return userRepository.findByUsername(input.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

}
