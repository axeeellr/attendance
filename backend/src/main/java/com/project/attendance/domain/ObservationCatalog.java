package com.project.attendance.domain;
import jakarta.persistence.*;


@Entity @Table(name="observation_catalog")
public class ObservationCatalog {
    @Id @Column(length=64) private String id;
    @Column(nullable=false) private String nombre;
    public ObservationCatalog(){}
    public ObservationCatalog(String id, String nombre){ this.id=id; this.nombre=nombre; }
    public String getId(){return id;} public String getNombre(){return nombre;}
    public void setId(String id){this.id=id;} public void setNombre(String n){this.nombre=n;}
}