package com.crypto.portfolio.scheduler;

import com.crypto.portfolio.model.PriceSnapshot;
import com.crypto.portfolio.repository.PriceSnapshotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class PriceUpdateScheduler {

    @Autowired
    private PriceSnapshotRepository priceSnapshotRepository;

    @Autowired
    private com.crypto.portfolio.repository.AssetRepository assetRepository;

    @Autowired
    private com.crypto.portfolio.service.MarketService marketService;

    @Scheduled(fixedRate = 300000) // Update every 5 minutes
    public void updatePrices() {
        System.out.println("Scheduler: Recording price snapshots for active assets...");

        // Get all unique symbols from user portfolios
        java.util.List<String> symbols = assetRepository.findAll().stream()
                .map(com.crypto.portfolio.model.Asset::getSymbol)
                .distinct()
                .collect(java.util.stream.Collectors.toList());

        if (symbols.isEmpty()) {
            System.out.println("Scheduler: No active assets found to snapshot.");
            return;
        }

        for (String symbol : symbols) {
            double currentPrice = marketService.getPriceBySymbol(symbol);
            if (currentPrice > 0) {
                PriceSnapshot snapshot = new PriceSnapshot(symbol, symbol, currentPrice);
                priceSnapshotRepository.save(snapshot);
                System.out.println("Scheduler: Saved snapshot for " + symbol + " at " + currentPrice);
            }
        }
    }

}