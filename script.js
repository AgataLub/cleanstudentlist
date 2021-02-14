"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  console.log("loadJSON");
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    let Student = {
      firstname: "",
      middlename: "",
      nickname: "",
      surname: "",
      gender: "",
      house: "",
    };

    var student = Object.create(Student);

    //create variables
    let capitalized;
    let fullName = jsonObject.fullname;
    let firstName = "";
    let middleName = "";
    let nickName = "";
    let surname = "";
    let house = jsonObject.house;

    //prepare text - names - firstname
    if (fullName.includes(" ") === true) {
      if (fullName.charAt(0) === " ") {
        fullName = fullName.slice(1);
      }

      let firstSpace = fullName.indexOf(" ");
      let lastSpace = fullName.lastIndexOf(" ");

      firstName = fullName.substring(0, firstSpace);
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

      //prepare text - names - middlename + NICKNAME
      middleName = fullName.substring(firstSpace, lastSpace);

      if (middleName.charAt(1) == '"') {
        nickName = middleName;
        middleName = "";
        nickName = nickName.replaceAll('"', "");
      } else {
        middleName = middleName.charAt(1).toUpperCase() + middleName.slice(2).toLowerCase();
      }

      //prepare text - names - surname
      surname = fullName.substring(lastSpace);
      if (surname.includes("-") === true) {
        const firstHyphen = surname.indexOf("-");
        surname = surname.charAt(1).toUpperCase() + surname.slice(2, firstHyphen + 1).toLowerCase() + surname.charAt(firstHyphen + 1).toUpperCase() + surname.slice(firstHyphen + 2).toLowerCase();
      } else {
        surname = surname.charAt(1).toUpperCase() + surname.slice(2).toLowerCase();
      }
    } else {
      firstName = fullName;
    }
    //prepare text - house
    if (house.charAt(0) === " ") {
      house = house.slice(1);
    }
    house = house.charAt(0).toUpperCase() + house.slice(1).toLowerCase();

    //declare elements of the object
    Student.firstname = firstName;
    Student.middlename = middleName;
    Student.nickname = nickName;
    Student.surname = surname;
    Student.gender = jsonObject.gender;
    Student.house = house;

    allStudents.push(student);
  });
  console.log("prepareObjects");
  displayList();
}

function displayList() {
  console.log("displayList");
  //clear the list here?

  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  console.log("displayStudent");
  const clone = document.querySelector("template.tempstudent").content.cloneNode(true);

  clone.querySelector("#fullname").textContent = student.firstname + " " + student.middlename + student.nickname + " " + student.surname;
  clone.querySelector("#gender").textContent = student.gender;
  clone.querySelector("#house").textContent = student.house;

  document.querySelector("body").appendChild(clone);
}
