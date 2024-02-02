const carCanvas = document.getElementById("carCanvas");
carCanvas.width =200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width =300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const N = 100;
const cars = Cars.generateCars(N);
let bestCars=[cars.list[0], cars.list[1]];

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

    if(traffic[6].y-300 < -2000) {
        console.log("vai desenhafr");
        carCtx.lineWidth = 10;
        carCtx.strokeStyle = "Green";
        carCtx.beginPath();
        carCtx.moveTo(170,-2400);
        carCtx.lineTo(35,-2400);
        carCtx.stroke();
    }

    carCtx.globalAlpha=1;
    bestCars[0].draw(carCtx, "blue",true);
    bestCars[1].draw(carCtx, "yellow",true);
    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx, bestCars[0].brain);
    
    requestAnimationFrame(animate);
}
