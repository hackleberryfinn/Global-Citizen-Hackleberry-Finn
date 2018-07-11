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

'use strict';
/**
 * Write your transction processor functions here
 */
var NS = 'org.gcchallenge';
/**
 * Sample transaction
 * @param {org.gcchallenge.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.gcchallenge.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.gcchallenge', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
/**
 * createProjectPledge
 * @param {org.gcchallenge.CreateProjectPledge} createProjectPledge
 * @transaction
 */
function createProjectPledge(txParams) {
  if(!txParams.name || (txParams.name && txParams.name === '')) {
    throw new Error('Invalid Pledge Name!!');
  }
  if(!txParams.aidOrg) {
    throw new Error('Invalid Aid Org!!');
  }
  var factory = getFactory();
  var pledge = null;
  return getAssetRegistry(NS + '.ProjectPledge').then(function (registry) {
    pledge = factory.newResource(NS, 'ProjectPledge', txParams.pledgeId);
    pledge.name = txParams.name;
    pledge.decription = txParams.decription;
    pledge.fundsRequired = txParams.fundsRequired;
    pledge.status = 'INITIALSTATE';
    pledge.funds = [];
    pledge.aidOrg = txParams.aidOrg;
    return registry.add(pledge);
  }).then(function () {
    return getParticipantRegistry(NS + '.AidOrg');
  }).then(function (aidOrgRegistry) {
    // save the buyer
    txParams.aidOrg.projectPledge.push(pledge);
    return aidOrgRegistry.update(txParams.aidOrg);
  });
}
/**
 * SendPledgeToGlobalCitizen
 * @param {org.gcchallenge.SendPledgeToGlobalCitizen} sendPledgeToGlobalCitizen
 * @transaction
 */
function sendPledgeToGlobalCitizen(txParams) {
  if(!txParams.citizenId || !txParams.pledgeId) {
    throw new Error('Invalid input parameters!!');
  }
  txParams.pledgeId.status = 'GLOBALCITIZENREVIEW';
  txParams.citizenId.projectPledge.push(txParams.pledgeId);
  var factory = getFactory();
  return getAssetRegistry(NS + '.ProjectPledge').then(function (registry) {
    return registry.update(txParams.pledgeId);
  }).then(function () {
    return getParticipantRegistry(NS + '.GlobalCitizen');
  }).then(function (registry) {
    return registry.update(txParams.citizenId);
  });
}
/**
 * SendPledgeToGovOrg
 * @param {org.gcchallenge.SendPledgeToGovOrg} sendPledgeToGovOrg
 * @transaction
 */
function sendPledgeToGovOrg(txParams) {
  if(!txParams.pledgeId || !txParams.govOrg || (txParams.govOrg && txParams.govOrg.length === 0)) {
    throw new Error('Invalid input parameters!!');
  }
  var factory = getFactory();
  txParams.pledgeId.status = 'GOVORGREVIEW';
  return getAssetRegistry(NS + '.ProjectPledge').then(function (registry) {
    return registry.update(txParams.pledgeId);
  }).then(function () {
    return getParticipantRegistry(NS + '.GovOrg');
  }).then(function (registry) {
    for(var i = 0; i < txParams.govOrg.length; i++) {
      txParams.govOrg[i].projectPledge.push(txParams.pledgeId);
    }
    return registry.updateAll(txParams.govOrg);
  });
}
/**
 * UpdatePledge
 * @param {org.gcchallenge.UpdatePledge} updatePledge
 * @transaction
 */
function updatePledge(txParams) {
  if(!txParams.govOrgId) {
    throw new Error('Invalid user type!!');
  }
  var factory = getFactory();
  var funding = factory.newConcept(NS, 'Funding');
  var daysToAdd = 0;
  switch(txParams.fundingType) {
  case 'WEEKLY':
    daysToAdd = 7;
    break;
  case 'MONTHLY':
    daysToAdd = 30;
    break;
  case 'SEMIANNUALY':
    daysToAdd = 180;
    break;
  case 'ANNUALY':
    daysToAdd = 365;
    break;
  }
  funding.fundingType = txParams.fundingType;
  funding.nextFundingDueInDays = daysToAdd;
  funding.approvedFunding = txParams.approvedFunding;
  funding.totalFundsReceived = 0;
  funding.fundsPerInstallment = txParams.fundsPerInstallment;
  funding.govOrgId = txParams.govOrgId;
  txParams.pledgeId.status = 'PROPOSALFUNDED';
  txParams.pledgeId.funds.push(funding);
  txParams.govOrgId.fundedPledges.push(txParams.pledgeId);
  return getAssetRegistry(NS + '.ProjectPledge').then(function (registry) {
    return registry.update(txParams.pledgeId);
  }).then(function () {
    return getParticipantRegistry(NS + '.GovOrg');
  }).then(function (registry) {
    return registry.update(txParams.govOrgId);
  });
}
/**
 * TransferFunds
 * @param {org.gcchallenge.TransferFunds} transferFunds
 * @transaction
 */
function transferFunds(txParams) {
  if(!txParams.pledgeId || !txParams.govOrgId) {
    throw new Error('Invalid input parameters!!');
  }
  var factory = getFactory();
  var valid = false;
  for(var i = 0; i < txParams.govOrgId.fundedPledges.length; i++) {
    if(txParams.govOrgId.fundedPledges[i].pledgeId === txParams.pledgeId.pledgeId) {
      valid = true;
      break;
    }
  }
  if(!valid) {
    throw new Error('Pledge not funded!!');
  }
  for(var j = 0; j < txParams.pledgeId.funds.length; j++) {
    if(txParams.pledgeId.funds[j].govOrgId === txParams.govOrgId) {
      var daysToAdd = 0;
      switch(txParams.pledgeId.funds[j].fundingType) {
      case 'WEEKLY':
        daysToAdd = 7;
        break;
      case 'MONTHLY':
        daysToAdd = 30;
        break;
      case 'SEMIANNUALY':
        daysToAdd = 180;
        break;
      case 'ANNUALY':
        daysToAdd = 365;
        break;
      }
      txParams.pledgeId.funds[j].nextFundingDueInDays = daysToAdd;
      txParams.pledgeId.funds[j].totalFundsReceived += txParams.pledgeId.funds[j].fundsPerInstallment;
      break;
    }
  }
  return getAssetRegistry(NS + '.ProjectPledge').then(function (registry) {
    return registry.update(txParams.pledgeId);
  });
}