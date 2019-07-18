import {Component, OnInit} from '@angular/core';
import {Pessoa} from '../../model/pessoa';
import {PessoaService} from '../../service/pessoa.service';


@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

    pessoas: Array<Pessoa>;
    mensagem: any;

    constructor(private pessoaService: PessoaService) {
    }

    ngOnInit() {
        this.buscarTodos();
    }

    buscarTodos() {
        this.pessoaService.buscarTodos().subscribe(pessoas => this.pessoas = pessoas);
    }


    async apagar(cod: number) {
        await this.pessoaService.apagar(cod).subscribe(res => {
            this.mensagem = res;
            this.buscarTodos();
        }, error => {
            this.buscarTodos();
        });
    }


}
