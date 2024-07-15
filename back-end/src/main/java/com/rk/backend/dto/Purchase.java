package com.rk.backend.dto;

import com.rk.backend.entity.Address;
import com.rk.backend.entity.Customer;
import com.rk.backend.entity.OrderItem;
import com.rk.backend.entity.Order;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}
