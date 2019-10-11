/**
 * 生产曲线图初始化参数
 */

//时间进度条
var v_dataZoom = [];

//Y轴最大值最小值
var v_yMaxArr=[0,0,0,0];
var v_yMinArr=[0,0,0,0];

//坐标轴名称显示 
var v_aName ="多多电商";
var v_bName="小狗电商";
var v_cName="易购电商";
var v_dName="小猫电商";

//坐标轴显示颜色
var v_aColor='#ff8c3f'
var v_bColor="#47d0c0";
var v_cColor="#6482fe";
var v_dColor="#48ab34";

//是否显示Y轴
var v_aYShow = true;
var v_bYShow = true;
var v_cYShow = true;
var v_dYShow = true;

//标题
var v_title;

//X轴数据
var v_xAxisData = [];

//数据
var v_dataArr = [[],[],[],[]];

var v_markData1=[];//一类标记
var v_markData2=[];//二类标记

function f_randomNum(min, max, scale){
	if(!scale){
		scale = 0;
	}
	
	if(scale==0){
		return Math.floor(Math.random()*(max-min+1)+min);
	}else{
		return Math.round(Math.random()*(max-min)+min, scale);
	}
	
}

var startTime=new Date("2019-10-09 09:00:00");
function f_randomData(){
	startTime = startTime.addTime('mm', 5);
		
	var time=startTime.format("yyyy-MM-dd HH:mm:ss");
	v_xAxisData.push(time);
	
	v_dataArr[0].push([time,f_randomNum(0,5,0)]);
	v_dataArr[1].push([time,f_randomNum(20,30,0)]);
	v_dataArr[2].push([time,f_randomNum(6,10,1)]);
	v_dataArr[3].push([time,f_randomNum(30,40,1)]);
	
	if(v_xAxisData.length>60){
		v_xAxisData.splice(0,1);
		
		for(var i=0;i<v_dataArr.length;i++){
			v_dataArr[i].splice(0,1);
		}
	}
	
	for(var i=0;i<v_dataArr.length;i++){
		for(var j=0;j<v_dataArr[i].length;j++){
			if(j==0){
				v_yMinArr[i] = parseFloat(v_dataArr[i][j][1]);
				v_yMaxArr[i]  = parseFloat(v_dataArr[i][j][1]);
			}else{
				if(v_yMinArr[i] > parseFloat(v_dataArr[i][j][1])){
					v_yMinArr[i] = parseFloat(v_dataArr[i][j][1]);
				}
				
				if(v_yMaxArr[i]  < parseFloat(v_dataArr[i][j][1])){
					v_yMaxArr[i]  = parseFloat(v_dataArr[i][j][1]);
				}
			}
		}
	}

}

var myChart = null;
function f_initCurveData(v_elemId){
	
	myChart = echarts.init(document.getElementById(v_elemId));
	
	for(var i=0;i<60;i++){
		f_randomData();
	}
	
	myChart.setOption(getOption());
	
	setInterval(function(){
		f_randomData();
	}, 1000);
	
	setInterval(function(){
		myChart.setOption(getOption());
	}, 1000);
}


 function f_reCaluMinMax(v_min, v_max) {
	 return f_processMinMaxData(v_min, v_max);
 }
 
 function f_reCaluMin(v_min, v_max)  {
	 return f_reCaluMinMax(v_min, v_max)[0];
 }
 
 function f_reCaluMax(v_min, v_max)  {
	 return f_reCaluMinMax(v_min, v_max)[1];
 }
 
 function f_reCaluInterval(v_min, v_max) {
	 return  (f_reCaluMax(v_min,v_max)-f_reCaluMin(v_min,v_max))/10;
 }
 
