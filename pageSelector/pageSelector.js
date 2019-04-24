window.onload=function(){
	var container=document.querySelector('#container');
	new pageSelector(container,30).run()
}
class pageSelector{
	constructor(container,num=10){
		this.container=container;
		this.num=num;
		this.inner='';
		this.nowPage=1;
		this.elip=0;
		this.button={
			notHover:{
				maxLeft:'img/maxLeft.svg',
				left:'img/left.svg',
				right:'img/right.svg',
				maxRight:'img/maxRight.svg'
			},
			isHover:{
				maxLeftHover:'img/maxLeftHover.svg',
				leftHover:'img/leftHover.svg',
				rightHover:'img/rightHover.svg',
				maxRightHover:'img/maxRightHover.svg'
			}
		}
	}
	run(){
		this.elip ? '' : this.createItem();
		this.refreshPage();
		this.bindHoverEvent();
		this.bindClickEvent();
		this.bindBtEvent();
	}
	createItem(){
		this.createBt('left');
		this.createPage();
		this.createBt('right');
		this.container.innerHTML=this.inner;
	}
	refreshPage(){
		var pages=this.container.querySelectorAll('.page');
		pages.forEach( item => {
			item.classList.remove('active');
			if(item.querySelector('span')&&item.querySelector('span').innerText==this.nowPage){
				item.classList.add('active');
			}
		})
	}
	createBt(keyword){
		var subKey=keyword.substring(1);
		for(var i in this.button.notHover){
			i.indexOf(subKey)>-1 ? this.inner+=`<li class="bt"
			id="${i}"><img src="${this.button.notHover[i]}"></li>` : '';
		}
	}
	createPage(){
		if(this.num<=10){
			for(var i=1;i<this.num+1;i++){
				this.inner+=`<li class="page"><span>${i}</span></li>`
			}
		}else{
			this.elipController()
		}
	}
	elipController(i){
		if(i-this.elip<4&&i-this.elip>-2&&this.elip<5){
			this.elipAction(3,3,this.nowPage,true,true,2);
		}
		else if(i-this.elip>-3&&i-this.elip<0&&this.elip>5){
			this.elipAction(3,3,this.nowPage,true,true,2);
		}
		else if(i>=this.elip&&this.elip>5){
			this.elipAction(3,3,8);
		}
		else if(i<this.elip-1&&this.elip<5){
			this.elipAction(8,9,2);
		}
		else if(!this.elip){
			this.elipAction(8,9,2,false);
		}else{
			return
		}
	}
	elipAction(index,head,tail,run=true,more=false,end=0){
		run ? this.inner='' : '';
		this.elip=index;
		run ? this.createBt('left') : '';
		for(var i=1;i<head;i++){
			this.inner+=`<li class="page"><span>${i}</span></li>`
		}
		this.inner+=`<li class="elip"><span>...</span></li>`;
		if(!more){
			for(var i=tail;i>0;i--){
				this.inner+=`<li class="page"><span>${this.num+1-i}</span></li>`
			}
		}else{
			if(tail+5>this.num-1){
				this.inner='';
				this.elipAction(3,3,8);
				return
			}
			else if(tail-5<=0){
				this.inner='';
				this.elipAction(8,9,2);
				return
			}
			for(var i=0;i<5;i++){
				this.inner+=`<li class="page"><span>${tail-2+i}</span></li>`
			}
		}
		more ? this.inner+=`<li class="elip"><span>...</span></li>` : '';
		for(var i=end;i>0;i--){
			this.inner+=`<li class="page"><span>${this.num+1-i}</span></li>`
		}
		run ? this.createBt('right') : '';
		run ? this.container.innerHTML=this.inner : ''
		run ? this.run() : ''
		return
	}
	bindHoverEvent(){
		var bt=this.container.querySelectorAll('.bt')
		bt.forEach( item => {
			item.addEventListener('mouseover',function(){
				var src=this.getElementsByTagName('img')[0].getAttribute('src').split('.')[0];
				src.indexOf('Hover')==-1 ? this.getElementsByTagName('img')[0].setAttribute('src',src+'Hover.svg') : '';
			})
			item.addEventListener('mouseleave',function(){
				var src=this.getElementsByTagName('img')[0].getAttribute('src').split('Hover.')[0];
				this.getElementsByTagName('img')[0].setAttribute('src',src+'.svg');
			})
		})
	}
	bindClickEvent(){
		var pages=this.container.getElementsByClassName('page');
		[].forEach.call(pages,(item,index) => {
			item.addEventListener('click',() => {
				this.nowPage=Number(item.querySelector('span').innerText);
				this.elipController(index)
				this.refreshPage();
			})
		})
	}
	bindBtEvent(){
		var bt={
			left:'() => { this.pre(); }',
			right:'() => { this.next(); }',
			maxLeft:'() => { this.preMax(); }',
			maxRight:'() => { this.nextMax(); }'
		}
		for(var i in bt){
			this.bindBtEventAction(i,eval(bt[i]));
		}
	}
	bindBtEventAction(el,fn){
		var bt=this.container.querySelector(`#${el}`);
		bt.addEventListener('click',fn)
	}
	getPageIndex(){
		var pages=this.container.querySelectorAll('.page'),
			i=0;
		pages.forEach( (item,index) => {
			item.getAttribute('class').indexOf('active')>-1 ? i=index : '';
		})
		return i;
	}
	pre(){
		this.nowPage-=1;
		this.nowPage<1 ? this.nowPage=1 : '';
		this.elipController(this.getPageIndex());
		this.refreshPage();
	}
	next(){
		this.nowPage+=1;
		this.nowPage>this.num ? this.nowPage=this.num : '';
		this.elipController(this.getPageIndex());
		this.refreshPage();
	}
	preMax(){
		this.nowPage=1;
		this.elipController(1);
		this.refreshPage();
	}
	nextMax(){
		this.nowPage=this.num;
		this.elipController(this.num);
		this.refreshPage();
	}
}