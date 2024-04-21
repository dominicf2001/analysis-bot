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

    const data = [];
    for (const key in user) {
        if (key !== "user_id") {
            data.push({
                name: key,
                value: user[key]
            });
        }
    }

    const svg = d3.select("#userGraph");
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(data.map(d => d.name));

    const y = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0, 100]);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Value");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");

   userGraphSection.setAttribute("aria-busy", "false");
}
