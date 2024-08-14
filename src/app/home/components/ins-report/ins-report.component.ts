import { ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as d3 from 'd3';
import { ApiService } from 'src/app/shared/services/api.service';

declare var require: any;
declare var d3: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);



@Component({
  selector: 'app-ins-report',
  templateUrl: './ins-report.component.html',
  styleUrls: ['./ins-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsReportComponent implements OnInit {

  private chartContainer: ElementRef;

  countrylist:any=["India","USA"];
  statelist: any=["Karnataka"];
  productList: any=[
    { id:'Ambi_Pur', name: 'Ambi Pur'},
    { id:'Ariel', name: 'Ariel'},
    { id:'Head_&_Shoulders', name: 'Head & Shoulders'},
    { id:'Olay', name: 'Olay'},
    { id:'Old_Spice', name: 'Old Spice'},
    { id:'Oral_B', name: 'Oral B'},
    { id:'Pantene', name: 'Pantene'},
    { id:'Purex', name: 'Purex'},
    { id:'Tide', name: 'Tide'},
    { id:'whisper', name: 'whisper'}
  ];
  citylist:any=["Bangalore"];
  country: any= "";
  product: any ="";
  state:any="";
  city:any="";
  startDate: any="";
  endDate:any="";
  totalAvgCustomerSpend: any;
  totalRevenue: any;
  totalTransaction: any;
  totalUnitsSold: any;
  bottomFour_ByRevenue:any;
  bottomFour_ByUnitsSold:any;
  topFour_ByRevenue:any;
  topFour_ByUnitsSold:any;
  showConfig: boolean = false;


  public revenueoptions: any = {
      chart: {
        type: 'line',
        height:310,
        width:300
        },
      title: {
        text: 'Revenue',
         align: 'left'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return 'x: ' +  this.x +
            ' y: ' + this.y;
        }
      },
      xAxis: {
        type: 'linear',
        rotation: -45,
        categories: []

      },
      yAxis: {
         title: {
             text: 'Revenue' },
             gridLineColor: '#197F07',
    gridLineWidth: 0,
    lineWidth:1,
    //  plotLines: [{
    //     color: '#FF0000',
    //     width: 1,
    //     value: 0
    // }]

     },
     plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: true
        }
    },
      series: [
        {  name: 'Revenue',
          data:[]

        }
      ]
    }

    public quantityOptions: any = {
        chart: {
          type: 'line',
          height:310,
          width:300
          },
        title: {
          text: 'Quantity Sold(Units)',
           align: 'left'
        },
        credits: {
          enabled: false
        },
        tooltip: {
          formatter: function() {
            return 'x: ' + this.x +
              ' y: ' + this.y;
          }
        },
          yAxis: {
           title: {
               text: 'Quantity Sold'
           },
           gridLineColor: '#197F07',
           gridLineWidth: 0,
           lineWidth:1,
       },
       plotOptions: {
          line: {
              dataLabels: {
                  enabled: false
              },
              enableMouseTracking: true
          }
      },
      xAxis: {
          categories: []
      },

      series: [{
          data: []
      }]
      }

      public productOptions: any = {
          chart: {
            type: 'line',
            height:310,
            width:300
            },
          title: {
            text: 'Average Customer Spend(INR)',
             align: 'left'
          },
          credits: {
            enabled: false
          },
          tooltip: {
            formatter: function() {
              return 'x: ' + this.x +
                ' y: ' + this.y.toFixed(2);
            }
          },
            yAxis: {
             title: {
                 text: 'Quantity Sold'
             },
             gridLineColor: '#197F07',
    gridLineWidth: 0,
    lineWidth:1,
         },
         plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },
        xAxis: {
          rotation: -45,
          categories: []
        },

        series: [{
          data: []
        }]
        }



  constructor(
    private apiservice: ApiService

  ) {
  }

  ngOnInit(): void {
    var params ={
      'from': '',
      'to':'',
    'state':'',
    'city':'',
    'product':''
    };
    this.apiservice.getPosReportData(params).then((data:any) => {
      this.totalAvgCustomerSpend= this.curdata(data.totalAvgCustomerSpend);
      this.totalRevenue=this.curdata(data.totalRevenue);
      this.totalTransaction=this.curdata(data.totalTransaction);
      this.totalUnitsSold=this.curdata(data.totalUnitsSold);
      this.bottomFour_ByRevenue = data.bottomFour_ByRevenue;
      this.bottomFour_ByUnitsSold= data.bottomFour_ByUnitsSold;
      this.topFour_ByRevenue= data.topFour_ByRevenue;
      this.topFour_ByUnitsSold= data.topFour_ByUnitsSold;
      var profuctslist= data["Data"].map(a => a.Product);
      // this.productList = [...new Set(profuctslist)];
      // var stateslist= data["Data"].map(a => a.State);
      // this.statelist = [...new Set(stateslist)];
      // var citlist= data["Data"].map(a => a.City);
      // this.citylist = [...new Set(citlist)];
      var revenuegraphdata:any=[];
      var avgspendgraphdata:any=[];
      var unitsgraphdata:any=[];
      var xaxisdates:any=[];
      for(let i=0; i<data.Data.length;i++){
          xaxisdates.push(data.Data[i].Date);
      }
      for(let i=0; i<data.Data.length;i++){
        revenuegraphdata.push(data.Data[i].Revenue);
      }
      this.revenueoptions.xAxis.categories = xaxisdates;
      this.revenueoptions.series[0].data= revenuegraphdata;
      for(let i=0; i<data.Data.length;i++){
          unitsgraphdata.push(data.Data[i]['Units Sold']);
      }
      this.quantityOptions.series[0].data= unitsgraphdata;
      this.quantityOptions.xAxis.categories = xaxisdates;
      for(let i=0; i<data.Data.length;i++){
          avgspendgraphdata.push(data.Data[i]['Av Customer Spend']);
      }
      this.productOptions.series[0].data= avgspendgraphdata;
      this.productOptions.xAxis.categories = xaxisdates;
      this.drawchart();
      this.createChart();
    });

      }

      curdata(value){
        var val1 = Math.abs(value);
        var val:any;
        if (val1 >= 10000000) {
          val = (val1/10000000).toFixed(2) + ' Cr';
        } else if (val1 >= 100000) {
          val = (val1/100000).toFixed(2) + ' L';
        } else if (val1 >= 1000) {
          val = (val1/1000).toFixed(2) + ' K';
        }else if(val1 < 1000){
          val = (val1).toFixed(2)
        }
  return val;
}


      onResize(data) {
        this.createChart();
      }

      drawchart(){
      Highcharts.chart('revenuechart', this.revenueoptions);
        Highcharts.chart('quantitychart', this.quantityOptions);
        Highcharts.chart('productchart', this.productOptions);
      }


