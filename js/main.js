		var oText = document.getElementById('text');
		var oBtn = document.getElementById('btn');
		//获取用户地理位置信息"所在城市"
		var mycity = remote_ip_info['city'];
		oText.value = mycity;
		// alert(mycity);
		document.getElementById('place').innerHTML = oText.value;
		function MyWeather(data){
			var d = data.weather;
			var date1 = d[0].date;
			var day1 = d[0].info.day;
			var night1 = d[0].info.night;
			var Today = '';
			//设置背景图片
			var bgr = document.getElementById("bgr");
	//.......		//alert(day1[1]);
			if(day1[1]=="多云"||day1[1]=="晴转多云"||day1[1]=="多云转晴"||day1[1]=="阴"){
				bgr.style.backgroundImage = "url(img/云.png)"
			}else if(day1[1]=="小雪"||day1[1] =="大雪"||day1[1] =="中雪"||day1[1] =="雨夹雪"||day1[1] =="暴雪"){
				bgr.style.backgroundImage = "url(img/雪.png)"
			}else if(day1[1]=="小雨"||day1[1]=="大雨"||day1[1]=="大到暴雨"||day1[1]=="暴雨"){
				bgr.style.backgroundImage = "url(img/雨.png)"
			}else{
				bgr.style.backgroundImage = "url(img/晴.png)"
			}
			var smalldata = document.getElementById('smalldata');
			Today += '<p>'+day1[1]+'</p>'+
					'<span>今天 : '+date1+'</span>'+
					'<ul>'+
						'<li>今日最高气温 : '+day1[2]+'℃</li>'+
						'<li>今日最低气温 : '+night1[2]+'℃</li>'+
						'<li>今日风向 : '+day1[3]+'</li>'+
						'<li>今日风速 : '+day1[4]+'</li>'+
					'</ul>';
			document.getElementById('bigdata').innerHTML = Today;
			smalldata.innerHTML = '';
			for (var i = 0;i<4;i++){
				var date = d[i].date;
				var day = d[i].info.day;
				var night = d[i].info.night;
				var Otherday = '';
				Otherday += '<span>日期 : '+date+'</span>'+
								'<p>天气 : '+day[1]+'</P>'+
									'<ul>'+
										'<li>最高气温:'+day[2]+'℃</li>'+
										'<li>最低气温:'+night[2]+'℃</li>'+
										'<li>风向:'+day[3]+'</li>'+
										'<li>风速:'+day[4]+'</li>'+
									'</ul>';
				var odiv = document.createElement("div");
				odiv.innerHTML = Otherday;
				odiv.className = "other";
				smalldata.appendChild(odiv);
			}
		}
		window.onload = function(){
			// 将城市名改为代码
			var cityword = '';
			var Myjson;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					Myjson = JSON.parse(this.responseText);
					cityword = Myjson[0][oText.value];
					//跨域请求天气信息
					//根据用户位置获取当地天气信息
					var script1 = document.createElement("script");
					var url1 = "http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=MyWeather&code="+cityword;
					script1.src = url1;
					document.body.appendChild(script1);
					//点击搜索按钮,获取相对应的天气信息
					oBtn.onclick = function (){
						document.getElementById('place').innerHTML = oText.value;
						cityword = Myjson[0][oText.value];
						script1 = document.createElement("script");
						url1 = "http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=MyWeather&code="+cityword;
						script1.src = url1;
						document.body.appendChild(script1);
					}
				}else{
					alert(请检查网络);
				}
			}
			xhr.open("post","test.json",true);
			xhr.send();
			
		}