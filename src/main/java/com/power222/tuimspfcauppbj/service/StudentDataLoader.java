package com.power222.tuimspfcauppbj.service;

import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StudentDataLoader implements CommandLineRunner {

    @Autowired
    private StudentRepository repository;

    @Override
    public void run(String... args) throws Exception {
        Student student1 = new Student();
        student1.setFirstName("Bob");
        repository.save(student1);
    }
}
