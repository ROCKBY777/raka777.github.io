function calculateData() {
    const dataInput = document.getElementById('dataInput').value;
    const data = dataInput.split(',').map(Number).filter(n => !isNaN(n));

    if (data.length === 0) {
        alert("Please enter valid data.");
        return;
    }

    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '';

    // Helper functions
    function getRange(data) {
        return Math.max(...data) - Math.min(...data);
    }

    function getMean(data) {
        return (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
    }

    function getMedian(data) {
        data.sort((a, b) => a - b);
        const mid = Math.floor(data.length / 2);
        return data.length % 2 === 0 ? ((data[mid - 1] + data[mid]) / 2).toFixed(2) : data[mid];
    }

    function getMode(data) {
        const frequency = {};
        data.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
        const maxFreq = Math.max(...Object.values(frequency));
        const modes = Object.keys(frequency).filter(num => frequency[num] === maxFreq);
        return modes.length === data.length ? "No mode" : modes.join(', ');
    }

    function getQuartiles(data) {
        data.sort((a, b) => a - b);
        const q1 = data[Math.floor((data.length / 4))];
        const q2 = getMedian(data);
        const q3 = data[Math.ceil((data.length * 3) / 4) - 1];
        return { q1, q2, q3 };
    }

    function getVariance(data, mean) {
        return (data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length).toFixed(2);
    }

    function getStandardDeviation(variance) {
        return Math.sqrt(variance).toFixed(2);
    }

    // Calculations
    const range = getRange(data);
    const mean = getMean(data);
    const median = getMedian(data);
    const mode = getMode(data);
    const quartiles = getQuartiles(data);
    const variance = getVariance(data, mean);
    const stdDeviation = getStandardDeviation(variance);

    // Populate table
    const results = {
        "Range": range,
        "Mean": mean,
        "Median": median,
        "Mode": mode,
        "Quartile 1": quartiles.q1,
        "Quartile 2 (Median)": quartiles.q2,
        "Quartile 3": quartiles.q3,
        "Variance": variance,
        "Standard Deviation": stdDeviation
    };

    Object.entries(results).forEach(([key, value]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${key}</td><td>${value}</td>`;
        resultsTable.appendChild(row);
    });
}
// Fungsi untuk menghitung faktorial
function faktorial(n) {
    return n <= 1 ? 1 : n * faktorial(n - 1);
}

// Fungsi Distribusi Binomial
function hitungDistribusiBinomial() {
    const n = parseInt(document.getElementById('nBinom').value);
    const p = parseFloat(document.getElementById('pBinom').value);
    const k = parseInt(document.getElementById('kBinom').value);

    const kombinasi = faktorial(n) / (faktorial(k) * faktorial(n - k));
    const binomial = kombinasi * Math.pow(p, k) * Math.pow(1 - p, n - k);
    const rumus = `P(X = ${k}) = (nCk) * p^k * (1-p)^(n-k)`;

    tambahkanHasilDistribusi("Distribusi Binominal", rumus, binomial.toFixed(4));
}

// Fungsi Distribusi Poisson
function hitungDistribusiPoisson() {
    const lambda = parseFloat(document.getElementById('lambdaPoisson').value);
    const k = parseInt(document.getElementById('kPoisson').value);

    const poisson = (Math.pow(lambda, k) * Math.exp(-lambda)) / faktorial(k);
    const rumus = `P(X = ${k}) = (λ^k * e^(-λ)) / k!`;

    tambahkanHasilDistribusi("Distribusi Poisson", rumus, poisson.toFixed(4));
}

// Fungsi untuk menambahkan hasil ke tabel distribusi
function tambahkanHasilDistribusi(distribusi, rumus, hasil) {
    const hasilDistribusiTable = document.getElementById('hasilDistribusiTable');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${distribusi}</td><td>${rumus}</td><td>${hasil}</td>`;
    hasilDistribusiTable.appendChild(row);
}
function calculateSubset() {
    const pA = parseFloat(document.getElementById('probabilityA').value);
    const pB = parseFloat(document.getElementById('probabilityB').value);
    
    const isSubset = pA <= pB;
    const formula = "P(A) ≤ P(B)";
    const result = isSubset ? "Yes, P(A) is a subset of P(B)" : "No, P(A) is not a subset of P(B)";

    addProbabilityResult("Subset (P(A) ⊆ P(B))", formula, result);
}

function calculateUnion() {
    const pA = parseFloat(document.getElementById('probabilityA').value);
    const pB = parseFloat(document.getElementById('probabilityB').value);
    const pIntersection = parseFloat(document.getElementById('probabilityIntersection').value);

    const union = pA + pB - pIntersection;
    const formula = "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)";
    addProbabilityResult("Union (P(A ∪ B))", formula, union.toFixed(2));
}

function calculateIntersection() {
    const pA = parseFloat(document.getElementById('probabilityA').value);
    const pB = parseFloat(document.getElementById('probabilityB').value);

    const intersection = pA * pB;
    const formula = "P(A ∩ B) = P(A) * P(B)";
    addProbabilityResult("Intersection (P(A ∩ B))", formula, intersection.toFixed(2));
}

function calculateConditional() {
    const pA = parseFloat(document.getElementById('probabilityA').value);
    const pIntersection = parseFloat(document.getElementById('probabilityIntersection').value);

    const conditional = pIntersection / pA;
    const formula = "P(A|B) = P(A ∩ B) / P(B)";
    addProbabilityResult("Conditional (P(A|B))", formula, conditional.toFixed(2));
}

// Helper function to add probability results to the table
function addProbabilityResult(calculation, formula, result) {
    const probabilityResultsTable = document.getElementById('probabilityResultsTable');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${calculation}</td><td>${formula}</td><td>${result}</td>`;
    probabilityResultsTable.appendChild(row);
}
function hitungDistribusiNormal() {
    const mean = parseFloat(document.getElementById('mean').value);
    const stdDev = parseFloat(document.getElementById('stdDev').value);
    const x = parseFloat(document.getElementById('xValue').value);

    // Calculate Normal Distribution Density
    const density = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
    const formula = `f(x) = (1 / (σ * √(2π))) * e^(-0.5 * ((x - μ) / σ)^2)`;

    // Update results table
    tambahkanHasilDistribusiNormal("Kepadatan Distribusi Normal", formula, density.toFixed(4));

    // Plot Normal Distribution Curve
    plotDistribusiNormal(mean, stdDev, x);
}

// Function to add normal distribution results to the table
function tambahkanHasilDistribusiNormal(distribusi, rumus, hasil) {
    const hasilNormalTable = document.getElementById('hasilNormalTable');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${distribusi}</td><td>${rumus}</td><td>${hasil}</td>`;
    hasilNormalTable.appendChild(row);
}

// Function to plot the normal distribution curve with Chart.js
function plotDistribusiNormal(mean, stdDev, x) {
    const ctx = document.getElementById('normalChart').getContext('2d');

    // Generate data points for the curve
    const xValues = [];
    const yValues = [];
    for (let i = mean - 4 * stdDev; i <= mean + 4 * stdDev; i += 0.1) {
        xValues.push(i);
        const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((i - mean) / stdDev, 2));
        yValues.push(y);
    }

    // Create chart with area under curve highlighted at the given x
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Distribusi Normal',
                data: yValues,
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { type: 'linear', title: { display: true, text: 'X' }},
                y: { title: { display: true, text: 'Kepadatan' }}
            },
            plugins: {
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            xMin: x,
                            xMax: x,
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: `X = ${x}`,
                                enabled: true,
                                position: "end"
                            }
                        }
                    }
                }
            }
        }
    });
}
