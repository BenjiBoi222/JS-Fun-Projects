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
class Hotel{
    constructor(name){
        this.hotelCapacity = 4;
        this.hotelMoney = 500;
        this.name = name;
        this.workersAmount = 0;
        this.hasLoan = false;
        this.loanDayAmount = 0;
        this.dailyFee = 40; 
        //10 for every animal space, 15 for every wroker
        this.animalsInHotel = [];
        this.dayCount = 1;
        this.dayInDebt = 0;
    }
    AddAnimal(animal){
        this.animalsInHotel.push(animal);
    }
    LoanCheck(){
        if(this.hasLoan){
            this.loanDayAmount--;
        }
    }
    AddWorker(amount){
        this.workersAmount += amount;
    }
    
    PassADayForAnimals(){
        for(let animal of this.animalsInHotel){
            animal.amountOfDayLeft -= 1;
        }
    }
    CheckDayInDebt(){
        if(this.dayInDebt == 7){
            alert("You have been in debt for 7 days. Game over!");
            location.reload();
        }

        if(this.dayInDebt > 0){
            alert(`You have been in debt for ${this.dayInDebt} day(s). If it reaches 7 days, it's game over!`);
        }

        if(this.hotelMoney < 0){
            this.dayInDebt++;
        }
    }
}
export { Animal,Hotel };