getfilterData(){
  var params ={
      'from': this.startDate,
      'to':this.endDate,
      'state':this.state,
      'city':this.city,
      'product': this.product
    };
  this.apiservice.getPosReportData(params).then((data:any) => {
      this.totalAvgCustomerSpend= this.curdata(data.totalAvgCustomerSpend);
      this.totalRevenue=this.curdata(data.totalRevenue);
      this.totalTransaction=this.curdata(data.totalTransaction);
      this.totalUnitsSold=this.curdata(data.totalUnitsSold);
      this.bottomFour_ByRevenue = data.bottomFour_ByRevenue;
      this.bottomFour_ByUnitsSold= data.bottomFour_ByUnitsSold;
      this.topFour_ByRevenue= data.topFour_ByRevenue;
      this.topFour_ByUnitsSold= data.topFour_ByUnitsSold;
      var revenuegraphdata:any=[];
      var avgspendgraphdata:any=[];
      var unitsgraphdata:any=[];
      var xaxisdates:any=[];
      for(let i=0; i<data.Data.length;i++){
          xaxisdates.push(data.Data[i].Date);
      }
      for(let i=0; i<data.Data.length;i++){
        revenuegraphdata.push(data.Data[i].Revenue);
      }
      this.revenueoptions.xAxis.categories = xaxisdates;
      this.revenueoptions.series[0].data= revenuegraphdata;
      for(let i=0; i<data.Data.length;i++){
          unitsgraphdata.push(data.Data[i]['Units Sold']);
      }
      this.quantityOptions.series[0].data= unitsgraphdata;
      this.quantityOptions.xAxis.categories = xaxisdates;
      for(let i=0; i<data.Data.length;i++){
          avgspendgraphdata.push(data.Data[i]['Av Customer Spend']);
      }
      this.productOptions.series[0].data= avgspendgraphdata;
      this.productOptions.xAxis.categories = xaxisdates;
      this.drawchart();
    });
}

