package com.crypto.portfolio.controller;

import com.crypto.portfolio.model.PriceSnapshot;
import com.crypto.portfolio.service.PricingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prices")
@CrossOrigin(origins = "http://localhost:3000")
public class PricingController {

    @Autowired
    private PricingService pricingService;

    @GetMapping("/history/{symbol}")
    public ResponseEntity<List<PriceSnapshot>> getPriceHistory(@PathVariable String symbol) {
        return ResponseEntity.ok(pricingService.getPriceHistory(symbol));
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshPrices() {
        pricingService.refreshPrices();
        return ResponseEntity.ok("Prices refreshed successfully");
    }
}
