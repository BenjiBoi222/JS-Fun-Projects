class Animal{
    constructor(name, amountOfDayLeft, animalSize, moneyForAnimal, animalType, needFoodType, amountOfFoodPerDay){
        this.name = name;
        this.amountOfDayLeft = amountOfDayLeft;
        this.animalSize = animalSize;
        this.moneyForAnimal = moneyForAnimal;
        this.animalType = animalType;
        this.needFoodType = needFoodType;
        this.amountOfFoodPerDay = amountOfFoodPerDay;
        this.needsWalk = false;
        this.needsFood = false;
        this.needsWater = false;
    }
    Walk(){
        this.needsWalk = false;
    }
    Feed(){
        this.needsFood = false;
    }
    Water(){
        this.needsWater = false;
    }
}

export { Animal };