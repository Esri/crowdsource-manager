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
    "error": "Não foi possível criar o mapa",
    "licenseError": {
      "message": "Sua conta não está licenciada para utilizar Aplicativos Configuráveis que não sejam públicos. Solicite ao administrador da sua organização que lhe atribua um tipo de usuário que inclua os Aplicativos Fundamentais ou uma licença complementar dos Aplicativos Fundamentais.",
      "title": "Não Licenciado"
    }
  },
  "webMapList": {
    "owner": "Proprietário",
    "created": "Data de criação",
    "modified": "Data modificada",
    "description": "Descrição",
    "snippet": "Resumo",
    "licenseInfo": "Restrições de uso e acesso",
    "accessInformation": "Créditos",
    "tags": "Tags",
    "numViews": "Número de visualizações",
    "avgRating": "Classificação",
    "noWebMapInGroup": "O grupo configurado é inválido ou nenhum item ainda foi compartilhado com este grupo",
    "infoBtnToolTip": "Informações do Mapa",
    "openWebmapList": "Abrir painel",
    "closeWebmapList": "Fechar painel"
  },
  "geoform": {
    "enterInformation": "Detalhes",
    "selectAttachments": "Anexos",
    "selectFileText": "Procurar",
    "enterLocation": "Localização",
    "reportItButton": "Enviar",
    "cancelButton": "Cancelar",
    "requiredField": "(exigido)",
    "selectDefaultText": "Selecionar&hellip;",
    "invalidInputValue": "Insira um valor válido.",
    "noFieldsConfiguredMessage": "Os campos da camada não configurados para capturar dados",
    "invalidSmallNumber": "Digite um número inteiro",
    "invalidNumber": "Digite um número inteiro",
    "invalidFloat": "Digite um número",
    "invalidDouble": "Digite um número",
    "requiredFields": "Forneça valores para todos os campos exigidos",
    "selectLocation": "Selecione o local para seu relatório",
    "numericRangeHintMessage": "${openStrong}Sugestão:${closeStrong} Valor mínimo ${minValue} e Valor máximo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Sugestão:${closeStrong} Data mínima ${minValue} e Data máxima ${maxValue}",
    "errorsInApplyEdits": "Não foi possível enviar o relatório.",
    "attachmentSelectedMsg": "anexos selecionados",
    "attachmentUploadStatus": "Falha ao carregar ${failed} de ${total} anexos.",
    "attachmentDeleteStatus": "Falha ao excluir ${failed} de ${total} anexos.",
    "featureUpdateStatus": "Falha ao atualizar ${failed} de ${total} anexos.",
    "geoLocationError": "O local atual não está disponível",
    "geoLocationOutOfExtent": "O local atual está fora da extensão do mapa base",
    "submitButtonTooltip": "Salvar",
    "cancelButtonTooltip": "Cancelar",
    "geoformBackButtonTooltip": "Retornar para lista de relatório",
    "updateFeaturesConfirmationMsg": "${count} feições serão atualizadas",
    "attachmentHeaderText": "Anexos",
    "unknownPopupAttachment": "ARQUIVO",
    "unableToEditPopupMessage": "Você não tem permissão para executar esta ação.",
    "invalidFeatureCreatorMessage": "Você não está autorizado para editar esta feição.",
    "userSpecificFeatureUpdateMessage": "Somente feições criadas pelo ${username} foram atualizadas.",
    "anonymousUserText": "Anônimo"
  },
  "mapViewer": {
    "zoomInToolTip": "Mais Zoom",
    "zoomOutToolTip": "Menos Zoom"
  },
  "applicationHeader": {
    "signInOption": "Acessar",
    "signOutOption": "Sair",
    "pleaseSignInText": "Entrar"
  },
  "dataviewer": {
    "noIssuesReported": "Nenhum relatório disponível",
    "noFeatureGeometry": "A feição não pode ser exibida",
    "ascendingFlagTitle": "Classificar em ordem crescente",
    "descendingFlagTitle": "Classificar em ordem decrescente",
    "filterLabel": "Filtrar",
    "valueRadioButtonLabel": "Valor",
    "uniqueRadioButtonLabel": "Único",
    "selectLayerToBegin": "Selecione uma categoria para iniciar",
    "layerFeatureCount": "${selectedFeatureCount} selecionado / ${featureCount} registros",
    "exportToCsvSuccessMessage": "Arquivo CSV exportado com sucesso.",
    "exportToCsvErrorMessage": "Erro ao exportar feições selecionadas para arquivo CSV. Tente novamente.",
    "exportToCSVButtonTooltip": "Exportar para CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Intervalo de tempo",
    "timeSliderInEditModeAlert": "Controle deslizante de tempo indisponível durante edição"
  },
  "comment": {
    "commentsFormSubmitButton": "Salvar",
    "commentsFormCancelButton": "Cancelar",
    "errorInSubmittingComment": "Não foi possível salvar as edições.",
    "emptyCommentMessage": "Valor exigido",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nenhum registro disponível",
    "remainingTextCount": "${0} caracteres restantes",
    "showNoText": "Não",
    "selectAttachments": "Anexos",
    "selectFileText": "Procurar",
    "attachmentSelectedMsg": "anexos selecionados",
    "attachmentHeaderText": "Anexos",
    "addRecordText": "Adicionar Registros",
    "unknownCommentAttachment": "ARQUIVO",
    "unableToAddOrEditCommentMessage": "Você não tem permissão para executar esta ação."
  },
  "main": {
    "noGroup": "Nenhum grupo configurado",
    "basemapGalleryText": "Galeria de Mapa Base",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Feição solicitada não encontrada"
  },
  "search": {
    "searchIconTooltip": "Pesquisar esta camada",
    "noResultFoundText": "Nenhum resultado encontrado",
    "searchInEditModeAlert": "Pesquisa indisponível durante edição"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Atualizar",
    "confirmManualRefreshText": "Todas as seleções e alterações não salvas serão descartadas"
  },
  "help": {
    "helpIconTooltip": "Ajuda"
  },
  "filter": {
    "noFeatureFoundText": "Nenhuma feição encontrada para este valor.",
    "distinctQueryFailed": "Nenhum valor distinto encontrado para o campo.",
    "andText": "e",
    "filterInEditModeAlert": "Filtros indisponíveis durante edição.",
    "dropdownSelectOption": "Selecionar",
    "filterInShowSelectedEditModeAlert": "Filtros indisponíveis no modo 'Mostrar Selecionado'."
  },
  "detailsPanel": {
    "editContentText": "Editar registro"
  },
  "signOutPage": {
    "signOutMessage": "Você saiu com sucesso",
    "reSignInMessage": "Clique aqui para entrar"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opções de Seleção",
    "showAllOptionText": "Mostrar Todos",
    "showSelectedOptionText": "Mostrar Selecionados"
  }
});