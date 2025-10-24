package com.project.attendance.domain;
import jakarta.persistence.*; import java.time.Instant;


@Entity @Table(name="observation_assignment")
public class ObservationAssignment {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private Group groupRef;
    @ManyToOne(optional=false) private Student student;
    @ManyToOne(optional=false) private ObservationCatalog observation;
    @Column(columnDefinition="TEXT") private String comment;
    private Instant date;
    public Long getId(){return id;} public Group getGroupRef(){return groupRef;} public Student getStudent(){return student;} public ObservationCatalog getObservation(){return observation;} public String getComment(){return comment;} public Instant getDate(){return date;}
    public void setId(Long id){this.id=id;} public void setGroupRef(Group g){this.groupRef=g;} public void setStudent(Student s){this.student=s;} public void setObservation(ObservationCatalog o){this.observation=o;} public void setComment(String c){this.comment=c;} public void setDate(Instant d){this.date=d;}
}