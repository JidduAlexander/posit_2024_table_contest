
const svgGet = d3.select('#svg-get')
  .attr("viewBox","0 0 100 945")
  .attr('margin', "auto");

const getGhg = new GetGhg(svgGet, dataGetGhg, {id: "main", settings: dataSettings});


