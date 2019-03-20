/*global define */
/*jslint sloppy:true */
/*
| Copyright 2014 Esri
|
| Licensed under the Apache License, Version 2.0 (the "License");
| you may not use this file except in compliance with the License.
| You may obtain a copy of the License at
|
|    http://www.apache.org/licenses/LICENSE-2.0
|
| Unless required by applicable law or agreed to in writing, software
| distributed under the License is distributed on an "AS IS" BASIS,
| WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
| See the License for the specific language governing permissions and
| limitations under the License.
*/
define({
  "map": {
    "error": "Não foi possível criar mapa",
    "licenseError": {
      "message": "A sua conta não está licenciada para usar aplicações configuráveis não públicas. Peça ao administrador da sua organização para lhe atribuir um tipo de utilizador que inclua a licença para aplicações essenciais ou aplicações essenciais complementares.",
      "title": "Não licenciado"
    }
  },
  "webMapList": {
    "owner": "Proprietário",
    "created": "Data criada",
    "modified": "Data de modificação",
    "description": "Descrição",
    "snippet": "Resumo",
    "licenseInfo": "Restrições de utilização e acesso",
    "accessInformation": "Créditos",
    "tags": "Palavras-chave",
    "numViews": "Número de visualizações",
    "avgRating": "Avaliação",
    "noWebMapInGroup": "Grupo configurado é inválido ou itens ainda não foram partilhados com este grupo",
    "infoBtnToolTip": "Informação de mapa",
    "openWebmapList": "Abrir painel",
    "closeWebmapList": "Fechar painel"
  },
  "geoform": {
    "enterInformation": "Detalhes",
    "selectAttachments": "Anexos",
    "selectFileText": "Procurar",
    "enterLocation": "Localização",
    "reportItButton": "Submeter",
    "cancelButton": "Cancelar",
    "requiredField": "(exigido)",
    "selectDefaultText": "Selecionar&hellip;",
    "invalidInputValue": "Por favor, introduza um valor válido.",
    "noFieldsConfiguredMessage": "Campos de camada não são configuraveis para capturar dados",
    "invalidSmallNumber": "Por favor introduza um número inteiro",
    "invalidNumber": "Por favor introduza um número inteiro",
    "invalidFloat": "Por favor introduza um número",
    "invalidDouble": "Por favor introduza um número",
    "requiredFields": "Por favor forneça valores para todos os campos solicitados",
    "selectLocation": "Por favor seleccione uma localização para o seu relatório",
    "numericRangeHintMessage": "${openStrong}Pista:${closeStrong} valor Mínimo ${minValue} e valor Máximo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Pista:${closeStrong} data Mínima ${minValue} e data Máxima ${maxValue}",
    "errorsInApplyEdits": "Não foi possível enviar o relatório.",
    "attachmentSelectedMsg": "anexo(s) seleccionado(s)",
    "attachmentUploadStatus": "Não foi possível carregar ${failed} de ${total} anexo(s).",
    "attachmentDeleteStatus": "Não foi possível eliminar ${failed} de ${total} anexo(s).",
    "featureUpdateStatus": "Não foi possível atualizar ${failed} de ${total} elemento(s).",
    "geoLocationError": "Localização actual não disponível",
    "geoLocationOutOfExtent": "Localização actual está fora da extensão de mapa",
    "submitButtonTooltip": "Guardar",
    "cancelButtonTooltip": "Cancelar",
    "geoformBackButtonTooltip": "Regressar à lista de relatórios",
    "updateFeaturesConfirmationMsg": "${count} elementos serão atualizados",
    "attachmentHeaderText": "Anexos",
    "unknownPopupAttachment": "FICHEIRO",
    "unableToEditPopupMessage": "Não tem permissões para executar esta ação.",
    "invalidFeatureCreatorMessage": "Não possui autorização para editar este elemento.",
    "userSpecificFeatureUpdateMessage": "Apenas os elementos criados por ${username} foram atualizados.",
    "anonymousUserText": "Anónimo"
  },
  "mapViewer": {
    "zoomInToolTip": "Aumentar Zoom",
    "zoomOutToolTip": "Reduzir zoom"
  },
  "applicationHeader": {
    "signInOption": "Iniciar sessão",
    "signOutOption": "Terminar sessão",
    "pleaseSignInText": "Por favor inicie sessão"
  },
  "dataviewer": {
    "noIssuesReported": "Não existem relatórios disponíveis",
    "noFeatureGeometry": "Elemento não pode ser exibido",
    "ascendingFlagTitle": "Ordenar em ordem ascendente",
    "descendingFlagTitle": "Ordenar em ordem descendente",
    "filterLabel": "Filtro",
    "valueRadioButtonLabel": "Valor",
    "uniqueRadioButtonLabel": "Único",
    "selectLayerToBegin": "Selecione uma categoria para começar",
    "layerFeatureCount": "${selectedFeatureCount} selecionados / ${featureCount} registos",
    "exportToCsvSuccessMessage": "Ficheiro CSV exportado com êxito.",
    "exportToCsvErrorMessage": "Erro ao exportar os elementos selecionados para o ficheiro CSV. Tente novamente.",
    "exportToCSVButtonTooltip": "Exportar para CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Intervalo de tempo",
    "timeSliderInEditModeAlert": "Controlo deslizante de tempo indisponível durante a edição"
  },
  "comment": {
    "commentsFormSubmitButton": "Guardar",
    "commentsFormCancelButton": "Cancelar",
    "errorInSubmittingComment": "Não foi possível guardar as edições.",
    "emptyCommentMessage": "Valor necessário",
    "placeHolderText": "",
    "noCommentsAvailableText": "Não existem  registos disponíveis",
    "remainingTextCount": "${0} caractere(s) mantem-se",
    "showNoText": "Não",
    "selectAttachments": "Anexos",
    "selectFileText": "Procurar",
    "attachmentSelectedMsg": "anexo(s) seleccionado(s)",
    "attachmentHeaderText": "Anexos",
    "addRecordText": "Adicionar Registo",
    "unknownCommentAttachment": "FICHEIRO",
    "unableToAddOrEditCommentMessage": "Não tem permissões para executar esta ação."
  },
  "main": {
    "noGroup": "Nenhum grupo configurado",
    "basemapGalleryText": "Galeria de Mapas Base",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Elemento solicitado não encontrado"
  },
  "search": {
    "searchIconTooltip": "Pesquisar esta camada",
    "noResultFoundText": "Nenhum resultado encontrado",
    "searchInEditModeAlert": "Pesquisa indisponível durante a edição"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Atualizar",
    "confirmManualRefreshText": "Todas as selecções e alterações não guardadas serão discartadas"
  },
  "help": {
    "helpIconTooltip": "Ajuda"
  },
  "filter": {
    "noFeatureFoundText": "Não foi encontrado qualquer elemento para este valor.",
    "distinctQueryFailed": "Não foram encontrados valores distintos para o campo.",
    "andText": "e",
    "filterInEditModeAlert": "Filtros indisponíveis durante a edição.",
    "dropdownSelectOption": "Seleccionar",
    "filterInShowSelectedEditModeAlert": "Filtros indisponíveis no modo ‘Exibir Selecionado’."
  },
  "detailsPanel": {
    "editContentText": "Editar registo"
  },
  "signOutPage": {
    "signOutMessage": "Terminou sessão com sucesso",
    "reSignInMessage": "Clique aqui para iniciar sessão"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opções de Seleção",
    "showAllOptionText": "Mostrar Todos",
    "showSelectedOptionText": "Exibir Selecionados"
  }
});