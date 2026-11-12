package com.iemiru.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "houses")
@Getter
@Setter
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer houseId;

    private String companyName;

    private String houseName;

    private String description;

    @Column(name = "image_url_1")
    private String imageUrl1;

    @Column(name = "image_url_2")
    private String imageUrl2;

    @Column(name = "image_url_3")
    private String imageUrl3;

    @Column(name = "image_url_4")
    private String imageUrl4;
}
