/**
 * @fileoverview Shop system for purchasing food, hotel slots, and hiring workers
 */

import { hotel } from "./register.js";
import { SystemFunctions } from "./systemFunctions.js";

// DOM Elements
const buyFoodBtn = document.getElementById("buy-food-btn");
const buySlotsBtn = document.getElementById("buy-slots-btn");
const hireWorkerBtn = document.getElementById("hire-worker-btn");

const foodShopDisplay = document.getElementById("food-shop-display");
const slotsShopDisplay = document.getElementById("slots-shop-display");
const workerShopDisplay = document.getElementById("worker-shop-display");

const moneyDisplay = document.getElementById("stat-money");
const dailyFeeDisplay = document.getElementById("stat-daily-fee");
const workerAmountDisplay = document.getElementById("stat-worker-amount");
const foodStockList = document.getElementById("food-stock-list");

// Food purchase input elements
const foodPurchaseInput = document.getElementById("food-purchase-input");
const selectedFoodName = document.getElementById("selected-food-name");
const selectedFoodPrice = document.getElementById("selected-food-price");
const foodQuantityInput = document.getElementById("food-quantity-input");
const totalCostDisplay = document.getElementById("total-cost");
const confirmFoodPurchaseBtn = document.getElementById("confirm-food-purchase-btn");
const cancelFoodPurchaseBtn = document.getElementById("cancel-food-purchase-btn");

// Shop state tracking
let slotMaintenanceCost = 0;
let totalSlotsPurchased = 0;
let workerSalaryCost = 0;
let totalWorkerHired = 0;
let selectedFoodItemName = null;
let selectedFoodItemPrice = 0;

// Initialize shop navigation buttons
buyFoodBtn.addEventListener('click', () => toggleShopDisplay(foodShopDisplay));
buySlotsBtn.addEventListener('click', () => toggleShopDisplay(slotsShopDisplay));
hireWorkerBtn.addEventListener('click', () => toggleShopDisplay(workerShopDisplay));

// Initialize shop item purchase handlers
document.addEventListener('click', handleShopPurchase);

// Initialize food quantity input handlers
foodQuantityInput.addEventListener('input', updateFoodTotalCost);
confirmFoodPurchaseBtn.addEventListener('click', confirmFoodPurchase);
cancelFoodPurchaseBtn.addEventListener('click', cancelFoodPurchase);

/**
 * Toggles a shop display and hides others
 * @param {HTMLElement} displayToShow - The display element to show
 */
function toggleShopDisplay(displayToShow) {
    const isHidden = displayToShow.style.display === "none";
    
    // Hide all displays
    foodShopDisplay.style.display = "none";
    slotsShopDisplay.style.display = "none";
    workerShopDisplay.style.display = "none";
    
    // Show selected display if it was hidden
    if (isHidden) {
        displayToShow.style.display = "block";
    }
}

/**
 * Routes purchase events to the appropriate handler
 * @param {Event} event - The click event
 */
function handleShopPurchase(event) {
    if (event.target.classList.contains('buy-food-item')) {
        handleFoodPurchase(event);
    } else if (event.target.classList.contains('buy-slots-item')) {
        handleSlotsPurchase(event);
    } else if (event.target.classList.contains('hire-worker-item')) {
        handleWorkerPurchase(event);
    }
}

/**
 * Handles purchasing food items
 * @param {Event} event - The click event
 */
function handleFoodPurchase(event) {
    const foodType = event.target.dataset.food;
    const price = parseInt(event.target.dataset.price);
    
    selectedFoodItemName = foodType;
    selectedFoodItemPrice = price;
    
    selectedFoodName.textContent = foodType;
    selectedFoodPrice.textContent = `$${price}`;
    foodQuantityInput.value = "1";
    updateFoodTotalCost();
    
    foodPurchaseInput.style.display = "block";
}

/**
 * Updates the total cost display based on quantity input
 */
function updateFoodTotalCost() {
    const quantity = parseInt(foodQuantityInput.value) || 0;
    const total = quantity * selectedFoodItemPrice;
    totalCostDisplay.textContent = `Total: $${total}`;
}

/**
 * Confirms the food purchase with the quantity entered
 */
function confirmFoodPurchase() {
    const quantity = parseInt(foodQuantityInput.value);
    
    if (isNaN(quantity) || quantity <= 0) {
        SystemFunctions.showAlert("Please enter a valid quantity!", "Invalid Quantity");
        return;
    }
    
    const totalCost = selectedFoodItemPrice * quantity;
    
    if (hotel.hotelMoney >= totalCost) {
        hotel.hotelMoney -= totalCost;
        moneyDisplay.textContent = `$${hotel.hotelMoney}`;
        
        if (!hotel.foodStock[selectedFoodItemName]) {
            hotel.foodStock[selectedFoodItemName] = 0;
        }
        hotel.foodStock[selectedFoodItemName] += quantity;
        
        updateFoodStockDisplay();
        SystemFunctions.showAlert(`Successfully bought ${quantity} units of ${selectedFoodItemName}!`, "Food Purchase Success");
        cancelFoodPurchase();
    } else {
        SystemFunctions.showAlert(`You don't have enough money! You need $${totalCost} but only have $${hotel.hotelMoney}`, "Food Purchase Failed");
    }
}

