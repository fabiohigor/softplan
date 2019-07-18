package br.com.softplan.controller;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.softplan.model.Pessoa;
import br.com.softplan.repository.PessoaRepository;
import br.com.softplan.util.ValidaCPF;

@RestController
@RequestMapping("/pessoa")
@CrossOrigin(origins = "*")
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaRepository;

	private ValidaCPF validaCPF;

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Collection<Pessoa>> buscarTodos() {
		return new ResponseEntity<Collection<Pessoa>>(this.pessoaRepository.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Pessoa> detalhes(@PathVariable Integer id) {
		Pessoa teste = this.pessoaRepository.findById(id).get();
		return new ResponseEntity<Pessoa>(teste, HttpStatus.OK);
	}

	@RequestMapping(method = { RequestMethod.POST,
			RequestMethod.PUT }, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Pessoa> cadastrar(@RequestBody Pessoa pessoaRequest) {
		if (!ValidaCPF.isCPF(pessoaRequest.getCpf())) {
			return new ResponseEntity<Pessoa>(HttpStatus.BAD_REQUEST);
		}

		List<Pessoa> aux = this.pessoaRepository.findByCpf(pessoaRequest.getCpf());
		if (aux.size() > 0 && aux.get(0).getId() != pessoaRequest.getId()) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		if (pessoaRequest.getId() == null) {
			pessoaRequest.setDtcadastro(LocalDate.now());
		}

		pessoaRequest.setDtAlteracao(LocalDate.now());
		Pessoa pessoa = this.pessoaRepository.save(pessoaRequest);
		HttpStatus status = pessoa == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK;
		return new ResponseEntity<Pessoa>(pessoa, status);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deletar(@PathVariable Integer id) {
		Pessoa pessoa = this.pessoaRepository.findById(id).orElse(null);
		HttpStatus status = pessoa == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
		String mensagem = "";
		if (pessoa != null) {
			this.pessoaRepository.delete(pessoa);
			mensagem = "Registro deletado com sucesso!";
		}else {
			mensagem = "Não foi possível excluír o registro!";
		}

		return new ResponseEntity<Void>(status);
	}
}
