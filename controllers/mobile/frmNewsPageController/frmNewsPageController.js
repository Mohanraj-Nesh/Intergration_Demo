define({ 
  onNavigate:function(params)
  {
    var link = params[0].lblLink;
    //     alert(JSON.stringify(link));
    if(link!=null)
    {
      alert(link);
      this.loadUrl(link);
    }
    else
    {
      alert("Try again later !");
    }

  },
  loadUrl:function(url)
  {
      var data = {"URL": url,"requestMethod": "get"};
      this.view.browserNews.requestURLConfig=data;
  }
});