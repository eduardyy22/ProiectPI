package com.backapi.Myfridge.alimente;

import java.time.LocalDate;

import com.backapi.Myfridge.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.TableGenerator;

@Entity
@TableGenerator(name = "none", table = "none")
@Table(name = "aliment")
public class Aliment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String nume;
	private LocalDate expirationDate;
	private String unitateMasura;
	private Double cantitate;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNume() {
		return nume;
	}

	public void setNume(String nume) {
		this.nume = nume;
	}

	public LocalDate getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}

	public String getUnitateMasura() {
		return unitateMasura;
	}

	public void setUnitateMasura(String unitateMasura) {
		this.unitateMasura = unitateMasura;
	}

	public Double getCantitate() {
		return cantitate;
	}

	public void setCantitate(Double cantitate) {
		this.cantitate = cantitate;
	}
}
