class NeuralNetwork{
    constructor(neuronCounts){
        this.levels=[];
        for (let i = 0; i < neuronCounts.length-1; i++) {
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs,network){
        let outputs= Level.feedForward(
            givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length ; i++) {
            outputs=Level.feedForward(outputs,network.levels[i]);
        }
        return outputs;
    }

    static crossover(parent1, parent2) {
        const crossoverPoint = Math.floor(Math.random() * parent1.length);
      
        const child1 = [];
        const child2 = [];
      
        // Copy genes up to the crossover point
        for (let i = 0; i < crossoverPoint; i++) {
          child1.push(parent1[i]);
          child2.push(parent2[i]);
        }
      
        // Swap genes after the crossover point
        for (let i = crossoverPoint; i < parent1.length; i++) {
          child1.push(parent2[i]);
          child2.push(parent1[i]);
        }
      
        return [child1, child2];
      }

    static mutate(network, amount=1){
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights.length; j++) {
                    level.weights[i][j]=lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        });
    }

    static buildChildren(brain1, brain2){
        let newBrain = new NeuralNetwork([5,6,4]);     
        for (let i = 0; i < newBrain.levels.length; i++) {
            const childrenWeights = NeuralNetwork.crossover(brain1.levels[i].weights, brain2.levels[i].weights);
            // const childrenBiases = NeuralNetwork.crossover(brain1.levels[i].biases, brain2.levels[i].biases);
            newBrain.levels[i].weights = childrenWeights[i];
            // newBrain.levels[i].biases  = childrenBiases[i];
        }
        return newBrain;
    }

}


class Level{
    constructor(inputCount,outputCount){
        this.inputs = new Array(inputCount);
        this.outputs= new Array(outputCount);
        this.biases= new Array(outputCount);

        this.weights=[];
        for (let i = 0; i < this.inputs.length; i++) {
            this.weights[i] = new Array(outputCount);
        }
        Level.#randomize(this);
    }

    static #randomize(level){
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j]=Math.random()*2-1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i]=Math.random()*2-1;
            
        }
    }

    static feedForward(givenInputs, level){
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i]=givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum=0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum+=level.inputs[j]*level.weights[j][i];
            }
        
            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            }
        }
        return level.outputs;
    }
}
