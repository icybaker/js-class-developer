/*.cube-struct {
    transform-style: preserve-3d;
    position: relative;
    height: 50%;
    width: 50%;
    display: inline-block;
    top: 25%;
    left: 25%;
}

.cube-struct .face {
    transform-style: preserve-3d;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
}*///Required CSS Declarations in main.css
class Cube {
    constructor(containerID, imgs){
//container class div set CSS:
//position: relative; display: inline-block;
        this.cubeContainer = document.getElementById(containerID);
        this.numFaces = imgs.length;

        this.cubeStruct = document.createElement("div");
        setAttrs(this.cubeStruct,[["class","cube-struct"]]);
        //setStyles(this.cubeStruct,[["position","relative"],["display","inline-block"],["width","50%"],["height","50%"],["top","25%"],["left","25%"]]);
        this.cubeContainer.appendChild(this.cubeStruct);

        this.faces = this._bindFaces(imgs);

        this.dTheta = 360/this.numFaces;
    }

    init(setTime,offset=0){
//time in seconds for each face to reach its final position, can be 0 (instant)
//offset of rotation axis. 0 (no offset) is an edge to edge cube-like polygon
//a positive value will expand the faces out creating a carousel effect
        var zOr = this._zOrCalc(offset);
        this.origin = "50% 50% "+zOr;
        var theta = 0;
        this.initTime = setTime;

        for(var i=0;i<this.numFaces;i++){
            TweenMax.to(this.faces[i],setTime,{rotationY:theta,transformOrigin:this.origin, ease:Power0.easeNone});
            theta += this.dTheta;
        }
    }

    spin(rpm,rpt=-1){
//rotations per minute of cube/carousel
//number of times to repeat (default -1 means repeat indefinitely)
        TweenMax.to(this.cubeStruct,60/rpm,{rotationY:360,transformOrigin:this.origin,ease:Power0.easeNone}).repeat(rpt).delay(this.initTime);
    }

    _bindFaces(imLocs){
        var faces = new Array(this.numFaces);

        for(var i=0;i<this.numFaces;i++){
            var img = document.createElement("img");
            setAttrs(img,[["src",imLocs[i]],["class","face"],["alt","failed to load image"]]);
            faces[i] = img;
            this.cubeStruct.appendChild(img)
        }
        return faces;
    }

    _zOrCalc(x){
        var pi = Math.PI, faceW = this.faces[0].clientWidth;
        var dtRad = this.dTheta*(pi/180);
        var sinT = Math.sin(dtRad), cosT = Math.cos(dtRad);
        var z = (-(faceW*(1+cosT))/(2*sinT))-x+"px";
        return z;
    }
}