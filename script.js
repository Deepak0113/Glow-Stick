const body = document.body;
const glowStick = document.querySelector(".glow-stick");
const hidden = ["H","I","D1","D2","E","N"];
var start = body.clientWidth * 0.1;
var end = body.clientWidth * 0.9;

window.setTimeout(()=>{$(".glow-stick").css("opacity","1");},1000);

window.addEventListener('resize',()=>{
    start = Math.round(body.clientWidth * 0.1);
    end = Math.round(body.clientWidth * 0.9);
});

const getPosition = (id)=>{
    id = "#"+id;
    return $(id).offset().left;
}

glowStick.addEventListener('mousedown',()=>{
    body.onmousemove = coordinate;
})

glowStick.addEventListener('mouseup',()=>{
    body.onmousemove = null;
})

const checkVisible = (posGS)=>{
    hidden.forEach((id) => {
        let posTrace = Math.round(getPosition(id));
        let posDiff = Math.abs(posTrace-posGS);
        // console.log(id,posDiff);
        if(posDiff<40){
            document.getElementById(id).classList.add("visible");
            let visibility = 1-(posDiff/40);
            visibility = Math.round(visibility*10)/10;
            // if(id=="H"){console.log(id,visibility);}
            document.getElementById(id).style.opacity = `${visibility+0.1}`;
        }else{
            document.getElementById(id).style.opacity = '0';
        }
    })
}

const coordinate = (event)=>{
    let posx = event.clientX
    if(posx>start && posx<end){
        glowStick.style.left = `${posx-6}px`;
        checkVisible(posx-3);
    }
}
