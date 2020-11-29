function getRandomFood(){
    const arr=["meat", "fish", "bugs", "grain"]
    const min = 0;
    const max = arr.length;
    const randIndex = Math.floor(Math.random() * (max - min)) + min;
    return arr[randIndex];
}
class Animal {
    constructor(energy) {
        this.energy = energy;
        this.random  = Math.random();
    }

    makeSound() {
        this.energy -= 3;
        console.log(this.energy)
        return this
    }

    eatFood(food) {
        this.energy += 5;
        console.log(this.energy)
        return this
    }

    sleep() {
        this.energy += 10;
        console.log(this.energy)
        return this
    }

    soundOff() {
        this.makeSound();
        console.log(`I have ${this.energy} energy.`);
        return this
    }
    doAction() {
        switch(Math.floor(this.random * 4)) {
            case 0:
            this.makeSound();
            break;
            case 1: 
            this.eatFood(getRandomFood());
            break;
            default:
            this.sleep();
            break;
        }
        return this
    }

}

class Triger extends Animal{
    constructor(energy){
        super(energy);
        this.energy = energy;
    }
    makeSound() {
        this.energy -= 3;
        return this
    }

    sleep() {
        this.energy += 5;
        console.log(this.energy)
        return this
    }

    eatFood(food) {
        if(food == "grain") {
            console.log("Tigers are obligate carnivores you Tigers can't eat grain because they have sensitive digestive systems!");
        } else {
            this.energy += 5;
        }
        console.log(this.energy);
        return this
    }
}


class Monkey extends Animal{
    constructor(energy){
        super(energy)
    }
    eatFood(food) {
        this.energy += 2;
        console.log(this.energy);
        return this
    }

    makeSound() {
        this.energy -= 4;
        console.log(this.energy);
        return this
    }

    play() {
        if(this.energy >= 8) {
            console.log("Oooo Oooo Oooo");
            this.energy -= 8;
        } else {
            console.log("Monkey is too tired.");
        }
        console.log(this.energy);
    }
    doAction() {
        switch(Math.floor(this.random * 5)) {
            case 0:
            this.makeSound();
            break;
            case 1: 
            this.eatFood(getRandomFood());
            break;
            case 2: 
            this.play();
            break;
            default:
            this.sleep();
            break;
        }
        return this
    }


}


class Snakes extends Animal{
    constructor(energy){
        super(energy)
    }
    makeSound() {
        this.energy -= 3;
        console.log(`Hssssss! and energy is ${this.energy}`);
        return this
    }

}
