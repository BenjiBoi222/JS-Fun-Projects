import { Animal } from "./animal.js";
import { SystemFunctions} from "./systemFunctions.js";
import { Randomizer } from "./randomizer.js";
import { hotel } from "./register.js";

//1st function: Check animal in

const checkInButton = document.getElementById("check-in-btn");
const divToShow = document.getElementById("animal-selection");

checkInButton.addEventListener('click', function(e){
    e.preventDefault();
    if(divToShow.style.display == "none"){
        if(SystemFunctions.animalsInLine.length > 0){
            for(let i = 1; i <= SystemFunctions.animalsInLine.length; i++){
                const animalOption = document.getElementById(`animal-select-${i}`);
                animalOption.textContent = `${SystemFunctions.animalsInLine[i-1].name} the ${SystemFunctions.animalsInLine[i-1].animalType} | size: ${SystemFunctions.animalsInLine[i-1].animalSize} | days left: ${SystemFunctions.animalsInLine[i-1].amountOfDayLeft} | Money: $${SystemFunctions.animalsInLine[i-1].moneyForAnimal}  `;
            }
        }

        divToShow.style.display = "grid";
    }
    else{
        divToShow.style.display = "none";
    }
});

// Add event listeners to animal selection buttons once on page load
for(let i = 1; i <= 5; i++){
    const button = document.getElementById(`animal-select-${i}`);
    button.addEventListener('click', function(e){
        e.preventDefault();
        const index = parseInt(button.id.split("-")[2]) - 1;
        
        if(SystemFunctions.animalsInLine.length === 0 || index >= SystemFunctions.animalsInLine.length){
            alert("No animal available in this slot!");
            return;
        }
        
        const animalToCheckIn = SystemFunctions.animalsInLine[index];
        if(hotel.hotelCapacity >= animalToCheckIn.animalSize){
            alert(`You checked in ${animalToCheckIn.name} the ${animalToCheckIn.animalType}!`);

            hotel.AddAnimal(animalToCheckIn);
            hotel.hotelCapacity -= animalToCheckIn.animalSize;
            const capacityStat = document.getElementById("stat-capacity");
            capacityStat.textContent = `${4 - hotel.hotelCapacity} / 4`;
            divToShow.style.display = "none";
            document.getElementById("empty-message-guest").style.display = "none";

            // Remove animal from the waiting line
            SystemFunctions.removeAnimal(animalToCheckIn);
            SystemFunctions.fillAnimalLine();

            updateGuestList();
        }
        else{
            alert(`You don't have enough space to check in ${animalToCheckIn.name} the ${animalToCheckIn.animalType}!`);
        }
    });
}

function updateGuestList(){
    const guestList = document.getElementById("animal-checked-in-list");
    guestList.innerHTML = "";
    for(let animal of hotel.animalsInHotel){
        const newCard = document.createElement("div");
        newCard.className = "guest-card";
        newCard.innerHTML = `
            <div class="guest-card-header">
                <h3>🐾 ${animal.name}</h3>
                <span class="guest-type">${animal.animalType}</span>
            </div>
            <div class="guest-card-details">
                <div class="detail-row">
                    <span class="label">Size:</span>
                    <span class="value">${animal.animalSize}</span>
                </div>
                <div class="detail-row">    
                    <span class="label">Days Left:</span>
                    <span class="value days-left">${animal.amountOfDayLeft}</span>
                </div>
            </div>
        `;
        guestList.appendChild(newCard);
    }
}


//2nd function: check animal out
const animalOutButton = document.getElementById("check-out-btn");
animalOutButton.addEventListener('click',function(e){
    e.preventDefault();
    checkOutAnimal();
});

function checkOutAnimal(){

    if(hotel.animalsInHotel.length === 0){
        return;
    }

    let animalToRemove = 0;
    for(let animal of hotel.animalsInHotel){
        if(animal.amountOfDayLeft <= 0){
            animalToRemove++;
        }
    }
    
    if(animalToRemove > 0){
        for(let i = hotel.animalsInHotel.length - 1; i >= 0; i--){
            if(hotel.animalsInHotel[i].amountOfDayLeft <= 0){
                alert(`${hotel.animalsInHotel[i].name} has checked out!`)
                hotel.hotelCapacity += hotel.animalsInHotel[i].animalSize;
                hotel.hotelMoney += hotel.animalsInHotel[i].moneyForAnimal;
                const capacityStat = document.getElementById("stat-capacity");
                capacityStat.textContent = `${4 - hotel.hotelCapacity} / 4`;
                const moneyOfUser = document.getElementById("stat-money");
                moneyOfUser.textContent = `$${hotel.hotelMoney}`;

                hotel.animalsInHotel.splice(i, 1);
            }
        }
        updateGuestList();
    }
    else{
        alert("No animals are ready to check out yet!");
    }
}






 /**
 * Does everything that needs to be done when the player clicks the "Pass Day" button, such as decreasing the amount of days left for each animal, checking if any animal needs to be removed, etc.
 */
const passDayButton = document.getElementById("pass-day-btn");

    passDayButton.addEventListener('click',function(e){
        e.preventDefault();
        //First, decrease the money amount
        hotel.hotelMoney -= hotel.dailyFee;
        const moneyOfUser = document.getElementById("stat-money");
        moneyOfUser.textContent = `$${hotel.hotelMoney}`;

        //Second, decrease the remaining days for each checked in animal
        if(hotel.animalsInHotel.length > 0){
            for(let animal of hotel.animalsInHotel){
            animal.amountOfDayLeft--;
            }
        }

        //Increase the day counter
        const dayCounter = document.getElementById("stat-day");
        hotel.dayCount++;
        dayCounter.textContent = `${hotel.dayCount}`;

        hotel.CheckDayInDebt();
        updateGuestList();
    });   