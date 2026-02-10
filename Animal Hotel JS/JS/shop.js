/**
 * @fileoverview Shop system for purchasing food, hotel slots, and hiring workers
 */

import { hotel } from "./register.js";

// DOM Elements
const buyFoodBtn = document.getElementById("buy-food-btn");
const buySlotsBtn = document.getElementById("buy-slots-btn");
const hireWorkerBtn = document.getElementById("hire-worker-btn");

const foodShopDisplay = document.getElementById("food-shop-display");
const slotsShopDisplay = document.getElementById("slots-shop-display");
const workerShopDisplay = document.getElementById("worker-shop-display");

// Initialize food and slots inventory
let foodInventory = {};
let slotMaintenanceCost = 0;
let totalSlotsPurchased = 0;
let workerSalaryCost = 0;
let totalWorkerHired = 0;

/**
 * Toggles the food shop display
 */
buyFoodBtn.addEventListener('click', () => {
    if (foodShopDisplay.style.display === "none") {
        foodShopDisplay.style.display = "block";
        slotsShopDisplay.style.display = "none";
        workerShopDisplay.style.display = "none";
    } else {
        foodShopDisplay.style.display = "none";
    }
});

/**
 * Toggles the slots shop display
 */
buySlotsBtn.addEventListener('click', () => {
    if (slotsShopDisplay.style.display === "none") {
        slotsShopDisplay.style.display = "block";
        foodShopDisplay.style.display = "none";
        workerShopDisplay.style.display = "none";
    } else {
        slotsShopDisplay.style.display = "none";
    }
});

/**
 * Toggles the worker shop display
 */
hireWorkerBtn.addEventListener('click', () => {
    if (workerShopDisplay.style.display === "none") {
        workerShopDisplay.style.display = "block";
        foodShopDisplay.style.display = "none";
        slotsShopDisplay.style.display = "none";
    } else {
        workerShopDisplay.style.display = "none";
    }
});

/**
 * Handles buying food items
 */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-food-item')) {
        const foodType = event.target.dataset.food;
        const price = parseInt(event.target.dataset.price);
        
        // Prompt user for quantity
        const quantity = parseInt(prompt(`How many units of ${foodType} do you want to buy? (${price}$ each)`));
        
        if (isNaN(quantity) || quantity <= 0) {
            alert("Invalid quantity!");
            return;
        }
        
        const totalCost = price * quantity;
        
        if (hotel.hotelMoney >= totalCost) {
            hotel.hotelMoney -= totalCost;
            document.getElementById("stat-money").textContent = `$${hotel.hotelMoney}`;
            
            // Add to inventory
            if (!foodInventory[foodType]) {
                foodInventory[foodType] = 0;
            }
            foodInventory[foodType] += quantity;
            
            // Update stock display
            updateFoodStockDisplay();
            
            alert(`Successfully bought ${quantity} units of ${foodType}!`);
        } else {
            alert(`You don't have enough money! You need $${totalCost} but only have $${hotel.hotelMoney}`);
        }
    }
});

/**
 * Handles buying hotel slots
 */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-slots-item')) {
        const slots = parseInt(event.target.dataset.slots);
        const cost = parseInt(event.target.dataset.cost);
        const dailyMaintenance = slots * 10;
        
        if (hotel.hotelMoney >= cost) {
            hotel.hotelMoney -= cost;
            document.getElementById("stat-money").textContent = `$${hotel.hotelMoney}`;
            
            // Increase hotel capacity
            hotel.hotelCapacity += slots;
            totalSlotsPurchased += slots;
            
            // Add maintenance cost to daily fee
            slotMaintenanceCost += dailyMaintenance;
            hotel.dailyFee += dailyMaintenance;
            document.getElementById("stat-daily-fee").textContent = `$${hotel.dailyFee}`;
            
            alert(`Successfully bought ${slots} slot(s)! Daily maintenance cost: $${dailyMaintenance}`);
        } else {
            alert(`You don't have enough money! You need $${cost} but only have $${hotel.hotelMoney}`);
        }
    }
});

/**
 * Handles hiring workers
 */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('hire-worker-item')) {
        const workers = parseInt(event.target.dataset.workers);
        const cost = parseInt(event.target.dataset.cost);
        const dailySalary = workers * 30;
        
        if (hotel.hotelMoney >= cost) {
            hotel.hotelMoney -= cost;
            document.getElementById("stat-money").textContent = `$${hotel.hotelMoney}`;
            
            // Increase worker count
            hotel.workersAmount += workers;
            totalWorkerHired += workers;
            document.getElementById("stat-worker-amount").textContent = hotel.workersAmount;
            
            // Add salary cost to daily fee
            workerSalaryCost += dailySalary;
            hotel.dailyFee += dailySalary;
            document.getElementById("stat-daily-fee").textContent = `$${hotel.dailyFee}`;
            
            alert(`Successfully hired ${workers} worker(s)! Daily salary cost: $${dailySalary}`);
        } else {
            alert(`You don't have enough money! You need $${cost} but only have $${hotel.hotelMoney}`);
        }
    }
});

/**
 * Returns the current food inventory
 * @returns {Object} The food inventory object
 */
function getFoodInventory() {
    return foodInventory;
}

/**
 * Returns the total slot maintenance cost
 * @returns {number} Daily maintenance cost for all purchased slots
 */
function getSlotMaintenanceCost() {
    return slotMaintenanceCost;
}

/**
 * Returns the total worker salary cost
 * @returns {number} Daily salary cost for all hired workers
 */
function getWorkerSalaryCost() {
    return workerSalaryCost;
}

/**
 * Updates the food stock display in the info panel
 */
function updateFoodStockDisplay() {
    const stockList = document.getElementById("food-stock-list");
    
    // Check if there's any food in inventory
    const foodTypes = Object.keys(foodInventory);
    
    if (foodTypes.length === 0) {
        stockList.innerHTML = "<li>No food in stock</li>";
    } else {
        stockList.innerHTML = "";
        foodTypes.forEach(foodType => {
            const quantity = foodInventory[foodType];
            const listItem = document.createElement("li");
            listItem.textContent = `${foodType}: ${quantity} units`;
            stockList.appendChild(listItem);
        });
    }
}

export { getFoodInventory, getSlotMaintenanceCost, getWorkerSalaryCost };
