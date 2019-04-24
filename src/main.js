window.onload = function () 
{

    // const adhanForm = document.getElementById("adhanForm");
    // const loadBtn = document.getElementsByClassName("btnLoadTimes")[0];
    // const table = document.getElementById("times-table");
    // const preloader = document.getElementsByClassName("preloader")[0];

    // adhanForm.onsubmit = function (e) {
    //     e.preventDefault();

    //     table.classList.remove("active");
    //     table.lastElementChild.innerHTML = "";

    //     const months = ["January", "February", "March", "April", 
    //                     "May", "June", "July", "August", "September",
    //                     "October", "November", "December"];

    //     const year = document.getElementById("year").value;
    //     const month = document.getElementById("month").value;
    //     const isAnnual = document.getElementById("annual").checked;

    //     const http = new XMLHttpRequest();
    //     http.onreadystatechange = function () {

    //         if (http.readyState === 4 && http.status === 200) {
    //             const response = JSON.parse(http.responseText);
    //             const data = response.data;
               
    //             if (isAnnual) {
    //                 //data contains all months array which includes all dates array
    //                 for(let monthNo in data)
    //                 {
    //                     const trForMonthLabel = document.createElement('tr');
    //                     const td = document.createElement('td');

    //                     td.setAttribute("colspan", 10);
    //                     td.innerText = months[monthNo - 1];
    //                     td.classList.add("month-label");
                         
    //                     trForMonthLabel.appendChild(td);
    //                     table.lastElementChild.appendChild(trForMonthLabel);
    //                     LoadMonthData(data[monthNo]);
    //                 }
    //             }
    //             else {
    //                 //data contains only dates array
    //                 LoadMonthData(data);
    //             }

    //             preloader.classList.remove("active");
    //             table.classList.add("active");
    //         }
    //         else if (http.readyState === 4 && http.status !== 200) {
    //             alert(JSON.parse(http.responseText).data);
    //         }
    //     }

    //     preloader.classList.add("active");

    //     const url =
    //         `http://api.aladhan.com/v1/calendarByCity` +
    //         `?city=Baku&country=AZ&month=${month}&year=${year}&annual=${isAnnual}`;
    //     http.open("GET", url);
    //     http.send();
    // }


    // function LoadMonthData(month)
    // {
    //     month.forEach(day => {
    //         const tr = document.createElement('tr');

    //         const tdDate = document.createElement('td');
    //         tdDate.innerText = day.date.readable;
    //         tr.appendChild(tdDate);

    //         //dynamic loop for object properties
    //         for (let key in day.timings) {
    //             const td = document.createElement('td');
    //             const time = day.timings[key];
    //             td.innerText = time.substring(0, time.length - 6);
    //             tr.appendChild(td);
    //         }

    //         table.lastElementChild.appendChild(tr);
    //     })
    // }


    table.style.visibility = "hidden";
    
    show.onclick = function()
    {
        table.lastElementChild.innerHTML = "";
        table.style.transition = "all 5s ease-in-out";
        table.style.opacity = "0";
        let selectValue = cityList.value;
        
        if(selectValue !== "nothing")
        {
            table.style.opacity = "1";
            table.style.visibility = "visible";

            let request = new XMLHttpRequest();

            request.onreadystatechange = function()
            {
                if(request.readyState === 4 && request.status === 200)
                {
                    let data = JSON.parse(this.responseText);
                    // console.log(data);

                    data.list.forEach(day =>
                    {
                        let row = document.createElement("tr");
                        let dateCol = document.createElement("td");
                        let groundCol = document.createElement("td");
                        let humCol = document.createElement("td");
                        let prsCol = document.createElement("td");
                        let seaCol = document.createElement("td");
                        let tempCol = document.createElement("td");
                        let tempkfCol = document.createElement("td");
                        let tempMaxCol = document.createElement("td");
                        let tempMinCol = document.createElement("td");
                        let dscpCol = document.createElement("td");
                        let windDegCol = document.createElement("td");
                        let windSpeedCol = document.createElement("td");

                        dateCol.innerText = day.dt_txt;
                        groundCol.innerText = day.main.grnd_level;
                        humCol.innerText = day.main.humidity;
                        prsCol.innerText = day.main.pressure;
                        seaCol.innerText = day.main.sea_level;
                        tempCol.innerText = day.main.temp;
                        tempkfCol.innerText = day.main.temp_kf;
                        tempMaxCol.innerText = day.main.temp_max;
                        tempMinCol.innerText = day.main.temp_min;
                        dscpCol.innerText = day.weather[0].description;
                        windDegCol.innerText = day.wind.deg;
                        windSpeedCol.innerText = day.wind.speed;

                        row.appendChild(dateCol);
                        row.appendChild(groundCol);
                        row.appendChild(humCol);
                        row.appendChild(prsCol);
                        row.appendChild(seaCol);
                        row.appendChild(tempCol);
                        row.appendChild(tempkfCol);
                        row.appendChild(tempMaxCol);
                        row.appendChild(tempMinCol);
                        row.appendChild(dscpCol);
                        row.appendChild(windDegCol);
                        row.appendChild(windSpeedCol);
                        table.lastElementChild.appendChild(row);
                    })
                    
                }
            }

            request.open("GET",`http://api.openweathermap.org/data/2.5/forecast?id=${selectValue}&APPID=ad13347afe18e1b76716899dc1747aa8&cnt=16`);
            request.send();
        } 
    }
}


