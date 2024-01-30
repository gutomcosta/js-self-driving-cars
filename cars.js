class Cars{
    constructor(cars){
        this.list = cars;
    }

    getFirst(){
        return this.list[0];
    }

    mutateBrains(){
        this.list.forEach(car => {
            NeuralNetwork.mutate(car.brain,0.3);    
        });    
    }

    getBestCar(){
        let cars = this.list.filter(
            c => ! c.damaged
        ).map(c => [c, c.y]);
        cars = cars.sort(item => item[1]).slice(0,2);
        let bestCars = [cars[0][0], cars[1][0]];
        if (bestCars.every(c => ! c.freeTrackAhead())){
            console.log("build children")
            const childBrain1 = NeuralNetwork.buildChildren(bestCars[0].brain, bestCars[1].brain);
            const childBrain2 = NeuralNetwork.buildChildren(bestCars[0].brain, bestCars[1].brain);
            NeuralNetwork.mutate(childBrain2, 0.3);
            bestCars[0].brain = childBrain1;
            bestCars[1].brain = childBrain2;
        }
        return bestCars;
        // if(cars && cars.length == 0){
        //     console.log("acabou a copia")
        // }
        // if (! cars){
        //     cars = [...this.list];
        // }
        // let car = this.list.find(
        //     c=>c.y==Math.min(
        //         ...this.list.map(c=>c.y)
        //     )
        // );
        // if (! car.freeTrackAhead()){
        //     NeuralNetwork.mutate(car.brain,0.4);
        // }
        //     let index = cars.indexOf(car)
        //     cars.splice(index, 1);
        //     car = this.getBestCar(cars);
        //     // console.log("vai gerar:", cars.length, bestCar.y)
        //     // cars = generateCars(300, car.y);
        //     // console.log("gerou:", cars.length, cars[0].y)
        //     // for (let i = 0; i < cars.length; i++) {
        //     //     NeuralNetwork.mutate(cars[i].brain, 0.4); 
        //     // }
        //     // getBestCar(cars);
        // } 
    }

    updateCars(borders, traffic){
        this.list.forEach(car => {
            car.update(borders, traffic);                
        });
    }

    drawCars(carCtx, color){
        this.list.forEach(car => {
           car.draw(carCtx, color) 
        });
    }
}