const express = require('express');
var request = require('request');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 8080;
const url = require("url");
app.use(cors());
app.listen(port, () => {
  console.log('Server is up and running on port ', port);
})

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', function (req, res) {
  var toEbay = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=HsinYuLa-CSCI571-PRD-52eba4255-ceb7aba8&RESPONSE-DATA-FORMAT=JSON&RESTPAYLOAD&";
  urldata = url.parse(req.url, true);
  console.log(urldata);
  for (var i in urldata.query) {
    
    var value = urldata.query[i];

    if (i === "keywords") {
      toEbay += i;
      toEbay += "=";
      toEbay += value.replace(/\ /g, "%20");
      toEbay += "&";
    } else {
      toEbay += i;
      toEbay += "=";
      toEbay += value;
      toEbay += "&";
    }
  }
  console.log(toEbay);
  request(toEbay, function (error, response, body) {
    var newBody = JSON.parse(body);
    test = { "ack": "Success" };
    var toClient = {};
    if (!error && response.statusCode == 200) {
        if (newBody == null || newBody["findItemsAdvancedResponse"] == null || newBody["findItemsAdvancedResponse"][0] == null ||
            newBody["findItemsAdvancedResponse"][0]["ack"] == null || newBody["findItemsAdvancedResponse"][0]["ack"][0] === "Failure" || newBody["findItemsAdvancedResponse"][0]["ack"][0] == null ||
            newBody["findItemsAdvancedResponse"][0]["paginationOutput"] == null || newBody["findItemsAdvancedResponse"][0]["paginationOutput"][0] == null ||
            newBody["findItemsAdvancedResponse"][0]["paginationOutput"][0]["totalEntries"] == null ||
            newBody["findItemsAdvancedResponse"][0]["paginationOutput"][0]["totalEntries"][0] === "0" || newBody["findItemsAdvancedResponse"][0]["paginationOutput"][0]["totalEntries"][0] == null) {
        return res.send({ "totalEntries": "0" });
      } else {
        console.log("still run");
        var ack = newBody["findItemsAdvancedResponse"][0]["ack"][0];
        toClient["ack"] = ack;
        toClient["totalEntries"] = (newBody["findItemsAdvancedResponse"][0]["paginationOutput"][0]["totalEntries"][0]);
        toClient["totalItem"] = {};
        var counter = 0;
        newBody["findItemsAdvancedResponse"][0]["searchResult"][0]["item"];
        for (let x = 0; x < 100; x++) {
          if (newBody["findItemsAdvancedResponse"][0]["searchResult"][0]["item"][x] == null) {
            continue;
          }
          var get = newBody["findItemsAdvancedResponse"][0]["searchResult"][0]["item"][x];
  
          if (get["title"] == null || get["title"][0] === "") {
            continue;
          } else {
            var title = get["title"][0];
          }
          if (!("viewItemURL" in get) || get["viewItemURL"][0] === "") {
            continue;
          } else {
            var viewItemURL = get["viewItemURL"][0];
          }
          if (!("location" in get) || get["location"][0] === "") {
            continue;
          } else {
            var location = get["location"][0];
          }

          if (!("primaryCategory" in get)) {
            continue;
          }
          if (!("categoryName" in get["primaryCategory"][0]) || get["primaryCategory"][0]["categoryName"][0] === "") {
            continue;
          } else {
            var categoryName = get["primaryCategory"][0]["categoryName"][0];
          }
          if (!("condition" in get)) {
            continue;
          }
          if (!("conditionDisplayName" in get["condition"][0]) || get["condition"][0]["conditionDisplayName"][0] === "") {
            continue;
          } else {
            var conditionDisplayName = get["condition"][0]["conditionDisplayName"][0];
          }
          if (!("sellingStatus" in get)) {
            continue;
          }
          if (!("convertedCurrentPrice" in get["sellingStatus"][0])) {
            continue;
          }
          if (!("__value__" in get["sellingStatus"][0]["convertedCurrentPrice"][0]) || get["sellingStatus"][0]["convertedCurrentPrice"][0]["__value__"] === "") {
            continue;
          } else {
            var convertedCurrentPrice = get["sellingStatus"][0]["convertedCurrentPrice"][0]["__value__"];
          }
          if (!("shippingInfo" in get)) {
            continue;
          }
          if (!("expeditedShipping" in get["shippingInfo"][0]) || get["shippingInfo"][0]["expeditedShipping"][0] === "") {
            continue;
          } else {
            var expeditedShipping = get["shippingInfo"][0]["expeditedShipping"][0];
            if (expeditedShipping === "true") {
                expeditedShipping = "done";
                var expeditedColor = "green";
            } else {
                expeditedShipping = "clear";
                var expeditedColor = "red";
            }
          }
          if (!("shippingType" in get["shippingInfo"][0]) || get["shippingInfo"][0]["shippingType"][0] === "") {
            continue;
          } else {
            var shippingType = get["shippingInfo"][0]["shippingType"][0];
          }
          if (!("shipToLocations" in get["shippingInfo"][0]) || get["shippingInfo"][0]["shipToLocations"][0] === "") {
            continue;
          } else {
            var shipToLocations = get["shippingInfo"][0]["shipToLocations"][0];
          }
          if (!("oneDayShippingAvailable" in get["shippingInfo"][0]) || get["shippingInfo"][0]["oneDayShippingAvailable"][0] === "") {
            continue;
          } else {
            var oneDayShippingAvailable = get["shippingInfo"][0]["oneDayShippingAvailable"][0];
            if (oneDayShippingAvailable === "true") {
                oneDayShippingAvailable = "done";
                var oneDayShippingAvailableColor = "green";
            } else {
                oneDayShippingAvailable = "clear";
                var oneDayShippingAvailableColor = "red";
            }
          }
          if (!("shippingServiceCost" in get["shippingInfo"][0])) {
            continue;
          }
          if (!("__value__" in get["shippingInfo"][0]["shippingServiceCost"][0]) || get["shippingInfo"][0]["shippingServiceCost"][0]["__value__"] === "") {
            continue;
          } else {
            var shippingServiceCost = get["shippingInfo"][0]["shippingServiceCost"][0]["__value__"];
          }
          if (!("listingInfo" in get)) {
            continue;
          }
          if (!("bestOfferEnabled" in get["listingInfo"][0]) || get["listingInfo"][0]["bestOfferEnabled"][0] === "") {
            continue;
          } else {
            var bestOfferEnabled = get["listingInfo"][0]["bestOfferEnabled"][0]; //
            if (bestOfferEnabled === "true") {
                bestOfferEnabled = "done";
                var bestOfferEnabledColor = "green";
            } else {
                bestOfferEnabled = "clear";
                var bestOfferEnabledColor = "red";
            }
          }
          if (!("buyItNowAvailable" in get["listingInfo"][0]) || get["listingInfo"][0]["buyItNowAvailable"][0] === "") {
            continue;
          } else {
            var buyItNowAvailable = get["listingInfo"][0]["buyItNowAvailable"][0]; //
            if (buyItNowAvailable === "true") {
                buyItNowAvailable = "done";
                var buyItNowAvailableColor = "green";
            } else {
                buyItNowAvailable = "clear";
                var buyItNowAvailableColor = "red";
            }
          }
          if (!("listingType" in get["listingInfo"][0]) || get["listingInfo"][0]["listingType"][0] === "") {
            continue;
          } else {
            var listingType = get["listingInfo"][0]["listingType"][0];
          }
          if (!("gift" in get["listingInfo"][0]) || get["listingInfo"][0]["gift"][0] === "") {
            continue;
          } else {
            var gift = get["listingInfo"][0]["gift"][0]; //
            if (gift === "true") {
                gift = "done";
                var giftColor = "green";
            } else {
                gift = "clear";
                var giftColor = "red";
            }

          }
          if (!("watchCount" in get["listingInfo"][0]) || get["listingInfo"][0]["watchCount"][0] === "") {
            continue;
          } else {
            var watchCount = get["listingInfo"][0]["watchCount"][0];
            // add the json here
            toClient["totalItem"][counter] = {};
            toClient["totalItem"][counter]["viewItemURL"] = (viewItemURL); // not count
            toClient["totalItem"][counter]["title"] = (title);
            //toClient["totalItem"][counter]["topRatedListing"] = (topRatedListing); // useless
            toClient["totalItem"][counter]["location"] = (location);
            //toClient["totalItem"][counter]["returnsAccepted"] = (returnsAccepted); //useless
            toClient["totalItem"][counter]["categoryName"] = (categoryName);
            toClient["totalItem"][counter]["conditionDisplayName"] = (conditionDisplayName);
            toClient["totalItem"][counter]["convertedCurrentPrice"] = (convertedCurrentPrice);
            toClient["totalItem"][counter]["expeditedShipping"] = (expeditedShipping);
            toClient["totalItem"][counter]["shippingServiceCost"] = (shippingServiceCost);
            toClient["totalItem"][counter]["bestOfferEnabled"] = (bestOfferEnabled);
            toClient["totalItem"][counter]["buyItNowAvailable"] = (buyItNowAvailable);
            toClient["totalItem"][counter]["listingType"] = (listingType);
            toClient["totalItem"][counter]["gift"] = (gift);
            toClient["totalItem"][counter]["watchCount"] = (watchCount);
            // new add 
            toClient["totalItem"][counter]["expeditedColor"] = expeditedColor;
            toClient["totalItem"][counter]["oneDayShippingAvailableColor"] = oneDayShippingAvailableColor;
            toClient["totalItem"][counter]["bestOfferEnabledColor"] = bestOfferEnabledColor;
            toClient["totalItem"][counter]["buyItNowAvailableColor"] = buyItNowAvailableColor;
            toClient["totalItem"][counter]["giftColor"] = giftColor;
            toClient["totalItem"][counter]["shippingType"] = shippingType;
            toClient["totalItem"][counter]["shipToLocations"] = shipToLocations;
            toClient["totalItem"][counter]["oneDayShippingAvailable"] = oneDayShippingAvailable;
            if (!("galleryURL" in get) || get["galleryURL"][0] === "https://thumbs1.ebaystatic.com/pict/04040_0.jpg") {
              toClient["totalItem"][counter]["galleryURL"] = ("https://csci571.com/hw/hw8/images/ebayDefault.png");
            } else {
              toClient["totalItem"][counter]["galleryURL"] = (get["galleryURL"][0]);
            }
          }
          counter++;

        }
        toClient["correctItem"] = counter.toString(10);
        return res.send(toClient);
      }
      
    }
  });
  
});




