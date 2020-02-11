package com.app.service;

import com.app.model.Role;
import com.app.model.User;
import com.app.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @MockBean
  private UserRepository userRepository;

  private User mockUser = new User();

  @Before
  public void setUp() {
    Set<Role> roles = new HashSet<>();
    roles.add(Role.SUPER_ADMIN);
    roles.add(Role.ADMIN);

    mockUser.setId(1L);
    mockUser.setPassword("123456");
    mockUser.setEmail("test@mail.com");
    mockUser.setRoles(roles);
  }

  @Test
  public void verifyGetUserByIdTest() {
    Long expectedId = 1L;
    String expectedEmail = "test@mail.com";

    Mockito.when(userRepository.findById(expectedId)).thenReturn(Optional.of(mockUser));

    User user = userService.getUserById(expectedId);
    Mockito.verify(userRepository).findById(expectedId);

    Assert.assertEquals(expectedEmail, user.getEmail());
    Assert.assertEquals(expectedId, user.getId());
  }

  @Test
  public void verifyCreateUserTest() {
    String expectedEmail = "test@mail.com";

    Mockito.when(userRepository.save(mockUser)).thenReturn(mockUser);
    User user = userService.createUser(mockUser);

    Mockito.verify(userRepository).save(mockUser);

    Assert.assertEquals(expectedEmail, user.getEmail());
  }

  @Test
  public void verifyUpdateUserTest() {
    String expectedEmail = "test2@mail.com";
    Long expectedId = 1L;
    mockUser.setEmail(expectedEmail);

    Mockito.when(userRepository.save(mockUser)).thenReturn(mockUser);
    User user = userService.updateUser(expectedId, mockUser);

    Mockito.verify(userRepository).save(mockUser);

    Assert.assertEquals(expectedEmail, user.getEmail());
    Assert.assertEquals(expectedId, user.getId());
  }

  @Test
  public void verifyDeleteUser() {
    Long expectedId = 1L;
    Mockito.when(userRepository.findById(expectedId)).thenReturn(Optional.of(mockUser));
    userService.deleteUser(expectedId);
    Mockito.verify(userRepository).findById(1L);
    Mockito.verify(userRepository).delete(mockUser);
  }
}
