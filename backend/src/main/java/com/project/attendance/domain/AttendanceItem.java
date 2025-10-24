package com.project.attendance.domain;
import jakarta.persistence.*;


@Entity @Table(name="attendance_item")
public class AttendanceItem {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private Attendance attendance;
    @ManyToOne(optional=false) private Student student;
    private boolean present;
    public Long getId(){return id;} public Attendance getAttendance(){return attendance;} public Student getStudent(){return student;} public boolean isPresent(){return present;}
    public void setId(Long id){this.id=id;} public void setAttendance(Attendance a){this.attendance=a;} public void setStudent(Student s){this.student=s;} public void setPresent(boolean p){this.present=p;}
}