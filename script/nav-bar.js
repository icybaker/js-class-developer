class NavBar {
    constructor(barContainerSelector,{itemBackgroundColor = '#fff', textColor = '#000', fontSize = '100%'}={}){
        this.mediaToggle = this._setMediaToggle();
        this.bar = document.querySelectorAll(barContainerSelector)[0];//1 div
        this.menus = Array.from(this.bar.children);//array of divs
        this.menuLabels = this._getMenuLabels(this.menus);//array of divs
        this.menuLists = this._getMenuLists(this.menuLabels);//array of divs
        this.menuItems = this._getMenuItems(this.menuLists);//array of array (2D) of divs
        this.itemData = this._getItemData(this.menuItems);//3D array of the same cross-section as menuItems, but with each cell storing an array of form [(str)menu-item-text,(str)menu-item-page-src]
        this.styleData = this._getStyleData(itemBackgroundColor,textColor,fontSize,this.mediaToggle);//object whose properties are 2D arrays of style data for each class in the NavBar structure
        /* {bg:['backgroundColor',itemBackgroundColor],txtC:['color',textColor],fS:['fontSize',fontSize]}; */

        /*for(var prop in arguments[1]){
            console.log(typeof prop);
        }*/
        
        this._setStyles(this.styleData,this.bar,this.menus,this.menuLabels,this.menuLists,this.menuItems);
        this._setPageLinks(this.itemData,this.menuItems);
        this._attachListeners(this.menus,this.menuLabels, this.menuItems);
    }

    _attachListeners(menus,labels,items){
        for(var i=0;i<labels.length;i++){
            labels[i].addEventListener('mouseenter',this._ev_showList,false);
            menus[i].addEventListener('mouseleave',this._ev_hideList,false);
        }
       for(i=0;i<items.length;i++){
            for(var j=0;j<items[0].length;j++){
                items[i][j].addEventListener('mouseenter',this._ev_invertTxt,false);
                items[i][j].addEventListener('mouseleave',this._ev_invertTxt,false);
            }
        }

    }

    _ev_invertTxt(evt){
        //console.log(evt.target.style.color);
        var targ = evt.target, bgOld = targ.style.backgroundColor,
        cOld = targ.style.color;
        targ.style.backgroundColor = cOld;
        evt.target.style.color = bgOld;
    }

    _ev_showList(evt){
        var list = evt.target.nextElementSibling;
        list.style.display = 'block';
        //console.log(evt.target);
    }
    _ev_hideList(evt){
        //console.log(evt.target);
        var list = evt.target.children[1];
        list.style.display = 'none';
        
    }

    _setPageLinks(data,items){
        for(var i=0;i<data.length;i++){
            var jD = new Array(data[0].length);
            for(var j=0;j<data[0].length;j++){
                jD[j] =  document.createElement('a');
                jD[j].setAttribute('href',data[i][j][1]);
                jD[j].innerHTML = data[i][j][0];
                jD[j].style.color = 'inherit';
                //console.log(jD[j]);
                items[i][j].innerHTML = '';
                items[i][j].appendChild(jD[j]);
            }
        }
    }

    _setStyles(data,bar,menus,labels,lists,items){
        console.log(menus.length);
        //this.bar.style.fontSize = FS;

        setStyles(bar,data.bar);
        for(var i=0;i<menus.length;i++){
            setStyles(menus[i],data.menus);
            if(menus[i].classList.contains('right')){menus[i].style.float = 'right';}
            setStyles(labels[i],data.labels);
            setStyles(lists[i],data.lists);
            for(var j=0;j<items[0].length;j++){
                
                setStyles(items[i][j],data.items);
            }
        }
    }

    _getStyleData(bgC,txtC,fS,tog){
        var data = {}, barHeight = this.menuLabels[0].clientHeight;
        if(tog){//desktop
            data.bar = [['height',barHeight+'px'],['fontSize',fS]];
            data.menus = [['display','inline-block'],['verticalAlign','top']];
            data.labels = [['color',txtC],['cursor','default']];
            data.lists = [['display','none']];
            data.items = [['backgroundColor',bgC],['color',txtC]];
        }
        else{//Mobile
            data.bar = [['fontSize',fS]];
            data.menus = [['display','block']];
            data.labels = [['color',txtC],['cursor','default']];
            data.lists = [['display','none']];
            data.items = [['backgroundColor',bgC],['color',txtC]];
        }
        return data;
    }

    _getItemData(items){
        var iD = new Array(items.length);
        var jD = new Array(items[0].length);

        for(var i=0;i<items.length;i++){
            var jD = new Array(items[0].length);
            for(var j=0;j<items[0].length;j++){
                jD[j] = items[i][j].innerHTML.split(',');
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

    _setMediaToggle(){
        var w = window.innerWidth, h = window.innerHeight;
        if((w/h)>1){return 1;}
        else{return 0;}
    }

    static _doc_(){
        var doc = "Arguments:\nbarContainerSelecctor = (str) #id.nav-bar\n{itemBackgroundColor : (str) <color value>, textColor : (str) <color value>, fontSize : (str) <size value>}\nWhere everything in {} is optional* \nitemBackgroundColor - effects the individual items within the menu; can be any valid CSS. \ntextColor - effects both the items and the menu label. \nfontSize - effects all text within the NavBar object.\n*Note: Should you choose to include none of the optional items, no {} is necessary at all, they will default to '#fff','#000','100%', respectively. \n\nExample:\n\n   var navBar = new NavBar('#main.nav-bar,{itemBackgroundColor: 'white', textColor: 'black', fontSize: '1em'});\n\nThis will initiate the NavBar taking care of all CSS and event handling requirements. \nThis line of code belongs at the bottom of you <body> element inside a <script></script> block.\nNote: you can add your own classes and CSS, and the NavBar class \nwill overwrite only the things it needs to without effecting other user specified CSS. \n\nHTML Prerequisite:\nMust construct the HTML foundation for the NavBar class to inhabit via a hierarchy of divs. \nOnly the first level div of the hierarchy needs identification for the NavBar to function. \nIt can be any CSS selector as long as a query for that selector returns only 1 element. \n\nAs mentioned earlier, the structure is created as a hierarchy of divs.\nThe model is as follows: \n\n<div class='Some Class' id='someID'>\n   <div>Menu container, can be many of these per bar\n       <div>text that will display on menu labels</div>1 of these per menu\n       <div>container for menu item list (the part that is invisible unless moused over); 1 per menu\n           <div>**this is a comma delimited list**Text that will display on menu items,link source to page</div> many of these per item list container\n           .\n           .\n           .\n       </div>\n   </div>\n   .\n   .\n   .\n</div> \n\n**Notice the contents of the innermost div.\nYou can think of these elements sort of like functions, in that \nwhat you put inside these divs will be used as input to the NavBar class. \nDon't worry though, it's just comma delimited plain text.\nThe first 'argument' is just the item label exactly as you want it to appear \nand the second is the relative filepath to the page. \n\nExtras: \nSimilarly to the note above, you can also pass data/options to the NavBar \nby giving special classes to certain div elements. \nAs of now, there is only one such class which is 'right', and can be applied to \nmenu container elements (2nd level divs) to float that menu to the right side of the NavBar."
        console.log(doc);
        return doc;
    }
    
}