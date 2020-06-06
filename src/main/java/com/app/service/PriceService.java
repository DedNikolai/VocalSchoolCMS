package com.app.service;

import com.app.model.Price;

public interface PriceService {
  Price createPrice(Price price, Long teacherId);

  Price updatePrice(Long id, Price price, Long teacherId);

  void deletePrice(Long id);
}
