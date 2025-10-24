package com.project.attendance.domain;
import jakarta.persistence.*; import java.time.LocalDate; import java.util.*;


@Entity @Table(name="attendance")
public class Attendance {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private Group groupRef;
    private LocalDate date;

    @OneToMany(mappedBy="attendance", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<AttendanceItem> items = new ArrayList<>();
    public Long getId(){return id;} public Group getGroupRef(){return groupRef;} public LocalDate getDate(){return date;} public List<AttendanceItem> getItems(){return items;}
    public void setId(Long id){this.id=id;} public void setGroupRef(Group g){this.groupRef=g;} public void setDate(LocalDate d){this.date=d;}
}