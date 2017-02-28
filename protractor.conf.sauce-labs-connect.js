const SauceLabsCapabilities = require("./protractor.sauce-labs-capabilities");

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  // use this if you started the reverse tunnel from saucelabs (saucelabs connect),
  // see https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect+Proxy
  seleniumAddress: 'http://'+process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@localhost:4445/wd/hub',
  baseUrl: 'http://localhost:4200/',

  allScriptsTimeout: 60000,
  getPageTimeout: 60000,

  specs: [
    './dist/out-tsc-e2e/**/*.e2e-spec.js'
  ],

  onPrepare: function(){
      var caps = browser.getCapabilities()
  },

  /**
   * We test against the MINIMUM supported version and BLEEDING EDGE, according to
   * https://angular.io/docs/ts/latest/guide/browser-support.html
   */
  multiCapabilities: SauceLabsCapabilities,

  useAllAngular2AppRoots: true,

  onComplete: function() {
    var printSessionId = function(jobName){
      browser.getSession().then(function(session) {
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
      });
    }
    printSessionId("Tour Of Heroes E2E");
  }
};
