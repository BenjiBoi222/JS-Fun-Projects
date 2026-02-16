/**
 * @fileoverview Initial hotel registration and setup
 */

import { Hotel } from "./animal.js";
import { SystemFunctions } from "./systemFunctions.js";

const hotelNameDisplay = document.getElementById("hotel-name");

let hotel;

/**
 * Shows the hotel name modal and initializes the game when submitted.
 * Validates input, saves name to localStorage, and sets up the game.
 */
function initializeHotel() {
    SystemFunctions.showHotelNameModal((hotelName) => {
        hotelName = hotelName.trim();

        // Validate hotel name
        if (hotelName !== "") {
            // Save hotel name to localStorage
            localStorage.setItem("hotelName", hotelName);
            hotelNameDisplay.textContent = hotelName + " Hotel";

            // Initialize hotel and fill animal queue
            hotel = new Hotel(hotelName);
            SystemFunctions.fillAnimalLine();
        } else {
            alert("Please enter a valid hotel name.");
            // Show the modal again if invalid
            initializeHotel();
        }
    });
}

// Initialize the hotel name modal when the page loads
document.addEventListener("DOMContentLoaded", initializeHotel);

export { hotel };