
const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

// starting UI object

const ui = new UI();

const storage = new Storage();

// all event loading

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addCar);

    document.addEventListener("DOMContentLoaded", function () {
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);

    });
    cardbody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars);
}


function addCar(e) {

    e.preventDefault();

    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if (title === "" || price === "" || url === "") {
        ui.displayMessages("Fill in all fields, please...", "danger");
    }
    else {
        const newCar = new Car(title, price, url);
        ui.addCarToUI(newCar); //adding car to the interface
        storage.addCarToStorage(newCar);
        ui.displayMessages("Vehicle added successfully", "success");
    }

    ui.clearInputs(titleElement, urlElement, priceElement);

}
function deleteCar(e) {
    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("The deletion was successful", "success");
    }
}
function clearAllCars() {

    if (confirm("Are you sure all vehicles will be deleted?")) {
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
}