const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const cors=require('cors');
const app=express();
app.use(cors())
//Data stored in local db and mongo atlas both

const MONGODB_URL= 'mongodb+srv://faiz:MKk8HMvg3P5TF70u@unmazer.41qro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL||'mongodb://localhost:27017/myDatabase', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId
const foottraffic = new Schema({
    _id:ObjectId,
	avg_visit:Array,
	city:Array,
	dwell_time:Array,
	traffic:Array
});


const mapdata= new Schema({
	type:String,
	features:Array,
	
	
})    

const loyalitydata=new Schema({
	type:String,
	features:Array,
})

const totalvisit=new Schema({
	name:String,
	visit:Array,
	Total_visits:Number
})

const tradearea=new Schema({
	name:String,
	homecoordinates:Array
})


const majorpaths=new Schema({
	name:String,
	type:String,
	features:Array,
})

const areabusyness0=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness1=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness2=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness3=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness4=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness5=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness6=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness7=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness8=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness9=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness10=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness11=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness12=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness13=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness14=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness15=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness16=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness17=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness18=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness19=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness20=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness21=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})
const areabusyness22=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const areabusyness23=new Schema({
	hour:Number,
    relative_count_monthly:Array,
	latitude:Array,
	longitude:Array
})

const interest=new Schema({
	name:String,
	male:Number,
	female: Number,
	Entertainment:Number,
	Mall_Visitors:Number,
	Shopping:Number,
	Travel:Number
})
const shopping=new Schema({
	prename:Array,
	prevalue:Array,
	postname:Array,
	postvalue:Array
	
})
const Mapdata=mongoose.model('mapdata',mapdata);
const Foottraffic = mongoose.model('foottraffic', foottraffic);
const Loyalitydata=mongoose.model('loyalitydata',loyalitydata);
const TotalVisits=mongoose.model('totalvisit',totalvisit);
const TradeArea=mongoose.model('tradearea',tradearea);
const MajorPaths=mongoose.model('majorpaths',majorpaths);
const Areabusyness0=mongoose.model('areabusyness0',areabusyness0);
const Areabusyness1=mongoose.model('areabusyness1',areabusyness1);
const Areabusyness2=mongoose.model('areabusyness2',areabusyness2);
const Areabusyness3=mongoose.model('areabusyness3',areabusyness3);
const Areabusyness4=mongoose.model('areabusyness4',areabusyness4);
const Areabusyness5=mongoose.model('areabusyness5',areabusyness5);
const Areabusyness6=mongoose.model('areabusyness6',areabusyness6);
const Areabusyness7=mongoose.model('areabusyness7',areabusyness7);
const Areabusyness8=mongoose.model('areabusyness8',areabusyness8);
const Areabusyness9=mongoose.model('areabusyness9',areabusyness9);
const Areabusyness10=mongoose.model('areabusyness10',areabusyness10);
const Areabusyness11=mongoose.model('areabusyness11',areabusyness11);
const Areabusyness12=mongoose.model('areabusyness12',areabusyness12);
const Areabusyness13=mongoose.model('areabusyness13',areabusyness13);
const Areabusyness14=mongoose.model('areabusyness14',areabusyness14);
const Areabusyness15=mongoose.model('areabusyness15',areabusyness15);
const Areabusyness16=mongoose.model('areabusyness16',areabusyness16);
const Areabusyness17=mongoose.model('areabusyness17',areabusyness17);
const Areabusyness18=mongoose.model('areabusyness18',areabusyness18);
const Areabusyness19=mongoose.model('areabusyness19',areabusyness19);
const Areabusyness20=mongoose.model('areabusyness20',areabusyness20);
const Areabusyness21=mongoose.model('areabusyness21',areabusyness21);
const Areabusyness22=mongoose.model('areabusyness22',areabusyness22);
const Areabusyness23=mongoose.model('areabusyness23',areabusyness23);
const Interest=mongoose.model('interest',interest);
const Shopping=mongoose.model('shopping',shopping);


