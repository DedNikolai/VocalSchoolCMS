package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RootController {

  @GetMapping("admin")
  public String redirectToAdmin() {
    System.out.println("puk");
    return "forward:/index.html";
  }

  @GetMapping("admin/{path:^(?:(?!static|.html).)*$}/**")
  public String redirectToAdmin(@PathVariable String path) {
    return "forward:/index.html";
  }
}