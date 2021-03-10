## jquery.template.js

受 [mj.js](https://github.com/ahui2016/mj.js) 启发的基于 jQuery 实现的极简框架。

## 简介

实现模板组件化写法 组件的嵌套和复用 完全用jquery实现

使用时，完完全全是 jQuery 的基本操作，对于已经会用 jq 的人来说，学习成本接近零。

## 2.0版本
> 2.0版本是因为作者习惯vue写法而进行迭代的

2.0完全类vue开发模式 但是底层还是jq

## 支持路由

见下面例子

## 例子

#### 普通写法(无路由)

```
const HelloWord = {
  view: function(){
	return [
	  {
		el: createElement('span').attr({class: 'hello-word'}).text('hello word'),
		events: {
		  click: function(){
			alert('hello word')
		  }
		}
	  }
	]
  }
}

const Main = {
  view: function(){
	return [
	  {
		el: createElement('h1').attr({class: 'title'}),
		events: {
		  click: function(){
			alert('请点击hello word哦')
		  }
		},
		childers: [
		  {
			el: createElement('span').text('jquery.template.js')
		  }
		]
	  },
	  HelloWord,
	  {
		el: createElement('div'),
		childers: [
		  {
			el: createElement('span').text('作者邮箱: overbob@yeah.net'),
			events: {
			  click: function(){
				alert('请邮件联系我')
			  }
			}
		  }
		]
	  }
	]
  }
}

var app = new JqueryTemplate({
	render: function(h){
		return h(Main)
	}
})

app.$mount('body')

```

#### 路由写法
> 如何跳转? href="#!/"

```
const HelloWord1 = {
	view: function(){
		//如果需要获取当前路由信息 this.router.getCurrentPage() 即可
		
		return [
			{
				el: createElement('span').attr({class: 'hello-word'}).text('我是hello-word-1'),
				events: {
					click: function(){
						alert('hello word')
					}
				}
			},
			{
				el: createElement('a').attr('href', '#!/'),
				childers: [
					{
						el: createElement('span').text('点我去hello')
					}
				]
			}
		]
	}
}

var app = new JqueryTemplate({
	render: function(h){
		return h(Main)
	},
	routers: {
		'/': HelloWord,
		'/hello': HelloWord1
	}
})

app.$mount('body')

```
