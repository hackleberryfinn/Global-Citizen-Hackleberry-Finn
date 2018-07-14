/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for gchackfinn-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be gchackfinn-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('gchackfinn-app');
    })
  });

  it('network-name should be global-citizen-hackleberryfinn@0.0.8',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('global-citizen-hackleberryfinn@0.0.8.bna');
    });
  });

  it('navbar-brand should be gchackfinn-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('gchackfinn-app');
    });
  });

  
    it('Cause component should be loadable',() => {
      page.navigateTo('/Cause');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Cause');
      });
    });

    it('Cause table should have 7 columns',() => {
      page.navigateTo('/Cause');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Need component should be loadable',() => {
      page.navigateTo('/Need');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Need');
      });
    });

    it('Need table should have 5 columns',() => {
      page.navigateTo('/Need');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('ProjectPledge component should be loadable',() => {
      page.navigateTo('/ProjectPledge');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProjectPledge');
      });
    });

    it('ProjectPledge table should have 9 columns',() => {
      page.navigateTo('/ProjectPledge');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('GovOrg component should be loadable',() => {
      page.navigateTo('/GovOrg');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('GovOrg');
      });
    });

    it('GovOrg table should have 2 columns',() => {
      page.navigateTo('/GovOrg');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('AidOrg component should be loadable',() => {
      page.navigateTo('/AidOrg');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AidOrg');
      });
    });

    it('AidOrg table should have 2 columns',() => {
      page.navigateTo('/AidOrg');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('GlobalCitizen component should be loadable',() => {
      page.navigateTo('/GlobalCitizen');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('GlobalCitizen');
      });
    });

    it('GlobalCitizen table should have 2 columns',() => {
      page.navigateTo('/GlobalCitizen');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('Community component should be loadable',() => {
      page.navigateTo('/Community');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Community');
      });
    });

    it('Community table should have 2 columns',() => {
      page.navigateTo('/Community');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('Reporter component should be loadable',() => {
      page.navigateTo('/Reporter');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Reporter');
      });
    });

    it('Reporter table should have 2 columns',() => {
      page.navigateTo('/Reporter');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateCause component should be loadable',() => {
      page.navigateTo('/CreateCause');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateCause');
      });
    });
  
    it('UpdateCause component should be loadable',() => {
      page.navigateTo('/UpdateCause');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateCause');
      });
    });
  
    it('CreateNeed component should be loadable',() => {
      page.navigateTo('/CreateNeed');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateNeed');
      });
    });
  
    it('UpdateNeed component should be loadable',() => {
      page.navigateTo('/UpdateNeed');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateNeed');
      });
    });
  
    it('CreateProjectPledge component should be loadable',() => {
      page.navigateTo('/CreateProjectPledge');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateProjectPledge');
      });
    });
  
    it('SendPledgeToGlobalCitizen component should be loadable',() => {
      page.navigateTo('/SendPledgeToGlobalCitizen');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SendPledgeToGlobalCitizen');
      });
    });
  
    it('SendPledgeToGovOrg component should be loadable',() => {
      page.navigateTo('/SendPledgeToGovOrg');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SendPledgeToGovOrg');
      });
    });
  
    it('UpdatePledge component should be loadable',() => {
      page.navigateTo('/UpdatePledge');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdatePledge');
      });
    });
  
    it('TransferFunds component should be loadable',() => {
      page.navigateTo('/TransferFunds');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TransferFunds');
      });
    });
  

});