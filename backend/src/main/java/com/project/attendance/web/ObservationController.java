package com.project.attendance.web;

import com.project.attendance.domain.ObservationCatalog;
import com.project.attendance.repo.ObservationCatalogRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/observations")
public class ObservationController {
    private final ObservationCatalogRepository repo;
    public ObservationController(ObservationCatalogRepository r){this.repo=r;}

    @GetMapping("/catalog")
    public List<ObservationCatalog> catalog(){
        return repo.findAll();
    }
}
