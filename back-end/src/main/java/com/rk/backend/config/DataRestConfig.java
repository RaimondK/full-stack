package com.rk.backend.config;

import com.rk.backend.entity.Country;
import com.rk.backend.entity.Product;
import com.rk.backend.entity.ProductCategory;
import com.rk.backend.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public DataRestConfig(EntityManager manager) {
        entityManager = manager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE };

        disableHttpMethods(config.getExposureConfiguration().forDomainType(Product.class), unsupportedActions);
        disableHttpMethods(config.getExposureConfiguration().forDomainType(ProductCategory.class), unsupportedActions);
        disableHttpMethods(config.getExposureConfiguration().forDomainType(Country.class), unsupportedActions);
        disableHttpMethods(config.getExposureConfiguration().forDomainType(State.class), unsupportedActions);

        exposeIds(config);
    }

    private static void disableHttpMethods(ExposureConfigurer config, HttpMethod[] unsupportedActions) {
        config
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
            Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
            entities.forEach(entity -> config.exposeIdsFor(entity.getJavaType()));
    }
}
