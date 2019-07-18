#docker build -t fabiohigor/softplan:avaliacao .

#docker push fabiohigor/softplan:avaliacao

#docker push fabiohigor/softplan:avaliacao

#docker run --name avaliacao -p 8080:8080 fabiohigor/softplan:avaliacao


#Imagem base: Imagem do Java 8
FROM openjdk:8-jdk-alpine

#Diretório onde vai ficar o repositório clonado
WORKDIR /opt/tmp
VOLUME /opt/tmp

EXPOSE 80

#Copia o jar para dentro do container 
COPY prova/target/prova-0.0.1-SNAPSHOT.jar /opt/tmp

#Executa a aplicação
CMD java -jar prova-0.0.1-SNAPSHOT.jar