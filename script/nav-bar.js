class NavBar {
    constructor(barContainerSelector){
        
        this.bar = document.querySelectorAll(barContainerSelector)[0];
        this.menus = this.bar.children;
        this.menuLabels = this._getMenuLabels(this.menus);
        this.menuLists = this._getMenuLists(this.menuLabels);
        this.menuItems = this._getMenuItems(this.menuLists);
        //console.log(this.menuLists[0]);
        //this.menuLabels[0].addEventListener("mouseover", this._showList, false);
        //this.menuLabels[0].addEventListener("mouseout",this._hideList, false);
        // console.log(this.menuLabels[0]);
        this._setListeners(this.menuLabels, this.menuItems);

        this.barHeight = this.menus[0].children[0].clientHeight;

        this.bar.style.height = this.barHeight + "px";

        // console.log(this.menus[0].children[0].nextSibling);
    }

    _setListeners(labels,items){
        //console.log(lists);
        for(var i=0;i<labels.length;i++){
            labels[i].addEventListener("mouseover",this._showList,false);
            labels[i].addEventListener("mouseout",this._hideList,false);
        }
    }

    _showList(evt){
        var list = evt.target.nextElementSibling;
        list.style.display = "block";
        //console.log(list);
    }

    _hideList(evt){
        var list = evt.target.nextElementSibling;
        list.style.display = "none";
        //console.log(list);
    }

    _getMenuItems(lists){
        var listItems = new Array(lists.length);
        for(var i=0;i<lists.length;i++){
            listItems[i] = lists[i].children;
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
    
}