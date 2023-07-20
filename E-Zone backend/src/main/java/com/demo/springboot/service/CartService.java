package com.demo.springboot.service;

import java.util.List;

import com.demo.springboot.model.Cart;
import com.demo.springboot.model.Customer;
import com.demo.springboot.model.Product;



public interface CartService {

	Cart addCart(Cart cart,long productId,long customerId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void deleteCartByCustomer(Customer c);
	
	

}