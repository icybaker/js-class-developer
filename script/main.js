function setAttrs(el, attrValArray){
    var iLim = attrValArray.length;
        for(var i=0;i<iLim;i++){
            el.setAttribute(attrValArray[i][0],attrValArray[i][1]);
        }
}
function setAttrs1D(elArray, attrValArray){//note that each element in elArray will each recieve the same set of attributes
    for(var j=0;j<elArray.length;j++){
        for(var i=0;i<attrValArray.length;i++){
            elArray[j].setAttribute(attrValArray[i][0],attrValArray[i][1]);
        }
    }
}
function setAttrs2D(elArray, attrValArray){//note that each element in elArray will each recieve the same set of attributes
    for(var k=0;k<elArray[0].length;k++){    
        for(var j=0;j<elArray.length;j++){
            for(var i=0;i<attrValArray.length;i++){
                elArray[k][j].setAttribute(attrValArray[i][0],attrValArray[i][1]);
            }
        }
    }
}


function setStyles(el,propValArray){
    //console.log(propValArray);
    var iLim = propValArray.length;
    for(var i=0;i<iLim;i++){
        el.style[propValArray[i][0]] = propValArray[i][1];
    }
}
function setAttrs1D(elArray, propValArray){//note that each element in elArray will each recieve the same set of attributes
    for(var j=0;j<elArray.length;j++){
        for(var i=0;i<attrValArray.length;i++){
            elArray[j].style[propValArray[i][0]] = propValArray[i][1];
        }
    }
}
function setAttrs2D(elArray, propValArray){//note that each element in elArray will each recieve the same set of attributes
    for(var k=0;k<elArray[0].length;k++){
        for(var j=0;j<elArray.length;j++){
            for(var i=0;i<attrValArray.length;i++){
                elArray[k][j].style[propValArray[i][0]] = propValArray[i][1];
            }
        }   
    }
}

function hide(el){
    //console.log(typeof el);
    el.style.display = "none";
}
function show(el){
    console.log(el);
    el.style.display = "block";
}

