#docker build -t fabiohigor/softplan:avaliacao .

#docker push fabiohigor/softplan:avaliacao

#docker pull fabiohigor/softplan:avaliacao

#docker run --name avaliacao -p 8080:8080 -p 4200:8081 fabiohigor/softplan:avaliacao


#Imagem base: Imagem do Java 8
FROM openjdk:8-jdk-alpine

#Diretório onde vai ficar o repositório clonado
WORKDIR /opt/tmp

#Exportando portas
EXPOSE 8081 
EXPOSE 8080

#Copia o jar para dentro do container 
COPY prova/target/prova-0.0.1-SNAPSHOT.jar /opt/tmp/

#Instalando pacotes necessarios
RUN apk add --update nodejs nodejs-npm
RUN npm install -g @angular/cli
RUN npm install http-server -g

#Copiando arquivos
COPY prova-front/dist/ /opt/tmp/dist/
COPY start.sh /opt/tmp/

#Permissao no script
RUN chmod a+x start.sh

#Executa a aplicação Back
RUN ls -l
ENTRYPOINT /opt/tmp/start.sh
