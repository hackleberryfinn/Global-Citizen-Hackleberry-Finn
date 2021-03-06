import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.gcchallenge{
   export enum Cluster {
      GIRLSANDWOMEN,
      HEALTH,
      EDUCATION,
      FINANCEANDINNOVATION,
      FOODANDHUNGER,
      WATERANDSANITATION,
      ENVIRONMENT,
      CITIZENSHIP,
   }
   export enum Status {
      INITIALSTATE,
      GLOBALCITIZENREVIEW,
      GOVORGREVIEW,
      PROPOSALFUNDED,
   }
   export enum FundingType {
      WEEKLY,
      MONTHLY,
      SEMIANNUALY,
      ANNUALY,
   }
   export enum FundingStatus {
      COMPLETE,
      INCOMPLETE,
   }
   export enum MessageStatus {
      NOTREVIEWED,
      REVIEWED,
   }
   export class Funding {
      fundingType: FundingType;
      nextFundingDueInDays: number;
      approvedFunding: number;
      totalFundsReceived: number;
      fundsPerInstallment: number;
      govOrgId: GovOrg;
   }
   export class Cause extends Asset {
      causeId: string;
      name: string;
      description: string;
      closed: boolean;
      deleted: boolean;
      citizenId: GlobalCitizen;
   }
   export class Need extends Asset {
      needId: string;
      description: string;
      causeId: Cause;
      community: Community;
   }
   export class ProjectPledge extends Asset {
      pledgeId: string;
      name: string;
      decription: string;
      fundsRequired: number;
      status: Status;
      clusterId: Cluster;
      aidOrg: AidOrg;
      needId: Need;
   }
   export abstract class User extends Participant {
   }
   export class GovOrg extends User {
      govOrgId: string;
   }
   export class AidOrg extends User {
      aidOrgId: string;
   }
   export class GlobalCitizen extends Participant {
      citizenId: string;
   }
   export class Community extends Participant {
      communityId: string;
   }
   export class Reporter extends User {
      reporterId: string;
   }
   export class CreateProjectPledge extends Transaction {
      pledgeId: string;
      name: string;
      decription: string;
      fundsRequired: number;
      aidOrg: AidOrg;
      needId: Need;
   }
   export class SendPledgeToGlobalCitizen extends Transaction {
      citizenId: GlobalCitizen;
      pledgeId: ProjectPledge;
   }
   export class SendPledgeToGovOrg extends Transaction {
      govOrg: GovOrg[];
      pledgeId: ProjectPledge;
   }
   export class UpdatePledge extends Transaction {
      govOrgId: GovOrg;
      pledgeId: ProjectPledge;
      fundingType: FundingType;
      approvedFunding: number;
      fundsPerInstallment: number;
   }
   export class TransferFunds extends Transaction {
      govOrgId: GovOrg;
      pledgeId: ProjectPledge;
   }
// }