const data={'_id': ObjectId('60a488a79ffdefbe1eec3467'),
                 'avg_visit': [1.2, 1.8, 2.0, 2.4],
                 'city': ['Indranagar', 'Jayanagar', 'Domlur', 'Austin Town'],
                 'dwell_time': [30.0, 60.0, 43.0, 12.0],
                 'traffic': [2000.0, 3000.0, 4000.0, 5000.0]};

const newFoottraffic=new Foottraffic(data);


const data1={
	"type":"FeatureCollection",
   "features":[
      {
         "type":"Feature",
         "properties":{
			 'Place':'Decathlon Whitefield',
             'TotalVisits':22,
			 'Avg_daily_Visits':2.44,
			 'Avg_Length_of_Stay':187.93,
			 'Avg_Visits_per_Customer':1.29,
			 'Loyal_customer_per':88.23,
			 'New_customer_per':9,
			 'Customer_lost_per':11.76
			 
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
                  [77.70067691802979,
				   12.995185857990794],
				   [77.70063936710358,
					12.994511570241592],
				   [77.7011489868164,
					12.994516797285456],
				   [77.70115971565247,
					12.995196312050012],
				   [77.70067691802979,
					12.995185857990794]
               ]
            ]
         }
      },
      {
         "type":"Feature",
         "properties":{
            'Place':'St Marthas Hospital',
             'TotalVisits':1366,
			 'Avg_daily_Visits':39.02,
			 'Avg_Length_of_Stay':119,
			 'Avg_Visits_per_Customer':1.27,
			 'Loyal_customer_per':9.43,
			 'New_customer_per':200,
			 'Customer_lost_per':90.56
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
                  [77.58559942245483,
				   12.972598835773425],
				   [77.58504152297974,
					12.971657883119958],
				   [77.58525609970093,
					12.971427871929908],
				   [77.584547996521,
					12.970507825042858],
				   [77.58605003356934,
					12.969117293176204],[77.58699417114258,12.970194171917223],[77.58677959442139,12.971605607868163],[77.58559942245483,12.972598835773425]
               ]
            ]
         }
      },
      {
         "type":"Feature",
         "properties":{
           'Place':'Indian coffee house',
             'TotalVisits':47,
			 'Avg_daily_Visits':6.71,
			 'Avg_Length_of_Stay':11.68,
			 'Avg_Visits_per_Customer':1.1,
			 'Loyal_customer_per':0,
			 'New_customer_per':25,
			 'Customer_lost_per':100
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
				   [77.61586546897887,
					12.933951506755216],
				   [77.6157447695732,
					12.933899223590279],
				   [77.61581987142563,
					12.933752830670159],
				   [77.61593788862228,
					12.933812956344163],
				   [77.61586546897887,
					12.933951506755216]
                  
               ]
            ]
         }
      },
      {
		
         "type":"Feature",
         "properties":{
			 'Place':'Reliance Fresh',
             'TotalVisits':20,
			 'Avg_daily_Visits':13314.13333,
			 'Avg_Length_of_Stay':98.36,
			 'Avg_Visits_per_Customer':1.42,
			 'Loyal_customer_per':14.28,
			 'New_customer_per':13,
			 'Customer_lost_per':85.71
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
				   [77.63063907623291,
					13.00146474802685],
				   [77.63067796826363,
					13.001258285490028],
				   [77.63087779283524,
					13.001296180525488],
				   [77.63083890080452,
					13.001506563203266],
				   [77.63063907623291,
					13.00146474802685]
                 
               ]
            ]
         }
      },
	   {
		
         "type":"Feature",
         "properties":{
			 'Place':'Star Bazaar',
             'TotalVisits':70584,
			 'Avg_daily_Visits':4615.6,
			 'Avg_Length_of_Stay':40,
			 'Avg_Visits_per_Customer':2.3,
			 'Loyal_customer_per':65,
			 'New_customer_per':65,
			 'Customer_lost_per':12
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
				  [77.61059492826462
				   ,12.936989139826013],
				   [77.6099243760109,
					12.936633618417515],
				   [77.61002629995346,
					12.936474156444664],
				   [77.61042326688766
					,12.936406189015425],
				   [77.61056542396545,
					12.936505526021143],
				   [77.61052787303925
				 ,12.936581335814695],
				   [77.61058419942856,
					12.936607477117466],
				   [77.61054933071136,
					12.93668067275067],
				   [77.61072099208832,
					12.936769553133528],
				   [77.61059492826462,
					12.936989139826013]
				  
               ]
            ]
         }
      },
	   {
		   "type":"Feature",
         "properties":{
			 'Place':'Harshita pet store',
             'TotalVisits':720,
			 'Avg_daily_Visits':21.17,
			 'Avg_Length_of_Stay':90,
			 'Avg_Visits_per_Customer':1.28,
			 'Loyal_customer_per':98,
			 'New_customer_per':65,
			 'Customer_lost_per':12
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				   [77.57355362176895,12.934812870320371],[77.57333636283875,12.934121426965607],[77.57377624511719,12.93406652967952],[77.57382452487946,12.934739674139106],[77.57355362176895,12.934812870320371]
				 
               ]
            ]
         }
		 
	  },
	   {
		   "type":"Feature",
         "properties":{
			 'Place':'Nasdaq',
             'TotalVisits':299,
			 'Avg_daily_Visits':12.45,
			 'Avg_Length_of_Stay':41.60,
			 'Avg_Visits_per_Customer':1.07,
			 'Loyal_customer_per':97.47,
			 'New_customer_per':65,
			 'Customer_lost_per':2.52
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				   [77.6012447476387,12.969108144914511],[77.60055407881737,12.96934992028925],[77.6004883646965,12.969074165653819],[77.60119244456291,12.96887813136692],[77.6012447476387,12.969108144914511]
				 
               ]
            ]
         }
		 
	  },{
		   "type":"Feature",
         "properties":{
			 'Place':'Metro Shoes',
             'TotalVisits':70,
			 'Avg_daily_Visits':2.91,
			 'Avg_Length_of_Stay':115.67,
			 'Avg_Visits_per_Customer':1.34,
			 'Loyal_customer_per':15.38,
			 'New_customer_per':65,
			 'Customer_lost_per':84.61
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				  [77.65162736177444,12.92048300146775],[77.65166491270065,12.919698710528676],[77.65213161706924,12.919706553450247],[77.65211552381516,12.920485615766767],[77.65162736177444,12.92048300146775]
               ]
            ]
         }
		 
	  },
	   {
		   "type":"Feature",
         "properties":{
			 'Place':'Leela Palace',
             'TotalVisits':974,
			 'Avg_daily_Visits':29.51,
			 'Avg_Length_of_Stay':106.43,
			 'Avg_Visits_per_Customer':1.18,
			 'Loyal_customer_per':9.73,
			 'New_customer_per':65,
			 'Customer_lost_per':90.26
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				  [77.6492965221405,12.96217497272534],[77.64825582504271,12.96222724995839],[77.64809489250182,12.961244436140166],[77.64737606048584,12.961348990986115],[77.64700055122375,12.960292985024074],[77.64903903007507,12.95992704131889],[77.6492965221405,12.96217497272534]
               ]
            ]
         }
		 
	  },
	   {
		   "type":"Feature",
         "properties":{
			 'Place':'ITI Hospital',
             'TotalVisits':224,
			 'Avg_daily_Visits':6.78,
			 'Avg_Length_of_Stay':111.87,
			 'Avg_Visits_per_Customer':1.07,
			 'Loyal_customer_per':5.769,
			 'New_customer_per':65,
			 'Customer_lost_per':94.23
            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				  [77.6824539899826,13.00540449073282],[77.6816600561142,13.004934076982385],[77.68210530281067,13.004123917876731],[77.68292605876923,13.00458910633179],[77.6824539899826,13.00540449073282]
               ]
            ]
         }
		 
	  },
	   {
		   "type":"Feature",
         "properties":{
			 'Place':'Forum Mall',
             'TotalVisits':1342,
			 'Avg_daily_Visits':39.47,
			 'Avg_Length_of_Stay':93.15,
			 'Avg_Visits_per_Customer':1.16,
			 'Loyal_customer_per':8.31,
			 'New_customer_per':65,
			 'Customer_lost_per':91.68            
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				 [77.61174827814102,12.935334392490226],[77.61136204004288,12.935180157977092],[77.61105358600616,12.93500239604705],[77.61071026325226,12.93457890387987],[77.61053591966629,12.934239063966542],[77.61117428541183,12.933742374029716],[77.61149615049362,12.934231221501534],[77.61213719844817,12.934615501996769],[77.61174827814102,12.935334392490226]
               ]
            ]
         }
		 
	  },{
		   "type":"Feature",
         "properties":{
			 'Place':'Embassy Park',
             'TotalVisits':1006,
			 'Avg_daily_Visits':30.48,
			 'Avg_Length_of_Stay':105.41,
			 'Avg_Visits_per_Customer':1.24,
			 'Loyal_customer_per':8.94,
			 'New_customer_per':65,
			 'Customer_lost_per':91.05           
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [ 
				 [77.621830701828,13.049556685548794],[77.62120842933655,13.047361805090906],[77.6230752468109,13.046870567272224],[77.62325763702391,13.047382708806223],[77.62365460395813,13.047497679208869],[77.62377262115479,13.048689187506252],[77.62311816215515,13.048950482417741],[77.62296795845032,13.049138614583011],[77.621830701828,13.049556685548794]
               ]
            ]
         }
		 
	  }
	   
	   
	   
	   
	   
   ]
   
};




