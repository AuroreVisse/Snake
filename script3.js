window.onload = function()
{
    
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    
    init();
    
    function init()/*je crée cette fonction et j'intègre tout le code dedans pour amener du mouvement*/ 
    {
        var canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
    /*permet d'integrer le canvas à la page html*/
        ctx = canvas.getContext("2d");
        snakee = new Snake([[6,4],[5,4],[4,4]], "right");
        refreshCanvas();  
    }
    
    
    function refreshCanvas()
    {  
       
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        snakee.advance();
  /*ctc fillrect permet de creer un petit rectangle et prend en compte 4 argument, le x et le y qui designe la distance du point par rapport à la brodure, et la hauteur et largeur du petit rectangle*/
        snakee.draw();
        setTimeout(refreshCanvas,delay);
    }
    
    function drawBlock(ctx, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x ,y , blockSize, blockSize);
    }
    
    function Snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i=0; i < this.body.length; i++)
                {
                    drawBlock(ctx,this.body[i]);
                }
            ctx.restore();

        };
        
        this.advance= function()
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
                {
                    case "left":
                        nextPosition[0] -= 1;
                        break;
                    case "right":
                        nextPosition[0] += 1;
                        break;
                    case "down":
                        nextPosition[1] += 1;
                        break;
                    case "up":
                        nextPosition[1] -= 1;
                        break;
                    default:
                        throw("Invalid Direction");
                }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function(newDirection)
        {
            var allowedDirections; /*direction permise, le serpent est limité dans ses mouvements*/
            switch(this.direction)
                {
                    case "left":
                    case "right":
                        allowedDirections = ["up", "down"];
                        break;
                    case "down":
                    case "up":
                         allowedDirections = ["left", "right"];
                        break; 
                    default:
                        throw("Invalid Direction");
                }
            
                if(allowedDirections.indexOf(newDirection) > -1)
                    {
                        this.direction = newDirection;
                    }
        }
    }


document.onkeydown = function handleKeyDown(e)
{
    var key = e.keyCode;
    var newDirection;
    switch(key)
        {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up"; 
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                 return;
        }
    snakee.setDirection(newDirection);
}
}
