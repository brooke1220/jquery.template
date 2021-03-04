$(function(){
	$(window).bind('hashchange', hashChangeFire)
})

var hashRouter = false
function hashChangeFire(){
	if(hashRouter == false) return
	var page = getHashPage()
	if(page === null) return
	renderPage(page)
}

function getHashPage(){
	var hash = window.location.hash,
		matchs = hash.match(/^(#!\/)([a-zA-Z0-9-_]+)?$/)
	return matchs ? '/' + (matchs[2] || '') : matchs
}

var el, routers = {}
function renderPage(){
	if(arguments.length == 2){
		el = arguments[0]
		routers = arguments[1]
		hashRouter = true
	}
	var page = arguments.length == 2 ? (getHashPage() || '/') : arguments[0]
	render(el, routers[page])
}

function createElement(name){
	return $(document.createElement(name));
}

function isComponent(element){
	return element.hasOwnProperty('view')
}

function render(el, element){
	$(el).empty().append(compileComponent(element))
}

function compileComponent(element){
	if(! (element instanceof Array)) element = [element]
	var elements = []
	for(var i in element){
		if(isComponent(element[i])){
			components = element[i].view()
			if(components instanceof Array) elements = elements.concat(compileComponent(components))
			else elements.push(compileElement(components))
		}else{
			elements.push(compileElement(element[i]))
		}
	}
	return elements
}

function compileElement(element){
	var el = element.el,
		events = element.events || {},
		childers = element.childers || []
	for(var event in events) {
		$(el).on(event, events[event])
	}
	childers = compileComponent(childers)
	return el.append(childers)
}