const newLoyality=new Loyalitydata(data1);

const data2={
	"type":"FeatureCollection",
   "features":[
      {
         "type":"Feature",
         "properties":{
            "stroke":"#555555",
            "stroke-width":2,
            "stroke-opacity":1,
            "fill":"#555555",
            "fill-opacity":0.3,
            "Name":"Domlur"
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
                  [
                     77.625253200531,
                     12.965907539569429
                  ],
                  [
                     77.62646555900574,
                     12.963492355650336
                  ],
                  [
                     77.62858986854553,
                     12.962321348950205
                  ],
                  [
                     77.63052105903625,
                     12.961829942711892
                  ],
                  [
                     77.63060688972473,
                     12.962133150931002
                  ],
                  [
                     77.62812852859497,
                     12.964851552947259
                  ],
                  [
                     77.62774229049683,
                     12.964736544232695
                  ],
                  [
                     77.62712001800537,
                     12.964872463616935
                  ],
                  [
                     77.62665867805481,
                     12.965133846839528
                  ],
                  [
                     77.62563943862915,
                     12.965813441933472
                  ],
                  [
                     77.625253200531,
                     12.965907539569429
                  ]
               ]
            ]
         }
      },
      {
         "type":"Feature",
         "properties":{
            "stroke":"#555555",
            "stroke-width":2,
            "stroke-opacity":1,
            "fill":"#555555",
            "fill-opacity":0.3,
            "Name":"Austin Town"
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
                  [
                     77.61060297489166,
                     12.965917994860133
                  ],
                  [
                     77.61000216007231,
                     12.965065887228066
                  ],
                  [
                     77.61065661907196,
                     12.964192865953422
                  ],
                  [
                     77.61192262172699,
                     12.963905343306353
                  ],
                  [
                     77.61193335056305,
                     12.964156272180423
                  ],
                  [
                     77.61196553707123,
                     12.964339240991585
                  ],
                  [
                     77.61150419712067,
                     12.964637218481865
                  ],
                  [
                     77.6118367910385,
                     12.96512861917777
                  ],
                  [
                     77.61060297489166,
                     12.965917994860133
                  ]
               ]
            ]
         }
      },
      {
         "type":"Feature",
         "properties":{
            "stroke":"#555555",
            "stroke-width":2,
            "stroke-opacity":1,
            "fill":"#555555",
            "fill-opacity":0.3,
            "Name":"Indiranagar"
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
                  [
                     77.64182925224303,
                     12.984318625441263
                  ],
                  [
                     77.64201164245604,
                     12.983973626146073
                  ],
                  [
                     77.64197945594788,
                     12.983199989621584
                  ],
                  [
                     77.64411449432373,
                     12.982604078764705
                  ],
                  [
                     77.64408230781555,
                     12.982259077089198
                  ],
                  [
                     77.64567017555237,
                     12.982457714476014
                  ],
                  [
                     77.64517664909363,
                     12.984705442263264
                  ],
                  [
                     77.64450073242188,
                     12.984559079212241
                  ],
                  [
                     77.64418959617615,
                     12.985134076416696
                  ],
                  [
                     77.64182925224303,
                     12.984318625441263
                  ]
               ]
            ]
         }
      },
      {
         "type":"Feature",
         "properties":{
            "stroke":"#555555",
            "stroke-width":2,
            "stroke-opacity":1,
            "fill":"#555555",
            "fill-opacity":0.3,
            "Name ":"Jayanagar"
         },
         "geometry":{
            "type":"Polygon",
            "coordinates":[
               [
                  [
                     77.58828163146973,
                     12.940196651975233
                  ],
                  [
                     77.58772373199461,
                     12.938983710096016
                  ],
                  [
                     77.5880241394043,
                     12.938607278658088
                  ],
                  [
                     77.58686542510986,
                     12.937017895211905
                  ],
                  [
                     77.58828163146973,
                     12.93772893642669
                  ],
                  [
                     77.58978366851807,
                     12.936097721219154
                  ],
                  [
                     77.59102821350096,
                     12.936432330336554
                  ],
                  [
                     77.59235858917235,
                     12.936641460806978
                  ],
                  [
                     77.5935173034668,
                     12.936850591102077
                  ],
                  [
                     77.59411811828613,
                     12.936348678099293
                  ],
                  [
                     77.59334564208984,
                     12.936181373540586
                  ],
                  [
                     77.59283065795898,
                     12.931873242510983
                  ],
                  [
                     77.59480476379395,
                     12.931998723107322
                  ],
                  [
                     77.59652137756348,
                     12.93501023848781
                  ],
                  [
                     77.5987958908081,
                     12.934884759406064
                  ],
                  [
                     77.59943962097168,
                     12.937143373220621
                  ],
                  [
                     77.59780883789062,
                     12.938983710096016
                  ],
                  [
                     77.59725093841553,
                     12.940029349997813
                  ],
                  [
                     77.59682178497314,
                     12.943291718309542
                  ],
                  [
                     77.59497642517088,
                     12.943500843027449
                  ],
                  [
                     77.58828163146973,
                     12.940196651975233
                  ]
               ]
            ]
         }
      }
   ]
   
};
const newMapdata=new Mapdata(data2);