private createChart(): void {
var json_data=[
	{"name":"Adult Cereals", "size":3, "imports": [{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Dried Fruit","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Frozen Fish","lift":0},{"naam": "Bleach; Disinfecting & Toiletcare","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Ambient Fruit","lift":0}]}, {"name":"Fresh Prep Stir Fry", "size":3, "imports" : [ ]}, {"name":"Cooking Aids (Grocery)", "size":3, "imports": [{"naam": "Whole Chicken (Fresh)","lift":0},{"naam": "Vinegars","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Canned Vegetables","lift":0},{"naam": "Other Veg","lift":0},{"naam": "White Meat Poultry","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0},{"naam": "Store Produced (Butchery) - 376","lift":0},{"naam": "Carrots","lift":0}]}, {"name":"Girls Essentials - Do Not Use", "size":3, "imports" : [ ]}, {"name":"Breaded Poultry (Fresh)", "size":3, "imports" : [ ]}, {"name":"Canned Beans and Pasta", "size":3, "imports": [{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Canned Vegetables","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Frozen Meat & Poultry","lift":0},{"naam": "Frozen Fish","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Breaded Poultry (Fresh)","lift":0}]}, {"name":"Long life Milk", "size":3, "imports" : [ ]}, {"name":"Frozen Ready Meals", "size":3, "imports" : [ ]}, {"name":"Soups (Grocery)", "size":3, "imports": [{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Canned Vegetables","lift":0},{"naam": "Ambient Desserts","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0}]}, {"name":"Regional Prepared Fresh Foods", "size":3, "imports" : [ ]}, {"name":"Saver Stamps", "size":3, "imports" : [ ]}, {"name":"Produce - 9910", "size":3, "imports" : [ ]}, {"name":"Free From Baking", "size":3, "imports": [{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Long life Milk","lift":0},{"naam": "Dried Fruit","lift":0},{"naam": "Speciality Cheese (PP)","lift":0},{"naam": "Home Baking","lift":0},{"naam": "Olives & Antipasti (Deli)","lift":0},{"naam": "Produce Nuts","lift":0},{"naam": "Herbs","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Speciality Poultry","lift":0}]}, {"name":"White Meat Poultry", "size":3, "imports" : [ ]}, {"name":"Summer Toys", "size":3, "imports" : [ ]}, {"name":"Produce Nuts", "size":3, "imports" : [ ]}, {"name":"Carrots", "size":3, "imports" : [ ]}, {"name":"Childrens Tableware", "size":3, "imports" : [ ]}, {"name":"Spreads; Pastes & Pates", "size":3, "imports": [{"naam": "Canned Meat","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Frozen Ready Meals","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Frozen Fish","lift":0}]}, {"name":"Beverages & Other Hot Drinks", "size":3, "imports": [{"naam": "Ambient Milks","lift":0},{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Home Baking","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Coffee","lift":0},{"naam": "Bakeware","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Long life Milk","lift":0},{"naam": "Tea","lift":0},{"naam": "Ambient Desserts","lift":0}]}, {"name":"Home Baking", "size":3, "imports": [{"naam": "Bakeware","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Vinegars","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Ambient Desserts","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0}]}, {"name":"Frozen Party Food", "size":3, "imports" : [ ]}, {"name":"Store Produced (Butchery) - 376", "size":3, "imports" : [ ]}, {"name":"Dried Fruit", "size":3, "imports" : [ ]}, {"name":"Cling Film; Cooking Paper and Foils", "size":3, "imports" : [ ]}, {"name":"Vinegars", "size":3, "imports": [{"naam": "Cooking Oils","lift":0},{"naam": "Pickles (Grocery)","lift":0},{"naam": "Kitchen Co-Ordinates","lift":0},{"naam": "Sauces Mustards Condiments and Dressings","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Cooking Aids (Grocery)","lift":0},{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0},{"naam": "Herbs","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0}]}, {"name":"Ambient Puddings", "size":3, "imports": [{"naam": "Ambient Desserts","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Frozen Ready Meals","lift":0},{"naam": "Gift Vouchers - 901","lift":0}]}, {"name":"Kitchen Co-Ordinates", "size":3, "imports" : [ ]}, {"name":"Frozen Desserts", "size":3, "imports" : [ ]}, {"name":"Cleaning Cloths", "size":3, "imports" : [ ]}, {"name":"Pickles (Grocery)", "size":3, "imports": [{"naam": "Vinegars","lift":0},{"naam": "Sauces Mustards Condiments and Dressings","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Speciality Cheese (PP)","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Cucumber","lift":0},{"naam": "Canned Vegetables","lift":0}]}, {"name":"Ambient Desserts", "size":3, "imports": [{"naam": "Ambient Puddings","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Fruit Pies (Pie Shop)","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Home Baking","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Canned Beans and Pasta","lift":0}]}, {"name":"International Foods", "size":3, "imports": [{"naam": "White Meat Poultry","lift":0},{"naam": "Fresh Prep Stir Fry","lift":0},{"naam": "Peppers","lift":0},{"naam": "Pre packed (Butchery)","lift":0},{"naam": "Prepared Fresh Foods","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Canned Vegetables","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Cooking Aids (Grocery)","lift":0}]}, {"name":"Mugs", "size":3, "imports" : [ ]}, {"name":"Panware", "size":3, "imports" : [ ]}, {"name":"Cucumber", "size":3, "imports" : [ ]}, {"name":"Auto Dish Wash", "size":3, "imports" : [ ]}, {"name":"World Foods", "size":3, "imports": [{"naam": "Frozen World Foods","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Dark Meat Poultry","lift":0},{"naam": "Herbs","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Exotics","lift":0},{"naam": "Glassware","lift":0},{"naam": "Panware","lift":0},{"naam": "Produce - 9910","lift":0},{"naam": "Ovenware","lift":0}]}, {"name":"Canned Fish", "size":3, "imports": [{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Canned Vegetables","lift":0},{"naam": "Pickles (Grocery)","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Frozen Fish","lift":0},{"naam": "Vinegars","lift":0},{"naam": "Sauces Mustards Condiments and Dressings","lift":0}]}, {"name":"Sugars & Sweeteners", "size":3, "imports": [{"naam": "Home Baking","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Tea","lift":0},{"naam": "Bakeware","lift":0},{"naam": "Vinegars","lift":0},{"naam": "Coffee","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0}]}, {"name":"Frozen Meat & Poultry", "size":3, "imports" : [ ]}, {"name":"Canned Vegetables", "size":3, "imports": [{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Cooking Aids (Grocery)","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Frozen Fish","lift":0}]}, {"name":"Gift Vouchers - 901", "size":3, "imports" : [ ]}, {"name":"Ambient Fruit", "size":3, "imports": [{"naam": "Ambient Milks","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Ambient Desserts","lift":0},{"naam": "Store Produced (Butchery) - 376","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Pickles (Grocery)","lift":0}]}, {"name":"Glassware", "size":3, "imports" : [ ]}, {"name":"Speciality Poultry", "size":3, "imports" : [ ]}, {"name":"Frozen Prepared Foods", "size":3, "imports" : [ ]}, {"name":"Fruit Pies (Pie Shop)", "size":3, "imports" : [ ]}, {"name":"Cooking Oils", "size":3, "imports": [{"naam": "Vinegars","lift":0},{"naam": "Panware","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Speciality Poultry","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0},{"naam": "Cooking Aids (Grocery)","lift":0},{"naam": "Herbs","lift":0},{"naam": "Whole Chicken (Fresh)","lift":0},{"naam": "Dark Meat Poultry","lift":0},{"naam": "Canned Vegetables","lift":0}]}, {"name":"Other Veg", "size":3, "imports" : [ ]}, {"name":"Sauces Mustards Condiments and Dressings", "size":3, "imports": [{"naam": "Vinegars","lift":0},{"naam": "Pickles (Grocery)","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0},{"naam": "Frozen Meat & Poultry","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0}]}, {"name":"Whole Chicken (Fresh)", "size":3, "imports" : [ ]}, {"name":"Pre packed (Butchery)", "size":3, "imports" : [ ]}, {"name":"Polishes", "size":3, "imports" : [ ]}, {"name":"Peppers", "size":3, "imports" : [ ]}, {"name":"Coffee", "size":3, "imports": [{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Tea","lift":0},{"naam": "Bleach; Disinfecting & Toiletcare","lift":0},{"naam": "Auto Dish Wash","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Mugs","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Refuse & Vac Bags","lift":0},{"naam": "Polishes","lift":0}]}, {"name":"Bleach; Disinfecting & Toiletcare", "size":3, "imports" : [ ]}, {"name":"Chocolate Spread", "size":3, "imports": [{"naam": "Ambient Puddings","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Ambient Fruit","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Home Baking","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Whole Foods  Additions/Toppings","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Cling Film; Cooking Paper and Foils","lift":0}]}, {"name":"Ovenware", "size":3, "imports" : [ ]}, {"name":"Exotics", "size":3, "imports" : [ ]}, {"name":"Prepared Fresh Foods", "size":3, "imports" : [ ]}, {"name":"Ambient Milks", "size":3, "imports": [{"naam": "Ambient Fruit","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Ambient Desserts","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Home Baking","lift":0},{"naam": "Bakeware","lift":0},{"naam": "Long life Milk","lift":0}]}, {"name":"Dark Meat Poultry", "size":3, "imports" : [ ]}, {"name":"Convenience Meals (Grocery)", "size":3, "imports": [{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Frozen Meat & Poultry","lift":0},{"naam": "Canned Meat","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Breaded Poultry (Fresh)","lift":0},{"naam": "Frozen Party Food","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Frozen Prepared Foods","lift":0},{"naam": "Frozen Ready Meals","lift":0},{"naam": "Frozen Fish","lift":0}]}, {"name":"Olives & Antipasti (Deli)", "size":3, "imports" : [ ]}, {"name":"Canned Meat", "size":3, "imports": [{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Canned Beans and Pasta","lift":0},{"naam": "Convenience Meals (Grocery)","lift":0},{"naam": "Canned Fish","lift":0},{"naam": "Regional Prepared Fresh Foods","lift":0},{"naam": "Soups (Grocery)","lift":0},{"naam": "Frozen Meat & Poultry","lift":0},{"naam": "Ambient Milks","lift":0},{"naam": "Canned Vegetables","lift":0}]}, {"name":"Speciality Cheese (PP)", "size":3, "imports" : [ ]}, {"name":"Refuse & Vac Bags", "size":3, "imports" : [ ]}, {"name":"Herbs", "size":3, "imports" : [ ]}, {"name":"Frozen Fish", "size":3, "imports" : [ ]}, {"name":"Boys Essentials - Do Not Use", "size":3, "imports" : [ ]}, {"name":"Tea", "size":3, "imports": [{"naam": "Sugars & Sweeteners","lift":0},{"naam": "Beverages & Other Hot Drinks","lift":0},{"naam": "Coffee","lift":0},{"naam": "Bleach; Disinfecting & Toiletcare","lift":0},{"naam": "Cleaning Cloths","lift":0},{"naam": "Chocolate Spread","lift":0},{"naam": "Spreads; Pastes & Pates","lift":0},{"naam": "Auto Dish Wash","lift":0},{"naam": "Ambient Puddings","lift":0},{"naam": "Refuse & Vac Bags","lift":0}]}, {"name":"Whole Foods  Additions/Toppings", "size":3, "imports": [{"naam": "Free From Baking","lift":0},{"naam": "Store Produced (Butchery) - 376","lift":0},{"naam": "Herbs","lift":0},{"naam": "Other Veg","lift":0},{"naam": "Dried Fruit","lift":0},{"naam": "Home Baking","lift":0},{"naam": "Speciality Cheese (PP)","lift":0},{"naam": "Exotics","lift":0},{"naam": "Cooking Oils","lift":0},{"naam": "Peppers","lift":0}]}, {"name":"Ice Cream Accessories", "size":3, "imports": [{"naam": "Frozen Desserts","lift":0},{"naam": "Summer Toys","lift":0},{"naam": "Frozen Meat & Poultry","lift":0},{"naam": "Saver Stamps","lift":0},{"naam": "Frozen Party Food","lift":0},{"naam": "Childrens Tableware","lift":0},{"naam": "Frozen Fish","lift":0},{"naam": "Boys Essentials - Do Not Use","lift":0},{"naam": "Girls Essentials - Do Not Use","lift":0},{"naam": "Leisure & BBQ","lift":0}]}, {"name":"Bakeware", "size":3, "imports" : [ ]}, {"name":"Leisure & BBQ", "size":3, "imports" : [ ]}, {"name":"Frozen World Foods", "size":3, "imports" : [ ]}
];

var diameter =960,
    radius = diameter / 2,
    innerRadius = radius - 280;
var transx=radius+100;
var transy=radius-100;

var cluster = d3.layout.cluster()
    .size([360, innerRadius])
    .sort(null)
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(0.9)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var svg = d3.select("div#affinity").append("svg")
    .attr("width", diameter+100)
    .attr("height", diameter+100)
  .append("g")
    .attr("transform", "translate(" + transx + "," + transy + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");


  var nodes = cluster.nodes(packageHierarchy(json_data)),
      links = packageImports(nodes);

 var k=0;
 var tempCurrent;
 var tempLast="xx";
 var lift;

  link = link
      .data(bundle(links))
    .enter().append("path")
    .attr("class", "link")
    .style("stroke","#4682b4" )
    .style("stroke-opacity", ".05")
    .style("fill", "none")
    .style("pointer-events","none")
    .attr("d", line)
    .each(function(d) {

	tempCurrent=d[0].name;
	if(tempCurrent!=tempLast){k=0;}
	if(tempCurrent==tempLast){k++;}
	d.source = d[0];
	d.target = d[d.length -1];
    var objLength=d[0].imports.length;
	lift=d[0].imports[k].lift;
	tempLast=tempCurrent;
	d.value=lift;
});


  node = node
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("text")
      .attr("class", "node")
      .style("font", "100 12px Arial, Helvetica, Arial, sans-serif")
      .style("fill","#7C7C53")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + (d.x < 180 ? "" : "rotate(180)"); })
      .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.key; })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted);


