console.log('javascript running');
let btn = document.getElementById('btn');

let password = document.getElementById('password');
let website = document.getElementById('website');
let username = document.getElementById('username');
















btn.addEventListener('click', () => {

      
    if (username.value && password.value && website.value) {
         // if value ha form mein sabi tohi  chlega 
          
         
          
         
       
 

        let Passwords = localStorage.getItem("Passwords");
        if (Passwords == null) {
            let json = [];// this is array of object  to store all form data in first index used array of object 

            json.push({ website: website.value, username: username.value, password: password.value });

            alert('Your password saved');
            localStorage.setItem("Passwords", JSON.stringify(json));// set the item in local storage in json to modify in string 


        } else {

            let json = JSON.parse(localStorage.getItem("Passwords"));// convert the already exist string in object format ;
            json.push({ website: website.value, username: username.value, password: password.value });
            alert("your password saved");
            localStorage.setItem("Passwords", JSON.stringify(json));// in local storage data saves always in string format that's why we use Json.stringify method 

        }


    }
    else {
        alert('Please insert all data  ');
    }
})



function showpassword() {
    let data = localStorage.getItem("Passwords");


    let tbody = document.getElementsByTagName('tbody')[0];
    if (data == null || JSON.parse(data).length == 0) {
        tbody.innerHTML = 'No Data Found ';

    }
    else {

        tbody.innerHTML = ` <tr>

                            <th>Website name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Delete</th>

                        </tr>
         `


        let arr = JSON.parse(data);// convert the string data into object format 

        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `
  
  
  <tr>
                            <td>${element.website}<img onclick="copytext('${element.website}') " class="im im1" src="copy.svg" alt="copied " width="15" height="12" ></td>
                            <td>${element.username}<img onclick="copytext('${element.username}') "  class="im"  src="copy.svg" alt="copied" width="15" height="12"></td>
                            <td > ${hidepassword(element.password)}<img  onclick="copytext('${element.password}') "  class="im" src="copy.svg" width="15" height="12" alt="copied"></td>
                            <td><button onclick="deletedta('${element.website}')" >delete</button></td>
                        </tr>

  
  `

        }

        tbody.innerHTML += str;
        website.value = ""//  for set the value null after click on button 
        username.value = ""
        password.value = ""

    }





}
function copytext(text) {
    if (navigator.clipboard.writeText(text)) {// this will get the text on clipboard 
        cpy.style.display = 'inline';
        setTimeout(() => {
            cpy.style.display = 'none';
        }, 1000);


    }
    else {
        alert('Sorry Copy Failed');
    }



}

function hidepassword(pass) {

    let str = "";
    for (let index = 0; index < pass.length; index++) {

        str += "*";// give the * inplace of all digit ;

    }

    return str;


}


 const deletedta=(website)=>{
     const data = localStorage.getItem("Passwords");
    let arr= JSON.parse(data);// convert again data into object 

      arrupdated =  arr.filter((e)=>{
         return e.website!=website;// both value wil same then it return false ; means 0 
      })

        let value= window.confirm(`Are you sure Your ${website}'s Password Delete?`);

         if(value){
              localStorage.setItem("Passwords", JSON.stringify(arrupdated));// arrupdated is like a new object that can converted into string 
         }

          showpassword();

  }
showpassword();