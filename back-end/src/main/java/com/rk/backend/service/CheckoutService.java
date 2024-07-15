package com.rk.backend.service;

import com.rk.backend.dto.Purchase;
import com.rk.backend.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
