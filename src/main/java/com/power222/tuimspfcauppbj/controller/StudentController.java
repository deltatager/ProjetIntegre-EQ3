package com.power222.tuimspfcauppbj.controller;


import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class StudentController {

    @GetMapping("/hello1")
    public String hello1() {
        return "Hello, world!";
  }


    @Autowired

    private StudentRepository repository;

    @GetMapping("allStudents")
    public List<Student> getAllStudents(){
        return  repository.findAll();
    }


    @PostMapping("create")
    public Student createOrSaveStudent(@RequestBody Student newStudent){
        return  repository.save(newStudent);
    }

    @GetMapping("getStudents/{id}")
    public Student getStudentById(@PathVariable Long id){
        return repository.findById(id).get();
    }

    @PutMapping("putStudents/{id}")
    public Student updateStudent(@RequestBody Student newStudent, @PathVariable Long id){
        return repository.findById(id).map(student -> {
            student.setFirstName(newStudent.getFirstName());
            return repository.save(student);
        }).orElseGet(() -> {
            newStudent.setId(id);
            return repository.save(newStudent);
        });
    }

    @DeleteMapping("deleteStudents/{id}")
    public void deleteStudent(@PathVariable Long id){
        repository.deleteById(id);
    }





}


