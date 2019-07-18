import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'
import {Pessoa} from '../model/pessoa';
import {Observable} from 'rxjs';
import {Endereco} from '../model/endereco';
import {error} from 'selenium-webdriver';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {
    urlService = 'http://viacep.com.br/ws';
    url = 'http://localhost:8080/endereco';
    endereco: Endereco;

    constructor(private http: HttpClient) {
    }

    buscarViaCep(cep: String) {

        return this.http.get(this.urlService + '/' + cep + '/json/')
            .pipe(map((endereco: Endereco) => this.endereco = endereco));

    }

    buscarPorCep(cep: String) {
        return this.http.get(this.url + '/cep/' + cep, {
            headers:
                {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        })
            .pipe(map((endereco: Endereco) => {
                    this.endereco = endereco;
                }
            ));

    }

    salvar(end: Endereco) {
        return this.http.post(this.url, end, {
            headers:
                {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }).pipe(map((endereco: Endereco) => this.endereco = endereco,
            error => error));
    }
}
