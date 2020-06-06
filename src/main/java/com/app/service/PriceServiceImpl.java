package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.Price;
import com.app.model.Teacher;
import com.app.repository.PriceRepository;
import com.app.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PriceServiceImpl implements PriceService {
  private final PriceRepository priceRepository;
  private final TeacherRepository teacherRepository;

  @Override
  public Price createPrice(Price price, Long teacherId) {
    Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", teacherId));
    price.setTeacher(teacher);
    return priceRepository.save(price);
  }

  @Override
  public Price updatePrice(Long id, Price price, Long teacherId) {
    Price priceFromDb = priceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Price", "id", id));
    Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", teacherId));
    price.setId(priceFromDb.getId());
    price.setTeacher(teacher);
    return priceRepository.save(price);
  }

  @Override
  public void deletePrice(Long id) {
    Price price = priceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Price", "id", id));
    priceRepository.delete(price);
  }
}
