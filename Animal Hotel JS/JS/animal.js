/**
 * Represents an animal guest at the hotel.
 * @class
 */
class Animal {
    /**
     * Creates a new Animal instance.
     * @param {string} name - The name of the animal
     * @param {number} amountOfDayLeft - Number of days the animal will stay
     * @param {number} animalSize - Size of the animal (1: Small, 2: Medium, 3: Large)
     * @param {number} moneyForAnimal - Money earned when the animal checks out
     * @param {string} animalType - Type of animal (e.g., "Dog", "Cat")
     * @param {string} needFoodType - Type of food the animal needs
     * @param {number} amountOfFoodPerDay - Units of food consumed per day
     * @param {number} xp - The amount of xp the player recieves after the animal leaves if satisfied 
     */
    constructor(name, amountOfDayLeft, animalSize, moneyForAnimal, animalType, needFoodType, amountOfFoodPerDay, xp) {
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
        this.xp = xp;
    }

    /**
     * Takes animal to a walk.
     */
    walk() {
        this.needsWalk = false;
    }

    /**
     * Gives food to the animal.
     */
    feed() {
        this.needsFood = false;
    }

    /**
     * Gives water to the animal.
     */
    water() {
        this.needsWater = false;
    }

    /**
     * Each day resets the animals needs.
     */
    newNeedsForDay(){
        this.needsWalk = true;
        this.needsFood = true;
        this.needsWater = true;
    }

    checkSatisfaction(){
        let satisfied = true;
        if(this.needsFood == true || this.needsWalk == true || this.needsWater == true){
            satisfied = false;
        }
        return satisfied;
    }
}

/**
 * Represents the hotel that manages animals and finances.
 * @class
 */
class Hotel {
    // Constants
    static DEFAULT_CAPACITY = 4;
    static STARTING_MONEY = 500;
    static STARTING_DAILY_FEE = 40;
    static MAX_DAYS_IN_DEBT = 7;
    static LOAN_DURATION = 30;

    /**
     * Creates a new Hotel instance.
     * @param {string} name - The name of the hotel
     */
    constructor(name) {
        this.hotelCapacity = Hotel.DEFAULT_CAPACITY;
        this.hotelMoney = Hotel.STARTING_MONEY;
        this.name = name;
        this.workersAmount = 0;
        this.hasLoan = false;
        this.loanDayAmount = 0;
        this.dailyFee = Hotel.STARTING_DAILY_FEE;
        this.animalsInHotel = [];
        this.foodInStock = [];
        this.dayCount = 1;
        this.dayInDebt = 0;
    }

    /**
     * Adds an animal to the hotel.
     * @param {Animal} animal - The animal to add
     */
    addAnimal(animal) {
        this.animalsInHotel.push(animal);
    }

    /**
     * Decrements the loan duration if a loan is active.
     */
    loanCheck() {
        if (this.hasLoan) {
            this.loanDayAmount--;
        }
    }

    /**
     * Adds workers to the hotel.
     * @param {number} amount - Number of workers to add
     */
    addWorker(amount) {
        this.workersAmount += amount;
    }

    /**
     * Decreases remaining days for all animals in the hotel.
     */
    passADayForAnimals() {
        for (let animal of this.animalsInHotel) {
            animal.amountOfDayLeft -= 1;
        }
    }

    /**
     * Checks the hotel's debt status and handles game over if needed.
     * Alerts the player if they're in debt and triggers game over after 7 days.
     */
    checkDayInDebt() {
        if (this.dayInDebt === Hotel.MAX_DAYS_IN_DEBT) {
            alert("You have been in debt for 7 days. Game over!");
            location.reload();
        }

        if (this.dayInDebt > 0) {
            alert(`You have been in debt for ${this.dayInDebt} day(s). If it reaches 7 days, it's game over!`);
        }

        if (this.hotelMoney < 0) {
            this.dayInDebt++;
        }
    }
}

export { Animal, Hotel };