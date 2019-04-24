window.onload = function () {

    const adhanForm = document.getElementById("adhanForm");
    const loadBtn = document.getElementsByClassName("btnLoadTimes")[0];
    const table = document.getElementById("times-table");
    const preloader = document.getElementsByClassName("preloader")[0];

    adhanForm.onsubmit = function (e) {
        e.preventDefault();

        table.classList.remove("active");
        table.lastElementChild.innerHTML = "";

        const months = ["January", "February", "March", "April", 
                        "May", "June", "July", "August", "September",
                        "October", "November", "December"];

        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        const isAnnual = document.getElementById("annual").checked;

        const http = new XMLHttpRequest();
        http.onreadystatechange = function () {

            if (http.readyState === 4 && http.status === 200) {
                const response = JSON.parse(http.responseText);
                const data = response.data;
               
                if (isAnnual) {
                    //data contains all months array which includes all dates array
                    for(let monthNo in data)
                    {
                        const trForMonthLabel = document.createElement('tr');
                        const td = document.createElement('td');

                        td.setAttribute("colspan", 10);
                        td.innerText = months[monthNo - 1];
                        td.classList.add("month-label");
                         
                        trForMonthLabel.appendChild(td);
                        table.lastElementChild.appendChild(trForMonthLabel);
                        LoadMonthData(data[monthNo]);
                    }
                }
                else {
                    //data contains only dates array
                    LoadMonthData(data);
                }

                preloader.classList.remove("active");
                table.classList.add("active");
            }
            else if (http.readyState === 4 && http.status !== 200) {
                alert(JSON.parse(http.responseText).data);
            }
        }

        preloader.classList.add("active");

        const url =
            `http://api.aladhan.com/v1/calendarByCity` +
            `?city=Baku&country=AZ&month=${month}&year=${year}&annual=${isAnnual}`;
        http.open("GET", url);
        http.send();
    }


    function LoadMonthData(month)
    {
        month.forEach(day => {
            const tr = document.createElement('tr');

            const tdDate = document.createElement('td');
            tdDate.innerText = day.date.readable;
            tr.appendChild(tdDate);

            //dynamic loop for object properties
            for (let key in day.timings) {
                const td = document.createElement('td');
                const time = day.timings[key];
                td.innerText = time.substring(0, time.length - 6);
                tr.appendChild(td);
            }

            table.lastElementChild.appendChild(tr);
        })
    }
}


