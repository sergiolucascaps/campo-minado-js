class Mensagem 
{
	constructor() { }
	
	MostrarMensagem(mensagem = '', titulo = '', tipo_mensagem = 'info', flg_obriga_resposta = false) {
		
		toastr.options =
			{
				closeButton:		true,
				debug:				false,
				newestOnTop:		false,
				progressBar:		true,
				rtl:				false,
				positionClass:		'toast-top-right',
				preventDuplicates:	false,
				onclick:			null,
				showDuration:		300,
				hideDuration:		1000,
				timeOut:			flg_obriga_resposta ? 0 : 5000,
				extendedTimeOut:	flg_obriga_resposta ? 0 : 1000,
				showEasing:			'swing',
				hideEasing:			'linear',
				showMethod:			'fadeIn',
				hideMethod:			'fadeOut',
				tapToDismiss:		flg_obriga_resposta ? true : false
			};

		mensagem += flg_obriga_resposta ? '<br /><br /><button type="button" class="btn clear">OK</button>' : '';
		
		switch (tipo_mensagem) 
		{
			case 'error':
				titulo != undefined && titulo != '' ? toastr.error(mensagem, titulo) : toastr.error(mensagem);
				break;
			case 'success':
				titulo != undefined && titulo != '' ? toastr.success(mensagem, titulo) : toastr.success(mensagem);
				break;
			case 'info':
				titulo != undefined && titulo != '' ? toastr.info(mensagem, titulo) : toastr.info(mensagem);
				break;
			case 'warning':
				titulo != undefined && titulo != '' ? toastr.warning(mensagem, titulo) : toastr.warning(mensagem);
				break;
			default:
				titulo != undefined && titulo != '' ? toastr.info(mensagem, titulo) : toastr.info(mensagem);
		}
	}
}
class Modal {

	constructor() 
	{
		this.Titulo		=	'#tituloModal';
		this.CorTitulo	=	'.modal-header';
		this.Body		=	'#conteudoModal';
		this.CorBody	=	'.modal-body';
		this.Footer		=	'#footerModal';
		this.CorFooter	=	'.modal-footer';
		this.Modal		=	'#myModal';
	}

	MostrarModal(prop) 
	{
		$(this.Titulo).html(prop.propriedades.Titulo);
		$(this.CorTitulo)[0].style.backgroundColor = (prop.cores.Titulo);
		$(this.Body).html(prop.propriedades.Body);
		$(this.CorBody)[0].style.backgroundColor = (prop.cores.Body);
		$(this.Footer).html(prop.propriedades.Footer);
		$(this.CorFooter)[0].style.backgroundColor = (prop.cores.Footer);
		$(this.Modal).modal();
	}
}

class ModalPropriedades 
{
	constructor() 
	{
		this.propriedades =
			{
				Titulo:	'',
				Body:	'',
				Footer:	''
			};
		this.cores =
			{
				Titulo:	'#FFFFFF',
				Body:	'#FFFFFF',
				Footer:	'#FFFFFF'
			};
		this.botoesPadroes =
			{
				btnVoltar: '<div class="col-md-2" style="float: right;"> <button type="button" class="btn btn-default btn-md" onclick="limpaModal();" data-dismiss="modal">Fechar</button> </div>',
				btnSalvarNovasConfigs: '<div class="col-md-2" style="float: right;"> <button type="button" class="btn btn-success btn-md" onclick="campoMinado.salvarNovasConfiguracoesCampoModal();" >Salvar</button> </div>'
			};
	}
}

var objMensagem = new Mensagem();

function limpaModal()
{
	$("#conteudoModal, #tituloModal, #hddFooter").html("");
}