const data3={
	
};

const newTotalvisit=new TotalVisits(data3);

const data4={
	
 
}
const newTradearea=new TradeArea(data4);

const data5={ 
	
}

const newMajorpaths=new MajorPaths(data5);


const data6={}
const newInterest=new Interest(data6);

const data7={"prename":["Place A","Place B"],"prevalue":[51,49],"postname":["Place A","Place D","Place C"],"postvalue":[30,21,49]}
const newShopping=new Shopping(data7);
	

//Uncomment this to save the data into the mapdata data in database
/*
newMapdata.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else{
		console.log("Successful");
	}
})
*/
//Uncomment this to save the data into the foottraffic data in database
/*
newFoottraffic.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else{
		console.log("Successful");
	}
})

*/

//Uncomment this to save the data into the loyality data in database
/*newLoyality.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else{
		console.log("Successful");
	}
})*/


//Uncomment this to save the data into the totalvisit data in database
/*newTotalvisit.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("total visits saved in db");
		}
})




newAreabusyness1.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness2.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness3.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness4.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness5.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness6.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness7.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness8.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness9.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness10.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness11.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness12.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness13.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness14.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness15.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness16.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness17.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness18.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness19.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness20.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness21.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness22.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})
newAreabusyness23.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}
})

newMajorpaths.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("major paths saved in db");
		}

	})
	newShopping.save((error)=>{
	if(error)
		{
			console.log("error occured");
		}
	else
		{
			console.log("shopping saved in db");
		}
})

*/

