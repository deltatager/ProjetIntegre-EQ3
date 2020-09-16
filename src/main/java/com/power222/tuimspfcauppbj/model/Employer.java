package com.power222.tuimspfcauppbj.model;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class Employer extends User{

    private String companyName;
    private String contactName;
    private String phoneNumber;
    private String address;
    private String email;

}
