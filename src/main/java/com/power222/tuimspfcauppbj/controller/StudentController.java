package com.power222.tuimspfcauppbj.controller;


import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository repository;

    @GetMapping
    public List<Student> getAllStudents(){
        return  repository.findAll();
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student createStudent(@RequestBody Student newStudent){
        return  repository.saveAndFlush(newStudent);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable long id){
        return repository.findById(id).get();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student newStudent, @PathVariable long id){
        Optional<Student> optStudent = repository.findById(id).map(oldStudent -> {
            newStudent.setId(oldStudent.getId());
            return repository.saveAndFlush(newStudent);
        });
        return ResponseEntity.of(optStudent);
    }


    @DeleteMapping("/{id}")
    @Transactional
    public void deleteStudent(@PathVariable long id){
        repository.deleteById(id);
    }





}


