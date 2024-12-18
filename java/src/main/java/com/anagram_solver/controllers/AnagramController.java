package com.anagram_solver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AnagramController {
    
    @GetMapping("/word")
    public String getAnagrams() {
        return "Hello anagram";
    }

    @GetMapping("/")
    public String getHello() {
        return "Hello";
    }
    
}
