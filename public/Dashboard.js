function renderUsersView(){
   const usersViewButton = document.querySelector("#usersViewButton");
   const serverViewButton = document.querySelector("#serverViewButton");

   usersViewButton.classList.add("selected");
   serverViewButton.classList.remove("selected");

   const usersView = document.querySelector("#usersView");
   const serverView = document.querySelector("#serverView");

   usersView.style.display = "";
   serverView.style.display = "none";
}

function renderServerView(){
    const usersViewButton = document.querySelector("#usersViewButton");
    const serverViewButton = document.querySelector("#serverViewButton");

   usersViewButton.classList.remove("selected");
   serverViewButton.classList.add("selected");

   const usersView = document.querySelector("#usersView");
   const serverView = document.querySelector("#serverView");

   usersView.style.display = "none";
   serverView.style.display = "";

   renderServerGraph();
}

function populateUsersTable(userData) {
    const users = JSON.parse(userData); 
    const tableBody = document.querySelector("#tableBody"); 
    tableBody.innerHTML = '';

    for (const user of users) {
        const row = document.createElement("tr");
        const link = document.createElement("a");
        link.href = "#"; 
        link.textContent = user.user_id; 
        row.addEventListener('click', (event) => {
            event.preventDefault(); 
            document.querySelectorAll("tr").forEach(row =>{
                row.classList.remove("selected");
            })
            row.classList.add("selected");
            renderUserGraph(user); 
        });

        row.classList.add("userRowLink");
        row.setAttribute("scope", "row"); 

        const cell = document.createElement("th");
        cell.appendChild(link);
        row.appendChild(cell);

        tableBody.appendChild(row);
    }
}

function renderServerGraph(users) {
    const data = [
        { date: new Date(2020, 0, 1), value: 30 },
        { date: new Date(2020, 1, 1), value: 50 },
        { date: new Date(2020, 2, 1), value: 80 },
        { date: new Date(2020, 3, 1), value: 60 },
        { date: new Date(2020, 4, 1), value: 70 }
    ];
 
    const svg = d3.select("#serverGraph");
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
          width = 1000 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft);
}

function renderUserGraph(user) {
    const userGraphSection = document.querySelector("#userGraphSection")
    userGraphSection.setAttribute("aria-busy", "true");

    let data = [];
    for (const key in user) {
        if (key !== "user_id") {
            const value = key == "neutral" ? 
                user[key] / 2 : 
                user[key];
            
            data.push({
                name: key,
                value: value
            });
        }
    }

    if (!user["neutral"] && !user["positivity"] && !user["negativity"]){
        document.querySelector("#noDataView").style.display = "";
        document.querySelector("#userGraphSection").style.display = "none";
    }
    else {
        document.querySelector("#noDataView").style.display = "none";
        document.querySelector("#userGraphSection").style.display = "";
    }

    // Set up the bar chart
    let svgBar = d3.select("#userGraph");
    svgBar.selectAll("*").remove();

    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svgBar.attr("width") - margin.left - margin.right,
        height = +svgBar.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(data.map(d => d.name));

    const y = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(data, d => d.value)]);

    const gBar = svgBar.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    gBar.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    gBar.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Value");

    gBar.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");

    // Set up the pie chart
    width = 360;
    height = 360;
    const radius = Math.min(width, height) / 2;
    const svgPie = d3.select("#userPie").html("") // Clear previous
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(["positivity", "neutral", "negativity"])
        .range(["green", "grey", "red"]);

    const pie = d3.pie()
        .value(d => d.value);

    const path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    const arc = svgPie.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arc.append('path')
        .attr('d', path)
        .attr('fill', d => color(d.data.name));

    arc.append('text')
        .attr('transform', d => `translate(${path.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.name);

    userGraphSection.setAttribute("aria-busy", "false");
}
