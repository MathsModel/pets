const petFactors = {
    cat: {
        income: [0.4, 0.8, 0.95, 1],
        aloneTime: [1, 0.95, 0.7, 0.4],
        houseSize: [0.4, 0.6, 0.9, 1],
        caretakerAge: [0.4, 0.4, 1, 0.95, 0.9],
        healthStatus: [0.4, 0.6, 0.9, 1],
        allergies: 0.4,
        otherPets: [1, 1, 0.95, 0.85],
        vetDistance: [1, 0.95, 0.85, 0.75, 0.4],
        caregivers: [0.7, 0.9, 1]
    },
    dog: {
        income: [0.4, 0.7, 0.95, 1],
        aloneTime: [1, 0.9, 0.65, 0.4],
        houseSize: [0.4, 0.55, 0.85, 1],
        caretakerAge: [0.4, 0.4, 1, 0.95, 0.9],
        healthStatus: [0.4, 0.6, 0.85, 1],
        allergies: 0.4,
        otherPets: [1, 0.95, 0.95, 0.85],
        vetDistance: [1, 0.9, 0.8, 0.7, 0.4],
        caregivers: [0.6, 0.85, 1]
    },
    bird: {
        income: [0.4, 0.8, 0.95, 1],
        aloneTime: [1, 0.95, 0.9, 0.7],
        houseSize: [0.4, 0.6, 0.9, 1],
        caretakerAge: [0.4, 0.65, 1, 1, 1],
        healthStatus: [0.4, 0.6, 0.9, 1],
        allergies: 0.4,
        otherPets: [1, 1, 0.9, 0.8],
        vetDistance: [1, 0.95, 0.85, 0.75, 0.4],
        caregivers: [0.7, 0.9, 1]
    },
    fish: {
        income: [0.4, 0.8, 0.95, 1],
        aloneTime: [1, 1, 0.9, 0.85],
        houseSize: [0.65, 0.9, 1, 1],
        caretakerAge: [0.4, 0.8, 1, 1, 1],
        healthStatus: [0.4, 0.75, 1, 1],
        allergies: 0.4,
        otherPets: [1, 1, 1, 1],
        vetDistance: [1, 1, 1, 0.95, 0.85],
        caregivers: [0.95, 1, 1]
    },
    hamster: {
        income: [0.4, 0.85, 0.95, 1],
        aloneTime: [1, 1, 0.9, 0.85],
        houseSize: [0.65, 0.9, 1, 1],
        caretakerAge: [0.4, 0.8, 1, 1, 1],
        healthStatus: [0.4, 0.75, 1, 1],
        allergies: 0.4,
        otherPets: [1, 1, 1, 0.85],
        vetDistance: [1, 0.95, 0.85, 0.75, 0.4],
        caregivers: [0.7, 0.9, 1]
    }
};

