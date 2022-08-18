var productNameInput =document.getElementById('productNameInput');
var productPriceInput =document.getElementById('productPriceInput');
var productCategoryInput =document.getElementById('productCategoryInput');
var productDescInput =document.getElementById('productDescInput');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var index=0;
var done = document.getElementById('done')
var search = document.getElementById('search')
var productContainer;

// zbon adem                                  important
if(localStorage.getItem('myProduct') !=null){
  productContainer = JSON.parse(localStorage.getItem('myProduct'));
    displayProduct(productContainer);
}
else{
    productContainer=[];
}

$('#addBtn').click(function(){
  addProduct();
  Swal.fire(
    'Add Product',
    'Done',
    'success'
  )
})

$("#updateBtn").click(()=>{
  addUpdate()
  Swal.fire(
    'Updated',
    'Done',
    'success'
  )
})

$("#delete").click(function(){
  Swal.fire(
    'Deleted',
    'Done',
    'error'
  )
})



function addProduct(){
    if(  productNameValidate() == true && productCategoryValidate()==true && productDescValidator()==true && productPriceValidate()==true){
        var product = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value,
        }
        // done()
        productContainer.push(product);
        // console.log(productContainer);
        localStorage.setItem('myProduct',JSON.stringify(productContainer));
        clearProduct();
        displayProduct(productContainer);
    }
}

//         clear data
    function clearProduct(){
        productNameInput.value= "";
        productPriceInput.value= "";
        productCategoryInput.value= "";
        productDescInput.value= "";
        productNameInput.classList.remove("is-valid");
        productCategoryInput.classList.remove("is-valid");
        productPriceInput.classList.remove("is-valid");
        productDescInput.classList.remove("is-valid");
    }
    
    // display data
    function displayProduct(productList){
       var cartoona=``
        for(var i=0 ; i<productList.length ; i++){
        cartoona +=` <tr>
        <th>${i}</th>
        <th>${productList[i].name}</th>
        <th>${productList[i].price}</th>
        <th>${productList[i].category}</th>
        <th>${productList[i].desc}</th>
        <th> <button onclick="updateProduct(${i})" class="btn btn-warning" id="updateBtn" >Update</button></th>
        <th> <button onclick="deleteProduct(${i})" class="btn btn-danger" id="delete" >Delete</button></th>
        </tr>
        `
        }
        document.getElementById('tableBody').innerHTML=cartoona;
    }

  

//     delete Product       
function deleteProduct(deletedProduct){
    productContainer.splice(deletedProduct,1);
    localStorage.setItem('myProduct',JSON.stringify(productContainer));
    displayProduct(productContainer);
}
//  update Product
function updateProduct(updatedProduct){
    index=updatedProduct;
    productNameInput.value=productContainer[updatedProduct].name;
    productPriceInput.value=productContainer[updatedProduct].price;
    productCategoryInput.value=productContainer[updatedProduct].category;
    productDescInput.value=productContainer[updatedProduct].desc;

    updateBtn.classList.replace('d-none','d-inline-block');
    addBtn.classList.add('d-none');
}

function addUpdate(){
    // alert(index)
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
    productContainer[index]=product; 
    localStorage.setItem('myProduct',JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearProduct();
    updateBtn.classList.add('d-none');
    addBtn.classList.replace('d-none','d-inline-block');
}


        //   search
        function searchProducts(searchTerm) {
          // console.log(search.value)
          var box = "";
          for (i = 0; i < productContainer.length; i++) {
            if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
            {
              box += `<tr>
              <th>${i}</th>
              <th>${productContainer[i].name}</th>
              <th>${productContainer[i].price}</th>
              <th>${productContainer[i].category}</th>
              <th>${productContainer[i].desc}</th>
              <th> <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></th>
              <th> <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></th>
              </tr>
            </tr> `;
            }
        
            document.getElementById("tableBody").innerHTML = box;
          }
        }
  

  //       validations
  //      name
  function productNameValidate() {
    var regex = /[A-Za-z0-9]{3,15}/;
    if (regex.test(productNameInput.value) == true) {
      productNameInput.classList.replace("is-invalid", "is-valid");
      return true;
    } else {
      productNameInput.classList.add("is-invalid");
      return false;
    }
  }
//         category
function productCategoryValidate() {
    var regex = /[A-Za-z0-9]{3,15}/;
    if (regex.test(productCategoryInput.value) == true) {
      productCategoryInput.classList.replace("is-invalid", "is-valid");
      return true;
    } else {
        productCategoryInput.classList.add("is-invalid");
      return false;
    }
  }
//      Description
function productDescValidator() {
    var regex = /[A-Za-z0-9]{3,40}/;
    if (regex.test(productDescInput.value) == true) {
      productDescInput.classList.replace("is-invalid", "is-valid");
      return true;
    } else {
        productDescInput.classList.add("is-invalid");
      return false;
    }
  }
//      Price
function productPriceValidate() {
    var regex = /[0-9]/;
    if (regex.test(productPriceInput.value) == true) {
      productPriceInput.classList.replace("is-invalid", "is-valid");
      return true;
    } else {
      productPriceInput.classList.add("is-invalid");
      return false;
    }
  }
  
  