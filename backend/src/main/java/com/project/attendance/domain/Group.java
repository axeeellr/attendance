package com.project.attendance.domain;
import jakarta.persistence.*;


@Entity @Table(name="groups")
public class Group {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String nombre;
    public Group(){}
    public Group(String n){this.nombre=n;}
    public Long getId(){return id;} public String getNombre(){return nombre;}
    public void setId(Long id){this.id=id;} public void setNombre(String nombre){this.nombre=nombre;}
}