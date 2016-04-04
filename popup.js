
function atualizaResultado (nomeLista, idCampeonato) {
  var url = 'http://api.football-data.org/alpha/soccerseasons/'+idCampeonato+'/fixtures?timeFrame=p10';
$.ajax({
    url: url,
    headers: {
      'X-Auth-Token':'b6db5bc5188940308d9f63d41bf70024'
    }
  }).done(function(reponse) {
    exibirInformations(nomeLista,reponse.fixtures);
  });
};

function pegarImagemBrasao (imageName, url) {
  var caminho = url;
  $.ajax({
    url: caminho,
    headers: {
      'X-Auth-Token':'b6db5bc5188940308d9f63d41bf70024'
    }
  }).done(function(reponse) {
    $('#' + imageName).attr('alt',reponse.name);
    $('#' + imageName).attr('title',reponse.name);
    $('#' + imageName).attr('src',reponse.crestUrl);
  });
};

function exibirInformations(nomeLista,jogos) {
  if(jogos == null) {
    $('#noData').show();
    return;
  }
  var list = document.getElementById(nomeLista);
  var urlImage1;
  var urlImage2;
$.each(jogos, function(index, jogo) {

var dataJogo = '';
if(jogo.date != null)
  dataJogo = jogo.date.substr(0,10);

var imageId1 = 'image1' + jogo._links.self.href.slice(-4);
var imageId2 = 'image2' + jogo._links.self.href.slice(-4);

  //var html = '<li>' + jogo.homeTeamName + ' <img class=imagem id=' + imageId1  + ' /> ' + jogo.result.goalsHomeTeam + ' x ';
  //html = html + jogo.result.goalsAwayTeam + ' <img class=imagem id=' + imageId2  + ' />  ' + jogo.awayTeamName + '</li>';

  var html = '<li class=listaJogo><span class=dataJogo>' + dataJogo + '</span><img class=imagem id=' + imageId1  + ' />' + jogo.result.goalsHomeTeam + ' x ';
  html = html + jogo.result.goalsAwayTeam + ' <img class=imagem id=' + imageId2  + ' /></li>';

  pegarImagemBrasao(imageId1, jogo._links.homeTeam.href);
  pegarImagemBrasao(imageId2, jogo._links.awayTeam.href);
  console.log(html);

  $('#'+nomeLista).append(html);
    //var entry = document.createElement('li');
    //entry.appendChild(document.createTextNode(texto));
    //list.appendChild(entry);
  });
};


$(document).ready(function() {
  atualizaResultado('listIngles','398');
  atualizaResultado('listAlemao','394');
  atualizaResultado('listEspanhol','399');
});
