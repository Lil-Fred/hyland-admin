const username = document.getElementById("username")



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, onValue, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
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
    let Usersids = [];


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
    
      Usersids.push(user.uid)
      
      var usersInfo = `
        <div>
        <h3><span>${i+1}</span>. ${user.info.username}</h3>
        <ul class="hide">
          <li><span>Unique ID</span>: <span class="idonly">${user.uid}</span></li>
          <li><span>username</span>: <input class="inputBtn" type="text" value="${user.info.username}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>amountAvailable</span>: <input class="inputBtn"   type="text" value="${user.info.amountAvailable}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>amountInvested</span>: <input class="inputBtn"   type="text" value="${user.info.amountInvested}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>country</span>: <input class="inputBtn"   type="text" value="${user.info.country}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>Currency</span>: <input class="inputBtn"   type="text" value="${user.info.currency}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>email</span>: <input class="inputBtn"   type="text" value="${user.info.email}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>interestEarned</span>: <input class="inputBtn"   type="text" value="${user.info.interestEarned}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>percentage</span>: <input class="inputBtn"   type="text" value="${user.info.percentage}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmamountAvailable</span>: <input class="inputBtn"   type="text" value="${user.info.tmamountAvailable}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmamountAvailable</span>: <input class="inputBtn"   type="text" value="${user.info.tmamountAvailable}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmamountInvested</span>: <input class="inputBtn"   type="text" value="${user.info.tmamountInvested}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>tmpercentage</span>: <input class="inputBtn"   type="text" value="${user.info.tmpercentage}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
        <li><span>usdbalance</span>: <input class="inputBtn"   type="text" value="${user.info.usdbalance}"> <button class="cancelbtn">✖</button class="cancelbtn"></li>
       </ul>
       </div>
      `
   

      return (
   
        username.insertAdjacentHTML('afterend', usersInfo)
        
        )
  });

  //data.reverse()
 
   
  // const inputBtn = document.querySelectorAll(".inputBtn")
  //    for (var i = 0; i < inputBtn.length; i++) {
  //      inputBtn[i].addEventListener("keyup", ({ key }) => {

  //        console.log(key);
       
  //        console.log(i);

  //      })
  //    }
   

   
   Usersids.reverse()
   for (var i = 0; i < Usersids.length; i++) {
     console.log(Usersids[i]);
  

    }


  });


  // get(child(dbref,`users/XMh0LXqdACcirPyRkMrn0BRpOsy2`)).then((snapshot)=>{
  //     if (snapshot.exists()) {
  //         username.innerHTML = `${snapshot.val().username}`
  //     }
  //     else{
  //         alert("no data found")
  //     }
  // })
  // .catch((error)=>{
  //     alert("unseccesful, error" + error)
  // })


}

selectData()