//处理最大值最小值
 function f_processMinMaxData(v_min, v_max){
 	var v_delta= v_max - v_min;
 	v_max=Math.ceil(v_max);//最大值向上取整
 	v_min=Math.floor(v_min);//最小值向下取整
 	if(v_max==v_min){
 		v_max=v_max+1;
 		v_min=v_min-1;
 	}
 	/*
 	else{
 		v_delta = Math.ceil(v_delta);
 		v_max=v_max+v_delta;
 		v_min=v_min-v_delta;
 		
 	}*/
 	return [v_min, v_max];
 }
 
 function f_processYData(isDefault){
	 var v_allData = [];
	 if(!isDefault){
		 if(v_aYShow){
			 var v_data1={};
			 var v_mmData1=f_reCaluMinMax(v_yMinArr[0], v_yMaxArr[0]);
			 v_data1.id=1;
			 v_data1.min=v_mmData1[0];
			 v_data1.max=v_mmData1[1];
			 v_allData.push(v_data1);
		 }
		 
		 if(v_bYShow){
			 var v_data2={};
			 var v_mmData2=f_reCaluMinMax(v_yMinArr[1], v_yMaxArr[1]);
			 v_data2.id=2;
			 v_data2.min=v_mmData2[0];
			 v_data2.max=v_mmData2[1];
			 v_allData.push(v_data2);
		 }
		 
		 if(v_cYShow){
			 var v_data3={};
			 var v_mmData3=f_reCaluMinMax(v_yMinArr[2], v_yMaxArr[2]);
			 v_data3.id=3;
			 v_data3.min=v_mmData3[0];
			 v_data3.max=v_mmData3[1];
			 v_allData.push(v_data3);
		 }
		 
		 if(v_dYShow){
			 var v_data4={};
			 var v_mmData4=f_reCaluMinMax(v_yMinArr[3], v_yMaxArr[3]);
			 v_data4.id=4;
			 v_data4.min=v_mmData4[0];
			 v_data4.max=v_mmData4[1];
			 v_allData.push(v_data4);
		 }
		 
		 v_allData = f_sort(v_allData);
		 
		 console.log("处理前："+Object.toJSON(v_allData));
		 for(var i=0;i<v_allData.length;i++){
			 v_allData[i] = f_calMaxMinByIndex(v_allData.length, v_allData[i], i);
		 }
		 console.log("处理后："+Object.toJSON(v_allData));
	 }else{
		 if(v_aYShow){
			 v_allData.push({id : 1, min : 0, max : 100});
		 }
		 if(v_bYShow){
			 v_allData.push({id : 2, min : 0, max : 100});
		 }
		 if(v_cYShow){
			 v_allData.push({id : 3, min : 0, max : 100});
		 }
		 if(v_dYShow){
			 v_allData.push({id : 4, min : 0, max : 100});
		 }
	 }
	 return v_allData;
 }
 
 /**
  * 根据所占比例计算最大值和最小值
  * v_id 第几条曲线编号 1-4
  * v_type 0-最小值 1-最大值 
  */
 function f_getDataById(v_allData, v_id, v_type){
	 for(var i=0;i<v_allData.length;i++){
		 if(v_allData[i].id==v_id){
			 if(v_type==0){
				 return v_allData[i].min;
			 }else{
				 return v_allData[i].max;
			 }
		 }
	 }
	 return 0;
 }
 
 /**
  * 根据所占比例计算最大值和最小值
  * @param v_data
  * @param v_index 从上往下的顺序划分
  */
 function f_calMaxMinByIndex(v_count, v_data, v_index){
	 var v_topOffset=0.08;//每部分最大值向上偏移比例
	 var v_all=0.84;//总比例
	 var v_max=v_data.max;
	 var v_min=v_data.min;
	 
	 var v_scale=v_all/v_count;
	 var v_fmax=v_max+(v_topOffset+v_index*v_scale)*(v_max-v_min)/v_scale;
	 var v_fmin=v_fmax-(v_max-v_min)/v_scale;
	 
	 v_data.max=Math.ceil(v_fmax);
	 v_data.min=Math.floor(v_fmin);
	 return v_data;
 }
 
 //冒泡   大值在前面，小值在后面
 function f_sort(v_allData){
	 for(var i=0;i<v_allData.length-1;i++){
		 for(var j=0;j<v_allData.length-i-1;j++){
			 if(v_allData[j].max>v_allData[j+1].max){
				 var temp=v_allData[j];
				 v_allData[j] = v_allData[j+1];
				 v_allData[j+1] = temp;
			 }
		 }
	 }
	 v_allData.reverse();//顺序反转
	 return v_allData;
 }
 
 
 
function f_getMarkPointData(v_xDatas, v_yData){
	var v_pointData=[];
	if(v_xDatas!=null && v_xDatas.length>0){
		if(typeof v_yData=="undefined" || v_yData==null || v_yData==""){
			v_yData = 5;
		}
		for(var i=0; i<v_xDatas.length; i++){
			var v_point={};
			var v_coord=[];
			v_coord.push(v_xDatas[i]);
			v_coord.push(v_yData);
			v_point.coord=v_coord;
			v_pointData.push(v_point);
		}
	}

	return v_pointData;
}

