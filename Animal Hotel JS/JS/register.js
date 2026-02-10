/**
 * @fileoverview Initial hotel registration and setup
 */

import { Hotel } from "./animal.js";
import { SystemFunctions } from "./systemFunctions.js";

const nameSubmitButton = document.getElementById("confirm-name-btn");
const nameModal = document.getElementById("name-modal");
const nameInput = document.getElementById("hotel-name-input");
const hotelNameDisplay = document.getElementById("hotel-name");

let hotel;

/**
 * Initializes the hotel when the user submits their hotel name.
 * Validates input, saves name to localStorage, and sets up the game.
 */
nameSubmitButton.addEventListener("click", function(e) {
    e.preventDefault();

    const hotelName = nameInput.value.trim();

    // Validate hotel name
    if (hotelName !== "") {
        // Save hotel name to localStorage
        localStorage.setItem("hotelName", hotelName);
        hotelNameDisplay.textContent = hotelName + " Hotel";

        // Initialize hotel and fill animal queue
        hotel = new Hotel(hotelName);
        SystemFunctions.fillAnimalLine();

        // Hide the name modal to start the game
        nameModal.style.display = "none";
    } else {
        alert("Please enter a valid hotel name.");
    }
});

export { hotel };