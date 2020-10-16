package com.power222.tuimspfcauppbj.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@EqualsAndHashCode
public class StudentApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private boolean hired;
    private boolean hasStudentAccepted;
    private boolean decided;
    private String reasonForRejection;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    @JsonIgnoreProperties({"joinedFile", "allowedStudents", "applications"})
    private InternshipOffer offer;

    @ManyToOne
    @JsonIgnoreProperties({"resumes", "allowedOffers", "applications"})
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties({"owner", "applications"})
    private Resume resume;
}
