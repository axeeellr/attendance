package com.project.attendance.domain;
import jakarta.persistence.*;


@Entity @Table(name="students")
public class Student {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String nombre;
    @ManyToOne(optional=false) private Group groupRef;
    public Student(){}
    public Student(String nombre, Group g){ this.nombre=nombre; this.groupRef=g; }
    public Long getId(){return id;} public String getNombre(){return nombre;} public Group getGroupRef(){return groupRef;}
    public void setId(Long id){this.id=id;} public void setNombre(String n){this.nombre=n;} public void setGroupRef(Group g){this.groupRef=g;}
}