google.charts.load("current", {
    packages: ["corechart", "bar"],
  });
  google.charts.setOnLoadCallback(loadTable);
  
  function loadTable() {
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/slist";
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var trHTML = "";
        var num = 1;
        const objects = JSON.parse(this.responseText);
        console.log(objects)
  
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + num + "</td>";
          trHTML += "<td>" + object["HeartDisease"] + "</td>";
          trHTML += "<td>" + object["BMI"] + "</td>";
          trHTML += "<td>" + object["Smoking"] + "</td>";
          trHTML += "<td>" + object["AlcoholDrinking"] + "</td>";
          trHTML += "<td>" + object["Stroke"] + "</td>";
          trHTML += "<td>" + object["PhysicalHealth"] + "</td>";
          trHTML += "<td>" + object["MentalHealth"] + "</td>";
          trHTML += "<td>" + object["DiffWalking"] + "</td>";
          trHTML += "<td>" + object["Sex"] + "</td>";
          trHTML += "<td>" + object["AgeCategory"] + "</td>";
          trHTML += "<td>" + object["Race"] + "</td>";
          trHTML += "<td>" + object["Diabetic"] + "</td>";
          trHTML += "<td>" + object["PhysicalActivity"] + "</td>";
          trHTML += "<td>" + object["GenHealth"] + "</td>";
          trHTML += "<td>" + object["SleepTime"] + "</td>";
          trHTML += "<td>" + object["Asthma"] + "</td>";
          trHTML += "<td>" + object["KidneyDisease"] + "</td>";
          trHTML += "<td>" + object["SkinCancer"] + "</td>";
          trHTML += "<td>";
          trHTML +='<a type="button" class="btn btn-outline-secondary me-2" onclick="showStudentUpdateBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
          trHTML +='<a type="button" class="btn btn-outline-danger" onclick="showStudentDeleteBox(\'' +object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
          trHTML += "<tr>";
  
          num++;
        }
        document.getElementById("mytable").innerHTML = trHTML;
  
        loadGraph(objects);
      }
    };
  }
  
  function loadQueryTable() {
    document.getElementById("mytable").innerHTML ='<tr><th scope="row" colspan="5">Loading...</th></tr>';
    const searchText = document.getElementById("searchTextBox").value;
  
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/slist/field/" + searchText;
    xhttp.open("GET", uri);
  
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var trHTML = "";
        var num = 1;
        const objects = JSON.parse(this.responseText).Complaint;
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + num + "</td>";
          trHTML += "<td>" + object["HeartDisease"] + "</td>";
          trHTML += "<td>" + object["BMI"] + "</td>";
          trHTML += "<td>" + object["Smoking"] + "</td>";
          trHTML += "<td>" + object["AlcoholDrinking"] + "</td>";
          trHTML += "<td>" + object["Stroke"] + "</td>";
          trHTML += "<td>" + object["PhysicalHealth"] + "</td>";
          trHTML += "<td>" + object["MentalHealth"] + "</td>";
          trHTML += "<td>" + object["DiffWalking"] + "</td>";
          trHTML += "<td>" + object["Sex"] + "</td>";
          trHTML += "<td>" + object["AgeCategory"] + "</td>";
          trHTML += "<td>" + object["Race"] + "</td>";
          trHTML += "<td>" + object["Diabetic"] + "</td>";
          trHTML += "<td>" + object["PhysicalActivity"] + "</td>";
          trHTML += "<td>" + object["GenHealth"] + "</td>";
          trHTML += "<td>" + object["SleepTime"] + "</td>";
          trHTML += "<td>" + object["Asthma"] + "</td>";
          trHTML += "<td>" + object["KidneyDisease"] + "</td>";
          trHTML += "<td>" + object["SkinCancer"] + "</td>";
          trHTML += "<td>";
          trHTML +=
            '<a type="button" class="btn btn-outline-secondary" onclick="showStudentUpdateBox(\'' +
            object["_id"] +
            '\')"><i class="fas fa-edit"></i></a>';
          trHTML +=
            '<a type="button" class="btn btn-outline-danger" onclick="studentDelete(\'' +
            object["_id"] +
            '\')"><i class="fas fa-trash"></i></a></td>';
          trHTML += "<tr>";
          num++;
        }
        console.log(trHTML);
        document.getElementById("mytable").innerHTML = trHTML;
  
        loadGraph(objects);
      }
    };
  }
  //กราฟ
  function loadGraph(objects) {
    var mlCount = 0;
    var fullsCount = 0;
    var sysCount = 0;
    var netwCount = 0;
  
    var mrCount = 0;
    var missCount = 0;
    var drCount = 0;
    var pfCount = 0;
  
    for (let object of objects) {
      switch (object["Project"]) {
        case "Machine Learning":
          mlCount = mlCount + 1;
          break;
        case "Fullstack":
          fullsCount = fullsCount + 1;
          break;
  
        case "System Design":
          sysCount = sysCount + 1;
          break;
  
        case "Networks":
          netwCount = netwCount + 1;
          break;
      }
  
      switch (object["Title"]) {
        case "นาย":
          mrCount = mrCount + 1;
          break;
        case "นางสาว":
          missCount = missCount + 1;
          break;
  
        case "ดร.":
          drCount = drCount + 1;
          break;
  
        case "ศ.ดร":
          pfCount = pfCount + 1;
          break;
      }
    }
  
    var TimelyResponseData = google.visualization.arrayToDataTable([
      ["Project", "Field"],
      ["Machine Learning", mlCount],
      ["Fullstack", fullsCount],
      ["System Design", sysCount],
      ["Networks", netwCount],
    ]);
  
    var optionsTimelyResponse = { Titil: "Overall Project Fields",
      legentFontSize: 15,
      fontSize: 15,
      titleFontSize: 15,
      tooltipFontSize: 15 };
    var chartTimelyResponse = new google.visualization.PieChart(
      document.getElementById("piechartTimelyResponse")
    );
    chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);
  
    var dataSubmitted = google.visualization.arrayToDataTable([
      [
        "Student Titile",
        "Number",
        {
          role: "style",
        },
        {
          role: "annotation",
        },
      ],
      ["นาย", mrCount, "gold", "นาย"],
      ["นางสาว", missCount, "color: #F65A83", "นางสาว"],
      ["ดร.", drCount, "color: #F9F5EB", "ดร."],
      ["ศ.ดร", pfCount, "color: #607EAA", "ศ.ดร"],
    ]);
  
    var optionSubmitted = {
      title: "Staff' Title",
      legend: { position: "none" },
      legentFontSize: 15,
      fontSize: 15,
      titleFontSize: 15,
      tooltipFontSize: 15
    };
  
    var chartSubmitted = new google.visualization.BarChart(
      document.getElementById("barchartSubmitted")
    );
    chartSubmitted.draw(dataSubmitted, optionSubmitted);
  }
  
  //...
  function showStudentCreateBox() {
    var d = new Date();
    const date = d.toISOString().split("T")[0];
  
    Swal.fire({
      title: "Personal Key Indicators of Heart Disease",
      html:
  
        '<div class="mb-3"><label for="HeartDisease" class="form-label">HeartDisease</label>' +
        '<input class="form-control" id="HeartDisease" placeholder="HeartDisease"></div>' +
  
        '<div class="mb-3"><label for="BMI" class="form-label">BMI</label>' +
        '<input class="form-control" id="BMI" placeholder="BMI"></div>' +
  
        '<div class="mb-3"><label for="Smoking" class="form-label">Smoking</label>' +
        '<input class="form-control" id="Smoking" placeholder="Smoking"></div>' +
  
        '<div class="mb-3"><label for="AlcoholDrinking" class="form-label">AlcoholDrinking</label>' +
        '<input class="form-control" id="AlcoholDrinking" placeholder="AlcoholDrinking"></div>' +
  
        '<div class="mb-3"><label for="Stroke" class="form-label">Stroke</label>' +
        '<input class="form-control" id="Stroke" placeholder="Stroke"></div>' +
  
        '<div class="mb-3"><label for="PhysicalHealth" class="form-label">PhysicalHealth</label>' +
        '<input class="form-control" id="PhysicalHealth" placeholder="PhysicalHealth"></div>' +
  
        '<div class="mb-3"><label for="MentalHealth" class="form-label">MentalHealth</label>' +
        '<input class="form-control" id="MentalHealth" placeholder="MentalHealth"></div>' +

        '<div class="mb-3"><label for="DiffWalking" class="form-label">DiffWalking</label>' +
        '<input class="form-control" id="DiffWalking" placeholder="DiffWalking"></div>' +

        '<div class="mb-3"><label for="Sex" class="form-label">Sex</label>' +
        '<input class="form-control" id="Sex" placeholder="Sex"></div>' +

        '<div class="mb-3"><label for="AgeCategory" class="form-label">AgeCategory</label>' +
        '<input class="form-control" id="AgeCategory" placeholder="AgeCategory"></div>' +

        '<div class="mb-3"><label for="RaceRace" class="form-label">Race</label>' +
        '<input class="form-control" id="Race" placeholder="Race"></div>' +

        '<div class="mb-3"><label for="Diabetic" class="form-label">Diabetic</label>' +
        '<input class="form-control" id="Diabetic" placeholder="Diabetic"></div>' +

        '<div class="mb-3"><label for="PhysicalActivity" class="form-label">PhysicalActivity</label>' +
        '<input class="form-control" id="PhysicalActivity" placeholder="PhysicalActivity"></div>' +

        '<div class="mb-3"><label for="GenHealth" class="form-label">GenHealth</label>' +
        '<input class="form-control" id="GenHealth" placeholder="GenHealth"></div>' +

        '<div class="mb-3"><label for="SleepTime" class="form-label">SleepTime</label>' +
        '<input class="form-control" id="SleepTime" placeholder="SleepTime"></div>' +

        '<div class="mb-3"><label for="Asthma" class="form-label">Asthma</label>' +
        '<input class="form-control" id="Asthma" placeholder="Asthma"></div>' +

        '<div class="mb-3"><label for="KidneyDisease" class="form-label">KidneyDisease</label>' +
        '<input class="form-control" id="KidneyDisease" placeholder="KidneyDisease"></div>' +
    
        '<div class="mb-3"><label for="SkinCancer" class="form-label">SkinCancer</label>' +
        '<input class="form-control" id="SkinCancer" placeholder="SkinCancer"></div>',
  
      focusConfirm: false,
      preConfirm: () => {
        slistCreate();
      },
    });
  }
  
  function slistCreate() {
    
    const HeartDisease = document.getElementById("HeartDisease").value;
    const BMI = document.getElementById("BMI").value;
    const Smoking = document.getElementById("Smoking").value;
    const AlcoholDrinking = document.getElementById("AlcoholDrinking").value;
    const Stroke = document.getElementById("Stroke").value;
    const PhysicalHealth = document.getElementById("PhysicalHealth").value;
    const MentalHealth = document.getElementById("MentalHealth").value;
    const DiffWalking = document.getElementById("DiffWalking").value;
    const Sex = document.getElementById("Sex").value;
    const AgeCategory = document.getElementById("AgeCategory").value;
    const Race = document.getElementById("Race").value;
    const Diabetic = document.getElementById("Diabetic").value;
    const PhysicalActivity = document.getElementById("PhysicalActivity").value;
    const GenHealth = document.getElementById("GenHealth").value;
    const SleepTime = document.getElementById("SleepTime").value;
    const Asthma = document.getElementById("Asthma").value;
    const KidneyDisease = document.getElementById("KidneyDisease").value;
    const SkinCancer = document.getElementById("SkinCancer").value;
    console.log(
      JSON.stringify({
        HeartDisease: HeartDisease,
        BMI: BMI,
        Smoking: Smoking,
        AlcoholDrinking: AlcoholDrinking,
        Stroke: Stroke,
        PhysicalHealth: PhysicalHealth,
        MentalHealth: MentalHealth,
        DiffWalking: DiffWalking,
        Sex: Sex,
        AgeCategory: AgeCategory,
        Race: Race,
        Diabetic: Diabetic,
        PhysicalActivity: PhysicalActivity,
        GenHealth: GenHealth,
        SleepTime: SleepTime,
        Asthma: Asthma,
        KidneyDisease: KidneyDisease,
        SkinCancer: SkinCancer,
      })
    );
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/slist/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        HeartDisease: HeartDisease,
        BMI: BMI,
        Smoking: Smoking,
        AlcoholDrinking: AlcoholDrinking,
        Stroke: Stroke,
        PhysicalHealth: PhysicalHealth,
        MentalHealth: MentalHealth,
        DiffWalking: DiffWalking,
        Sex: Sex,
        AgeCategory: AgeCategory,
        Race: Race,
        Diabetic: Diabetic,
        PhysicalActivity: PhysicalActivity,
        GenHealth: GenHealth,
        SleepTime: SleepTime,
        Asthma: Asthma,
        KidneyDisease: KidneyDisease,
        SkinCancer: SkinCancer,
      })
    );
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(
          "Good job!",
          "Create Student Information Successfully!",
          "success"
        );
        loadTable();
      }
    };
  }
  
  function showStudentDeleteBox(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        studentDelete(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  
  }
  
  function studentDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/slist/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        _id: id,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(
          "Good job!",
          "Delete Student Information Successfully!",
          "success"
        );
        loadTable();
      }
    };
  }
  
  function showStudentUpdateBox(id) {
    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/slist/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const object = JSON.parse(this.responseText).Complaint;
        console.log("showStudentUpdateBox", object);
        Swal.fire({
          title: "Update Student Transaction",
          html:
          '<div class="mb-3"><label for="_id" class="form-label">_id</label>' +
            '<input class="form-control" id="_id" placeholder="_id" value="' +object["_id"] +'"></div>' +
          
  
            '<div class="mb-3"><label for="HeartDisease" class="form-label">HeartDisease</label>' +
            '<input class="form-control" id="HeartDisease" placeholder="HeartDisease" value="' +object["HeartDisease"] +'"></div>' +
  
            '<div class="mb-3"><label for="BMI" class="form-label">BMI</label>' +
            '<input class="form-control" id="BMI" placeholder="BMI" value="' +object["BMI"] +'"></div>' +
  
            '<div class="mb-3"><label for="Smoking" class="form-label">Smoking</label>' +
            '<input class="form-control" id="Smoking" placeholder="Smoking" value="' +object["Smoking"] +'"></div>' +
  
            '<div class="mb-3"><label for="AlcoholDrinking" class="form-label">AlcoholDrinking</label>' +
            '<input class="form-control" id="AlcoholDrinking" placeholder="AlcoholDrinking" value="' +object["AlcoholDrinking"] +'"></div>' +
  
            '<div class="mb-3"><label for="Stroke" class="form-label">Stroke</label>' +
            '<input class="form-control" id="Stroke" placeholder="Stroke" value="' +object["Stroke"] +'"></div>' +

            '<div class="mb-3"><label for="PhysicalHealth" class="form-label">PhysicalHealth</label>' +
            '<input class="form-control" id="PhysicalHealth" placeholder="PhysicalHealth" value="' +object["PhysicalHealth"] +'"></div>' +

            '<div class="mb-3"><label for="MentalHealth" class="form-label">MentalHealth</label>' +
            '<input class="form-control" id="MentalHealth" placeholder="MentalHealth" value="' +object["MentalHealth"] +'"></div>' +

            '<div class="mb-3"><label for="DiffWalking" class="form-label">DiffWalking</label>' +
            '<input class="form-control" id="DiffWalking" placeholder="DiffWalking" value="' +object["DiffWalking"] +'"></div>' +

            '<div class="mb-3"><label for="Sex" class="form-label">Sex</label>' +
            '<input class="form-control" id="Sex" placeholder="Sex" value="' +object["Sex"] +'"></div>' +

            '<div class="mb-3"><label for="AgeCategory" class="form-label">AgeCategory</label>' +
            '<input class="form-control" id="AgeCategory" placeholder="AgeCategory" value="' +object["AgeCategory"] +'"></div>' +

            '<div class="mb-3"><label for="Race" class="form-label">Race</label>' +
            '<input class="form-control" id="Race" placeholder="Race" value="' +object["Race"] +'"></div>' +

            '<div class="mb-3"><label for="Diabetic" class="form-label">Diabetic</label>' +
            '<input class="form-control" id="Diabetic" placeholder="Diabetic" value="' +object["Diabetic"] +'"></div>' +
  
            '<div class="mb-3"><label for="PhysicalActivity" class="form-label">PhysicalActivity</label>' +
            '<input class="form-control" id="PhysicalActivity" placeholder="PhysicalActivity" value="' +object["PhysicalActivity"] +'"></div>' +
  
            '<div class="mb-3"><label for="GenHealth" class="form-label">GenHealth</label>' +
            '<input class="form-control" id="GenHealth" placeholder="GenHealth" value="' +object["GenHealth"] +'"></div>' +

            '<div class="mb-3"><label for="SleepTime" class="form-label">SleepTime</label>' +
            '<input class="form-control" id="SleepTime" placeholder="SleepTime" value="' +object["SleepTime"] +'"></div>' +
            
            '<div class="mb-3"><label for="Asthma" class="form-label">Asthma</label>' +
            '<input class="form-control" id="Asthma" placeholder="Asthma" value="' +object["Asthma"] +'"></div>' +

            '<div class="mb-3"><label for="KidneyDisease" class="form-label">KidneyDisease</label>' +
            '<input class="form-control" id="KidneyDisease" placeholder="KidneyDisease" value="' +object["KidneyDisease"] +'"></div>' +
            
            '<div class="mb-3"><label for="SkinCancer" class="form-label">SkinCancer</label>' +
            '<input class="form-control" id="SkinCancer" placeholder="SkinCancer" value="' +object["SkinCancer"] +'"></div>',
  
          focusConfirm: false,
          preConfirm: () => {
            studentUpdate();
          },
        });
      }
    };
  }
  
  function studentUpdate() {
    const _id = document.getElementById("_id").value;
    const HeartDisease = document.getElementById("HeartDisease").value;
    const BMI = document.getElementById("BMI").value;
    const Smoking = document.getElementById("Smoking").value;
    const AlcoholDrinking = document.getElementById("AlcoholDrinking").value;
    const Stroke = document.getElementById("Stroke").value;
    const PhysicalHealth = document.getElementById("PhysicalHealth").value;
    const MentalHealth = document.getElementById("MentalHealth").value;
    const DiffWalking = document.getElementById("DiffWalking").value;
    const Sex = document.getElementById("Sex").value;
    const AgeCategory = document.getElementById("AgeCategory").value;
    const Race = document.getElementById("Race").value;
    const Diabetic = document.getElementById("Diabetic").value;
    const PhysicalActivity = document.getElementById("PhysicalActivity").value;
    const GenHealth = document.getElementById("GenHealth").value;
    const SleepTime = document.getElementById("SleepTime").value;
    const Asthma = document.getElementById("Asthma").value;
    const KidneyDisease = document.getElementById("KidneyDisease").value;
    const SkinCancer = document.getElementById("SkinCancer").value;
  
    console.log(
      JSON.stringify({
        _id:_id,
        HeartDisease: HeartDisease,
        BMI: BMI,
        Smoking: Smoking,
        AlcoholDrinking: AlcoholDrinking,
        Stroke: Stroke,
        PhysicalHealth: PhysicalHealth,
        MentalHealth: MentalHealth,
        DiffWalking: DiffWalking,
        Sex: Sex,
        AgeCategory: AgeCategory,
        Race: Race,
        Diabetic: Diabetic,
        PhysicalActivity: PhysicalActivity,
        GenHealth: GenHealth,
        SleepTime: SleepTime,
        Asthma: Asthma,
        KidneyDisease: KidneyDisease,
        SkinCancer: SkinCancer,
      })
    );
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/slist/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        _id:_id,
        HeartDisease: HeartDisease,
        BMI: BMI,
        Smoking: Smoking,
        AlcoholDrinking: AlcoholDrinking,
        Stroke: Stroke,
        PhysicalHealth: PhysicalHealth,
        MentalHealth: MentalHealth,
        DiffWalking: DiffWalking,
        Sex: Sex,
        AgeCategory: AgeCategory,
        Race: Race,
        Diabetic: Diabetic,
        PhysicalActivity: PhysicalActivity,
        GenHealth: GenHealth,
        SleepTime: SleepTime,
        Asthma: Asthma,
        KidneyDisease: KidneyDisease,
        SkinCancer: SkinCancer,
        
      })
    );
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(
          "Good job!",
          "Update Student Information Successfully!",
          "success"
        );
        loadTable();
      }
    };
  }