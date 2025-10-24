package com.project.attendance.service.impl;

import com.project.attendance.domain.ObservationCatalog;
import com.project.attendance.repo.ObservationCatalogRepository;
import com.project.attendance.service.ObservationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObservationServiceImpl implements ObservationService {
    private final ObservationCatalogRepository repo;
    public ObservationServiceImpl(ObservationCatalogRepository repo){ this.repo = repo; }

    @Override
    public List<ObservationCatalog> catalog() {
        return repo.findAll();
    }
}
