import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PessoaService} from '../../service/pessoa.service';
import {Pessoa} from '../../model/pessoa';
import {EnderecoService} from '../../service/endereco.service';
import {Endereco} from '../../model/endereco';

declare var $: any;

@Component({
    selector: 'app-salvar',
    templateUrl: './salvar.component.html',
    styleUrls: ['./salvar.component.scss']
})
export class SalvarComponent implements OnInit {

    pessoa: Pessoa;
    endereco: Endereco;


    form = new FormGroup({
        nome: new FormControl('', Validators.minLength(2)),
        email: new FormControl('', Validators.email),
        cpf: new FormControl(''),
        sexo: new FormControl(''),
        dtnascimento: new FormControl(''),
        naturalidade: new FormControl(''),
        nacionalidade: new FormControl(''),
        numero: new FormControl(''),
        cep: new FormControl(''),
        logradouro: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        localidade: new FormControl(''),
        uf: new FormControl(''),
    });


    constructor(private pessoaService: PessoaService, private enderecoService: EnderecoService, private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.pessoa = new Pessoa();
        this.endereco = new Endereco();
        const id = this.route.snapshot.paramMap.get('id');
        if (id !== undefined && id != null) {

            this.pessoa.id = Number(id);
            this.buscarPorId();
        }

    }

    buscarPorId() {

        this.pessoaService.buscarPorId(this.pessoa.id).subscribe((pessoa) => {
            this.pessoa = pessoa;
            this.PessoaToForm();
            if (this.pessoa.endereco !== undefined && this.pessoa.endereco !== null) {
                this.endereco = this.pessoa.endereco;
                this.EnderecoToForm();
            }
        });


    }

    salvar() {

        this.formToPessoa();
        this.formToEndereco();
        if (this.pessoa.cpf !== undefined && this.pessoa.cpf != null && !this.validaCPF(this.pessoa.cpf)) {
            this.showNotification('top', 'left', 'danger', 'CPF inválido!');
            return;
        }

        this.pessoaService.salvar(this.pessoa).subscribe(pessoa => {
            this.pessoa = pessoa;
            this.showNotification('top', 'left', 'success', 'Registro salvo com sucesso!');
            this.router.navigate(['/listar']);
        }, (error: any) => {
            if (error.status === 409) {
                this.showNotification('top', 'left', 'danger', 'CPF já cadastrado');
            } else {
                this.showNotification('top', 'left', 'danger', 'Não foi possível salvar o registro');
            }

        });
    }

    formToPessoa() {
        this.pessoa.nome = this.form.get('nome').value;
        this.pessoa.cpf = this.form.get('cpf').value;
        this.pessoa.sexo = this.form.get('sexo').value;
        this.pessoa.email = this.form.get('email').value;
        this.pessoa.dtnascimento = this.form.get('dtnascimento').value;
        this.pessoa.naturalidade = this.form.get('naturalidade').value;
        this.pessoa.nacionalidade = this.form.get('nacionalidade').value;
        this.pessoa.numero = this.form.get('numero').value;

    }

    PessoaToForm() {
        this.form.get('nome').setValue(this.pessoa.nome);
        this.form.get('cpf').setValue(this.pessoa.cpf);
        this.form.get('sexo').setValue(this.pessoa.sexo);
        this.form.get('email').setValue(this.pessoa.email);
        this.form.get('dtnascimento').setValue(this.pessoa.dtnascimento);
        this.form.get('naturalidade').setValue(this.pessoa.naturalidade);
        this.form.get('nacionalidade').setValue(this.pessoa.nacionalidade);
        this.form.get('numero').setValue(this.pessoa.numero);
    }

    buscarCEP() {
        let cep = this.form.get('cep').value;
        if (cep == null || cep == '') {
            this.endereco = new Endereco();
            this.pessoa.endereco = this.endereco;
            this.EnderecoToForm();
            return;
        } else {
            cep = cep.length === 8 ? cep.substring(0, 5) + '-' + cep.substring(5, 8) : cep;
        }
        this.endereco = new Endereco();
        this.enderecoService.buscarPorCep(cep).subscribe(end => {
            this.endereco = this.enderecoService.endereco;
            if (this.enderecoService.endereco != null && (this.endereco === undefined || this.endereco === null)) {
                this.buscarViaCep(cep);
            } else {

                this.EnderecoToForm();
            }

        }, error => {
            this.buscarViaCep(cep);

        });


    }

    buscarViaCep(cep: String) {
        this.enderecoService.buscarViaCep(cep).subscribe(endereco => {
            if (!endereco.hasOwnProperty("erro") !== true) {
                this.pessoa.endereco = new Endereco();
                this.endereco = new Endereco();
                this.EnderecoToForm();
                this.showNotification('top', 'left', 'danger', 'CEP não encontrado!');
            } else {
                this.endereco = endereco;
                if (this.endereco !== undefined && this.endereco != null) {
                    this.incluirEndereco(this.endereco);
                }
            }

        }, error => {
            this.showNotification('top', 'left', 'danger', 'CEP não encontrado!');
        });
    }

    incluirEndereco(endereco: Endereco) {
        this.enderecoService.salvar(this.endereco).subscribe(end => {
            this.endereco = end;
            if (this.endereco !== undefined && this.endereco != null) {

                this.EnderecoToForm();
            }

        });
    }

    EnderecoToForm() {
        this.pessoa.endereco = this.endereco;
        this.form.get('cep').setValue(this.endereco.cep);
        this.form.get('logradouro').setValue(this.endereco.logradouro);
        this.form.get('complemento').setValue(this.endereco.complemento);
        this.form.get('bairro').setValue(this.endereco.bairro);
        this.form.get('localidade').setValue(this.endereco.localidade);
        this.form.get('uf').setValue(this.endereco.uf);
    }

    formToEndereco() {
        this.endereco.logradouro = this.form.get('logradouro').value;
        this.endereco.complemento = this.form.get('complemento').value;
        this.endereco.bairro = this.form.get('bairro').value;
        this.endereco.localidade = this.form.get('localidade').value;
        this.endereco.uf = this.form.get('uf').value;

    }

    showNotification(from, align, type, message) {
        // const type = ['', 'info', 'success', 'warning', 'danger'];
        // const type = ['danger'];
        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: 'notifications',
            message: message

        }, {
            type: type,
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }

    validaCPF(strCPF: String) {
        let Soma;
        let Resto;
        Soma = 0;
        if (strCPF === '00000000000') {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        if (Resto !== parseInt(strCPF.substring(9, 10))) {
            return false;
        }

        Soma = 0;
        for (let i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        if (Resto != parseInt(strCPF.substring(10, 11))) {
            return false;
        }
        return true;
    }
}
