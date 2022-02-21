/**
 #  @controller skeletonScreen
 #  Created by Team Kony.
 #  Copyright (c) 2018 Kony Inc. All rights reserved.
 #
 **/
define(function() {
  var konyLoggerModule = require('com/konymp/skeletonscreensegment/KonyLogger');
  var konymp = konymp || {};
  konymp.logger = (new konyLoggerModule("Skeleton screen Segment Component")) || function() {};
  konymp.logger.setLogLevel("DEBUG");
  konymp.logger.enableServerLogging = true;
  return {
    /**
     * @function
     *
     * @param baseConfig 
     * @param layoutConfig 
     * @param pspConfig 
     */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.seed = Math.random();
      this.platformProperties = kony.os.deviceInfo();
      this._segWidgetTemp = {
        flxWIdgetBox: "flxWIdgetBox",
        konympflx1: "konympflx1",
        konympflx2: "konympflx2",
        konympflx3: "konympflx3",
        konympflx4: "konympflx4"
      };
      this._tempDataForSeg = {
        template: 'konympflxSegSC',
        flxWIdgetBox: {
          "highlightOnParentFocus": true,
          "highlightedSkin": "konympscffffffff"
        },
        konympflx1: {
          "highlightOnParentFocus": true,
          "highlightedSkin": "konympscBorderffffff00"
        },
        konympflx2: {
          "highlightOnParentFocus": true,
          "highlightedSkin": "konympscBorderffffff00"
        },
        konympflx3: {
          "highlightOnParentFocus": true,
          "highlightedSkin": "konympscBorderffffff00"
        },
        konympflx4: {
          "highlightOnParentFocus": true,
          "highlightedSkin": "konympscBorderffffff00"
        }
      };
    },
    /**
     * @function
     *
     */
    initGettersSetters: function() {
      //add widgetDataMap Getter Setter
//       defineSetter(this, "widgetDataMapper", function(val) {
//         konymp.logger.trace("----------Entering widgetDataMap Setter---------", konymp.logger.FUNCTION_ENTRY);
//         this._widgetDataMap = val;
//         this.updateWidgetDataMap();
//         konymp.logger.trace("----------Exiting widgetDataMap Setter---------", konymp.logger.FUNCTION_EXIT);
//       });
//       defineGetter(this, "widgetDataMapper", function() {
//         konymp.logger.trace("----------Entering widgetDataMap Setter---------", konymp.logger.FUNCTION_ENTRY);
//         konymp.logger.trace("----------Exiting widgetDataMap Setter---------", konymp.logger.FUNCTION_EXIT);
//         return this._widgetDataMap;

//       });
    },
    intialCall:0,
    onPull:function(){},
    onPush:function(){},
    onRowClick:function(){},
    /**
     * @function
     *
     * @param val 
     */
    dataMap:function(val){
      konymp.logger.trace("----------Entering widgetDataMap function---------", konymp.logger.FUNCTION_ENTRY);
      try{ 
        this._widgetDataMap = val;
        this.updateWidgetDataMap();
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw(e);
      }

      konymp.logger.trace("----------Exiting widgetDataMap function---------", konymp.logger.FUNCTION_EXIT); 
    },
    /**
     * @function
     *
     */
    _onRowClick:function(){
      try{
        konymp.logger.trace("----------Entering _onRowClick Function---------", konymp.logger.FUNCTION_ENTRY);  
        var selectedItem = this.view.konympSegment.selectedItems[0];
        if(selectedItem.flxWIdgetBox===undefined || selectedItem.flxWIdgetBox===null || selectedItem.flxWIdgetBox==="")
        {
          this.onRowClick(selectedItem); 
        }
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw(e);
      }
      konymp.logger.trace("----------Exiting _onRowClick Function ---------", konymp.logger.FUNCTION_EXIT);
    },
    /**
     * @function
     *
     * @param startingRow 
     * @param finalRow 
     * @param Rows 
     */
    animateSegmentRows:function(startingRow,finalRow,Rows){
      try{
        konymp.logger.trace("----------Entering animateSegmentRows Function---------", konymp.logger.FUNCTION_ENTRY);  
        var animaationDef ={
          "0": {
            "left": "-100%",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true
          } ,
          "100": {
            "left": "105%",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true
          }
        };
        var animationConfig = {
          delay:0.1,
          duration: 0.7,
          iterationCount: 0,
          fillMode: kony.anim.FILL_MODE_NONE
        };
        var rows = [];
        if(Rows===undefined)
        {
          for(var count = Number(startingRow);count<=Number(finalRow);count++)
          {
            rows.push({sectionIndex:0,rowIndex : count});
          }
        }
        else if(Rows.length<=0)
        {
          return;
        }
        var animationDefObject = kony.ui.createAnimation(animaationDef);       
        this.view.konympSegment.animateRows({context: rows.length>0?rows:Rows,
                                             widgets:["konympimgAnim1","konympimgAnim2","konympimgAnim3","konympimg4"],
                                             animation: {definition: animationDefObject,
                                                         config: animationConfig}});
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw(e);
      }
      konymp.logger.trace("----------Exiting animateSegmentRows Function ---------", konymp.logger.FUNCTION_EXIT);
    },
    /**
     * @function
     * @desc called on push of segment. If animation templates if not added.
     */
    _onPull:function(){
      try{
        konymp.logger.trace("----------Entering _onPull Function---------", konymp.logger.FUNCTION_ENTRY);  
        var data = this.view.konympSegment.data;
        if(data.length>0 && (data[0].flxWIdgetBox === undefined || data[0].flxWIdgetBox === null))
        {
          var dataForSegment = this._tempDataForSeg;
          this.updateWidgetDataMap();
          this.view.konympSegment.addDataAt(dataForSegment, 0, 0);
          this.view.konympSegment.addDataAt(dataForSegment, 0, 0);
          function _tmrCallback(tmrId){
            kony.timer.cancel(tmrId);
            this.animateSegmentRows(0,1);
            kony.application.dismissLoadingScreen(); 
            this.onPull();

          }
          kony.application.showLoadingScreen("", "",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true,true,null);
          var timerId="com.konymp.skeletonScreen.myTimer2"+this.random();
          kony.timer.schedule(timerId,_tmrCallback.bind(this,timerId) , 0.004, false);
        }

        konymp.logger.trace("----------Exiting _onPull Function ---------", konymp.logger.FUNCTION_EXIT);
      }
      catch (e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw (e);
      }

    },
    /**
     * @function
     * @desc called on push of segment. If animation templates if not added.
     */
    _onPush:function(){
      try{
        konymp.logger.trace("----------Entering _onPush Function---------", konymp.logger.FUNCTION_ENTRY);   
        var data = this.view.konympSegment.data;
        var datalen = data.length-1;
        if(data.length>0 && data[datalen].flxWIdgetBox === undefined || data[datalen].flxWIdgetBox === null)
        {
          var dataForSegment = this._tempDataForSeg;
          this.view.konympSegment.addDataAt(dataForSegment,this.view.konympSegment.data.length);
          this.view.konympSegment.addDataAt(dataForSegment,this.view.konympSegment.data.length);
          this.view.konympSegment.selectedIndex =[this.view.konympSegment.data.length-1,0];

          function _tmrCallback(tmrId){
            kony.timer.cancel(tmrId);
            this.animateSegmentRows(this.view.konympSegment.data.length-2,this.view.konympSegment.data.length-1);
            kony.application.dismissLoadingScreen();
            this.onPush();
          }
          kony.application.showLoadingScreen("", "",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true,true,null);
          var timerId="com.konymp.skeletonScreen.myTimer"+this.random();
          kony.timer.schedule(timerId,_tmrCallback.bind(this,timerId) , 0.004, false);
        }
        konymp.logger.trace("----------Exiting _onPush Function ---------", konymp.logger.FUNCTION_EXIT);
      }
      catch (e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw (e);
      }

    },
    /**
       * @function
       *
       * @param data Array of json  [{key:value},{key:value}]
       * @desc add data to top of the widget Segment. It removes the loading screen is visible and add the data to top of the screen.
       */
    addDataAtTop:function(data){
      try{
        konymp.logger.trace("----------Entering addDataAtTop Function---------", konymp.logger.FUNCTION_ENTRY);      
        if(data === undefined || data === null ||data===""|| !Array.isArray(data))
        {
          throw {message:'wrong data passed to addDataAtTop',error:"Error"};
        }
        if(this.intialCall===0)
        {
          this.intialCall = 1;
          this.view.konympSegment.setData(data);  
          return;
        }
        var initData = this.view.konympSegment.data;

        if(initData.length>=2 && initData[0].konympflx1 !==undefined && initData[1].konympflx1 !== undefined)
        { 
          initData.shift();
          initData.shift(); 
        }

        var newData = data.concat(initData);
        this.view.konympSegment.removeAll();
        this.setData(newData);  
        this.checkForNoDataAndAnimate(newData);
        konymp.logger.trace("----------Exiting addDataAtTop Function ---------", konymp.logger.FUNCTION_EXIT);
      }
      catch (e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw (e);

      }
    },
    /**
     * @function
     *
     * @param data Array of json  [{key:value},{key:value}]
     * @desc add data to bottom of the widget Segment. It removes the loading screen is visible and add the data to bottom of the screen.
     */
    addDataAtBottom:function(data){
      try{
        konymp.logger.trace("----------Entering addDataAtBottom Function---------", konymp.logger.FUNCTION_ENTRY); 
        if(data === undefined || data === null ||data===""|| !Array.isArray(data))
        {
          throw {message:'wrong data passed to addDataAtBottom',error:"Error"};
        }
        if(this.intialCall===0)
        {
          this.intialCall = 1;
          this.view.konympSegment.setData(data);  
          return;
        }
        var initData = this.view.konympSegment.data;
        var datalen = initData.length-1;
        this.view.konympSegment.removeAt(datalen, 0);
        this.view.konympSegment.removeAt(datalen-1, 0);
        for(var int in data)
        {
          this.view.konympSegment.addDataAt(data[int], this.view.konympSegment.data.length, 0);
        }
        this.view.konympSegment.selectedIndex =[this.view.konympSegment.data.length-1,0];
        this.checkAndAnimate();
        konymp.logger.trace("----------Exiting addDataAtBottom Function ---------", konymp.logger.FUNCTION_EXIT);
      }
      catch (e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw (e);
      }
    },
    /**
     * @function
     *
     * @param data 
     */
    setData:function(data){
      try{
        konymp.logger.trace("----------Entering setData Function---------", konymp.logger.FUNCTION_ENTRY); 
        this.intialCall = 1;
        this.view.konympSegment.setData(data);
        this.checkForNoDataAndAnimate();
        konymp.logger.trace("----------Exiting setData Function ---------", konymp.logger.FUNCTION_EXIT);
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw (e);
      }
    },
    /**
     * @function
     *
     */

    checkAndAnimate:function(){
      konymp.logger.trace("----------Entering checkAndAnimate Function---------", konymp.logger.FUNCTION_ENTRY); 
      var initData = this.view.konympSegment.data;
      var rows = [];
      if(initData.length<=0)
      {
        return;
      }
      var initalRow = this.view.konympSegment.getFirstVisibleRow().rowIndex;
      var lastRow = this.view.konympSegment.getLastVisibleRow().rowIndex;
      if(initalRow===undefined)
      {
        return;
      }
      for(var counter = initalRow ; counter<=lastRow ; counter++)
      {
        if(initData[counter].flxWIdgetBox!==undefined)
        {
          rows.push({sectionIndex:0,rowIndex : counter}); 
        }
      }
      if(rows.length>0)
      {
        this.animateSegmentRows(0, initData.length, rows);
      }
      konymp.logger.trace("----------Exiting checkAndAnimate Function ---------", konymp.logger.FUNCTION_EXIT);
    },
    /**
     * @function
     *
     */
    postShowCallback:function()    
    {
      try{
        konymp.logger.trace("----------Entering checkAndAnimate Function---------", konymp.logger.FUNCTION_ENTRY); 
        var platName=this.platformProperties;
        if (platName.name=="iPhone"){
          this.view.konympSegment.rowFocusSkin="konympSegNOColor";
        }
        this.view.konympSegment.removeAll();        
        this.view.konympSegment.widgetDataMap = this._segWidgetTemp;
        this.view.konympSegment.setData([this._tempDataForSeg,this._tempDataForSeg,this._tempDataForSeg,this._tempDataForSeg,this._tempDataForSeg]);
        konymp.logger.trace("----------Exiting checkAndAnimate Function ---------", konymp.logger.FUNCTION_EXIT);
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
      }
    },
    /**
     * @function
     *
     */
    updateWidgetDataMap:function(){
      try{
        konymp.logger.trace("----------Entering updateWidgetDataMap Function---------", konymp.logger.FUNCTION_ENTRY); 
        function jsonConcat(object1, object2) {
          var o1 = JSON.parse(JSON.stringify(object1));
          var o2 = object2;
          for (var key in o2)
          {
            o1[key] = o2[key];
          }
          return o1;
        }
        var newWidgetDataMap = jsonConcat(this._widgetDataMap,this._segWidgetTemp);
        this.view.konympSegment.widgetDataMap = newWidgetDataMap;
        konymp.logger.trace("----------Exiting updateWidgetDataMap Function ---------", konymp.logger.FUNCTION_EXIT);
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
      }
    },
    /**
     * @function
     *
     * @param data 
     */
    checkForNoDataAndAnimate:function() {
      try{
        konymp.logger.trace("----------Entering checkForNoDataAndAnimate Function---------", konymp.logger.FUNCTION_ENTRY); 
        var data  = this.view.konympSegment.data;
        if(data===undefined || data===null || data.length===0)
        {
          var dataForSegment = [this._tempDataForSeg,
                                this._tempDataForSeg,
                                this._tempDataForSeg,
                                this._tempDataForSeg,
                                this._tempDataForSeg,];
          this.view.konympSegment.setData(dataForSegment);
          this.animateSegmentRows(0, 4);
        }
      }catch(e)
      {
        konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
      }
      konymp.logger.trace("----------Exiting checkForNoDataAndAnimate Function ---------", konymp.logger.FUNCTION_EXIT);
      return;
    },
    random: function() {
      var x = Math.sin(this.seed++) * 10000;
      return x - Math.floor(x);
    }

  };
});