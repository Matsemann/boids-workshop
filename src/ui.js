import {world} from "./world";

export const parameters = {
    numBoids: 1,
    neighborRadius: 40,
    separationWeight: 1,
    alignmentWeight: 1,
    cohesionWeight: 1,
    maxSpeed: 5,
    numPredators: 1,
    predatorMaxSpeed: 2.5,
    numObstacles: 1,
    width: 1200,
    height: 900,
};

const defaults = {...parameters};

export function createUI() {
    loadParameters();
    createSlider("numBoids", 10, 2000, 10);
    createSlider("separationWeight", 0, 4, 0.01);
    createSlider("alignmentWeight", 0, 4, 0.01);
    createSlider("cohesionWeight", 0, 4, 0.01);
    createSlider("maxSpeed", 1, 10, 0.5);
    createSlider("neighborRadius", 0, 100, 5);
    createSlider("numPredators", 0, 30, 1);
    createSlider("predatorMaxSpeed", 1, 10, 0.5);
    createSlider("numObstacles", 0, 30, 1);
    createResetButton();
    createFPSCounter();

}

function loadParameters() {
    const paramsFromStorage = JSON.parse(localStorage.getItem("params"));
    Object.assign(parameters, paramsFromStorage);
    paramsUpdated();
}

function paramsUpdated() {
    localStorage.setItem("params", JSON.stringify(parameters));
    world.setNumBoids(parameters.numBoids);
    world.setNumPredators(parameters.numPredators);
    world.setNumObstacles(parameters.numObstacles);
}

function createResetButton() {
    const button = document.createElement("button");
    button.innerText = "reset";
    const controls = document.getElementById("controls");
    button.addEventListener("click", () => {
        console.log("reset");
        Object.assign(parameters, defaults);
        paramsUpdated();
        window.location.reload()
    });

    controls.appendChild(button);
}

function createSlider(param, min, max, step) {
    const div = document.createElement("div");
    div.classList.add("slider");

    const label = document.createElement("label");
    label.htmlFor = param;
    label.innerText = param + ": " + parameters[param];

    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = param;
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = parameters[param];

    slider.addEventListener("input", () => {
        parameters[param] = slider.value;
        label.innerText = param + ": " + parameters[param];
        paramsUpdated();
    });


    div.appendChild(label);
    div.appendChild(slider);

    document.getElementById("controls").appendChild(div);
}

function createFPSCounter() {
    const div = document.createElement("div");
    div.id = "fpscounter";
    document.getElementById("controls").appendChild(div);
}