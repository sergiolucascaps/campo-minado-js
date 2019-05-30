
var campoMinado = null;

$(function () {

    campoMinado = function () {

        var $_campoMinado =
            {
                elements:  
					{
						divTable:		null,
						lblNumMinas:	null,
						lblNumClicks:	null,
						btnConfigCampoMinado: null
					},
				elementsModalConfig:
					{
						linhas:		null,
						colunas:	null,
						minas:		null
					},
				privateValues:
					{
						numClicks : 0
					},
				presentationConfiguration:
					{
						button:
						{
							classPadrao:	"padrao",
							classMina:		"mina",
							classSuccess:	"sucesso",
							widthAndHeigth: "width: 35px; height: 30px;"
						}
					},
				configCampoMinado:
					{
						linhas:
						{
							min: 	2,
							max:	16
						},
						colunas:
						{
							min: 	2,
							max:	30
						},
						valores:
						{
							linhas:		16,
							colunas:	30,
							minas:		60
						}
					},
				frasesFimDeJogo:
					{
						vencedor: 
							[
								"Aaaahhh bixo brabo!!", 
								"Sempre acreditei em vc!",
								"Duvido conseguir ganhar de novo!",
								"Mas sei q isso é sorte de principiante!",
								"Vai lá mermão joga na mega!"
							],
						perdedor:
							[
								"Mas tu é ruinzinho(a) mesmo heim?!", 
								"É isso ai, da próxima vc ganha (ou não kk)",
								"Sabia q ia perder de novo :(",
								"Podia ter dormido sem mais essa derrota heim?!",
								"Pouts, já ta virando rotina heim! Vê se ganha na próxima..."
							]
					}
            }

        function _initializeScreen()
        {
			_limparCampo();
			_reiniciarVariaveis();
            _escreverLabelsTopo();
			_desenharCampo();
        }
		
		function _reInitializeScreen()
		{
			$_campoMinado.elements.lblNumClicks.innerText = 'CLICKS: 000'
			_initializeScreen();
		}
		
		function _reiniciarVariaveis()
		{
			$_campoMinado.privateValues.numClicks = 0;
		}
		
		function _limparCampo()
		{
			$($_campoMinado.elements.divTable)[0].innerHTML = '';
		}
		
		function _escreverLabelsTopo()
		{
			const config = _getValues();
			$_campoMinado.elements.lblNumMinas.innerText = (config.minas.toString().length == 1 ? 'MINAS: ' + '00' + config.minas : 'MINAS: ' + '0' + config.minas);
		}
		
		function _desenharCampo()
		{
			var objMensagem = new Mensagem();
			const config = _getValues();
			const campo = _gerarTabelaCampo(config);
			
			if(campo != null && campo != undefined)
			{
				_minarCampo(campo, config);
				_preencherTdsVizinhas(campo, config);
				$_campoMinado.elements.divTable.appendChild(campo);
				objMensagem.MostrarMensagem('Novo campo gerado', undefined, 'success')
			}
			else
			{
				objMensagem.MostrarMensagem('Problema ao gerar campo com as configurações indicadas.</br>Por favor atualize a página e tente tente novamente!', 'Oops...', 'error', true)
				return;
			}			
		}

		function _preencherTdsVizinhas(campo, config)
		{
			var lsMinas = $(campo).find("[mina='false']");

			for(let i = 0; i < lsMinas.length; i++)
			{
				let btn = lsMinas[i];
				let minas = _returnQtdMinasVizinhas(btn, campo, config);
				btn.setAttribute('minasaoredor', minas);
			}
		}

		function _returnQtdMinasVizinhas(btn, campo, config)
		{
			let minas	=	0;
			let linha	=	parseInt( btn.id.split('_')[0] );
			let coluna	=	parseInt( btn.id.split('_')[1] );
			
			minas	+=	_superiorEsquerda(linha, coluna, campo);
			minas	+=	_superior(linha, coluna, campo);
			minas	+=	_superiorDireita(linha, coluna, campo);
			minas	+=	_esquerda(linha, coluna, campo);
			minas	+=	_direita(linha, coluna, campo);
			minas	+=	_inferiorEsquerda(linha, coluna, campo);
			minas	+=	_inferior(linha, coluna, campo);
			minas	+=	_inferiorDireita(linha, coluna, campo);

			return minas;
		}

		function _isMina(btn)
		{
			return btn.getAttribute('mina') == 'true' ? 1 : 0;
		}

		function _retornaElementoId(id, campo)
		{
			return $(campo).find("[id='" + id + "']")[0];
		}

		function _inferiorDireita(linha, coluna, campo)
		{
			let id = (linha + 1) + '_' +  (coluna + 1);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _inferior(linha, coluna, campo)
		{
			let id = (linha + 1) + '_' +  (coluna);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _inferiorEsquerda(linha, coluna, campo)
		{
			let id = (linha + 1) + '_' +  (coluna - 1);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _direita(linha, coluna, campo)
		{
			let id = (linha) + '_' +  (coluna + 1);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _esquerda(linha, coluna, campo)
		{
			let id = (linha) + '_' +  (coluna - 1);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _superiorDireita(linha, coluna, campo)
		{
			let id = (linha - 1) + '_' +  (coluna + 1);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _superior(linha, coluna, campo)
		{
			let id = (linha - 1) + '_' +  (coluna);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}

		function _superiorEsquerda(linha, coluna, campo)
		{
			let id = (linha - 1) + '_' +  (coluna - 1);
			let btn = _retornaElementoId(id, campo);

			return btn != undefined ? _isMina(btn) : 0;
		}
		
		function _minarCampo(campo, config)
		{
			_minar(campo, config);
			return campo;
		}
		
		function _minar(campo, config)
		{
			let qtdMinasCampoAtual = $(campo).find("[mina='true']").length;

			while(qtdMinasCampoAtual < config.minas)
			{
				let idNovaMina = _inserirMina(campo, config);
				qtdMinasCampoAtual = $(campo).find("[mina='true']").length;
			}
		}
		
		function _inserirMina(campo, config)
		{
			let id	=	_returnIdAleatorio(config);
			let btn	=	$(campo).find("[id='" + id + "']")[0];

			if(btn == undefined || btn.getAttribute('mina') == 'true')
				_inserirMina(campo, config); // Recursive... Need generate new
			else
			{
				btn.setAttribute('mina', true);
				return id;
			}
		}
		
		function _returnIdAleatorio(config)
		{
			return _generateRandom(1, (config.linhas + 1)) + '_' + _generateRandom(1, (config.colunas + 1));
		}
		
		function _generateRandom(min, max) 
		{
		  return parseInt(Math.random() * (max - min) + min);
		}
		
		function _gerarTabelaCampo(config)
		{
			if(config.linhas > 0)
			{
				const tabela	= document.createElement('TABLE');
				
				tabela.appendChild(_criarBody(config));
				
				return tabela;
			}
			return null;
		}
		
		function _criarBody(config)
		{
			const tbody		= document.createElement('tbody'); 
			for(let i = 1; i <= config.linhas; i++)
			{
				let tr = document.createElement('tr'); 
				for(let j = 1; j <= config.colunas; j++)
				{
					let td = document.createElement('td');
					td.appendChild(_criarButton(i.toString() + "_" + j.toString()));
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			return tbody;
		}
		
		function _criarButton(id){
			
			const btn 	=	_returnBtn(id);
			const spam 	=	_returnSpam();
			
			btn.appendChild(spam);
			
			return btn;
		}
		
		function _returnBtn(id)
		{
			const btn = document.createElement("BUTTON");
			btn.id = id;
			btn.setAttribute('class', $_campoMinado.presentationConfiguration.button.classPadrao);
			btn.setAttribute('style', $_campoMinado.presentationConfiguration.button.widthAndHeigth);
			btn.setAttribute('mina', false);
			btn.type = "button";
			btn.setAttribute('onclick', 'campoMinado.clicarItem(this)');
			
			return btn;
		}
		
		function _clicado(bt)
		{
			if(	bt.getAttribute('mina') == 'true' &&
				bt.getAttribute('class') != $_campoMinado.presentationConfiguration.button.classMina)
			{
				bt.children[0].innerHTML = "☼";
				bt.setAttribute('class', $_campoMinado.presentationConfiguration.button.classMina);
				_finalizarJogo(false);
			}
			else if(bt.getAttribute('mina') == 'false' &&
					bt.getAttribute('class') != $_campoMinado.presentationConfiguration.button.classSuccess)
			{
				_incrementNumClicks();
				_insertNumClicks();
				bt.children[0].innerHTML = bt.getAttribute('minasaoredor');
				bt.setAttribute('class', $_campoMinado.presentationConfiguration.button.classSuccess);

				var valores = 
				{
					qtdBotoesCampo:	_getQtdBotoesCampo(),
					qtdMinasCampo:	_getQtdMinasCampo(),
					qtdClicksCampo:	_getNumClicks(),
				}

				if(parseInt(valores.qtdClicksCampo) == (valores.qtdBotoesCampo - valores.qtdMinasCampo))
					_finalizarJogo(true);
			}
		}
		
		function _finalizarJogo(vencedor = false)
		{
			var valores = 
			{
				qtdBotoesCampo:	_getQtdBotoesCampo(),
				qtdMinasCampo:	_getQtdMinasCampo(),
				qtdClicksCampo:	_getNumClicks(),
			}
			
			const layoutModal = _montaLayoutModal(valores, vencedor);
			_mostrarModalFimDeJogo(layoutModal);
			_mudarEventoBotoes();
		}
		
		function _mudarEventoBotoes()
		{
			var btns = $('#tableContent').find("button");
			
			for(let i = 0; i < btns.length; i++)
			{
				_mudaEvento(btns[i]);
			}
		}
		
		function _mudaEvento(botao)
		{
			botao.setAttribute('onclick', 'campoMinado.reInitializeScreen()');
		}
		
		function _mostrarModalFimDeJogo(layoutModal)
		{
			var objModal = new Modal();
			objModal.MostrarModal(layoutModal);
		}
		
		function _montaLayoutModal(valores, vencedor)
		{
			var modalConfig = new ModalPropriedades()
			modalConfig.propriedades.Titulo =	vencedor 
													? 'Parabéns ! *replace*!' 
													: 'Que pena ! *replace*'
			
			const bodyHtml =	'<h4>Resumo da Jogatina:</h4>'
								+'<ul>'
								+	'<li>Total de <b>botões</b> no Campo: 	' + valores.qtdBotoesCampo + '</li> '	 
								+	'<li>Total de <b>minas</b> no Campo: 	' + valores.qtdMinasCampo  + '</li> '	 
								+	'<li>Total de <b>clicks</b> sem minar:	' + valores.qtdClicksCampo + '</li> '	 
								+'</ul>'
			
			
			modalConfig.propriedades.Body	= bodyHtml;
			modalConfig.propriedades.Footer	= modalConfig.botoesPadroes.btnVoltar;

			modalConfig.cores.Titulo = vencedor ? "#008000" : "#FF0000";
			modalConfig.cores.Footer = vencedor ? "#008000" : "#FF0000";

			modalConfig.propriedades.Titulo = modalConfig.propriedades.Titulo.replace("*replace*", _escolhePiadinha(vencedor));
			
			return modalConfig;
		}

		function _escolhePiadinha(vencedor) {
			let arrPiadinhas =	vencedor 
									? $_campoMinado.frasesFimDeJogo.vencedor 
									: $_campoMinado.frasesFimDeJogo.perdedor;
									
			return arrPiadinhas[Math.floor(Math.random() * (arrPiadinhas.length - 1))];
		}
		
		function _getQtdBotoesCampo()
		{
			return (parseInt($_campoMinado.configCampoMinado.valores.colunas) * parseInt($_campoMinado.configCampoMinado.valores.linhas));
		}
		
		function _getQtdMinasCampo()
		{
			return ($_campoMinado.configCampoMinado.valores.minas);
		}
		
		function _insertNumClicks()
		{
			$_campoMinado.elements.lblNumClicks.innerText = 'CLICKS: ' + _getNumClicks();
		}
		
		function _incrementNumClicks()
		{
			$_campoMinado.privateValues.numClicks = ($_campoMinado.privateValues.numClicks + 1);
		}
		
		function _getNumClicks()
		{
			let clicks = $_campoMinado.privateValues.numClicks.toString().length == 1 ? "00" + $_campoMinado.privateValues.numClicks : "0" + $_campoMinado.privateValues.numClicks;
			
			return clicks;
		}
		
		function _returnSpam()
		{
			const spam = document.createElement("SPAN");
			spam.setAttribute('aria-hidden', 'true');
			
			return spam;
		}
				
		function _getValues()
		{
			return $_campoMinado.configCampoMinado.valores;
		}
		
		function _getConfigLinhas()
		{
			return $_campoMinado.configCampoMinado.linhas;
		}
		
		function _getConfigColunas()
		{
			return $_campoMinado.configCampoMinado.colunas;
		}
		
		function _abrirModalConfiguracoesCampo()
		{
			var prop = new ModalPropriedades()
			var objModal = new Modal()
			prop.propriedades.Titulo = 'Configurar Campo Minado';
			
			const configLinhas	=	_getConfigLinhas();
			const configColunas	=	_getConfigColunas();
			
			const bodyModal = 		'<ul> '
								+	'	<li>Quantidade de <b>linhas</b>:	<input id="txtQtdLinhasModalConfig"		type="number"	class="form-control"	required="required"	min="' + configLinhas.min + '" max="' + configLinhas.max + '" step="1" onchange="campoMinado.calculaQuantidadeMinas()" /></li> '
								+	'	<li>Quantidade de <b>Colunas</b>:	<input id="txtQtdColunasModalConfig"	type="number"	class="form-control"	required="required"	min="' + configColunas.min + '" max="' + configColunas.max + '" step="1" onchange="campoMinado.calculaQuantidadeMinas() "/></li> '
								+	'	<li>Quantidade de <b>Minas</b>:		<input id="txtQtdMinasModalConfig"		type="number"	class="form-control"	required="required"	min="2" max="10" step="1"/></li>'
								+	'</ul>';
			
			prop.propriedades.Body		=	bodyModal;
			prop.propriedades.Footer	=	prop.botoesPadroes.btnSalvarNovasConfigs + prop.botoesPadroes.btnVoltar;
			objModal.MostrarModal(prop);

			_setValuesModalConfiguracoes();
		}

		function _setValuesModalConfiguracoes()
		{
			const valores	=	_getValues();
			$($_campoMinado.elementsModalConfig.linhas)[0].value	=	valores.linhas;
			$($_campoMinado.elementsModalConfig.colunas)[0].value	=	valores.colunas;
			$($_campoMinado.elementsModalConfig.minas)[0].value		=	valores.minas;
		}
	
		function _calculaQuantidadeMinas()
		{
			var objMensagem = new Mensagem();
				
			if(	$($_campoMinado.elementsModalConfig.linhas)[0].value.trim()		!= '' &&
				$($_campoMinado.elementsModalConfig.colunas)[0].value.trim()	!= '')
				{
					let botao = $($_campoMinado.elementsModalConfig.minas)[0];
					let valorMaximo = $($_campoMinado.elementsModalConfig.linhas)[0].value.trim() * $($_campoMinado.elementsModalConfig.colunas)[0].value.trim();
					botao.setAttribute('min', '2');
					botao.setAttribute('max', valorMaximo - 1);
					botao.value = '';
				}
				else
				{
					$_campoMinado.configCampoMinado.valores.minas = '';
				}
		}
		
		function _salvarNovasConfiguracoesCampoModal()
		{
			var objMensagem = new Mensagem();

			if(!_todosCamposPreenchidos())
				objMensagem.MostrarMensagem('Todos os campos de Configuração são obrigatórios!', 'Atenção', 'warning');
			else
			{
				let validacoes = _validaMinMaxModalEdicao();
				if(!(validacoes.length > 0))
				{
					_setNovasConfiguracoesCampos();
					_setDataDismissBotaoSalvarModal();
					_reInitializeScreen();
				}
				else
					validacoes.forEach(function(mensagem){ objMensagem.MostrarMensagem(mensagem, 'Atenção', "warning")});
			}
		}

		function _validaMinMaxModalEdicao()
		{
			let validacoes = [];

			var linha	=	_validaMinMaxCampo($($_campoMinado.elementsModalConfig.linhas)[0]);
			var coluna	=	_validaMinMaxCampo($($_campoMinado.elementsModalConfig.colunas)[0]);
			var mina	=	_validaMinMaxCampo($($_campoMinado.elementsModalConfig.minas)[0]);

			if(linha.length > 0)
				validacoes.push(linha.replace("*replace*", "Linha"));

			if(coluna.length > 0)
				validacoes.push(coluna.replace("*replace*", "Coluna"));

			if(mina.length > 0)
				validacoes.push(mina.replace("*replace*", "Mina"));

			return validacoes;
		}

		function _validaMinMaxCampo(campo)
		{
			let minimo	=	parseInt(campo.getAttribute("min"));
			let maximo	=	parseInt(campo.getAttribute("max"));
			let valor	=	parseInt(campo.value);

			return (valor >= minimo && valor <= maximo)
				?	""
				:	"Campo *replace* não respeita configurações de mínimo e máximo!";
		}

		function _setNovasConfiguracoesCampos()
		{
			$_campoMinado.configCampoMinado.valores.linhas	=	$($_campoMinado.elementsModalConfig.linhas)[0].value;
			$_campoMinado.configCampoMinado.valores.colunas	=	$($_campoMinado.elementsModalConfig.colunas)[0].value;
			$_campoMinado.configCampoMinado.valores.minas	=	$($_campoMinado.elementsModalConfig.minas)[0].value;
		}
		
		function _setDataDismissBotaoSalvarModal()
		{
			let botao = document.getElementsByClassName('btn btn-success btn-md')[0];
			botao.setAttribute('data-dismiss', 'modal');
		}
		
		function _todosCamposPreenchidos()
		{
			return	(
						$($_campoMinado.elementsModalConfig.linhas)[0].value.trim()		!=	'' &&
						$($_campoMinado.elementsModalConfig.colunas)[0].value.trim()	!=	'' &&
						$($_campoMinado.elementsModalConfig.minas)[0].value.trim()		!=	''
					);
		}
		
        // public section
        return {
            init: function (options)  
			{
                $_campoMinado.elements.divTable				=	$(options.elements.divTable)[0];
                $_campoMinado.elements.lblNumMinas			=	$(options.elements.lblNumMinas)[0];
                $_campoMinado.elements.lblNumClicks			=	$(options.elements.lblNumClicks)[0];
                $_campoMinado.elements.btnConfigCampoMinado	=	$(options.elements.btnConfigCampoMinado)[0];
                
				$_campoMinado.elementsModalConfig.linhas	=	options.elementsModalConfig.linhas;
                $_campoMinado.elementsModalConfig.colunas	=	options.elementsModalConfig.colunas;
                $_campoMinado.elementsModalConfig.minas		=	options.elementsModalConfig.minas 	;
				
				$_campoMinado.elements.btnConfigCampoMinado.onclick = function(){ _abrirModalConfiguracoesCampo(); };
			},

            initializeScreen:	function () 	{	_initializeScreen();	},
            reInitializeScreen:	function () 	{	_reInitializeScreen();	},
            clicarItem:			function (bt)	{	_clicado(bt);			},
            salvarNovasConfiguracoesCampoModal:	function ()	{	_salvarNovasConfiguracoesCampoModal();	},
            calculaQuantidadeMinas:	function ()	{	_calculaQuantidadeMinas();	},
        };
    }();
});