function mouseovered(d) {
 node

      .each(function(n) { n.target = n.source = false; })

      // node.style('font-weight','700')
       d3.select(this).style('fill', '#0000FF')

  link
	  // .classed("link--source2", function(l) { if (l.source === d  && l.value==1 ) return l.target.target = true; })
    .style("stroke-width", function(l) { if (l.source === d  && l.value==1 ) return l.target.target = true?"2px":"1px" })
    .style("stroke-opacity", function(l) { if (l.source === d  && l.value==1 ) return l.target.target = true?"0.5":".05" })
    .style("stroke-width", function(l) { if (l.source === d  && l.value==0 ) return l.target.target = true?"2px":"1px" })
    .style("stroke-opacity", function(l) { if (l.source === d  && l.value==0 ) return l.target.target = true?"0.5":".05" })
    .style("stroke", function(l) { if (l.source === d  && l.value==1 ) return l.target.target = true?"#E18700":"#4682b4" })
    .style("stroke", function(l) { if (l.source === d  && l.value==0 ) return l.target.target = true?"#2ca02c":"#4682b4" })

	  // .classed("link--source", function(l) { if (l.source === d  && l.value==0 ) return l.target.target = true; })
	  .each(function() { this.parentNode.appendChild(this); });
    // d3.select(this).style('stroke', '#2ca02c')



  node

  .style('font-weight',function(n) { return  n.source  ?'700':'100'})

  .style("fill", function(n) { return n.source? "#0000FF": '#7C7C53'})
  .style("font-size", function(n) { return n.source? "15px": "12px"})
  .style("fill", function(n) { return n.target? "#000": '#7C7C53'})
  .style("font-size", function(n) { return n.target? "15px": "12px"})

      // .classed("node--source", function(n) { return n.source; })
      // .classed("node--target", function(n) { return n.target; });



}

function mouseouted(d) {
  d3.select(this).style('fill', '#7C7C53')

  link
    //   .classed("link--target", false)
    //   .classed("link--source", false)
	  // .classed("link--source2", false)
	  // .classed("link--source3", false)
    .style("stroke-width", "1px" )
    .style("stroke","#4682b4" )
    .style("stroke-opacity", ".05")
    .style("fill", "none")

  node
    //   .classed("node--target", false)
	  // .classed("node--source", false)
	  // .classed("node--target2", false)
    //   .classed("node--target3", false)
      .style("fill", "#7C7C53")
      .style("font-size", "12px")
      // d3.select(this).style('stroke', "#4682b4")
}

d3.select(self.frameElement).style("height", diameter + "px");

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
  var map = {};

  function find(name:any, data:any) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(",")),'');
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function(d) {
    find(d.name, d);
  });

  return map[""];
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.imports) d.imports.forEach(function(i) {
      imports.push({source: map[d.name], target: map[i.naam], value : map[i.lift]});
    });
  });

  return imports;

}
}
toggleConfig(){
  this.showConfig = !this.showConfig;
}

}
