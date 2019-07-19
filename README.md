O desafio proposto foi https://github.com/softplan/softplayer-java-apply


1) Back-end
A aplicação, a ser desenvolvida em Java, deverá expor uma API de cadastro, alteração, remoção e consulta de pessoas com as seguintes informações:

Nome - obrigatório
Sexo
E-mail - não obrigatório, deve ser validado caso preenchido
Data de Nascimento - obrigatório, deve ser validada
Naturalidade
Nacionalidade
CPF - obrigatório, deve ser validado (formato e não pode haver dois cadastros com mesmo cpf)
Obs: a data de cadastro e atualização dos dados devem ser armazenados.

Tecnologias usadas: Spring / Hibernate 
Status: Finalizado


2) Front-end
A aplicação deverá ser acessível via navegador e possuir uma tela com formulário. 
Não há restrição em relação à tecnologia para o desenvolvimento do frontend.

Tecnologias usadas: Angular / tema free do https://www.creative-tim.com/product/material-kit
Status: Finalizado

3) Segurança
O acesso à aplicação só poderá ser realizado por um usuário pré-existente via autenticação basic.

Status: Não realizado

4) Instalação
A aplicação deverá estar disponível em uma imagem docker a partir do docker-hub e não deve exigir 
configurações/parâmetros. Ou seja, ao rodar a imagem, deve levantar a aplicação e funcionar.

A Imagem está em docker pull fabiohigor/softplan:avaliacao

#docker run --name avaliacao -p 8080:8080 -p 4200:8081 fabiohigor/softplan:avaliacao

5) Código fonte
A aplicação deverá possuir um endpoint /source acessível sem autenticação via HTTP GET que deverá retornar o link do projeto no github com o código fonte do projeto desenvolvido.

Status: Finalizado


Extras

A aplicação rodando em algum ambiente em nuvem.

Não consegui rodar a aplicação inteira no Azure, está rodando somente 
o back-end em http://fabionasoftplan.azurewebsites.net/swagger-ui.html#


A API deverá conter documentação executável que poderá ser utilizada durante seu desenvolvimento. (Utilizar swagger)
Status: Finalizado

Versão 2 da API que deve incluir endereço da pessoa como dado obrigatório. Versão 1 deve continuar funcionando.
Status: Finalizado