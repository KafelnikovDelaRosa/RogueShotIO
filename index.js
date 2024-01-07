const player=document.querySelector('.player');
const canvas=document.querySelector('.canvas');
let dx=0;
let dy=0;
let bullet_dx=0;
let bullet_dy=0;
let game_state=true;
let mouse_player_deg=0;
function move_right(){
    dx+=10;
}
function move_left(){
    dx-=10;
}
function move_up(){
    dy-=10;
}
function move_down(){
    dy+=10;
}
function shoot_bullet(){
    update_player_position();
    let player_x=player.getBoundingClientRect().x+50;//let player be the x1 and y1 offset to the half of the rectangle to center
    let player_y=player.getBoundingClientRect().y+50;
    let bullet=document.querySelector('.bullet');
    let bullet_style_sheet=document.styleSheets[0];
    let bullet_style_rules=bullet_style_sheet.cssRules?bullet_style_sheet.cssRules:bullet_style_rules.rules;
    let bullet_properties="";
    bullet.classList.add('shot');
    for(i=0;i<bullet_style_sheet.cssRules.length;i++){
        if(bullet_style_rules[i].selectorText==='.bullet.shot'){
            bullet_properties=bullet_style_rules[i];
            break;
        }
    }
    //iniate bullet position based on the player;
    bullet_properties.style.transform=`translate(${player_x}px,${player_y}px)`;
    let bullet_shoot=()=>{
        let bullet_y=+100;
        let bullet_x=+100;
        bullet_properties.style.transform=`translate(${bullet_x}px,${bullet_y}px)`;
    }
    requestAnimationFrame(bullet_shoot);
}
function update_player_position(){
    player.style.transform=`translate(${dx}px,${dy}px) rotate(${mouse_player_deg}deg)`
}
function getAngle(p2_y,p1_y,p2_x,p1_x){
    mouse_player_deg=Math.atan2((p2_y-p1_y),(p2_x-p1_x))*180/Math.PI;
}
//make the player move
window.addEventListener("keydown",(event)=>{
    event.preventDefault();
    switch(event.key){
        case 'd':
            move_right();
            break;
        case 'a':
            move_left();
            break;
        case 'w':
            move_up();
            break;
        case 's':
            move_down();
            break;
        default:
            event.preventDefault();
    } 
    update_player_position();
});
//make the player look around and aim
window.addEventListener("mousemove",(event)=>{
    let mouse_x=event.clientX;//let mouse be the x2 and y2
    let mouse_y=event.clientY;
    let player_x=player.getBoundingClientRect().x+50;//let player be the x1 and y1 offset to the half of the rectangle to center
    let player_y=player.getBoundingClientRect().y+50;
    //finding angle based on the single dynamic line given circle and some point p2
    getAngle(mouse_y,player_y,mouse_x,player_x);
    update_player_position();
})
//make the player shoot 
window.addEventListener("click",()=>{
    console.log("bang");
    bullet_duration=5;
    let bullet=document.createElement('div');
    bullet.className="bullet";
    canvas.appendChild(bullet);
    shoot_bullet();
})