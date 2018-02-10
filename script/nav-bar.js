class NavBar {
    constructor(barContainerSelector,{centerLabels = true,mobileOff = false, desktopHeight = 0, mobileHeight = 0, backgroundColor1 = "#fff", backgroundColor2 = "#000", color1 = "#000", color2 = "#fff", fontSize = '100%', logoSrc = "none"}={}){
        this.W = window.innerWidth; 
        this.H = window.innerHeight;
        this.mediaDesktop = this._getMedia(this.W,this.H);
        this.bar = document.querySelectorAll(barContainerSelector)[0];//1 div
        if(mobileOff && !this.mediaDesktop){this.bar.style.display = "none"}
        else{
            this.menus = Array.from(this.bar.children);//array of divs
            this.menuLabels = this._getMenuLabels(this.menus);//array of divs
            this.menuLists = this._getMenuLists(this.menuLabels);//array of divs
            this.menuItems = this._getMenuItems(this.menuLists);//array of array (2D) of divs
            this.itemData = this._getItemData(this.menuItems);//3D array of the same cross-section as menuItems, but with each cell storing an array of form [(str)menu-item-text,(str)menu-item-page-src]
            
            if(!this.mediaDesktop){this._setupMenusButton(this.bar,this.menus);}
            this.styleData = this._getStyleData(backgroundColor1,color1,fontSize,centerLabels,desktopHeight,mobileHeight);//object whose properties are 2D arrays of style data for each class in the NavBar structure
            this._setStyles(this.styleData,this.bar,this.menus,this.menuLabels,this.menuLists,this.menuItems);
            this._setPageLinks(this.itemData,this.menuItems);
            this._attachListeners(this.menus,this.menuLabels,this.menuItems,backgroundColor1,backgroundColor2,color1,color2);
        }
        
    }
    _attachListeners(menus,labels,items,bgc1,bgc2,c1,c2){
        if(this.mediaDesktop){//desktop
            var iLim = labels.length;            
            for(var i=0;i<iLim;i++){
                labels[i].addEventListener('click',this._ev_showList,false);
                labels[i].addEventListener('click',this._ev_switchColors,false);
                labels[i].colors = ["transparent",bgc2,c1,c2]
                
            }
            iLim = items.length;
            var jLim = items[0].length;
            for(i=0;i<iLim;i++){
                for(var j=0;j<jLim;j++){
                    items[i][j].addEventListener('mouseenter',this._ev_switchColors,false);
                    items[i][j].addEventListener('mouseleave',this._ev_switchColors,false);
                    items[i][j].colors = [bgc1,bgc2,c1,c2];
                }
            }
        }
        else{//mobile
            var iLim = labels.length;  
            for(var i=0;i<iLim;i++){
                labels[i].addEventListener("click",this._ev_showList,false);
                labels[i].addEventListener("click",this._ev_switchColors,false);
                labels[i].colors = ["transparent",bgc2,c1,c2]
            }
            iLim = items.length;
            var jLim = items[0].length;
            for(i=0;i<iLim;i++){
                for(var j=0;j<items[0].length;j++){
                    items[i][j].addEventListener('click',this._ev_switchColors,false);
                    items[i][j].colors = [bgc1,bgc2,c1,c2];
                }
            }
            this.menusButton.addEventListener("click",this._ev_showMenus,false);
        }
    }
    _ev_showMenus(evt){
        var menusCon = evt.currentTarget.nextElementSibling;
        var button = evt.currentTarget;
        if(menusCon.style.display == "none"){
            menusCon.style.display = "block";
            button.style.backgroundColor = "gray";
        }
        else{
            menusCon.style.display = "none";
            button.style.backgroundColor = "transparent";
        }
    }
    _ev_showList(evt){
        var list = evt.currentTarget.nextElementSibling;
        if(list.style.display == "none"){list.style.display = "block";}
        else{list.style.display = "none";}
    }
    _ev_switchColors(evt){
        //console.log(evt.target.style.color);
        var targ = evt.currentTarget, targColor = targ.style.color;
        console.log(targ);
        if(targColor == targ.colors[2]){
            targ.style.color = targ.colors[3];
            targ.style.backgroundColor = targ.colors[1];
        }
        else{
            targ.style.color = targ.colors[2];
            targ.style.backgroundColor = targ.colors[0];
        }
    }

    _setPageLinks(data,items){
        var iLim = data.length, jLim = data[0].length;
        for(var i=0;i<iLim;i++){
            var jD = new Array(data[0].length);
            for(var j=0;j<jLim;j++){
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

    _setupMenusButton(bar,menus){
        this.menusButton = this._generateMenusButton();
        this.menusContainer = document.createElement("div");
        this.menusContainer.style.display = "none";
        bar.insertBefore(this.menusButton,menus[0]);
        bar.insertBefore(this.menusContainer,menus[0]);
        var iLim = menus.length;
        for(var i=0;i<iLim;i++){
            this.menusContainer.appendChild(menus[i]);
        }
    }
    _generateMenusButton(){
        var buttonContainer = document.createElement("div");
        setStyles(buttonContainer,[["position","relative"],["width","10%"],["height","100%"]]);
        //console.log(buttonContainer.style.height)
        //buttonContainer.style.width = buttonContainer.clientHeight+"px";
        var buttBars = new Array(3);
        for(var i=0;i<3;i++){
            buttBars[i] = document.createElement("div");
            buttonContainer.appendChild(buttBars[i]);            
            setStyles(buttBars[i],[["position","absolute"],["width","80%"],["height","10%"],["top",(20+25*i)+"%"],["left","10%"],["backgroundColor","black"]]);
            
        }
        return buttonContainer;
    }


    _setStyles(data,bar,menus,labels,lists,items){
        console.log(menus.length);
        //this.bar.style.fontSize = FS;
        var iLim = menus.length, jLim = items[0].length;
        setStyles(bar,data.bar);
        for(var i=0;i<iLim;i++){
            setStyles(menus[i],data.menus);
            if(menus[i].classList.contains("right")&&this.mediaDesktop){menus[i].style.float = "right";}
            setStyles(labels[i],data.labels);
            setStyles(lists[i],data.lists);
            for(var j=0;j<jLim;j++){
                
                setStyles(items[i][j],data.items);
            }
        }
    }

    _getStyleData(bgC,txtC,fS,cntrLbls,dH,mH){
        var data = {};
        if(this.mediaDesktop){//desktop
            if(dH == 0){var barHeight = this.menuLabels[0].clientHeight+"px";}
            else{var barHeight = dH;}
            data.bar = [["height",barHeight],["fontSize",fS]];
            data.menus = [["display","inline-block"],["verticalAlign","top"]];
            if(cntrLbls){data.labels = [["color",txtC],["cursor","default"],["height",barHeight],["line-height",barHeight],["text-align","center"]];}
            else{data.labels = [["color",txtC],["cursor","default"],["height",barHeight]];}
            data.lists = [["display","none"]];
            data.items = [["backgroundColor",bgC],["color",txtC]];
        }
        else{//mobile
            if(mH == 0){var barHeight = (.1*this.W)+"px";}
            else{var barHeight = mH;}
            data.bar = [["height",barHeight],["fontSize",fS],["position","relative"]];
            data.menus = [["display","block"]];
            data.labels = [["color",txtC],["backgroundColor",bgC],["display","inline-block"],["verticalAlign","top"]];
            data.lists = [["display","none"]];
            data.items = [["backgroundColor",bgC],["color",txtC]];
        }
        return data;
    }

    _getItemData(items){
        var iLim = items.length, jLim = items[0].length;
        var iD = new Array(iLim);
        var jD = new Array(jLim);

        for(var i=0;i<iLim;i++){
            var jD = new Array(items[0].length);
            for(var j=0;j<jLim;j++){
                jD[j] = items[i][j].innerHTML.split(",");
                //console.log(jD);
            }
            iD[i] = jD;
            //console.log(iD[i]);
        }
        return iD;
    }

    _getMenuItems(lists){
        var iLim = lists.length;
        var listItems = new Array(iLim);
        for(var i=0;i<iLim;i++){
            listItems[i] = Array.from(lists[i].children);
        }
        return listItems;
    }

    _getMenuLists(menuLabels){
        var iLim = menuLabels.length;
        var lists = new Array(iLim);
        for(var i=0;i<iLim;i++){
            lists[i] = menuLabels[i].nextElementSibling;
        }
        return lists;
    }

    _getMenuLabels(menus){
        var iLim = menus.length
        var labels = new Array(iLim);
        for(var i=0;i<iLim;i++){
            labels[i] = menus[i].firstElementChild;
        }
        return labels;
    }

    _getMedia(w,h){
        
        if((w/h)>1){return true;}
        else{return false;}
    }

    static _doc_(){
        var doc = "Arguments:\nbarContainerSelecctor = (str) #id.nav-bar\n{itemBackgroundColor : (str) <color value>, textColor : (str) <color value>, fontSize : (str) <size value>}\nWhere everything in {} is optional* \nitemBackgroundColor - effects the individual items within the menu; can be any valid CSS. \ntextColor - effects both the items and the menu label. \nfontSize - effects all text within the NavBar object.\n*Note: Should you choose to include none of the optional items, no {} is necessary at all, they will default to '#fff','#000','100%', respectively. \n\nExample:\n\n   var navBar = new NavBar('#main.nav-bar,{itemBackgroundColor: 'white', textColor: 'black', fontSize: '1em'});\n\nThis will initiate the NavBar taking care of all CSS and event handling requirements. \nThis line of code belongs at the bottom of you <body> element inside a <script></script> block.\nNote: you can add your own classes and CSS, and the NavBar class \nwill overwrite only the things it needs to without effecting other user specified CSS. \n\nHTML Prerequisite:\nMust construct the HTML foundation for the NavBar class to inhabit via a hierarchy of divs. \nOnly the first level div of the hierarchy needs identification for the NavBar to function. \nIt can be any CSS selector as long as a query for that selector returns only 1 element. \n\nAs mentioned earlier, the structure is created as a hierarchy of divs.\nThe model is as follows: \n\n<div class='Some Class' id='someID'>\n   <div>Menu container, can be many of these per bar\n       <div>text that will display on menu labels</div>1 of these per menu\n       <div>container for menu item list (the part that is invisible unless moused over); 1 per menu\n           <div>**this is a comma delimited list**Text that will display on menu items,link source to page</div> many of these per item list container\n           .\n           .\n           .\n       </div>\n   </div>\n   .\n   .\n   .\n</div> \n\n**Notice the contents of the innermost div.\nYou can think of these elements sort of like functions, in that \nwhat you put inside these divs will be used as input to the NavBar class. \nDon't worry though, it's just comma delimited plain text.\nThe first 'argument' is just the item label exactly as you want it to appear \nand the second is the relative filepath to the page. \n\nExtras: \nSimilarly to the note above, you can also pass data/options to the NavBar \nby giving special classes to certain div elements. \nAs of now, there is only one such class which is 'right', and can be applied to \nmenu container elements (2nd level divs) to float that menu to the right side of the NavBar."
        console.log(doc);
        return doc;
    }
    
}