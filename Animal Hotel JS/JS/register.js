import { SystemFunctions } from "./systemFunctions.js";

const nameSubmitButton = document.getElementById("confirm-name-btn");

nameSubmitButton.addEventListener("click", function(e){
    e.preventDefault();

    let nameModal = document.getElementById("name-modal");
    let nameInput = document.getElementById("hotel-name-input");
    let nameOfHotel = document.getElementById("hotel-name");
    let hotelName = nameInput.value;
    let registeredName = false;

    if(hotelName.trim() !== "") {
        localStorage.setItem(nameOfHotel, hotelName);
        nameOfHotel.textContent = hotelName + " Hotel";
        registeredName = true;
    }else{
        alert("Please enter a valid hotel name.");
    }

    if(registeredName){
        SystemFunctions.fillAnimalLine();
        nameModal.style.display = "none";
    }
})