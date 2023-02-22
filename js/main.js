
//variables
let addButton = document.getElementById("addButton");
let editButton = document.getElementById("editButton");
let searchButton = document.getElementById("searchButton");
let clearButton = document.getElementById("clearButton");
let popForm = document.getElementById("popform");
let editForm = document.getElementById("editform");
let submitButton = document.getElementById("submitButton");

let searchText = document.getElementById("searchText");

let searchCards = document.getElementById("searchCards");
let todoCards = document.getElementById("todoCards");

let rotateStatus=true;
let editStatus=true;
let notiAdd = document.getElementById("notiAdd");
let notiError = document.getElementById("notiError");

getData();

//prevent default behavior of form
popForm.addEventListener('submit',(event)=>{
    event.preventDefault();
})

editForm.addEventListener('submit',(event)=>{
    event.preventDefault();
})

//hide clear button
clearButton.style.display="none";

//class
class todoObject {
    constructor(id,name, desc) {
      this.id = id;  
      this.name = name;
      this.desc = desc;
    }
  }

  //listner on floating button
addButton.parentElement.addEventListener("click",function (event){
    
    if(rotateStatus){
        addButton.style.transitionDuration='1s';
        addButton.style.transform = 'rotate(360deg)';
        rotateStatus=false;

     
        popForm.style.maxHeight="40vh"
        popForm.style.minHeight="40vh"
        

        addButton.classList.remove('fa-plus');
        addButton.classList.add('fa-minus');


        

     
  

    
    }
    else{
        addButton.style.transitionDuration='1s';
        addButton.style.transform = 'rotate(-360deg)';
        rotateStatus=true;

        popForm.style.maxHeight="0vh"
        popForm.style.minHeight="0vh"

       
      

       

        addButton.classList.add('fa-plus');
        addButton.classList.remove('fa-minus');

    
    }
});

//listner on submit button to add dta

submitButton.addEventListener("click",function (e){



  let todoId1=Math.random() * 1000;
 
    
    
    todoName=document.querySelector("#todoName").value;
    todoDesc=document.querySelector("#todoDesc").value;

    if(todoName=="" || todoDesc==""){
      notiError.style.maxHeight = "10vh";
      
       
  

      setTimeout(()=>{
          
          notiError.style.maxHeight = "0vh";
          
         
          
      
         

       
      }, 1000);
      return;
      
    }
     
    
    let todoArray = []
    
     todoArray = [todoId1,todoName,todoDesc,false]
    let jsonObj1 = JSON.stringify(todoArray)
   
    localStorage.setItem(todoId1,jsonObj1);
    
  jsonObj1=null;
  todoArray=null;
        

        notiAdd.style.maxHeight = "10vh";
      
       
  

        setTimeout(()=>{
            
            notiAdd.style.maxHeight = "0vh";
            location.reload()
           
            
        
           

         
        }, 1000);
  
});

// //logic for submit button for adding data
// function submitdata(){
//   alert("hello")
    
    
//     todoName=document.querySelector("#todoName").value;
//     todoDesc=document.querySelector("#todoDesc").value;
//      todoId=Math.random();
    
//     let todoArray = []
//      todoArray = [todoId,todoName,todoDesc,false]
//     jsonObj = JSON.stringify(todoArray)
//     localStorage.setItem(todoId,jsonObj);

        

//         notiAdd.style.maxHeight = "10vh";
      
       
  

//         setTimeout(()=>{
            
//             notiAdd.style.maxHeight = "0vh";
//             location.reload()
            
        
           

         
//         }, 1000);
       

// }




//logic for getting data


//fetch data from local storage

function getData(){
    let val = [];
    todoCards = document.getElementById("todoCards")
   
    for (var i = 0; i < localStorage.length; i++){
       val = JSON.parse(localStorage.getItem(localStorage.key(i)));

       if(!val[3]){
        todoCards.insertAdjacentHTML('beforeend',"<div class='todoCards__card'><div class='todoCards__card_check'><input type='checkbox' name='check' onclick=todoChecked("+val[0]+")></div><div class='todoCards__card_content'><h3>"+ val[1]+ "</h3><p>" + val[2] +"</p></div> <div class='todoCards__card_tools'><div class='todoCards__card_bin' onClick='promptDelete("+val[0] +")' ><i class='fa-solid fa-trash'></i></div><div class='todoCards__card_edit' > <i id='editButton' onClick=' editClick("+val[0] +")' class='fa-solid fa-pencil'></i></div></div></div>");
        
       }
   


      
    }

    for (var i = 0; i < localStorage.length; i++){
        val = JSON.parse(localStorage.getItem(localStorage.key(i)));
 
        if(val[3]){
            todoCards.insertAdjacentHTML('beforeend',"<div class='todoCards__card'><div class='todoCards__card_check'></div><div class='todoCards__card_content'><h3 class='completed'>"+ val[1]+ "</h3></div> <div class='todoCards__card_tools'><div class='todoCards__card_bin' onClick='promptDelete("+val[0] +")' ><i class='fa-solid fa-trash'></i></div><div class='todoCards__card_edit' > <i id='editButton' onClick=' editClick("+val[0] +")' class='fa-solid fa-pencil'></i></div></div></div>");
          
        }
    
 
 
       
     }

    

}

