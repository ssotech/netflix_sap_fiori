sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectnetflix.controller.Inicio", {
        onInit: function () {
            //variavel - lista vazia de resultado
            let resultados = {
                titles:[]
            }

            //definição de modelo - variavel especial para mostrar dados na tela
            let resultadosModel = new JSONModel();

            //atribuição de dados dentro da variavel
            resultadosModel.setData(resultados);

            //anexar modelo na tela

            let tela = this.getView();
            tela.setModel(resultadosModel, "APINetflix");

        },
        onInicioLinkPress: function(){
            alert("navegar para tela incial");
            

        },
       
        
        //buscar de dados na API da Netflix
        onBuscarDados: function(){
            //variavel para text de buscar
            let searchField = this.byId("idSearchField");
            let filtro = searchField.getValue();

            alert(filtro);
            
            
            // Comunicação da buscar com API NETFLIX - url + variavel 
            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=pt-br',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'e8b76647c1mshf5ffa053e3ff5f7p16d75ajsn7533c6278ff8',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);

                //Resgatar os dados da buscar e mostrar na tela e atualizar modelo

                let tela = this.getView();
                let modelo = tela.getModel("APINetflix");
                let dados = modelo.getData();

                //Limpar a lista
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh();

            }.bind(this));

        }
    });
});
