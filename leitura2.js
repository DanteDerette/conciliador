
function geral(minhaContagem) {
  let tentativa = minhaContagem;
  let esquerda = document.querySelector("#conteudo_38048_102_1 > div > section > div.conteudo_tela_tab.conteudo_show_on_top.height_auto.border_default_bottom.border_default_left.border_default_right > article:nth-child(2) > div > section > div.conteudo_tela_tab.conteudo_show_on_top.height_auto.border_default_bottom.border_default_left.border_default_right > article:nth-child(1) > div > div.height_auto.separador_caixa > div:nth-child(1) > div > div.height_auto > span > article > div.form_consulta.auto_adaptable_flex > div > table > tbody")
  
  let direita = document.querySelector("#conteudo_38048_102_1 > div > section > div.conteudo_tela_tab.conteudo_show_on_top.height_auto.border_default_bottom.border_default_left.border_default_right > article:nth-child(2) > div > section > div.conteudo_tela_tab.conteudo_show_on_top.height_auto.border_default_bottom.border_default_left.border_default_right > article:nth-child(1) > div > div.height_auto.separador_caixa > div:nth-child(2) > div > div.height_auto > span > article > div.form_consulta.auto_adaptable_flex > div > table > tbody");

  let botaoConciliar = document.querySelector(
    '#conteudo_38048_102_1 > div > section > div.conteudo_tela_tab.conteudo_show_on_top.height_auto.border_default_bottom.border_default_left.border_default_right > article:nth-child(2) > div > section > div.conteudo_tela_tab.conteudo_show_on_top.height_auto.border_default_bottom.border_default_left.border_default_right > article:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > span > button'
  );

  let esquerdaLen = esquerda.getElementsByTagName('tr').length;
  let direitaLen = direita.getElementsByTagName('tr').length;

  let creditosEsquerda = [];
  let debitosDireita = [];

  let creditosEsquerdaEl = [];
  let debitosDireitaEl = [];

  function replaceThings(el) {
    return parseFloat(
      el
        .getElementsByTagName('td')[5]
        .innerText.replace('.', '')
        .replace(',', '.')
    );
  }

  for (var i = 0; i < esquerdaLen; i++) {
    if (
      esquerda.getElementsByTagName('tr')[i].getElementsByTagName('td')[4]
        .innerText == 'C'
    ) {
      creditosEsquerda.push([
        replaceThings(esquerda.getElementsByTagName('tr')[i]),
      ]);
      creditosEsquerdaEl.push(esquerda.getElementsByTagName('tr')[i]);
    }
  }

  for (var i = 0; i < direitaLen; i++) {
    if (
      direita.getElementsByTagName('tr')[i].getElementsByTagName('td')[4]
        .innerText == 'D'
    ) {
      debitosDireita.push([
        replaceThings(direita.getElementsByTagName('tr')[i]),
      ]);
      debitosDireitaEl.push(direita.getElementsByTagName('tr')[i]);
    }
  }

  var x = creditosEsquerda;
  var sums = [];
  var sets = [];
  var parObj = [];
  function SubSets(read, queued) {
    if (
      read.length == minhaContagem ||
      (read.length <= minhaContagem && queued.length == 0)
    ) {
      if (read.length > 0) {
        var total = read.reduce(function (a, b) {
          return a + b;
        }, 0);
        if (sums.indexOf(total) == -1) {
          let meuObj = {
            somaDosConjuntos: parseFloat(parseFloat(total).toFixed(2)),
            conjuntoDeValores: read.slice().sort(),
          };
          for (var i = 0; i < debitosDireita.length; i++) {
            if (debitosDireita[i] == meuObj.somaDosConjuntos) {
              meuObj['debitoCorrespondente'] = debitosDireita[i][0];
              meuObj['elementoDebitoCorrespondente'] = debitosDireitaEl[i];
              sums.push(parseFloat(parseFloat(total).toFixed(2)));
              sets.push(read.slice().sort());
              parObj.push(meuObj);
            }
          }
        }
      }
    } else {
      SubSets(read.concat(queued[0]), queued.slice(1));
      SubSets(read, queued.slice(1));
    }
  }
  SubSets([], x);
  try {
    parObj[0]['elementoCreditoCorrespondente'] = [];

    for (var i = 0; i < parObj[0].conjuntoDeValores.length; i++) {
      for (var x = 0; x < creditosEsquerdaEl.length; x++) {
        if (
          parObj[0].conjuntoDeValores[i] == replaceThings(creditosEsquerdaEl[x])
        ) {
          parObj[0]['elementoCreditoCorrespondente'].push(
            creditosEsquerdaEl[x]
          );
          creditosEsquerdaEl.splice(x, 1);
        }
      }
    }
    parObj[0].elementoDebitoCorrespondente.click();
    for (var i = 0; i < minhaContagem; i++) {
      parObj[0].elementoCreditoCorrespondente[i].click();
    }
    botaoConciliar.click();
  } catch (e) {
    if (tentativa < 20) {
      tentativa = tentativa + 1;
      geral(tentativa);
    }
  }
}
geral(1)
