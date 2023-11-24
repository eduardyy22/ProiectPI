package com.backapi.Myfridge.alimente;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class AlimentService {
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	private AlimentRepository alimentRepository;
	
	@Transactional
	public void createTableForUser(String userEmail) {
		String tableName = userEmail.replaceAll("[^a-zA-Z0-9]", "_");
        String createTableQuery = "CREATE TABLE IF NOT EXISTS " + tableName +
                " (id INT AUTO_INCREMENT PRIMARY KEY, " +
                "nume VARCHAR(255), expiration_date DATE, unitate_masura VARCHAR(255), cantitate DOUBLE);";

        entityManager.createNativeQuery(createTableQuery).executeUpdate();
	}
	
	public List<Aliment> getAllAlimentsForUser(String userEmail) {
        String tableName = userEmail.replaceAll("[^a-zA-Z0-9]", "_");
        String selectQuery = "SELECT * FROM " + tableName;
        
        return entityManager.createNativeQuery(selectQuery, Aliment.class).getResultList();
    }
	
	@Transactional
	public void adaugaAliment(AlimentRequest alimentRequest)
	{
		String tableName = alimentRequest.getEmail().replaceAll("[^a-zA-Z0-9]", "_");
		entityManager.createNativeQuery("INSERT INTO " + tableName +
				" (nume, expiration_date, unitate_masura, cantitate) VALUES (?, ?, ?, ?)")
		.setParameter(1, alimentRequest.getNume())
		.setParameter(2, alimentRequest.getExpirationDate())
		.setParameter(3, alimentRequest.getUnitateMasura())
		.setParameter(4, alimentRequest.getCantitate()).executeUpdate();
	}
	
	@Transactional
	public void actualizeazaAliment(AlimentRequest alimentRequest) {
	    String tableName = alimentRequest.getEmail().replaceAll("[^a-zA-Z0-9]", "_");
	    
	    String updateQuery = "UPDATE " + tableName + " SET " +
	            "nume = ?, " +
	            "expiration_date = ?, " +
	            "unitate_masura = ?, " +
	            "cantitate = ? " +
	            "WHERE id = ?";
	    
	    entityManager.createNativeQuery(updateQuery)
	            .setParameter(1, alimentRequest.getNume())
	            .setParameter(2, alimentRequest.getExpirationDate())
	            .setParameter(3, alimentRequest.getUnitateMasura())
	            .setParameter(4, alimentRequest.getCantitate())
	            .setParameter(5, alimentRequest.getId())
	            .executeUpdate();
	}
	
	@Transactional
	public void stergeAliment(String userEmail, Integer id) {
		try {
	        String tableName = userEmail.replaceAll("[^a-zA-Z0-9]", "_");
	        entityManager.createNativeQuery("DELETE FROM " + tableName + " WHERE id = ?")
	            .setParameter(1, id)
	            .executeUpdate();
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new RuntimeException("Eroare la ștergerea alimentului.");
	    }
	}
	
	
	
}
