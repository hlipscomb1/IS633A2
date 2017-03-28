function ShowMenu(selection)
{
    document.getElementById("first").style.visibility = "hidden";
    document.getElementById("second").style.visibility = "hidden";
    document.getElementById("third").style.visibility = "hidden";
    
    switch (selection)
    {
        case "first":
            document.getElementById("first").style.visibility ="visible";
            ListStores();
            break;
        case "second":
            document.getElementById("second").style.visibility = "visible";
            break;
        case "third":
            document.getElementById("third").style.visibility = "visible";
            break;
        case "none":
            document.getElementById("none").style.visibility = "visible";
            break;
        default:
                alert("Please select a different menu option");
    }
}

function ListStores()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);   
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function GenerateOutput(Result)
{
    var display = "<table><tr><th>Customer ID</th><th>Company Name</th><th>Store City</th></tr>";
    var count = 0;
    var companyname = "";
    var customerid = "";
    var storecity = "";
    for(count = 0; count < Result.GetAllCustomersResult.length; count ++) {
        customerid = Result.GetAllCustomersResult[count].CustomerID;
        companyname = '<a href="javascript:Orders(' + "'" + customerid + "');" + '">';
        companyname += Result.GetAllCustomersResult[count].CompanyName;
        companyname += '</a>';
        storecity = Result.GetAllCustomersResult[count].City;
        display += "<tr><td>" + customerid + "</td><td>" + companyname + "</td><td>" + storecity + "</td></tr>";
        display += "</table>";
        document.getElementById("showlist").innerHTML = display;
    }
}

function Orders(customerid)
{
  var xmlhttp = new XMLHttpRequest();
  var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
  url += customerid;
  
  xmlhttp.onreadystatechange = function()
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
        var output = JSON.parse(xmlhttp.responseText);
        GenerateOutput(output);
    }
  };
  xmlhttp.open("GET". url, true);
  xmlhttp.send();
  
function GenerateOutput (Result)
  {
    var display = "<table><tr><th>Order Name</th><th>Total Ordered</th></tr>";
    var count = 0;
    for(count = 0; count < Result.length; count ++)
    {
       display += "<tr><td>" + Result[count].ProductName + "</td><td>" + Result[count].Total + "</td></tr>";
    }
    display += "</table>";
    document.getElementById("history").innerHTML = display;
    ShowMenu("second");
  }
}

