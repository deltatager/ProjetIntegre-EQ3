package com.power222.tuimspfcauppbj.model;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class Student extends User {

    private String firstName;
    private String lastName;
    private String permanentCode;
    private String registrationNumber;
    private String email;
    private String phoneNumber;

}