//value item marked as completed

function todoChecked(id){
  var obj = JSON.parse(localStorage.getItem(id))
  var data = [obj[0],obj[1],obj[2],true]

  localStorage.setItem(id,JSON.stringify(data))


notiComp = document.getElementById('notiComp');
  notiComp.style.maxHeight = "10vh";
  

  setTimeout(()=>{
      
      notiComp.style.maxHeight = "0vh";
      location.reload()
     

   
  }, 1000);
}

//open delete prompt

function promptDelete(id){
    
    promptDelete  = document.getElementById('promptDelete');
    promptDelete .style.maxHeight = "16vh";

    document.getElementById("conformButton").value = id;

    
    
}
function closePrompt(){
    promptDelete  = document.getElementById('promptDelete');
    promptDelete .style.maxHeight = "0vh";
    location.reload()
}

//delete from local storage

function todoDelete(){
    id=    document.getElementById("conformButton").value ;
  
    localStorage.removeItem(id)
  
  
    notiDelete = document.getElementById('notiDelete');
    notiDelete.style.maxHeight = "10vh";
    
  
    setTimeout(()=>{
        
        notiDelete.style.maxHeight = "0vh";
        location.reload();
       
  
     
    }, 1000);
   
  }

  //edit values

  function editClick(id){

    var obj = JSON.parse(localStorage.getItem(id));


    editName = document.getElementById("editName");
    editDesc = document.getElementById("editDesc");

    editName.value = obj[1];
    editDesc.value = obj[2];

    editButton.value = id;

    if(editStatus){
      
     
        editForm.style.maxHeight="40vh"
        editForm.style.minHeight="40vh"
        

     


        

     
  
        editStatus=false;

        window.scrollTo(0, 0);
    
    }
    else{
   
        editStatus=true;

        editForm.style.maxHeight="0vh"
        editForm.style.minHeight="0vh"

       
      

       

      

    
    }
  }

  editButton.addEventListener("click",function (){
    editName = document.getElementById("editName").value;
    editDesc = document.getElementById("editDesc").value;
    id = editButton.value ;

    var data = [id,editName,editDesc,false]

    localStorage.setItem(id,JSON.stringify(data))
  
  
    notiEdit = document.getElementById('notiEdit');
    notiEdit.style.maxHeight = "16vh";
    
  
    setTimeout(()=>{
        
        notiEdit.style.maxHeight = "0vh";
        location.reload()
       
  
     
    }, 1000);
  })

  //search option

  searchButton.addEventListener("click",function(){
    searchButton.style.display= "none";
    clearButton.style.display="block"
    todoCards.style.display= "none";
    searchCards.setAttribute('style', 'display:grid !important');
    
    let list  = [];
    let val = [];
    todoCards = document.getElementById("todoCards")
   
    for (var i = 0; i < localStorage.length; i++){
       val = JSON.parse(localStorage.getItem(localStorage.key(i)));
       

       if(searchText.value.toLowerCase()==val[1].toLowerCase()){
        searchCards.insertAdjacentHTML('beforeend',"<div class='todoCards__card'><div class='todoCards__card_check'><input type='checkbox' name='check' onclick=todoChecked("+val[0]+")></div><div class='todoCards__card_content'><h3>"+ val[1]+ "</h3><p>" + val[2] +"</p></div> <div class='todoCards__card_tools'><div class='todoCards__card_bin' onClick='todoDelete("+val[0] +")' ><i class='fa-solid fa-trash'></i></div><div class='todoCards__card_edit' > <i id='editButton' onClick=' editClick("+val[0] +")' class='fa-solid fa-pencil'></i></div></div></div>");
       }
   


      
    }

    
    
  })

  clearButton.addEventListener("click",function (){
    
    searchButton.style.display= "block";
    clearButton.style.display="none"

    todoCards.style.display= "grid";
    searchCards.setAttribute('style', 'display:none');

    location.reload()
  })