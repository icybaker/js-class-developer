class NavBar {
    constructor(barContainerSelector,baseColors = ["#fff","#000"]){
        this.bar = document.querySelectorAll(barContainerSelector)[0];//1 div
        this.menus = Array.from(this.bar.children);//array of divs
        this.menuLabels = this._getMenuLabels(this.menus);//array of divs
        this.menuLists = this._getMenuLists(this.menuLabels);//array of divs
        this.menuItems = this._getMenuItems(this.menuLists);//array of array (2D) of divs
        this.itemData = this._getItemData(this.menuItems);//3D array of the same cross-section as menuItems, but with each cell storing an array of form [(str)menu-item-text,(str)menu-item-page-src]
        //console.log(this.itemData);
        this.baseColors = baseColors;
        //console.log(this.menuLists[0]);
        this._setPageLinks(this.itemData,this.menuItems);
        this._attachListeners(this.menus,this.menuLabels, this.menuItems);
        
        this._setBarHeight(this.menuLabels[0],this.bar);
        //this.barHeight = this.menus[0].children[0].clientHeight;

        //this.bar.style.height = this.barHeight + "px";

        // console.log(this.menus[0].children[0].nextSibling);
    }

    _setBarHeight(ref,targ){
        console.log(ref.clientHeight);
        targ.style.height = ref.clientHeight;
        console.log(targ.style.height);
    }

    _attachListeners(menus,labels,items){
        this._setColors(labels,items);
        for(var i=0;i<labels.length;i++){
            labels[i].addEventListener("mouseenter",this._ev_showList,false);
            menus[i].addEventListener("mouseleave",this._ev_hideList,false);
        }
       for(i=0;i<items.length;i++){
            for(var j=0;j<items[0].length;j++){
                items[i][j].addEventListener("mouseenter",this._ev_invertTxt,false);
                items[i][j].addEventListener("mouseleave",this._ev_invertTxt,false);
            }
        }

    }

    _ev_invertTxt(evt){
        console.log(evt.target.style.color);
        var targ = evt.target, bgOld = targ.style.backgroundColor,
        cOld = targ.style.color;
        targ.style.backgroundColor = cOld;
        evt.target.style.color = bgOld;
    }

    _ev_showList(evt){
        var list = evt.target.nextElementSibling;
        list.style.display = "block";
        console.log(evt.target);
    }
    _ev_hideList(evt){
        console.log(evt.target);
        var list = evt.target.children[1];
        list.style.display = "none";
        
    }

    _setColors(labels,items){
        for(var i=0;i<labels.length;i++){
            labels[i].style.backgroundColor = "transparent";
            labels[i].style.color = this.baseColors[1];
        }
       for(i=0;i<items.length;i++){
            for(var j=0;j<items[0].length;j++){
                items[i][j].style.backgroundColor = this.baseColors[0];
                items[i][j].style.color = this.baseColors[1];
            }
        }
    }

    _setPageLinks(data,items){

        for(var i=0;i<data.length;i++){
            var jD = new Array(data[0].length);
            for(var j=0;j<data[0].length;j++){
                jD[j] =  document.createElement("a");
                jD[j].setAttribute("href",data[i][j][1]);
                jD[j].innerHTML = data[i][j][0];
                jD[j].style.color = "inherit";
                console.log(jD[j]);
                items[i][j].innerHTML = "";
                items[i][j].appendChild(jD[j]);
            }
        }
    }

    _getItemData(items){
        var iD = new Array(items.length);
        var jD = new Array(items[0].length);

        for(var i=0;i<items.length;i++){
            var jD = new Array(items[0].length);
            for(var j=0;j<items[0].length;j++){
                jD[j] = items[i][j].innerHTML.split(",");
                //console.log(jD);
            }
            iD[i] = jD;
            //console.log(iD[i]);
        }
        return iD;
    }

    _getMenuItems(lists){
        var listItems = new Array(lists.length);
        for(var i=0;i<lists.length;i++){
            listItems[i] = Array.from(lists[i].children);
        }
        return listItems;
    }

    _getMenuLists(menuLabels){
        var lists = new Array(menuLabels.length);
        for(var i=0;i<menuLabels.length;i++){
            lists[i] = menuLabels[i].nextElementSibling;
        }
        return lists;
    }

    _getMenuLabels(menu){
        var labels = new Array(menu.length);
        for(var i=0;i<menu.length;i++){
            labels[i] = menu[i].firstElementChild;
        }
        return labels;
    }

    static _doc_(){
        var doc = "Arguments:\nbarContainerSelecctor = (string) #id.nav-bar\nbaseColors = [(string) style.backgroundColor, (string) style.color]\n\nUsage:\nMust construct the NavBar foundation in the HTML page\nOnly the first level of the hierarchy needs identification\nIt requires a class of (no quotes) 'nav-bar' and an id of your choice\nThe structure is created as a hierarchy of divs.\nThe model is as follows:\n<div class='nav-bar' id='you pick'>\n   <div>Menu container, can be many of these per bar\n       <div>text that will display on menu labels</div>1 of these per menu\n       <div>container for menu item list (the part that is invisible unless moused over); 1 per menu\n           <div>**this is a , delimited list**Text that will display on menu items,link source to page</div> many of these per item list container\n           .\n           .\n           .\n       </div>\n   </div>\n   .\n   .\n   .\n</div>\n\nThe baseColors argument defaults to white background and black letters\nIt sets these colors in the menu items and labels except that the label's background is transparent.\nAs well, menu items swap these two colors on mouseover.\nThe nav-bar element's color should be set on an individual basis as it is what is constantly visible on the page."
        console.log(doc);
        return doc;
    }
    
}