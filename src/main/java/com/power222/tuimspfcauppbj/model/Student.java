package com.power222.tuimspfcauppbj.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity
public class Student extends User {

    private String firstName;
    private String lastName;
    private String studentId;
    private String email;
    private String phoneNumber;
    private String address;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"file", "owner"})
    private List<Resume> resumes;

    @ManyToMany(mappedBy = "allowedStudents")
    @JsonIgnoreProperties({"joinedFile", "employer", "appliedStudents", "allowedStudents"})
    private List<InternshipOffer> allowedOffers;

    @SuppressWarnings("JpaDataSourceORMInspection")
    @ManyToMany
    @JoinTable(name = "OFFER_APPLIED_STUDENT")
    @JsonIgnoreProperties({"joinedFile", "employer", "appliedStudents", "allowedStudents"})
    private List<InternshipOffer> appliedOffers;
}
