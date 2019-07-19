package com.dse;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.dse.edwin.mapper")
public class DubboBaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(DubboBaseApplication.class, args);
	}

}
