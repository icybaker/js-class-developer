function setAttrs(el, attrValArray){
    for(var i=0;i<attrValArray.length;i++){
        el.setAttribute(attrValArray[i][0],attrValArray[i][1]);
    }
}

function setStyles(el,propValArray){
    for(var i=0;i<propValArray.length;i++){
        el.style[propValArray[i][0]] = propValArray[i][1];
    }
}