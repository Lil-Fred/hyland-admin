const username = document.getElementById("username")


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
    getDatabase,
    onValue,
    set,
    ref,
    child,
    get,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2dT03PtS9cW_qmkKcMYNZn0jlHPuVcjI",
    authDomain: "hypland-auth.firebaseapp.com",
    projectId: "hypland-auth",
    storageBucket: "hypland-auth.appspot.com",
    messagingSenderId: "888082497975",
    appId: "1:888082497975:web:c7a27a5bb8cfd04c406832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const auth = getAuth()
const db = getDatabase(app);


function selectData() {
    const dbref = ref(db, "users")


    onValue(dbref, (snapshot) => {
        let users = [];
        let uids = [];
        let data = [];


        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            users.push(childSnapshot.val())
            uids.push(childKey)
        });
        //  console.log(uids);


        //Merging the two arrays(users and uids) together
        for (var i = 0; i < users.length; i++) {
            var userUid = uids[i];
            var userInfo = users[i];

            var obj = {
                uid: userUid,
                info: userInfo
            };
            data.push(obj);
        }

        data.forEach((user, i) => {

            //Usersids.push(user.uid)

            var usersInfo = `
        <div>
        <h3><span>${i + 1}</span>. ${user.info.username}</h3>
        <ul class="hide">
          <li><span>Unique ID</span>: <span class="idonly uid_${user.uid}">${user.uid}</span></li>
          <li><span>username</span>: <input class="inputBtn username-element" type="text" value="${user.info.username}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>amountAvailable</span>: <input class="inputBtn amountAvailable_El"   type="text" value="${user.info.amountAvailable}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>amountInvested</span>: <input class="inputBtn amountInvested_El"   type="text" value="${user.info.amountInvested}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>country</span>: <input class="inputBtn country_El"   type="text" value="${user.info.country}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>Currency</span>: <input class="inputBtn Currency_El"   value="${user.info.currency}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>email</span>: <input class="inputBtn email_El"   type="text" value="${user.info.email}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>interestEarned</span>: <input class="inputBtn interestEarned_El"   type="text" value="${user.info.interestEarned}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>percentage</span>: <input class="inputBtn percentage_El"   type="text" value="${user.info.percentage}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmamountAvailable</span>: <input class="inputBtn tmamountAvailable_El"   type="text" value="${user.info.tmamountAvailable}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmamountInvested</span>: <input class="inputBtn tmamountInvested_El"   type="text" value="${user.info.tmamountInvested}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmpercentage</span>: <input class="inputBtn tmpercentage_El"   type="text" value="${user.info.tmpercentage}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>usdbalance</span>: <input class="inputBtn usdbalance_El"   type="text" value="${user.info.usdbalance}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
       </ul>
       </div>
      `


            return (

                username.insertAdjacentHTML('afterend', usersInfo)

            )
        });

//         data.map(o => {
//    function test() {
       
//            const Uniquenumb = document.querySelectorAll(`.uid_${o.uid}`)
//            for (let i = 0; i < Uniquenumb.length; i++) {
//                 return data[userIndex].uid === Uniquenumb[i].textContent;
//              console.log( Uniquenumb[i].textContent) 
//             }
//         }
//         test()
//     })
   
console.log(uids);

document.getElementById("demo").innerHTML = uids.findIndex(checkAge);

function checkAge(Uniquenumb) {
  return Uniquenumb === "XMh0LXqdACcirPyRkMrn0BRpOsy2";

}



        let currentlyEditing



        let usernameElArr = document.querySelectorAll(".username-element")
        let amountAvailableArr = document.querySelectorAll(".amountAvailable_El")
        let amountInvestedArr = document.querySelectorAll(".amountInvested_El")
        let countryArr = document.querySelectorAll(".country_El")
        let CurrencyArr = document.querySelectorAll(".Currency_El")
        let emailArr = document.querySelectorAll(".email_El")
        let interestEarnedArr = document.querySelectorAll(".interestEarned_El")
        let percentageArr = document.querySelectorAll(".percentage_El")
        let tmamountAvailableArr = document.querySelectorAll(".tmamountAvailable_El")
        let tmamountInvestedArr = document.querySelectorAll(".tmamountInvested_El")
        let tmpercentageArr = document.querySelectorAll(".tmpercentage_El")
        let usdbalanceArr = document.querySelectorAll(".usdbalance_El")


        //====================== Modifying USERNAME =======================

        for (let i = 0; i < usernameElArr.length; i++) {
            console.log(i);
            usernameElArr[i].addEventListener("focus", function (e) {
                currentlyEditing = e.target.value
            })
            usernameElArr[i].addEventListener("change", function (e) {

                let userIndex = data.map(o => o.info.username).indexOf(currentlyEditing)
                alert("This information is going to change...")
                update(ref(db, 'users/' + data[userIndex].uid), {
                    username: e.target.value,
                })
                //console.log( "Old Username:"+ currentlyEditing)
                console.log("New Username:" + e.target.value)
                console.log(data[userIndex].uid)
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            });
        }

        //====================== Modifying amountAvailable =======================
        for (let i = 0; i < amountAvailableArr.length; i++) {
            console.log( amountAvailableArr[i]);
            amountAvailableArr[i].addEventListener("focus", function (e) {
                currentlyEditing = e.target.value
            })
            amountAvailableArr[i].addEventListener("change", function (e) {
                let userIndex = data.map(o => o.info.amountAvailable).indexOf(currentlyEditing)
               
                let numbIndex = uids.findIndex(currentlyEditing);

        
console.log(numbIndex);                
                
                alert("This information is going to change...")
                console.log(data[userIndex].uid);
                update(ref(db, 'users/' + data[userIndex].uid), {
                    amountAvailable: e.target.value,
                })
                //console.log( "Old amountAvailable:"+ currentlyEditing)
                console.log("New amountAvailable:" + e.target.value)
                setTimeout(() => {
                    //    window.location.reload()
                }, 500);
            });
        }

        //====================== Modifying amountInvestedArr =======================

        //====================== Modifying countryArr =======================
        for (let i = 0; i < countryArr.length; i++) {
            countryArr[i].addEventListener("focus", function (e) {
                currentlyEditing = e.target.value
            })
            countryArr[i].addEventListener("change", function (e) {
                let userIndex = data.map(o => o.info.country).indexOf(currentlyEditing)
                alert("This information is going to change...")
                update(ref(db, 'users/' + data[userIndex].uid), {
                    country: e.target.value,
                })
                //console.log( "Old country:"+ currentlyEditing)
                console.log("New country:" + e.target.value)
                console.log(data[userIndex].uid)
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            });
        }

        //====================== Modifying CurrencyArr =======================
        for (let i = 0; i < CurrencyArr.length; i++) {
            CurrencyArr[i].addEventListener("focus", function (e) {
                currentlyEditing = e.target.value
            })
            CurrencyArr[i].addEventListener("change", function (e) {
                let userIndex = data.map(o => o.info.currency).indexOf(currentlyEditing)
                alert("This information is going to change...")
                update(ref(db, 'users/' + data[userIndex].uid), {
                    Currency: e.target.value,
                })
                //console.log( "Old Currency:"+ currentlyEditing)
                console.log("New Currency:" + e.target.value)
                console.log(data[userIndex].uid)
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            });
        }

        //====================== Modifying emailArr =======================
        for (let i = 0; i < emailArr.length; i++) {
            emailArr[i].addEventListener("focus", function (e) {
                currentlyEditing = e.target.value
            })
            emailArr[i].addEventListener("change", function (e) {
                let userIndex = data.map(o => o.info.email).indexOf(currentlyEditing)
                alert("This information is going to change...")
                update(ref(db, 'users/' + data[userIndex].uid), {
                    email: e.target.value,
                })
                //console.log( "Old email:"+ currentlyEditing)
                console.log("New email:" + e.target.value)
                console.log(data[userIndex].uid)
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            });
        }

        //====================== Modifying interestEarnedArr =======================


    });


}

selectData()

