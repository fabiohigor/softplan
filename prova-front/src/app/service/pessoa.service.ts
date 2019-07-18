import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'
import {Pessoa} from '../model/pessoa';
import {Observable} from 'rxjs';
import {error} from 'selenium-webdriver';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    url = 'http://localhost:8080/pessoa';

    pessoas: Array<Pessoa>;
    pessoa: Pessoa;

    constructor(private http: HttpClient) {

    }

    buscarTodos() {

        return this.http.get(this.url, {
            headers:
                {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        })
            .pipe(map((pessoas: Array<Pessoa>) => this.pessoas = pessoas,
                error => error));

    }

    buscarPorId(id: Number) {

        return this.http.get(this.url + '/' + id, {
            headers:
                {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        })
            .pipe(map((pessoa: Pessoa) =>
                this.pessoa = pessoa));

    }

    salvar(pes: Pessoa) {
        return this.http.post(this.url, pes, {
            headers:
                {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }).pipe(map((result: Pessoa) => this.pessoa = result,
            error => error));
    }

    apagar(id: Number) {

        return this.http.delete(this.url + '/' + id, {
            headers:
                {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }).pipe(map((result: String) => console.log(result),
            error => error));
    }

}
