#Author: rsppnet@hotmailcom
@sicredi
Feature: Consultar restricoes no CPF
  Eu como usuario, quero consultar restricoes nos cpfs informados

  @getRest
  Scenario: Restricoes
    Given que acesse a API "http://localhost:8080/api/v1/restricoes/"
 
 @postRest
  Scenario: Fazer um post em simulacoes
    Given que eu faca o post na API "http://localhost:8080/api/v1/simulacoes"

	@putRest
  Scenario: Fazer uma alteracao no cadastro
    Given que eu faca o put na API "http://localhost:8080/api/v1/simulacoes/"
 
	@getList
  Scenario: Consultar todas as listas
    Given fazer o get Simulacoes "http://localhost:8080/api/v1/simulacoes"
  
	@getCPF
  Scenario: Consultar pelo cpf
    Given eu faca o get para consultar cpf "http://localhost:8080/api/v1/simulacoes/"
 
	@delete
  Scenario: Delete pelo cpf
    Given faca um Delete na API  "http://localhost:8080/api/v1/simulacoes/"
  
