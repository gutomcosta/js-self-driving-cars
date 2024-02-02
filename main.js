const carCanvas = document.getElementById("carCanvas");
carCanvas.width =200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width =300;

function initialize(){
    carCtx = carCanvas.getContext("2d");
    networkCtx = networkCanvas.getContext("2d");
    road = new Road(carCanvas.width/2, carCanvas.width*0.9);
    N = 100;
    cars = Cars.generateCars(N);
    finishLine = new FinishLine(160,-2700);
    bestCars=[cars.list[0], cars.list[1]];
}
initialize()
if (localStorage.getItem("bestBrain")){
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain")
        )    
        if (i!=0){
            NeuralNetwork.mutate(cars[i].brain, 0.3);
        }
    }
}

const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY", 2)
]

const lastTraffic = traffic[6];
animate();

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}



function animate(time){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    }
    cars.updateCars(road.borders, traffic)
    bestCars = cars.getBestCar();
    
    carCanvas.height= window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCars[0].y+carCanvas.height*0.7);
    
    road.draw(carCtx);
    carCtx.globalAlpha=0.2;
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx,"red");
    }

    cars.drawCars(carCtx,"blue")
    finishLine.draw(carCtx, lastTraffic);
    

    carCtx.globalAlpha=1;
    bestCars[0].draw(carCtx, "blue",true);
    bestCars[1].draw(carCtx, "yellow",true);
    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx, bestCars[0].brain);

    if(! finishLine.limitExceeded){
        requestAnimationFrame(animate);        
    } else {
        console.log("vai reiniciar");
        initialize();
        requestAnimationFrame(animate);        

    }


}