function f_processXData(v_type){
	var v_xMaxDate=new Date(v_xAxisData[v_xAxisData.length-1]).addTime('mm',20);
	var v_xMinDate=v_xAxisData.length>0 ? parseDateStr(v_xAxisData[0]) : v_xMaxDate.addTime('mm', -30);
	if(v_xMinDate > v_xMaxDate.addTime('mm', -15)){ //最小时间范围不小于15分钟
		v_xMinDate =  v_xMaxDate.addTime('mm', -15);
	}
	var v_splitNumber = 6;
	var v_maxInterval = 600000;
	if(v_type==1){
		if(v_xMinDate >= v_xMaxDate.addTime('mm', -30)){//30分钟内
			v_splitNumber = screen.width < 1400 ? 4 : 6;
			v_maxInterval = 300000;
		}else if(v_xMinDate < v_xMaxDate.addTime('mm', -30) && v_xMinDate >= v_xMaxDate.addTime('mm', -60)){//超过30分钟
			v_splitNumber = screen.width < 1400 ? 4 : 6;
			v_maxInterval = 600000;
		}else if(v_xMinDate < v_xMaxDate.addTime('mm', -60) && v_xMinDate >= v_xMaxDate.addTime('mm', -120)){
			v_splitNumber = screen.width < 1400 ? 4 : 6;
			v_maxInterval = 1200000;
		}else{
			v_splitNumber = screen.width < 1400 ? 4 : 6;
			v_maxInterval = 3600000;
		}
		v_xMaxDate=v_xMaxDate.format('yyyy-MM-dd HH:mm:ss');
		v_xMinDate=v_xMinDate.format('yyyy-MM-dd HH:mm:ss');
	}else{
		v_xMaxDate = new Date().addTime('d', -1);
		v_xMinDate = v_xAxisData.length>0 ? parseDateStr(v_xAxisData[0]) : v_xMaxDate.addTime('d', -30);
		v_splitNumber = 6;
		v_maxInterval = 30*24*60000;
		v_xMaxDate=v_xMaxDate.format('yyyy-MM-dd 00:00:00');
		v_xMinDate=v_xMinDate.format('yyyy-MM-dd 00:00:00');
	}
	
	var result={ max : v_xMaxDate, min : v_xMinDate, splitNumber : v_splitNumber, maxInterval : v_maxInterval};
	
	return result;
}
 
