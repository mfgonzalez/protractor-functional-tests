
' use strict';

describe('Protractor Demo App', function(){

	var url = 'http://automationpractice.com/index.php';

	beforeEach(function(){
		browser.waitForAngularEnabled(false);
		browser.get(url);
	});
	
	function clicarHref(ref){
		var cartLink = $(ref +' > a');
		cartLink.click();
	}

	function clicarLinkSignIn()
	{
		var signInLink = element(by.linkText('Sign in'));
		signInLink.click();
	};

	function clicarBotaoPorId(botao)
	{
		var btn = element(by.id(botao));
		btn.click();
	};

	function clicarBotaoPorName(botao)
	{
		var btn = element(by.name(botao));
		btn.click();
	};

	/*
	**	1) Dado que o usuário não digita nada na caixa de texto de pesquisa
	**	Quando clicar no botão de pesquisa (lupa)
	**	Então exibir a tela de resultdo de busca com a mensagem "Please enter a search keyword"
	*/
	it('Deve informar algo na caixa de texto de pesquisa', function() {
		clicarBotaoPorName('submit_search');
		expect($('.alert-warning').getText()).toEqual('Please enter a search keyword');
	});

	/*
	**	2) Dado que o usuário não informa o e-mail na tela de "sign in"
	**	Quando clicar no botão "Create an account"
	**	Então exibir a mensagem "Invalid email address."
	*/
	it('Deve informar email no sign in', function(){
		clicarLinkSignIn();
		clicarBotaoPorId('SubmitCreate');
		var ec = protractor.ExpectedConditions;
		var ele =$('#create_account_error');
		browser.wait(ec.visibilityOf(ele), 5000, 'Não encontrou o elemento!')
		expect($('.alert-danger > ol > li').getText()).toEqual('Invalid email address.');
	});

	/*
	**	3) Dado que o usuário não informa o e-mail e Password na tela de "sign in"
	**	Quando clicar no botão "Sign in"
	**	Então exibir a mensagem "An email address required."
	*/
	it('Deve informar email para login', function(){
		clicarLinkSignIn();
		clicarBotaoPorId('SubmitLogin');
		expect($('.alert-danger > ol > li').getText()).toEqual('An email address required.');
	});

	/*
	**	4) Dado que o usuário informa o e-mail e não informa Password na tela de "sign in"
	**	Quando clicar no botão "Sign in"
	**	Então exibir a mensagem "Password is required."
	*/
	it('Deve informar email e password para login', function(){
		clicarLinkSignIn();
		//TODO: DIGITAR UM EMAIL VALIDO
		clicarBotaoPorId('SubmitLogin');
		expect($('.alert-danger > ol > li').getText()).toEqual('An email address required.');
	});

	/*
	**	5) Dado que o usuário não informa o e-mail
	**	Quando clicar no botão da Newsletter
	**	Então exibir a mensagem "Newsletter : Invalid email address."
	*/
	it('Deve informar email para assinar newsletter', function(){
		clicarBotaoPorName('submitNewsletter');
		expect($('.alert-danger').getText()).toEqual('Newsletter : Invalid email address.');
	});

	/*
	**	6) Dado que o usuário não tem items no carrinho
	**	Quando clicar no botão "Cart"
	**	Então deve exibir a mensagem "Your shopping cart is empty."
	*/
	it('Carrinho vazio', function(){
		clicarHref('.shopping_cart');
		expect($('.alert-warning').getText()).toEqual('Your shopping cart is empty.');
	});

	/*
	**	7) Dado que o usuário não informa o e-mail 
	**	Quando clicar no botão "Send" da tela de contato
	**	Então exibe a mensagem "Invalid email address."
	*/
	it('Deve informar email para contato', function(){
		clicarHref('#contact-link');
		clicarBotaoPorId('submitMessage');
		expect($('.alert-danger ol > li').getText()).toEqual('Invalid email address.');
	});

	/*
	**	8) Dado que o usuário informa somente o e-mail 
	**	Quando clicar no botão "Send" da tela de contato
	**	Então exibe a mensagem "The message cannot be blank."
	*/
	it('Deve informar email e mensagem para contato', function(){
		clicarHref('#contact-link');
		//TODO: DIGITAR UM EMAIL VALIDO
		clicarBotaoPorId('submitMessage');
		expect($('.alert-danger ol > li').getText()).toEqual('Invalid email address.');
	});

});