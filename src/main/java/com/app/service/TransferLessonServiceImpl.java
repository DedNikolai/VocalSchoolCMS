package com.app.service;

import com.app.exeption.ResourceNotFoundException;
import com.app.model.TransferLesson;
import com.app.repository.TransferLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferLessonServiceImpl implements TransferLessonService{
  private final TransferLessonRepository transferLessonRepository;
  @Override
  public Page<TransferLesson> getAllOrderByDate(Pageable pageable) {
    return transferLessonRepository.findAllByOrderByCreatedDateAsc(pageable);
  }

  @Override
  public TransferLesson getById(Long id) {
    return transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
  }

  @Override
  public TransferLesson createTransferLesson(TransferLesson request) {
    return transferLessonRepository.save(request);
  }

  @Override
  public TransferLesson updateLesson(TransferLesson request, Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    request.setId(transferLesson.getId());
    return transferLessonRepository.save(request);
  }

  @Override
  public List<TransferLesson> findAllbyTransferDate(Date date) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    String dateString = format.format(date);
    Date parseDate = null;
    try {
      parseDate = format.parse(dateString);
    } catch (ParseException e) {
      e.printStackTrace();
    }

    List<TransferLesson> transferLessons = transferLessonRepository.findAllByTransferDate(parseDate);

    return transferLessons;
  }

  @Override
  public void deleteLesson(Long id) {
    TransferLesson transferLesson = transferLessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransferLesson", "id", id));
    transferLessonRepository.delete(transferLesson);
  }
}
