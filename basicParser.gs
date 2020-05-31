function parser(){
  var stockLst = ['nasdaq-fb', 'nasdaq-aapl', 'nasdaq-amzn', 'nasdaq-nflx', 'nasdaq-goog']
  var output = {}
  for(i in stockLst){
    var url = 'https://www.webull.com/quote/' + stockLst[i];
    var xml = UrlFetchApp.fetch(url).getContentText();
    var xmlTickerRT = xml.match(/tickerRT:([\s\S]*?)}/g)[0].replace('tickerRT:', '')
    var tickerRTJSON = JSON.parse(xmlTickerRT.replace(/:-*\./g, ':0.').replace(/{([\s\S]*?):/g, '{"\$1\":').replace(/,([a-zA-z0-9]*?):/g, ',"\$1\":'));
    output[tickerRTJSON.symbol] = tickerRTJSON
  }
  // Mailer
  var title = "美股分析早報";
  var email = "adrianwu8516@gmail.com"
  var htmlTemp = HtmlService.createTemplateFromFile('dailyEmail')
  htmlTemp.stockInfo = output
  var htmlBody = htmlTemp.evaluate().getContent();
  MailApp.sendEmail(email, title, '', {htmlBody:htmlBody})
}