/**
 * Cancels the food purchase and hides the input
 */
function cancelFoodPurchase() {
    foodPurchaseInput.style.display = "none";
    selectedFoodItemName = null;
    selectedFoodItemPrice = 0;
    foodQuantityInput.value = "1";
}

/**
 * Handles purchasing hotel slots
 * @param {Event} event - The click event
 */
function handleSlotsPurchase(event) {
    let slotAmountPlayerCanBuy = 5;

   switch (true){
        case hotel.currentLevel >= 5 && hotel.currentLevel < 10:
            slotAmountPlayerCanBuy = 6;
            break;
        case hotel.currentLevel >= 10 && hotel.currentLevel < 15:
            slotAmountPlayerCanBuy = 8;
            break;
        case hotel.currentLevel >= 15 && hotel.currentLevel < 20:
            slotAmountPlayerCanBuy = 12;
            break;
        case hotel.currentLevel >= 20:
            slotAmountPlayerCanBuy = 20;
            break;
    }

    const slots = parseInt(event.target.dataset.slots);
    const cost = parseInt(event.target.dataset.cost);
    const dailyMaintenance = slots * 10;

    if(slots + hotel.hotelCapacity > slotAmountPlayerCanBuy ){
        SystemFunctions.showAlert(`You can only have up to ${slotAmountPlayerCanBuy} slots at lvl${hotel.currentLevel}!`, "🚪 Slot Purchase Limit");
        return; 
    }
    
    if (hotel.hotelMoney >= cost) {
        hotel.hotelMoney -= cost;
        moneyDisplay.textContent = `$${hotel.hotelMoney}`;
        
        hotel.hotelCapacity += slots;
        totalSlotsPurchased += slots;
        
        slotMaintenanceCost += dailyMaintenance;
        hotel.dailyFee += dailyMaintenance;
        dailyFeeDisplay.textContent = `$${hotel.dailyFee}`;
        
        SystemFunctions.showAlert(`Successfully bought ${slots} slot(s)! Daily maintenance cost: $${dailyMaintenance}`, "🚪 Slot Purchase Success");
    } else {
        SystemFunctions.showAlert(`You don't have enough money! You need $${cost} but only have $${hotel.hotelMoney}`, "🚪 Slot Purchase Failed");
    }
}

/**
 * Handles hiring workers
 * @param {Event} event - The click event
 */
function handleWorkerPurchase(event) {
    let workerAmountPlayerCanHire = 1;

    switch (true){
        case hotel.currentLevel >= 5 && hotel.currentLevel < 10:
            workerAmountPlayerCanHire = 2;
            break;
        case hotel.currentLevel >= 10 && hotel.currentLevel < 15:
            workerAmountPlayerCanHire = 3;
            break;
        case hotel.currentLevel >= 15 && hotel.currentLevel < 20:
            workerAmountPlayerCanHire = 4;
            break;
        case hotel.currentLevel >= 20:
            workerAmountPlayerCanHire = 5;
            break;
    }

    const workers = parseInt(event.target.dataset.workers);
    const cost = parseInt(event.target.dataset.cost);
    const dailySalary = workers * 30;
    
    if(workers + hotel.workersAmount > workerAmountPlayerCanHire ){
        SystemFunctions.showAlert(`You can only have up to ${workerAmountPlayerCanHire} workers at at lvl${hotel.currentLevel}!`, "👤 Worker Hire Limit", 3000);
        return; 
    }else{
        if (hotel.hotelMoney >= cost) {
            hotel.hotelMoney -= cost;
            moneyDisplay.textContent = `$${hotel.hotelMoney}`;
            
            hotel.workersAmount += workers;
            totalWorkerHired += workers;
            workerAmountDisplay.textContent = hotel.workersAmount;
            
            workerSalaryCost += dailySalary;
            hotel.dailyFee += dailySalary;
            dailyFeeDisplay.textContent = `$${hotel.dailyFee}`;
            
            SystemFunctions.showAlert(`Successfully hired ${workers} worker(s)! Daily salary cost: $${dailySalary}`, "👤 Worker Hire Success", 2000);
        } else {
            SystemFunctions.showAlert(`You don't have enough money! You need $${cost} but only have $${hotel.hotelMoney}`, "👤 Worker Hire Failed", 2000);
        }
    }
    
    
}

/**
 * Updates the food stock display in the info panel
 */
function updateFoodStockDisplay() {
    const foodTypes = Object.keys(hotel.foodStock);
    
    if (foodTypes.length === 0) {
        foodStockList.innerHTML = "<li>No food in stock</li>";
    } else {
        foodStockList.innerHTML = "";
        foodTypes.forEach(foodType => {
            const quantity = hotel.foodStock[foodType];
            const listItem = document.createElement("li");
            listItem.textContent = `${foodType}: ${quantity} units`;
            foodStockList.appendChild(listItem);
        });
    }
}

export { updateFoodStockDisplay };

/**
 * Returns the current food inventory
 * @returns {Object} The food inventory object
 */
function getFoodInventory() {
    return hotel.foodStock;
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

export { getFoodInventory, getSlotMaintenanceCost, getWorkerSalaryCost };