//参数配置
function getOption(){
	var v_allYData=f_processYData(false);
	//x轴刻度
	var v_allXData=f_processXData(1);
	
	var option = {
			//backgroundColor: '#3b5288',
			title: {
				 left: 'center',
				 top:2,
				 textStyle:{
					 color:'#fff',
					 fontSize:14,
					 fontStyle:'normal',
					 fontWeight: 300
				 },
				 text: v_title,
			},
			tooltip: {
			  trigger: 'axis',
				axisPointer: {
//			            type: 'cross',
					label: {
						color : '#ffffff',
						backgroundColor: '#283047'
					}
				}
			},
			legend: {
				data:[
					   
				]
			},
			grid: {
				left: 90,
				right: 90,
				top :30,
				bottom: 20,
				show : true,
				containLabel: false
			},
			toolbox: {
				show: false,
				feature: {
					dataView: {readOnly: false},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'time',
				axisPointer: {
					snap: true,
					label: {
						formatter: function (params) {
							return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
						},
					},
				},
				axisLine: {onZero: false},
				splitLine: {
					show: false
				},
				splitNumber : v_allXData.splitNumber,
				max : v_allXData.max,
				min : v_allXData.min,
				maxInterval : v_allXData.maxInterval,
				axisLabel : {
					show : true,
					showMinLabel : false,
					showMaxLabel : false,
					textStyle: {
						color: '#ffffff',
						fontSize : 10,
						fontWeight : 'lighter',
					},
					fontSize : 10,
					fontWeight : 'lighter',
					formatter: function (value, index) {
						var date = new Date(value);
						return date.format("HH:mm");
					},
				},
				axisTick : { //刻度
					show : true,
					lineStyle : {
						color : '#ffffff',
						width : 1,
					},
				},
			},
			dataZoom: v_dataZoom,
			yAxis: [
				{
				show : v_aYShow,
				type: 'value',
				position : 'left',
				offset : 0,
//		            name: v_aName,
				axisLine : {
					show : true,
					lineStyle : {
						//套压
						color : v_aColor,
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : f_getDataById(v_allYData, 1, 0),
				max : f_getDataById(v_allYData, 1, 1),
				interval : (f_getDataById(v_allYData, 1, 1) - f_getDataById(v_allYData, 1, 0))/10 ,
				minInterval:1,
				axisTick : {
					inside : false,
					length : 5
				},
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value;
						}
						return "";
					}
				},
			},
			{
				show : v_bYShow,
				type: 'value',
				position : 'right',
				offset : 0,
//		            name: v_bName,
				axisLine : {
					show : true,
					lineStyle : {
						color : v_bColor,
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : f_getDataById(v_allYData, 2, 0),
				max : f_getDataById(v_allYData, 2, 1),
				interval : (f_getDataById(v_allYData, 2, 1) - f_getDataById(v_allYData, 2, 0))/10 ,
				axisTick : {
					inside : false,
					length : 5
				},
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value ;
						}
						return "";
					}
				},
			},
			{
				show : v_cYShow,
				type: 'value',
//		            name: v_cName,
				offset : 30,
				position : 'left',
				axisLine : {
					lineStyle : {
						color : v_cColor,
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : f_getDataById(v_allYData, 3, 0),
				max : f_getDataById(v_allYData, 3, 1),
				interval : (f_getDataById(v_allYData, 3, 1) - f_getDataById(v_allYData, 3, 0))/10 ,
				axisTick : {
					inside : false,
					length : 5
				},
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value;
						}
						return "";
					}
				},
			},
			{
				show :v_dYShow,
				type: 'value',
				offset : 30,
				position : 'right',
//		            name: v_dName,
				axisLine : {
					lineStyle : {
						color : v_dColor,
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : f_getDataById(v_allYData, 4, 0),
				max : f_getDataById(v_allYData, 4, 1),
				interval : (f_getDataById(v_allYData, 4, 1) - f_getDataById(v_allYData, 4, 0))/10 ,
				axisTick : {
					inside : false,
					length : 5
				},
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value;
						}
						return "";
					}
				},
			},
			{
				show :false,
				type: 'value',
				offset : 30,
				position : 'right',
				axisLine : {
					lineStyle : {
						color : "#FF0000",
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : 0,
				max : 10,
				interval : 1 ,
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value;
						}
						return "";
					}
				},
			},
			{
				show :false,
				type: 'value',
				offset : 30,
				position : 'right',
				axisLine : {
					lineStyle : {
						color : "#FF0000",
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : 0,
				max : 10,
				interval : 1 ,
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value;
						}
						return "";
					}
				},
			},
			{
				show : false,
				type: 'value',
				offset : 30,
				position : 'right',
				axisLine : {
					lineStyle : {
						color : "#FF0000",
						width : 1,
					}
				},
				splitLine: {
					show: false,
					length : 5,
				},
				min : 0,
				max : 10,
				interval : 1 ,
				axisLabel : {
					show : true,
					rotate: 90,
					showMinLabel: true,
					showMaxLabel: true,
					formatter : function(value, index){
						if(index%5==0){
							return value;
						}
						return "";
					}
				},
			}
		   ],
			series: [
				{
					smooth: true,
					name:v_aName,
					type:'line',
					yAxisIndex :0,
					showSymbol: false,
					itemStyle : {
						normal : {
							color : v_aColor
						}
					},
					lineStyle:{
						normal:{
							width : 1
						}
					},
					data:v_dataArr[0]
				},
				{
					smooth: true,
					name:v_bName,
					type:'line',
					yAxisIndex :1,
					showSymbol: false,
					itemStyle : {
						normal : {
							color : v_bColor
						}
					},
					lineStyle:{
						normal:{
							width : 1
						}
					},
					data:v_dataArr[1]
				},
				{
					smooth: true,//平滑曲线
					name:v_cName,
					yAxisIndex :2,
					showSymbol: false,
					type:'line',
					itemStyle : {
						normal : {
							color : v_cColor
						}
					},
					lineStyle:{
						normal:{
							width : 1
						}
					},
					data:v_dataArr[2]
				},
				{
					smooth: true,
					name:v_dName,
					type:'line',
					yAxisIndex :3,
					showSymbol: false,
					itemStyle : {
						normal : {
							color : v_dColor
						}
					},
					lineStyle:{
						normal:{
							width : 1
						}
					},
					data:v_dataArr[3]
				},
				{
					smooth: true,//平滑曲线
					name: "一类标记",
					yAxisIndex :4,
					showSymbol: true,
					type:'line',
					itemStyle : {
						normal : {
							color : "#FF0000"
						}
					},
					lineStyle:{
						normal:{
							width : 1
						}
					},
					markPoint: {
						symbol : 'pin',
						symbolSize : 30,
						label :{
							normal:{
								show : false,  //不显示标签值
							}
						},
						data: f_getMarkPointData(v_markData1, 4)
					},
					data: []
				},
				{
					smooth: true,//平滑曲线
					name: "二类标记",
					yAxisIndex :5,
					showSymbol: true,
					type:'line',
					itemStyle : {
						normal : {
							color : "#FF0000"
						}
					},
					lineStyle:{
						normal:{
							width : 1
						}
					},
					markPoint: {
						symbol : 'circle',
						symbolSize : 30,
						label :{
							normal:{
								show : false  //不显示标签值
							}
						},
						data: f_getMarkPointData(v_markData2, 5)
					},
					data: []
				},
			]
		};
	
	return option;
}