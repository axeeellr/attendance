package com.project.attendance.repo;
import com.project.attendance.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;

public interface ObservationCatalogRepository extends JpaRepository<ObservationCatalog,String>{ }
