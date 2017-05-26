
// $("#navBar").innerHtml=''+
document.getElementById("navBar").innerHTML = ''+
'<nav class="navbar navbar-expand-md navbar-light bg-faded text-center">'+
    '<div class="container">'+
      '<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>'+
      '<div class="collapse navbar-collapse text-center justify-content-center" id="navbar2SupportedContent">'+
        '<ul class="navbar-nav">'+
          // '<li class="nav-item active">'+
          //   '<a class="nav-link" href="">Home <span class="sr-only">(current)</span></a>'+
          // '</li>'+
          '<li class="nav-item">'+
            '<a class="nav-link" href="index.html">Home</a>'+
          '</li>'+
          '<li class="nav-item">'+
            '<a class="nav-link" href="login.html">Login</a>'+
          '</li>'+
          '<li class="nav-item">'+
            '<a class="nav-link" href="account.html">Account</a>'+
          '</li>'+
        '</ul>'+
      '</div>'+
    '</div>'+
  '</nav>';

  console.log("Set nav bar content");
  


