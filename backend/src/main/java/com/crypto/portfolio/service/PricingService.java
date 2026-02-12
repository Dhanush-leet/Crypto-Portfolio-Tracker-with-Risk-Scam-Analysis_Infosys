package com.crypto.portfolio.service;

import com.crypto.portfolio.model.PriceSnapshot;
import com.crypto.portfolio.repository.PriceSnapshotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PricingService {

    @Autowired
    private PriceSnapshotRepository priceSnapshotRepository;

    @Autowired
    private MarketService marketService;

    public List<PriceSnapshot> getPriceHistory(String symbol) {
        // Fetch last 100 snapshots for the given symbol from DB
        return priceSnapshotRepository.findByCryptoSymbol(symbol.toUpperCase());
    }

    public List<PriceSnapshot> getPriceHistory(String symbol, int hours) {
        LocalDateTime fromTime = LocalDateTime.now().minusHours(hours);
        return priceSnapshotRepository.findByCryptoSymbolAndSnapshotTimeAfter(symbol.toUpperCase(), fromTime);
    }

    public void refreshPrices() {
        // Manually trigger a market data refresh in MarketService
        marketService.refreshMarketData();
    }
}
