package com.demo.springboot.service;
 import java.util.List;

import com.demo.springboot.model.Payment;


public interface PaymentService {

	Payment addPayment(Payment payment,long orderId,long customerId);
	List<Payment> getAllPayments();
	Payment getPaymentById(long paymentId);
	void deletePayment(long paymentId);
	public List<Payment> getAllPaymentsByCustomerId(long customerId);
}