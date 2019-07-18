package br.com.softplan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.softplan.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer>{
	
	
	
	List<Pessoa> findByCpf(String cpf);

	
}
