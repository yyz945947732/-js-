window.onload = function () {
    var container = document.querySelector('#container'),
        imgList = [],
        num = 9;
    for (var i = 1; i < num; i++) {
        imgList.push(`img/bg${i}.jpg`);
    }
    new Fragments(container, imgList).run()
}
class Fragments {
    constructor(container, imgList, num = ~~(Math.random()*24+6)) {
        this.container = container;
        this.imgList = imgList;
        this.num = num;
        this.total=num*num
        this.index = 0;
        this.inner = '';
        this.flag = true;
    }
    run() {
        this.getHW();
        this.createFragments();
        this.bindEvent();
        this.setTitle();
    }
    getHW() {
        this.container.style.height = window.innerHeight + 'px';
        this.container.style.width = window.innerWidth + 'px';
    }
    createFragments() {
        this.inner = '';
        var dWi = Math.floor(this.container.clientWidth / this.num),
            dHi = Math.floor(this.container.clientHeight / this.num);
        for (var j = 0; j < this.num; j++) {
            for (var i = 0; i < this.num; i++) {
                this.inner += `<div style="left:${dWi*i}px;top:${dHi*j}px;width:${dWi}px;height:${dHi}px;
                background-image:url(${this.imgList[this.index]});background-position:-${dWi*i}px -${dHi*j}px;
                background-size:${window.innerWidth}px ${window.innerHeight}px;"></div>`
            }
        }
        this.container.innerHTML = this.inner;
    }
    bindEvent() {
        this.bindMouseOverEvent();
        this.bindClickEvent();
        this.bindKeyPressEvent();
    }
    bindMouseOverEvent() {
        var fragments = document.querySelectorAll('#container div'),
            _this=this;
        for (var i = 0; i < fragments.length; i++) {
            fragments[i].addEventListener('mouseover', function () {
                this.className!='active' ? _this.total-=1 : ''
                this.className = 'active';
                this.style.transformOrigin = `${~~(Math.random()*100)}px ${~~(Math.random()*100)}px`;
                _this.setTitle();
            })
        }
    }
    bindClickEvent() {
        this.container.addEventListener('click', () => {
            this.fragmentsFly();
        })
    }
    bindKeyPressEvent() {
        window.addEventListener('keypress', e => {
            e.keyCode == 32 ? this.fragmentsFly() : ''
        })
    }
    fragmentsFly() {
        var fragments = document.querySelectorAll('#container div');
        if (this.flag) {
            this.flag = false;
            this.setTitle();
            this.total=this.num*this.num;
            this.index += 1;
            this.index == this.imgList.length ? this.index = 0 : '';
            for (var i = 0; i < fragments.length; i++) {
                fragments[i].style.transform = `skew(${~~(Math.random()*60)}deg) 
                                                translateZ(${~~(Math.random()*1000)}px)`;
                fragments[i].style.opacity = '0';
                fragments[i].classList.remove('active');
                fragments[i].style.backgroundImage = `url(${this.imgList[this.index]})`;
            }
            setTimeout(() => {
                for (var i = 0; i < fragments.length; i++) {
                    fragments[i].style.transform = '';
                    fragments[i].style.opacity = '';
                }
                setTimeout(() => {
                    this.flag = true;
                    this.setTitle();
                }, 1000)
            }, 1200)
        }
    }
    setTitle(){
       this.flag ? document.title=`${this.total}个碎片` : document.title=`Boom!!!`
       if(!this.total){
        setTimeout(()=>{
            this.fragmentsFly();
        },0)
       }
    }
}