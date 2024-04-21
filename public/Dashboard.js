function renderGraph(user) { 
    user = JSON.parse(user);

    const data = [];
    for (const key in user){
        if (key != "user_id"){
            data.push({
                name: key,
                value: user[key]
            });
        }
    }

    const svg = d3.select("svg"),
          margin = { top: 20, right: 20, bottom: 30, left: 40 },
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
        .text("Extraversion Score");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");
}
