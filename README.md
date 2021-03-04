## jquery.template.js

受 [mj.js](https://github.com/ahui2016/mj.js) 启发的基于 jQuery 实现的极简框架。

## 简介

实现模板组件化写法 组件的嵌套和复用 完全用jquery实现

使用时，完完全全是 jQuery 的基本操作，对于已经会用 jq 的人来说，学习成本接近零。

## 例子


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

render('body', Main)
```
