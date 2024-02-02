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
        cars = cars.sort((item1,item2) => item1[1] - item2[1] );
        cars = cars.slice(0,2);
        let bestCars = [cars[0][0], cars[1][0]];
        return bestCars;
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

    newGeneration(N, bestCars){
        const childBrain1 = NeuralNetwork.buildChildren(bestCars[0].brain, bestCars[1].brain);
        const childBrain2 = NeuralNetwork.buildChildren(bestCars[0].brain, bestCars[1].brain);
        NeuralNetwork.mutate(childBrain2, 0.3);
        bestCars[0].brain = childBrain1;
        bestCars[1].brain = childBrain2;
        // let cars = Cars.generateCars(100, bestCars[0].y);
        // cars.list.forEach(c =>{
        //     const child = NeuralNetwork.buildChildren(bestCars[0].brain, bestCars[1].brain);
        //     NeuralNetwork.mutate(child, 0.4);
        //     c.brain = child;
        // })
        // this.list = cars.list;
    }

    static generateCars(N,y=100){
        const cars = [];
        for (let i = 0; i < N; i++) {
            cars.push(new Car(road.getLaneCenter(1),y,30,50,"AI"));
        }
        return new Cars(cars);
    }
}