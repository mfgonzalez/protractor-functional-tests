
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

	it('Deve informar email no sign in', function(){
		clicarLinkSignIn();
		clicarBotaoPorId('SubmitCreate');
		var ec = protractor.ExpectedConditions;
		var ele =$('#create_account_error');
		browser.wait(ec.visibilityOf(ele), 5000, 'Não encontrou o elemento!')
		expect($('.alert-danger > ol > li').getText()).toEqual('Invalid email address.');
	});

	it('Deve informar email e password para login', function(){
		clicarLinkSignIn();
		clicarBotaoPorId('SubmitLogin');
		expect($('.alert-danger > ol > li').getText()).toEqual('An email address required.');
	});



	it('Deve informar email para assinar newsletter', function(){
		clicarBotaoPorName('submitNewsletter');
		expect($('.alert-danger').getText()).toEqual('Newsletter : Invalid email address.');
	});


	it('Carrinho vazio', function(){
		clicarHref('.shopping_cart');
		expect($('.alert-warning').getText()).toEqual('Your shopping cart is empty.');
	});


	it('Deve informar email para contato', function(){
		clicarHref('#contact-link');
		clicarBotaoPorId('submitMessage');
		expect($('.alert-danger ol > li').getText()).toEqual('Invalid email address.');
	});

});