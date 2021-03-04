function createElement(name){
	return $(document.createElement(name));
}

function isComponent(element){
	return element.hasOwnProperty('view')
}

function render(el, element){
	$(el).append(compileComponent(element))
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