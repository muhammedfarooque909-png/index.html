let cart = [];

function addToCart(name, price){
    let existing = cart.find(item => item.name === name);
    if(existing){
        existing.qty += 1;
    } else {
        cart.push({name, price, qty:1});
    }
    updateCartDisplay();

    // Open cart automatically after adding
    document.getElementById("cart-sidebar").classList.add("active");
}

function toggleCart(){
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function updateCartDisplay(){
    let tbody = document.getElementById("cart-items");
    let totalElem = document.getElementById("cart-total");
    let countElem = document.getElementById("cart-count");

    tbody.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        let priceCell = document.createElement("td");
        priceCell.textContent = "$" + item.price;
        row.appendChild(priceCell);

        let qtyCell = document.createElement("td");
        qtyCell.innerHTML = `
            <button onclick="changeQty(${index}, -1)">-</button>
            ${item.qty}
            <button onclick="changeQty(${index}, 1)">+</button>
        `;
        row.appendChild(qtyCell);

        let totalCell = document.createElement("td");
        totalCell.textContent = "$" + (item.price * item.qty);
        row.appendChild(totalCell);

        let removeCell = document.createElement("td");
        removeCell.innerHTML = `<button onclick="removeItem(${index})">Remove</button>`;
        row.appendChild(removeCell);

        tbody.appendChild(row);

        total += item.price * item.qty;
        count += item.qty;
    });

    totalElem.textContent = total;
    countElem.textContent = count;
}

function changeQty(index, delta){
    cart[index].qty += delta;
    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }
    updateCartDisplay();
}

function removeItem(index){
    cart.splice(index,1);
    updateCartDisplay();
}

function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }

    let message = "I want to order:\n";
    cart.forEach(item => {
        message += `${item.name} x${item.qty} - $${item.price * item.qty}\n`;
    });
    message += "Total: $" + cart.reduce((sum,item)=>sum+item.price*item.qty,0);

    window.open(`https://wa.me/917907178451?text=${encodeURIComponent(message)}`, "_blank");
}


function searchProduct(){
    let input = document.getElementById("searchBox").value.toLowerCase();
    let products = document.querySelectorAll(".pro");

    products.forEach(product => {
        let name = product.getAttribute("data-name");

        if(name.includes(input)){
            product.scrollIntoView({behavior:"smooth", block:"center"});
        }
    });
}

function searchProduct() {
    let input = document.getElementById("searchBox").value.toLowerCase().trim();
    let products = document.querySelectorAll(".pro");

    products.forEach(product => {
        product.classList.remove("search-highlight");
    });

    if (input === "") return;

    for (let product of products) {
        let name = product.getAttribute("data-name").toLowerCase();

        if (name.includes(input)) {
            product.scrollIntoView({ behavior: "smooth", block: "center" });
            product.classList.add("search-highlight");

            setTimeout(() => {
                product.classList.remove("search-highlight");
            }, 2000);

            break;
        }
    }
}




document.getElementById("cart-container")
.scrollIntoView({behavior:"smooth"});






function openRegister(){
    document.getElementById("register-popup").style.display = "block";
}

function closeRegister(){
    document.getElementById("register-popup").style.display = "none";
}





window.onclick = function(event){
    let popup = document.getElementById("register-popup");
    if(event.target === popup){
        popup.style.display = "none";
    }
}




function openAccount(el){
    document.getElementById("account-popup").style.display = "block";

    let menuLinks = document.querySelectorAll(".menu ul li a");
    menuLinks.forEach(item => item.classList.remove("active"));
    el.classList.add("active");
}

function closeAccount(){
    document.getElementById("account-popup").style.display = "none";
}




window.addEventListener("click", function(event){
    let accountPopup = document.getElementById("account-popup");
    let registerPopup = document.getElementById("register-popup");

    if(accountPopup && event.target === accountPopup){
        accountPopup.style.display = "none";
    }

    if(registerPopup && event.target === registerPopup){
        registerPopup.style.display = "none";
    }
});






// Register form submit
function registerUser(event){
    event.preventDefault();

    let name = document.getElementById("reg-name").value;
    let email = document.getElementById("reg-email").value;
    let phone = document.getElementById("reg-phone").value;
    let password = document.getElementById("reg-password").value;

    let userData = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));

    alert("Registration successful!");
    showAccount();
}

// Show account details
function showAccount(){
    let user = JSON.parse(localStorage.getItem("registeredUser"));
    let accountBox = document.getElementById("account-details");

    if(user){
        accountBox.innerHTML = `
            <p><b>Name:</b> ${user.name}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Phone:</b> ${user.phone}</p>
            <p><b>Password:</b> ${user.password}</p>
        `;
    } else {
        accountBox.innerHTML = `<p>No account registered yet.</p>`;
    }

    document.getElementById("account").scrollIntoView({ behavior: "smooth" });
}




function openAccount(){

let user = JSON.parse(localStorage.getItem("registeredUser"));

if(user){
document.getElementById("acc-name").textContent = user.name;
document.getElementById("acc-email").textContent = user.email;
document.getElementById("acc-phone").textContent = user.phone;
}

document.getElementById("account-panel").style.right = "0";
}

function closeAccount(){
document.getElementById("account-panel").style.right = "-350px";
}







function openAccount(){
    let user = JSON.parse(localStorage.getItem("registeredUser"));

    if(user){
        document.getElementById("acc-name").textContent = user.name;
        document.getElementById("acc-email").textContent = user.email;
        document.getElementById("acc-phone").textContent = user.phone;
        document.getElementById("logout-btn").style.display = "inline-block";
    } else {
        document.getElementById("acc-name").textContent = "Not logged in";
        document.getElementById("acc-email").textContent = "-";
        document.getElementById("acc-phone").textContent = "-";
        document.getElementById("logout-btn").style.display = "none";
    }

    document.getElementById("account-panel").style.right = "0";
}

function logoutUser(){
    localStorage.removeItem("registeredUser");

    document.getElementById("acc-name").textContent = "Not logged in";
    document.getElementById("acc-email").textContent = "-";
    document.getElementById("acc-phone").textContent = "-";
    document.getElementById("logout-btn").style.display = "none";

    alert("Logged out successfully!");
}




function openAccount(){
    let user = JSON.parse(localStorage.getItem("registeredUser"));

    if(user){
        document.getElementById("acc-name").textContent = user.name;
        document.getElementById("acc-email").textContent = user.email;
        document.getElementById("acc-phone").textContent = user.phone;

        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "inline-block";
    } else {
        document.getElementById("acc-name").textContent = "Not logged in";
        document.getElementById("acc-email").textContent = "-";
        document.getElementById("acc-phone").textContent = "-";

        document.getElementById("login-btn").style.display = "inline-block";
        document.getElementById("logout-btn").style.display = "none";
    }

    document.getElementById("account-panel").style.right = "0";
}









function openLogin(){
    document.getElementById("login-panel").style.right = "0";
}

function closeLogin(){
    document.getElementById("login-panel").style.right = "-350px";
}

function loginUser(event){
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let user = JSON.parse(localStorage.getItem("registeredUser"));

    if(user && user.email === email && user.password === password){
        alert("Login successful!");

        document.getElementById("acc-name").textContent = user.name;
        document.getElementById("acc-email").textContent = user.email;
        document.getElementById("acc-phone").textContent = user.phone;

        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "inline-block";

        closeLogin();
        openAccount();
    } else {
        alert("Invalid email or password");
    }
}