function assessReadiness() {
    const petType = document.getElementById('pet-type').value;
    const inputs = {
        householdSize: parseInt(document.getElementById('household-size').value),
        income: parseInt(document.getElementById('income').value),
        aloneTime: parseFloat(document.getElementById('alone-time').value),
        houseSize: parseInt(document.getElementById('house-size').value),
        caretakerAge: parseInt(document.getElementById('caretaker-age').value),
        healthStatus: parseFloat(document.getElementById('health-status').value),
        allergies: document.getElementById('allergies').value,
        otherPets: parseInt(document.getElementById('other-pets').value),
        vetDistance: parseFloat(document.getElementById('vet-distance').value),
        caregivers: parseInt(document.getElementById('caregivers').value)
    };

    let probability = 1;
    const decisions = [{name: "Start", probability: probability}];

    // Income
    let incomeFactor;
    if (inputs.income < 10000) {
        incomeFactor = petFactors[petType].income[0];
        decisions.push({name: "Too Low Income", probability: probability * incomeFactor});
    } else if (inputs.income < 20000) {
        incomeFactor = petFactors[petType].income[1];
        decisions.push({name: "Low Income", probability: probability * incomeFactor});
    } else if (inputs.income < 50000) {
        incomeFactor = petFactors[petType].income[2];
        decisions.push({name: "Medium Income", probability: probability * incomeFactor});
    } else {
        incomeFactor = petFactors[petType].income[3];
        decisions.push({name: "High Income", probability: probability * incomeFactor});
    }
    probability *= incomeFactor;

    // Alone Time
    let aloneTimeFactor;
    if (inputs.aloneTime < 8) {
        aloneTimeFactor = petFactors[petType].aloneTime[0];
        decisions.push({name: "Short Alone Time", probability: probability * aloneTimeFactor});
    } else if (inputs.aloneTime <= 12) {
        aloneTimeFactor = petFactors[petType].aloneTime[1];
        decisions.push({name: "Medium Alone Time", probability: probability * aloneTimeFactor});
    } else if (inputs.aloneTime <= 22) {
        aloneTimeFactor = petFactors[petType].aloneTime[2];
        decisions.push({name: "Long Alone Time", probability: probability * aloneTimeFactor});
    } else {
        aloneTimeFactor = petFactors[petType].aloneTime[3];
        decisions.push({name: "Too Long Alone Time", probability: probability * aloneTimeFactor});
    }
    probability *= aloneTimeFactor;

    // House Size
    let houseSizeFactor;
    if (inputs.houseSize < 10) {
        houseSizeFactor = petFactors[petType].houseSize[0];
        decisions.push({name: "Very Low House Size", probability: probability * houseSizeFactor});
    } else if (inputs.houseSize < 20) {
        houseSizeFactor = petFactors[petType].houseSize[1];
        decisions.push({name: "Low House Size", probability: probability * houseSizeFactor});
    } else if (inputs.houseSize < 50) {
        houseSizeFactor = petFactors[petType].houseSize[2];
        decisions.push({name: "Adequate House Size", probability: probability * houseSizeFactor});
    } else {
        houseSizeFactor = petFactors[petType].houseSize[3];
        decisions.push({name: "High House Size", probability: probability * houseSizeFactor});
    }
    probability *= houseSizeFactor;

    // Caretaker Age
    let ageFactor;
    if (inputs.caretakerAge < 8) {
        ageFactor = petFactors[petType].caretakerAge[0];
        decisions.push({name: "Very Young Caretaker", probability: probability * ageFactor});
    } else if (inputs.caretakerAge < 15) {
        ageFactor = petFactors[petType].caretakerAge[1];
        decisions.push({name: "Young Caretaker", probability: probability * ageFactor});
    } else if (inputs.caretakerAge <= 65) {
        ageFactor = petFactors[petType].caretakerAge[2];
        decisions.push({name: "Adequate Caretaker Age", probability: probability * ageFactor});
    } else if (inputs.caretakerAge <= 90) {
        ageFactor = petFactors[petType].caretakerAge[3];
        decisions.push({name: "Old Caretaker", probability: probability * ageFactor});
    } else {
        ageFactor = petFactors[petType].caretakerAge[4];
        decisions.push({name: "Older Caretaker", probability: probability * ageFactor});
    }
    probability *= ageFactor;

    // Health Status
    let healthFactor;
    if (inputs.healthStatus < 3) {
        healthFactor = petFactors[petType].healthStatus[0];
        decisions.push({name: "Too Bad Health", probability: probability * healthFactor});
    } else if (inputs.healthStatus < 5) {
        healthFactor = petFactors[petType].healthStatus[1];
        decisions.push({name: "Bad Health", probability: probability * healthFactor});
    } else if (inputs.healthStatus < 7) {
        healthFactor = petFactors[petType].healthStatus[2];
        decisions.push({name: "Good Health", probability: probability * healthFactor});
    } else {
        healthFactor = petFactors[petType].healthStatus[3];
        decisions.push({name: "Great Health", probability: probability * healthFactor});
    }
    probability *= healthFactor;

    // Allergies
    let allergyFactor = inputs.allergies === petType ? petFactors[petType].allergies : 1;
    decisions.push({name: inputs.allergies === petType ? "Has Allergies" : "No Allergies", probability: probability * allergyFactor});
    probability *= allergyFactor;

    // Other Pets
    let otherPetsFactor;
    if (inputs.otherPets < 1) {
        otherPetsFactor = petFactors[petType].otherPets[0];
        decisions.push({name: "Little Other Pets", probability: probability * otherPetsFactor});
    } else if (inputs.otherPets <= 3) {
        otherPetsFactor = petFactors[petType].otherPets[1];
        decisions.push({name: "Few Other Pets", probability: probability * otherPetsFactor});
    } else if (inputs.otherPets <= 6) {
        otherPetsFactor = petFactors[petType].otherPets[2];
        decisions.push({name: "Some Other Pets", probability: probability * otherPetsFactor});
    } else {
        otherPetsFactor = petFactors[petType].otherPets[3];
        decisions.push({name: "Many Other Pets", probability: probability * otherPetsFactor});
    }
    probability *= otherPetsFactor;

    // Vet Distance
    let vetDistanceFactor;
    if (inputs.vetDistance <= 20) {
        vetDistanceFactor = petFactors[petType].vetDistance[0];
        decisions.push({name: "Very Short Vet Distance", probability: probability * vetDistanceFactor});
    } else if (inputs.vetDistance <= 30) {
        vetDistanceFactor = petFactors[petType].vetDistance[1];
        decisions.push({name: "Short Vet Distance", probability: probability * vetDistanceFactor});
    } else if (inputs.vetDistance <= 50) {
        vetDistanceFactor = petFactors[petType].vetDistance[2];
        decisions.push({name: "Medium Vet Distance", probability: probability * vetDistanceFactor});
    } else if (inputs.vetDistance <= 120) {
        vetDistanceFactor = petFactors[petType].vetDistance[3];
        decisions.push({name: "Long Vet Distance", probability: probability * vetDistanceFactor});
    } else {
        vetDistanceFactor = petFactors[petType].vetDistance[4];
        decisions.push({name: "Too Long Vet Distance", probability: probability * vetDistanceFactor});
    }
    probability *= vetDistanceFactor;

    // External Caregivers
    let caregiverFactor;
    if (inputs.caregivers < 2) {
        caregiverFactor = petFactors[petType].caregivers[0];
        decisions.push({name: "Very Few Caregivers", probability: probability * caregiverFactor});
    } else if (inputs.caregivers <= 4) {
        caregiverFactor = petFactors[petType].caregivers[1];
        decisions.push({name: "Few Caregivers", probability: probability * caregiverFactor});
    } else {
        caregiverFactor = petFactors[petType].caregivers[2];
        decisions.push({name: "Adequate Caregivers", probability: probability * caregiverFactor});
    }
    probability *= caregiverFactor;

    // Final assessment
    let assessment = "";
    if (probability > 0.8) {
        assessment = `Very Ready for ${petType} ownership!`;
    } else if (probability > 0.6) {
        assessment = `Probably Ready for ${petType} ownership, but consider improving some factors.`;
    } else if (probability > 0.4) {
        assessment = `You might want to reconsider or improve your situation before getting a ${petType}.`;
    } else {
        assessment = `It's not recommended to get a ${petType} at this time. Please address the key factors first.`;
    }

    document.getElementById('result').innerHTML = `Readiness Score: ${(probability * 100).toFixed(2)}%<br>${assessment}`;

    // Visualize the decision tree
    visualizeTree(decisions);
}

function visualizeTree(decisions) {
    const width = 700;
    const height = 500;
    const margin = {top: 20, right: 120, bottom: 20, left: 120};

    // Clear previous SVG
    d3.select("#tree-container").selectAll("*").remove();

    const svg = d3.select("#tree-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create hierarchy
    const root = d3.stratify()
        .id((d, i) => i)
        .parentId((d, i) => i > 0 ? i - 1 : null)
        (decisions);

    // Create tree layout
    const treeLayout = d3.tree().size([width, height - 100]);
    const treeData = treeLayout(root);

    // Add links
    const link = svg.selectAll(".link")
        .data(treeData.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y));

    // Add nodes
    const node = svg.selectAll(".node")
        .data(treeData.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);

    // Add circles to nodes
    node.append("circle")
        .attr("r", 5);

    // Add labels to nodes
    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -8 : 8)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => `${d.data.name} (${(d.data.probability * 100).toFixed(2)}%)`)
        .clone(true).lower()
        .attr("stroke", "white");
}

// Check if D3 is loaded
window.onload = function() {
    if (typeof d3 === 'undefined') {
        console.error("D3 library is not loaded. Please check your internet connection and try again.");
        alert("There was an error loading the visualization library. Please check your internet connection and try again.");
    }
};
