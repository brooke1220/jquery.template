function createElement(name){
	return $(document.createElement(name));
}

var JqueryTemplateRouterPage = {
	el: createElement('div').attr({class: 'jquery-template-router'}),
	view: function(){
		return {
			el: JqueryTemplateRouterPage.el,
			childers: this.router.routerElement.map(function(router){
				return {
					el: router
				}
			})
		}
	},
	refersh: function(){
		JqueryTemplate.render(JqueryTemplateRouterPage.el, this.routerElement)
	}
}

function JqueryTemplateRouter(jqueryTemplate, routers){
	this.routers = routers
	this.jqueryTemplate = jqueryTemplate

	this.renderPage(
		JqueryTemplateRouter.getHashPageUrl() || '/'
	)

	$(window).bind('hashchange', this.hashChangeEvent.bind(this))
}

JqueryTemplateRouter.getHashPageUrl = function(){
	var hash = window.location.hash,
		matchs = hash.match(/^(#!\/)([a-zA-Z0-9-_]+)?$/)

	return matchs ? '/' + (matchs[2] || '') : matchs
}


JqueryTemplateRouter.prototype.getCurrentPage = function(){
	var page = JqueryTemplateRouter.getHashPageUrl() || '/'
	return this.routers[page];
}

JqueryTemplateRouter.prototype.hashChangeEvent = function(){
	var page = JqueryTemplateRouter.getHashPageUrl()
	if(page === null) return
	this.renderPage(page)
	JqueryTemplateRouterPage.refersh.call(this)
}

JqueryTemplateRouter.prototype.renderPage = function(page){
	this.routerElement = this.jqueryTemplate.compileComponent(this.routers[page])
}

function JqueryTemplate(options){
	this.pageRender = options.render
	this.hasRouter = options.hasOwnProperty('routers')

	if(this.hasRouter){
		 this.router = new JqueryTemplateRouter(this, options.routers)
	}
}

JqueryTemplate.isComponent = function(element){
	return element.hasOwnProperty('view')
}

JqueryTemplate.render = function(el, element){
	$(el).empty().append(element)
}

JqueryTemplate.prototype.createElement = function(component){
	var el = component.el,
		events = component.events || {},
		childers = component.childers || []

	for(var event in events) {
		$(el).on(event, events[event])
	}

	childers = this.compileComponent(childers)

	return el.append(childers)
}

JqueryTemplate.prototype.compileComponent = function(components){
	if(! (components instanceof Array)) components = [components]

	var elements = []
	for(var i in components){
		if(JqueryTemplate.isComponent(components[i])){
			var element = components[i].view.call(this)
			if(element instanceof Array) elements = elements.concat(this.compileComponent(element))
			else elements.push(this.createElement(element))
		}else{
			elements.push(this.createElement(components[i]))
		}
	}

	return elements
}

JqueryTemplate.prototype.$mount = function(el){
	JqueryTemplate.render(el, this.pageRender(this.compileComponent.bind(this)))
}