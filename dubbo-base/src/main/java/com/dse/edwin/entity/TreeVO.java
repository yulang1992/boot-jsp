package com.dse.edwin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeVO implements Serializable{

	private static final long serialVersionUID = 3595459821811990622L;
	private String icon;
	private String root;
	private List<Resource> leaf;


}
