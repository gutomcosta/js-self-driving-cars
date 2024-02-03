class FinishLine{
    constructor(x, y, size=125, separation=-700, color="Green"){
        this.x = x;
        this.y = y;
        this.separation = separation
        this.limit = y - this.separation;
        this.limitExceeded = false;
        this.size = size;
    }

    draw(ctx, car){
        if(car.y + this.separation < this.limit){
            carCtx.lineWidth = 10;
            carCtx.strokeStyle = "Green";
            carCtx.beginPath();
            carCtx.moveTo(this.x,this.y-this.separation);
            carCtx.lineTo(this.x-this.size,this.y-this.separation);
            carCtx.stroke();
        }
        this.limitExceeded = (car.y < this.limit);
    }

    restart(){
        this.limitExceeded = false;
    }
}