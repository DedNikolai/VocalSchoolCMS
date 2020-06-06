package com.app.facade;

import com.app.dto.request.PriceRequest;
import com.app.dto.response.PriceResponse;
import com.app.model.Price;
import com.app.service.PriceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PriceFacade {
  private final ModelMapper modelMapper;
  private final PriceService priceService;

  public PriceResponse createPrice(PriceRequest request, Long teacherId) {
    Price price = modelMapper.map(request, Price.class);
    Price cretedPrice = priceService.createPrice(price, teacherId);
    return modelMapper.map(cretedPrice, PriceResponse.class);
  }

  public PriceResponse updatePrice(Long id, PriceRequest request, Long teacherId) {
    Price price = modelMapper.map(request, Price.class);
    Price updatedPrice = priceService.updatePrice(id, price, teacherId);
    return modelMapper.map(updatedPrice, PriceResponse.class);
  }

   public void deletePrice(Long id) {
    priceService.deletePrice(id);
  }
}
