package com.demo.springboot.service;

import java.util.List;

import com.demo.springboot.model.Admin;
import com.demo.springboot.model.Customer;
import com.demo.springboot.model.Product;

public interface AdminService {
	Admin saveAdmin(Admin admin);
	Admin loginAdmin(Admin admin);
	
	public List<Product> getAllProducts(long adminId);
	public List<Customer> getAllCustomers(long adminId);
}