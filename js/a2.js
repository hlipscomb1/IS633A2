function ShowMenu(selection)
{
    document.getElementById("first").style.visibility = "hidden";
    document.getElementById("second").style.visibility = "hidden";
    document.getElementById("third").style.visibility = "hidden";
    document.getElementById("customerOrderDisplay").style.visibility = "hidden";
    
    switch (selection)
    {
        case "first":
            document.getElementById("first").style.visibility ="visible";
            document.getElementById("second").style.visibility ="hidden";
            document.getElementById("third").style.visibility ="hidden";
            document.getElementById("first").style.position ="relative";
            document.getElementById("second").style.position ="absolute";
            document.getElementById("third").style.position ="absolute";
            document.getElementById("orderDisplay").style.visibility = "hidden";
            document.getElementById("orderDisplay").style.position = "absolute";
            document.getElementById("customerOrderDisplay").style.visibility = "hidden";
            document.getElementById("customerOrderDisplay").style.position = "absolute";
            ListStores();
            break;
        case "second":
            document.getElementById("second").style.visibility ="visible";
            document.getElementById("first").style.visibility ="hidden";
            document.getElementById("third").style.visibility ="hidden";
            document.getElementById("second").style.position ="relative";
            document.getElementById("first").style.position ="absolute";
            document.getElementById("third").style.position ="absolute";
            document.getElementById("orderDisplay").style.visibility = "visible";
            document.getElementById("orderDisplay").style.position = "relative";
            document.getElementById("customerOrder").style.visibility = "hidden";
            document.getElementById("customerOrder").style.position = "absolute";
            document.getElementById("buttonDisplay").style.visibility = "hidden";
            document.getElementById("buttonDisplay").style.position = "absolute";
            break;
        case "third":
            document.getElementById("third").style.visibility ="visible";
            document.getElementById("first").style.visibility ="hidden";
            document.getElementById("second").style.visibility ="hidden";
            document.getElementById("third").style.position ="relative";
            document.getElementById("first").style.position ="absolute";
            document.getElementById("second").style.position ="absolute";
            document.getElementById("orderDisplay").style.visibility = "hidden";
            document.getElementById("orderDisplay").style.position = "absolute";
            document.getElementById("customerOrder").style.visibility = "hidden";
            document.getElementById("customerOrder").style.position = "absolute";
            document.getElementById("buttonDisplay").style.visibility = "hidden";
            document.getElementById("buttonDisplay").style.position = "absolute";
            break;
        case "none":
            document.getElementById("first").style.visibility ="hidden";
            document.getElementById("second").style.visibility ="hidden";
            document.getElementById("third").style.visibility ="hidden";
            document.getElementById("first").style.position ="absolute";
            document.getElementById("second").style.position ="absolute";
            document.getElementById("third").style.position ="absolute";
            document.getElementById("orderDisplay").style.visibility = "hidden";
            document.getElementById("orderDisplay").style.position = "absolute";
            break;
        default:
                alert("Please select a different menu option");
    }
}

function ListStores()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);   
        }
    };
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GenerateOutput(result)
{
    var display = "<table><tr><th>Customer ID</th><th>Company Name</th><th>Store City</th></tr>";
    var count = 0;
    var customerID = "";
    for(count = 0; count < result.GetAllCustomersResult.length; count ++) {
        customerID = result.GetAllCustomersResult[count].CustomerID;
        display += "<tr><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" +'<a href="javascript:showOrders(' + "'" + customerID + "');" + '">' + result.GetAllCustomersResult[count].CustomerID + "</a>" + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    document.getElementById("customerDisplay").innerHTML = display; }

function getOrders()
{
  var objRequest = new XMLHttpRequest();
  var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
  url += document.getElementById("custid").value;
  
  objRequest.onreadystatechange = function()
  {
    if (objRequest.readyState == 4 && objRequest.status == 200)
    {
        var output = JSON.parse(objRequest.responseText);
        orderOutput(output); }
  };
  objRequest.open("GET", url, true);
  objRequest.send();
}
  
function orderOutput (result)
  {
    var orderText = "<table><tr><th>Order Name</th><th>Total Ordered</th></tr>";
    var count = 0;
    for(count = 0; count < result.length; count ++)
    {
       orderText += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    document.getElementById("orderDisplay").innerHTML = orderText;
  }

function showOrders(orderID) {
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += orderID;
    
    objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output = JSON.parse(objRequest.responseText);
            showOutput(output);
        }
    };
    
    objRequest.open("GET", url, true);
    objRequest.send();
}
function showOutput(result) {
    var count = 0;
    var orderText = "<table><tr><th>Product Name</th><th>Total</th></tr>";
    
    for (count = 0; count < result.length; count ++) {
    orderText += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";    
    }
    document.getElementById("first").style.visibility = "hidden";
document.getElementById("first").style.position = "absolute";
document.getElementById("customerOrder").style.visibility = "visible";
document.getElementById("customerOrder").style.position = "relative";
document.getElementById("buttonDisplay").style.visibility = "visible";
document.getElementById("buttonDisplay").style.position = "relative";
document.getElementById("customerOrder").innerHTML = orderText; }

function navigateBack() {
  document.getElementById("first").style.visibility = "visible";
  document.getElementById("first").style.position = "relative";
  document.getElementById("customerOrder").style.visibility = "hidden";
  document.getElementById("customerOrder").style.position = "absolute";
}