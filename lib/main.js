"use strict";

window.onload = function () {
  var adhanForm = document.getElementById("adhanForm");
  var loadBtn = document.getElementsByClassName("btnLoadTimes")[0];
  var table = document.getElementById("times-table");
  var preloader = document.getElementsByClassName("preloader")[0];

  adhanForm.onsubmit = function (e) {
    e.preventDefault();
    table.classList.remove("active");
    table.lastElementChild.innerHTML = "";
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var isAnnual = document.getElementById("annual").checked;
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        var response = JSON.parse(http.responseText);
        var data = response.data;

        if (isAnnual) {
          //data contains all months array which includes all dates array
          for (var monthNo in data) {
            var trForMonthLabel = document.createElement('tr');
            var td = document.createElement('td');
            td.setAttribute("colspan", 10);
            td.innerText = months[monthNo - 1];
            td.classList.add("month-label");
            trForMonthLabel.appendChild(td);
            table.lastElementChild.appendChild(trForMonthLabel);
            LoadMonthData(data[monthNo]);
          }
        } else {
          //data contains only dates array
          LoadMonthData(data);
        }

        preloader.classList.remove("active");
        table.classList.add("active");
      } else if (http.readyState === 4 && http.status !== 200) {
        alert(JSON.parse(http.responseText).data);
      }
    };

    preloader.classList.add("active");
    var url = "http://api.aladhan.com/v1/calendarByCity" + "?city=Baku&country=AZ&month=".concat(month, "&year=").concat(year, "&annual=").concat(isAnnual);
    http.open("GET", url);
    http.send();
  };

  function LoadMonthData(month) {
    month.forEach(function (day) {
      var tr = document.createElement('tr');
      var tdDate = document.createElement('td');
      tdDate.innerText = day.date.readable;
      tr.appendChild(tdDate); //dynamic loop for object properties

      for (var key in day.timings) {
        var td = document.createElement('td');
        var time = day.timings[key];
        td.innerText = time.substring(0, time.length - 6);
        tr.appendChild(td);
      }

      table.lastElementChild.appendChild(tr);
    });
  }
};