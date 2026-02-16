import { Randomizer  } from "./randomizer.js";


/**
 * A class that holds system functions for the game
 * Manages the animal waiting queue and showing popups
 */
class SystemFunctions {
    // A list to store all animals waiting in line
    static animalsInLine = [];

    // Add an animal to the waiting line
    static addAnimal(animal) {
        this.animalsInLine.push(animal);
    }

    // Remove an animal from the waiting line
    static removeAnimal(animal) {
        const index = this.animalsInLine.indexOf(animal);
        if (index > -1) {
            this.animalsInLine.splice(index, 1);
        }
    }

    // Fill the waiting line with random animals until there are 5
    static fillAnimalLine() {
        const parentUl = document.getElementById("line-list");
        const generator = new Randomizer();

        // Keep generating animals until we have 5
        while (this.animalsInLine.length < 5) {
            generator.generateRandomAnimal();
        }

        // Clear the list on the page
        parentUl.innerHTML = "";

        // Add each animal to the display
        for (let i = 0; i < this.animalsInLine.length; i++) {
            const newLi = document.createElement("li");
            const animalName = this.animalsInLine[i].name;
            const animalType = this.animalsInLine[i].animalType;
            newLi.textContent = `${i + 1}) ${animalName} the ${animalType}`;
            parentUl.appendChild(newLi);
        }
    }

    // Creates and shows a popup modal on the screen
    static createPopUp(title, content, buttons, timeout = 0) {
        // Create the main modal box
        const modal = document.createElement('div');
        modal.className = "modal";
        modal.id = `modal-${Date.now()}`;

        // Create a container for the content inside the modal
        const contentDiv = document.createElement('div');
        contentDiv.className = "modal-content";

        // Add the title at the top
        const h2 = document.createElement('h2');
        h2.textContent = title;
        contentDiv.appendChild(h2);

        // Add all the text and input fields
        for (let i = 0; i < content.length; i++) {
            const item = content[i];

            // If it's text, create a paragraph
            if (item.type === 'text' || item.type === 'paragraph') {
                const p = document.createElement('p');
                p.textContent = item.text;
                contentDiv.appendChild(p);
            }

            // If it's an input field, create an input box
            if (item.type === 'input') {
                const input = document.createElement('input');
                input.type = item.inputType || 'text';
                input.placeholder = item.placeholder || '';
                input.id = item.id || '';
                if (item.maxLength) {
                    input.maxLength = item.maxLength;
                }
                contentDiv.appendChild(input);
            }
        }

        // Add all the buttons
        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            const button = document.createElement('button');
            button.textContent = btn.label;

            // When clicked, run the callback and close the modal
            button.onclick = () => {
                if (btn.callback) {
                    btn.callback();
                }
                // Then close the modal
                this.closeModal(modal);
            };

            contentDiv.appendChild(button);
        }

        // Add the content to the modal
        modal.appendChild(contentDiv);

        // Add the modal to the page
        document.body.appendChild(modal);

        // Blur the background so the modal stands out
        const gameContainer = document.getElementById("game-container");
        if (gameContainer) {
            gameContainer.classList.add("blurred");
        }

        // If a timeout was given, automatically close the modal after that time
        if (timeout > 0) {
            setTimeout(() => this.closeModal(modal), timeout);
        }

        return modal;
    }

    // Closes a modal and removes it from the page
    static closeModal(modal) {
        // Hide the modal by adding the 'hidden' class
        modal.classList.add("hidden");

        // Remove the blur effect from the background
        const gameContainer = document.getElementById("game-container");
        if (gameContainer) {
            gameContainer.classList.remove("blurred");
        }

        // Wait a bit for the animation to finish, then remove the modal from the page
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    // Shows the level up popup
    static showLevelUpModal(newLevel) {
        const content = [
            { type: 'text', text: `You have reached level ${newLevel}!` },
            { type: 'text', text: 'New upgrades are available in the shop!' }
        ];

        const buttons = [
            { label: 'Continue', callback: null }
        ];

        this.createPopUp('⭐ LEVEL UP! ⭐', content, buttons, 5000);
    }

    // Shows an alert popup with a message
    static showAlert(message, title = "🔔 System Alert 🔔", timeout = 5000) {
        const content = [
            { type: 'text', text: message }
        ];

        const buttons = [
            { label: 'Close', callback: null }
        ];

        this.createPopUp(title, content, buttons, timeout);
    }

    // Shows a popup for the player to enter their hotel name
    static showHotelNameModal(onConfirm) {
        const content = [
            { type: 'text', text: 'What would you like to name your animal hotel?' },
            { type: 'input', placeholder: 'Enter hotel name...', maxLength: 30, id: 'hotel-name-input' }
        ];

        const buttons = [
            { label: 'Start Game', callback: () => {
                // Get the text that the player typed
                const input = document.getElementById('hotel-name-input');
                const hotelName = input.value;

                // Run the callback with the hotel name
                if (onConfirm) {
                    onConfirm(hotelName);
                }
            }}
        ];

        this.createPopUp('Create Your Hotel', content, buttons, 0);
    }

}

export { SystemFunctions };