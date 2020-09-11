package com.power222.tuimspfcauppbj.model;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class Employer extends User{

    private String companyName;
    private String FirstName;
    private String lastName;
    private String phoneNumber;

}
