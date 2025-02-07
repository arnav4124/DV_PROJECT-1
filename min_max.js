// Set dimensions
const margin = { top: 50, right: 50, bottom: 50, left: 80 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Append SVG
const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

// Load CSV Data
d3.csv("year_time.csv").then(data => {
    // Convert Time M:S format to seconds
    data.forEach(d => {
        // Extract only minutes and seconds, ignoring milliseconds if present
        const timeParts = d["Time"].split(":");
        const min = Number(timeParts[0]); // Minutes
        const sec = Number(timeParts[1].split(".")[0]); // Extract only seconds, ignoring milliseconds
        // console.log(min, sec);
        d.timeSeconds = min * 60 + sec;
        d.Year = Number(d.Year); // Convert Year to Number
        // console.log(d.timeSeconds, d.Year);
    });

    // Group data by year and calculate min, max, and avg times
    const years = d3.groups(data, d => d.Year).map(([year, values]) => ({
        year: year,
        min: d3.min(values, d => d.timeSeconds),
        max: d3.max(values, d => d.timeSeconds),
        avg: d3.mean(values, d => d.timeSeconds)
    }));
    
    console.log(years[15]);
    console.log(years[16]);
    console.log(years);
    // Define scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(years, d => d.year))

        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(years, d => d.min) - 10, d3.max(years, d => d.max) + 10])
        .range([height, 0]);

    // Define line generators
    const lineMin = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.min));

    const lineMax = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.max));

    const lineAvg = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.avg));

    // Draw Lines
    svg.append("path")
        .datum(years)
        .attr("class", "line min-line")
        .attr("d", lineMin);

    svg.append("path")
        .datum(years)
        .attr("class", "line max-line")
        .attr("d", lineMax);

    svg.append("path")
        .datum(years)
        .attr("class", "line avg-line")
        .attr("d", lineAvg);

    // Add X Axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    // Add Y Axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add Axis Labels
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("Year");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .text("Time to Finish (Seconds)");

    // Tooltip dots
    ["min", "max", "avg"].forEach(type => {
        svg.selectAll(`.dot-${type}`)
            .data(years)
            .enter()
            .append("circle")
            .attr("class", `dot dot-${type}`)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d[type]))
            .attr("r", 5)
            .attr("fill", type === "min" ? "#007bff" : type === "max" ? "#dc3545" : "#28a745")
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`Year: ${d.year}<br>${type.toUpperCase()}: ${Math.floor(d[type] / 60)}:${(d[type] % 60).toFixed(2)}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", () => tooltip.style("opacity", 0));
    });
});
