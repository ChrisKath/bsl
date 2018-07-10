<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="google" value="notranslate">
  <meta charset="UTF-8">
  <title>TAP Technology | Digital Studio - Official Site</title>

  <link rel="shortcut icon" href="/static/ico.png">
  <link href="/assets/css/app.css" rel="stylesheet">

  <body>
    <div class="container">
      <a class="button slr fb" href="{{ $fb }}">Open on facebook <img src="/assets/img/fb.png"></a>
      <a class="button slr" href="{{ $href }}">Open on Browser <img src="/assets/img/web.png"></a>
    </div>
    <footer class="tap-temp size-12">      
      © COPYRIGHT 2018, Destiny Enterprises Co.,Ltd. WEB HOSTING AND WEB DESIGN BY 
      <a href="www.tap10.com">TAP TECHNOLOGY</a>, THAILAND.
    </footer>
  </body>
  <script type="text/javascript">
    setTimeout(function () { window.location = "{{ $href }}"; }, 500);     
    var redirectUrlRelativeToThisPage = "{{ $fb }}"; 
    window.location = redirectUrlRelativeToThisPage;
  </script>

</html>

<!-- *******************************************************

This website is produced by TAP Technology Company Limited.
e-mail: info@tap10.com
website: www.tap10.com

************************************************************ -->