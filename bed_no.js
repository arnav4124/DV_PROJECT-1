// // Chart dimensions
// const margin = { top: 50, right: 50, bottom: 50, left: 80 };
// const width = 400 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// // Dropdown elements
// const yearSelect1 = document.getElementById("yearSelect1");
// const yearSelect2 = document.getElementById("yearSelect2");

// // Available years (excluding 2020, 2021)
// const years = [2015, 2016, 2017, 2018, 2019, 2022, 2023, 2024, 2025];

// // Populate dropdowns
// years.forEach(year => {
//     let option1 = new Option(year, year);
//     let option2 = new Option(year, year);
//     yearSelect1.add(option1);
//     yearSelect2.add(option2);
// });

// // Set default selected years
// yearSelect1.value = 2015;
// yearSelect2.value = 2025;

// // Append SVG containers
// const svg1 = d3.select("#chart1")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// const svg2 = d3.select("#chart2")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// // Tooltip
// const tooltip = d3.select("body")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// // Load data and render plots
// d3.csv("from2015.csv").then(data => {
//     // Convert Position, Bed Number, and Year to numbers
//     data.forEach(d => {
//         d.Position = +d.Position;
//         d["Bed Number"] = +d["Bed Number"];
//         d.Year = +d.Year;
//     });

//     function updateScatterPlot(svg, selectedYear) {
//         // Filter data for selected year
//         const filteredData = data.filter(d => d.Year === selectedYear);

//         // Define scales
//         const xScale = d3.scaleLinear()
//             .domain(d3.extent(data, d => d["Bed Number"]))
//             .range([0, width]);

//         const yScale = d3.scaleLinear()
//             .domain(d3.extent(data, d => d.Position))
//             .range([height, 0]);

//         // Clear previous elements
//         svg.selectAll("*").remove();

//         // Add X Axis
//         svg.append("g")
//             .attr("transform", `translate(0, ${height})`)
//             .call(d3.axisBottom(xScale).ticks(5));

//         // Add Y Axis
//         svg.append("g")
//             .call(d3.axisLeft(yScale).ticks(5));

//         // Add Axis Labels
//         svg.append("text")
//             .attr("class", "axis-label")
//             .attr("x", width / 2)
//             .attr("y", height + 40)
//             .text("Bed Number");

//         svg.append("text")
//             .attr("class", "axis-label")
//             .attr("x", -height / 2)
//             .attr("y", -50)
//             .attr("transform", "rotate(-90)")
//             .text("Position");

//         // Scatter Plot Points
//         svg.selectAll(".dot")
//             .data(filteredData)
//             .enter()
//             .append("circle")
//             .attr("class", "dot")
//             .attr("cx", d => xScale(d["Bed Number"]))
//             .attr("cy", d => yScale(d.Position))
//             .attr("r", 5)
//             .attr("fill", "#007bff")
//             .attr("opacity", 0.7)
//             .on("mouseover", (event, d) => {
//                 tooltip.style("opacity", 1)
//                     .html(`🏨 Bed: <b>${d["Bed Number"]}</b><br>🏁 Position: <b>${d.Position}</b>`)
//                     .style("left", (event.pageX + 10) + "px")
//                     .style("top", (event.pageY - 20) + "px");
//             })
//             .on("mousemove", (event) => {
//                 tooltip.style("left", (event.pageX + 10) + "px")
//                        .style("top", (event.pageY - 20) + "px");
//             })
//             .on("mouseout", () => tooltip.style("opacity", 0));
//     }

//     // Initial plots
//     updateScatterPlot(svg1, +yearSelect1.value);
//     updateScatterPlot(svg2, +yearSelect2.value);

//     // Update plots when dropdowns change
//     yearSelect1.addEventListener("change", () => {
//         updateScatterPlot(svg1, +yearSelect1.value);
//     });

//     yearSelect2.addEventListener("change", () => {
//         updateScatterPlot(svg2, +yearSelect2.value);
//     });

// });
// Chart dimensions
const margin = { top: 50, right: 50, bottom: 50, left: 80 };
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Dropdown elements
const yearSelect1 = document.getElementById("yearSelect1");
const yearSelect2 = document.getElementById("yearSelect2");

// Available years (excluding 2020, 2021)
const years = [2015, 2018, 2019, 2022, 2023, 2024];

// Populate dropdowns
years.forEach(year => {
    let option1 = new Option(year, year);
    let option2 = new Option(year, year);
    yearSelect1.add(option1);
    yearSelect2.add(option2);
});

// Set default selected years
yearSelect1.value = 2015;
yearSelect2.value = 2018;

// Append SVG containers
const svg1 = d3.select("#chart1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const svg2 = d3.select("#chart2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load data and render plots
d3.csv("from2015.csv").then(data => {
    // Convert Position, Bed Number, and Year to numbers
    data.forEach(d => {
        d.Position = +d.Position;
        d["Bed Number"] = +d["Bed Number"];
        d.Year = +d.Year;
    });

    function updateScatterPlot(svg, selectedYear) {
        // Filter data for selected year
        const filteredData = data.filter(d => d.Year === selectedYear);

        // Define scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d["Bed Number"]))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Position))
            .range([height, 0]);

        // Define color scale: Darker blue for better rank (lower position), lighter for worse rank
        const colorScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Position))
            .range(["#003f7f", "#80bfff"]); // Dark blue to light blue

        // Clear previous elements
        svg.selectAll("*").remove();

        // Add X Axis
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(5));

        // Add Y Axis
        svg.append("g")
            .call(d3.axisLeft(yScale).ticks(5));

        // Add Axis Labels
        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .text("Bed Number");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .text("Position");

        // Scatter Plot Points with Dynamic Color Intensity
        svg.selectAll(".dot")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d["Bed Number"]))
            .attr("cy", d => yScale(d.Position))
            .attr("r", 6)
            .attr("fill", d => colorScale(d.Position)) // Apply color scale
            .attr("opacity", 0.8)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`🏨 Bed: <b>${d["Bed Number"]}</b><br>🏁 Position: <b>${d.Position}</b>`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mousemove", (event) => {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", () => tooltip.style("opacity", 0));
    }

    // Initial plots
    updateScatterPlot(svg1, +yearSelect1.value);
    updateScatterPlot(svg2, +yearSelect2.value);

    // Update plots when dropdowns change
    yearSelect1.addEventListener("change", () => {
        updateScatterPlot(svg1, +yearSelect1.value);
    });

    yearSelect2.addEventListener("change", () => {
        updateScatterPlot(svg2, +yearSelect2.value);
    });

});
