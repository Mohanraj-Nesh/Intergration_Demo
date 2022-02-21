define({ 

  onNavigate:function(from)
  {
    this.view.segWorldNews.isVisible=false;
    this.view.skeletonscreensegment.isVisible=true;
   
    try{
      var integrationObj = KNYMobileFabric.getIntegrationService("GoogleNews");
      var operationName = "WorldNews";
      var headers = {};

      integrationObj.invokeOperation(operationName, headers,"w",
                                     this.onSuccess.bind(this),
                                     this.onFailure.bind(this));
    }
    catch(e)
    {
      alert("something went wrong!"+e);
    }
    this.view.segWorldNews.onRowClick = this.navNewsPage;

  },

  navNewsPage:function()
  {
    var navData = this.view.segWorldNews.selectedRowItems;
    new kony.mvc.Navigation("frmNewsPage").navigate(navData);
  },
  onSuccess:function(res)
  {
    //    alert(JSON.stringify(res));
    //    var object = JSON.parse(res);
    //    var news_list = object.news_list;
    alert(res.news_list[0].news_item["title"]);

    try
    {    
      var segList = [];
      var obj = res.news_list;
      for( i=0;i<res.news_list.length;i++){
        segList.push(
          {
            "lblTitle":obj[i].news_item["title"],
            "lblDesc":obj[i].news_item["description"],
            "lblLink":obj[i].news_item["link"] 
          }
        );
      }
      this.view.segWorldNews.setData(segList);
      this.view.segWorldNews.isVisible=true;
      this.view.skeletonscreensegment.isVisible=false;
    }
    catch(e)
    {
      alert(e+"Error Occured!");
    }

  },
  onFailure:function(res)
  {
    alert(res);
  }

});