app.get('/',(req,res)=>{
	res.send("data");
})

app.get('/loyality', (req, res) => {

    Loyalitydata.find({  })
        .then((data1) => {
            console.log('Data: ', data1);
            res.json(data1);
        })
        .catch((error) => {
            console.log('error happened');
        });
});

app.get('/foottraffic', (req, res) => {

    Foottraffic.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error happened');
        });
});
app.get('/mapdata', (req, res) => {

    Mapdata.find({  })
        .then((data2) => {
            console.log('Data: ', data2);
            res.json(data2);
        })
        .catch((error) => {
            console.log('error happened');
        });
});

app.get('/totalvisitbyday',(req,res)=>{
	TotalVisits.find({ })
	 .then((data3)=>{
		console.log('Data: ', data3);
            res.json(data3);
	})
	 .catch((error)=>{
		console.log('error happened');
	})
})


app.get('/tradearea',(req,res)=>{
	TradeArea.find({ })
	.then((data4)=>{
		console.log('Data: ', data4);
            res.json(data4);
	})
	 .catch((error)=>{
		console.log('error happened');
	})
	
})

app.get('/majorpaths',(req,res)=>{
	setTimeout(()=>{
		MajorPaths.find({ })
	.then((data5)=>{
		console.log('Data: ', data5);
            res.json(data5);
	})
	 .catch((error)=>{
		console.log('error happened');
	}) },2000)
	
})	

