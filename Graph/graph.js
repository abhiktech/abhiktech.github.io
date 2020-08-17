//This file deals with the implementation of graphs and bar charts.

//Add the graph points to an array
function plotPoints(){
  if(steps % 100 == 0){
    t2 = performance.now();
    graphData.push([steps, t2 - t1]);
  }
  ++steps;
}

//Opens the left sidebar
function openGraphSideBar() {
  var table = document.getElementsByClassName("sudokuTable");
  var len = table[0].rows.length;
  //Sets the dimensions of the sidebar and the graph/bar chart
  if(len == 16){
    document.getElementById("graphsidebar").style.width = "23vw";
    document.getElementById("graphsidebar").style.height = "100%";
    document.getElementById("algograph").style.width = "20vw";
    document.getElementById("algograph").style.height = "20vw";
  } else if(len == 9){
    document.getElementById("graphsidebar").style.width = "23vw";
    document.getElementById("graphsidebar").style.height = "100%";
    document.getElementById("algograph").style.width = "20vw";
    document.getElementById("algograph").style.height = "25vw";
  } else {
    document.getElementById("graphsidebar").style.width = "23vw";
    document.getElementById("graphsidebar").style.height = "100%";
    document.getElementById("algograph").style.width = "20vw";
    document.getElementById("algograph").style.height = "20vw";
  }
  document.getElementById("algograph").style.left = "0px";
}

//Set the width of the sidebar to 0 and the left margin of the page content to 0
function closeGraphSideBar() {
  document.getElementById("graphsidebar").style.width = "0";
}

//Plots the actual graph
function drawGraph(){
  if(graphData.length != 0){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Steps');
      data.addColumn('number', 'Time taken (in ms)');
      data.addRows(graphData);
      var options = {
        title: 'Algorithm Performance',
        vAxis: { title: "Time taken (in ms)" },
        hAxis: { title: "Number of steps" },
        legend: { position: 'bottom' }
      };
      var chart = new google.visualization.LineChart(document.getElementById('algograph'));
      chart.draw(data, options);
    }
  }
}

//Plots the bar chart
function drawBarChart(){
  if(barChartData.length != 0){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2(){
      var data = google.visualization.arrayToDataTable(barChartData);
      var options = {
          chart: {
            title: 'Algorithm Performance Comparision',
            vAxis: { title: "Time taken (in ms)" },
            hAxis: { title: "Algorithm" },
            legend: { position: 'bottom' },
            colors: ['blue','red','green','yellow'],
          }
        };
      var chart = new google.charts.Bar(document.getElementById('algograph'));
      chart.draw(data, google.charts.Bar.convertOptions(options));
    }
  }
}

//Displays runtime and star rating of algorithms
function runtime(){
  if(!compare){
    document.getElementById("sidebartext").style.display = "block";
    var rtime = t2 - t1;
    rtime = rtime * 100;
    rtime = Math.floor(rtime);
    rtime = rtime / 100;
    if(rtime < 5){
      rating = '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>'
      + '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>';
    } else if(rtime < 10){
      rating = '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>'
      + '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star"></span>';
    } else if(rtime < 15){
      rating = '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>'
      + '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star"></span>' + '<span class="fa fa-star"></span>';
    } else if(rtime < 20){
      rating = '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star checked"></span>'
      + '<span class="fa fa-star"></span>' + '<span class="fa fa-star"></span>' + '<span class="fa fa-star"></span>';
    } else {
      rating = '<span class="fa fa-star checked"></span>' + '<span class="fa fa-star"></span>'
      + '<span class="fa fa-star "></span>' + '<span class="fa fa-star"></span>' + '<span class="fa fa-star"></span>';
    }
    document.getElementById("runtime").innerHTML = rtime;
    document.getElementById("runtime").style.fontSize = "2vw";
    document.getElementById("starRating").innerHTML = rating;    
  } else {
    document.getElementById("sidebartext").style.display = "none";
  }
}
