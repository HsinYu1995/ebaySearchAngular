import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';



 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  observer: BreakpointObserver;
  keywords: string;
  labelKeywords: string = "default";
  min: string = null;
  max: string = null;
  new: string;
  used: string;
  verygood: string;
  good: string;
  acceptable: string;
  returnedaccepted: string;
  free: string;
  expedited: string;
  bestmatch: string;
  sortBy = null;
  sort: string = "BestMatch";
  toserver: string;
  count: number;
  numberLabel: boolean = false;
  noResult: boolean = false;
  page: number;
  image0: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  result: boolean = false;
  pageMore: boolean = false;
  minBool: boolean = false;
  config: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 100
  };
  displayKeywords: string;
  imageCollection = { count: 0, data: [] };
  showMoreButton: boolean = true;
  showLessButton: string;
  detailedPart: boolean = false;
  copyRes: any;
  resultFor: boolean = false;
  public maxSize: number = 10;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: 'You are on Page'
  };
  public innerWidth: any;
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 420) {
      this.maxSize = 5;
    } else {
      this.maxSize = 10;
    }
  }
  ngOnInit() {
    if (this.innerWidth < 420) {
      this.maxSize = 5;
    } else {
      this.maxSize = 10;
    }
  }
  

  constructor(private httpClient: HttpClient){
    this.count = 0;
    
  };
  

  search(): void {
    //
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 420) {
      this.maxSize = 5;
    } else {
      this.maxSize = 10;
    }
    //
    this.result = true;
    this.noResult = false;
    this.labelKeywords = this.keywords;
    
    if (this.min != null && this.max != null) {
      if (Number(this.min) < 0 || Number(this.max) < 0 || Number(this.min) > Number(this.max)) {
        this.numberLabel = true;
      } else {
        this.numberLabel = false;
      }
    } else if (this.min != null) {
      if (Number(this.min) < 0) {
        this.numberLabel = true;
      } else {
        this.numberLabel = false;
      }
    } else if (this.max != null) {
      if (Number(this.max) < 0) {
        this.numberLabel = true;
      } else {
        this.numberLabel = false;
      }
    }
    if (this.min == null && this.max == null) {
      this.numberLabel = false; //no dispaly
    }

    if (this.numberLabel == null || this.keywords == null || this.keywords === "" || this.numberLabel) {

      this.result = false;
      this.cleanPreviousResult();
      return;
    }
    this.toserver = "";
    this.count = 0;   
    this.toserver += "keywords=" + this.keywords + "&sortOrder=" + this.sort + "&";
   // Changing from  (this.min != null) to (this.min)
    if (this.min) {
      this.minBool = true;

      this.toserver += "itemFilter(" + this.count.toString(10) + ").name=MinPrice&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").value=" + this.min + "&"
      this.toserver += "itemFilter(" + this.count.toString(10) + ").paramName=Currency&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").paramValue=USD&";
      this.count++;
    }
    if (this.max) {  

      this.toserver += "itemFilter(" + + this.count.toString(10) + ").name=MaxPrice&";
      this.toserver += "itemFilter(" + + this.count.toString(10) + ").value=" + this.max + "&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").paramName=Currency&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").paramValue=USD&";
      this.count++;
    } 
    if (this.new || this.used || this.verygood || this.good || this.acceptable) {
      let cond = 0;
      this.toserver += "itemFilter(" + this.count.toString(10) + ").name=Condition&";
      if (this.new) {
        this.toserver += "itemFilter(" + this.count.toString(10) + ").value(" + cond.toString(10) + ")=1000&";
        cond++;
      }
      if (this.used) {
        this.toserver += "itemFilter(" + this.count.toString(10) + ").value(" + cond.toString(10) + ")=3000&";
        cond++;
      }
      if (this.verygood) {
        this.toserver += "itemFilter(" + this.count.toString(10) + ").value(" + cond.toString(10) + ")=4000&";
        cond++;
      }
      if (this.good) {
        this.toserver += "itemFilter(" + this.count.toString(10) + ").value(" + cond.toString(10) + ")=5000&";
        cond++;
      }
      if (this.acceptable) {
        this.toserver += "itemFilter(" + this.count.toString(10) + ").value(" + cond.toString(10) + ")=6000&";
        cond++;
      }
      this.count++;
             
    }
    if (this.returnedaccepted) {
      this.toserver += "itemFilter(" + this.count.toString(10) + ").name=ReturnsAcceptedOnly&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").value=true&";
      this.count++;
    }
    if (this.free) {
      this.toserver += "itemFilter(" + this.count.toString(10) + ").name=FreeShippingOnly&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").value=true&";
      this.count++;
    }
    if (this.expedited) {
      this.toserver += "itemFilter(" + this.count.toString(10) + ").name=ExpeditedShippingType&";
      this.toserver += "itemFilter(" + this.count.toString(10) + ").value=Expedited&";
    }

    this.min = null;
    this.max = null;
    if (this.keywords != null && !this.numberLabel) {

      this.toServerFunction(this.toserver).subscribe(
        res => {
          this.copyRes = res;

          // set all the item invisible
          if (res.totalEntries == "0") {

            this.noResult = true;
            this.result = false;
            this.labelKeywords = "default";
            this.numberLabel = false;
            return;
          }

          this.displayKeywords = this.keywords;
          this.resultFor = true;
          this.cleanPreviousResult();
          //The logic for pagination and tabs
          let index = parseInt(res.correctItem, 10);
          this.page = Math.ceil(index / 5);
    
          this.config["totalItems"] = index; // change
          this.imageCollection.count = index;
          for (var i = 0; i < this.imageCollection.count; i++) {
            this.imageCollection.data.push({
              id: i,
              url: res.totalItem[i].galleryURL,
              title: res.totalItem[i].title,
              moreButton: true,
              lessButton: false,
              price: res.totalItem[i].convertedCurrentPrice,
              location: res.totalItem[i].location,
              bestOffer: res.totalItem[i].bestOfferEnabled, //
              buyItNow: res.totalItem[i].buyItNowAvailable, //
              categoryName: res.totalItem[i].categoryName,
              condition: res.totalItem[i].conditionDisplayName,
              expedited: res.totalItem[i].expeditedShipping, //
              gift: res.totalItem[i].gift, //
              listingType: res.totalItem[i].listingType,
              shippingCost: res.totalItem[0].shippingServiceCost,
              viewItemURL: res.totalItem[i].viewItemURL,
              watchCount: res.totalItem[i].watchCount,
              shippingType: res.totalItem[i].shippingType,
              shipToLocations: res.totalItem[i].shipToLocations,
              oneDayShippingAvailable: res.totalItem[i].oneDayShippingAvailable, //
              bestOfferColor: res.totalItem[i].bestOfferEnabledColor,
              buyItNowAvailableColor: res.totalItem[i].buyItNowAvailableColor,
              giftColor: res.totalItem[i].giftColor,
              oneDayShippingAvailableColor: res.totalItem[i].oneDayShippingAvailableColor,
              expeditedColor: res.totalItem[i].expeditedColor,
              testid: "#test" + i.toString(10),
              testid2: "#test2" + i.toString(10),
              testid3: "#test3" + i.toString(10),
              testControl: "test" + i.toString(10),
              testControl2: "test2" + i.toString(10),
              testControl3: "test3" + i.toString(10)

            });
          }
         

         
        }

      );

    } 


  }
  
  clear(input: any) {

    this.result = false;
    input.reset();
    this.labelKeywords = "default";
    this.numberLabel = false;
    this.noResult = false;
    this.cleanPreviousResult();
    
  }
  sortby(event: any) {
    this.sort = event.target.value;
  }
  toServerFunction(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    let url = 'http://localhost:8080/test?';
    // let url = "https://hw8-server-280716.wl.r.appspot.com/test?"; 
    let newurl = new URLSearchParams(this.toserver).toString();
    url += newurl;
    return this.httpClient.get<any>(url.toString(), { headers });
  }
  onPageChange(event) {
    this.config.currentPage = event;
  }
  showMore(i: number) {
    
    this.imageCollection.data[i]["lessButton"] = true;
    this.imageCollection.data[i]["moreButton"] = false;
 
  }
  showLess(i: number) {
    this.imageCollection.data[i]["lessButton"] = false;
    this.imageCollection.data[i]["moreButton"] = true;
    
  }
  cleanPreviousResult() {
    this.imageCollection.count = 0;
    this.imageCollection.data = [];
  }
}


    
  


  