app.get('/areabusyness/:hour',(req,res)=>{
	
	var hour=req.params.hour;
	 if(hour==0)
		 {
			 Areabusyness0.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 0');
	})
			
			 
		 }
	  else if(hour==1)
		  {
			  Areabusyness1.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 1');
	})
		  }
	else if(hour==2)
		 {
			 Areabusyness2.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 2');
	}) 



		 }
	  else if(hour==3)
		  {
			   Areabusyness3.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 3');
	}) 

			  
		  }
	else if(hour==4)
		{
			 Areabusyness4.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 4');
	}) 

		}
	else if(hour==5)
		{
			 Areabusyness5.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 5');
	}) 

			
		}
	else if(hour==6)
		{
			 Areabusyness6.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 6');
	}) 

			
		}
	else if(hour==7)
		{
			 Areabusyness7.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 7');
	}) 

		}
	else if(hour==8)
		{
			 Areabusyness8.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 8');
	}) 

			
		}
	else if(hour==9)
		{
			 Areabusyness9.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 9');
	}) 

		}
	else if(hour==10)
		{ Areabusyness10.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 10');
	}) 

			
		}
	
	else if(hour==11)
		{
			 Areabusyness11.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 11');
	}) 

		}
	else if(hour==12)
		{ Areabusyness12.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 12');
	}) 

			
		}
	else if(hour==13)
		{
			Areabusyness13.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 13');
	}) 
			

		}
	else if(hour==14)
		{
			Areabusyness14.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 14');
	}) 

		}
	else if(hour==15)
		{
			Areabusyness15.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 15');
	}) 

		}
	else if(hour==16)
		{
			Areabusyness16.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 16');
	}) 

		}
	else if(hour==17)
		{
			Areabusyness17.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 17');
	}) 

		}
	else if(hour==18)
		{
			Areabusyness18.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 18');
	}) 

		}
	else if(hour==19)
		{
			Areabusyness19.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 19');
	}) 

			
		}
	else if(hour==20)
		{
			Areabusyness20.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 20');
	}) 

		}
	else if(hour==21)
		{
			Areabusyness21.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 21');
	}) 

		}
	else if(hour==22)
		{
			Areabusyness22.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 22');
	}) 

		}
	else if(hour==23)
		{
			Areabusyness23.find({ })
	.then((data)=>{
		console.log('Data: ', data);
            res.json(data);
	})
	 .catch((error)=>{
		console.log('error happened in hour 23');
	}) 

			
		}
	
	
})	

app.get('/interest', (req, res) => {

    Interest.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error happened');
        });
});

app.get('/shopping', (req, res) => {

    Shopping.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error happened');
        });
});
mongoose.connection.on('connected',()=>{
	console.log("connected") 
})

app.listen( 3001, function(){
	console.log("welcome");
  });