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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CauseService } from './Cause.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cause',
  templateUrl: './Cause.component.html',
  styleUrls: ['./Cause.component.css'],
  providers: [CauseService]
})
export class CauseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  causeId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  closed = new FormControl('', Validators.required);
  deleted = new FormControl('', Validators.required);
  citizenId = new FormControl('', Validators.required);

  constructor(public serviceCause: CauseService, fb: FormBuilder) {
    this.myForm = fb.group({
      causeId: this.causeId,
      name: this.name,
      description: this.description,
      closed: this.closed,
      deleted: this.deleted,
      citizenId: this.citizenId
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCause.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.gcchallenge.Cause',
      'causeId': this.causeId.value,
      'name': this.name.value,
      'description': this.description.value,
      'closed': this.closed.value,
      'deleted': this.deleted.value,
      'citizenId': this.citizenId.value
    };

    this.myForm.setValue({
      'causeId': null,
      'name': null,
      'description': null,
      'closed': null,
      'deleted': null,
      'citizenId': null
    });

    return this.serviceCause.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'causeId': null,
        'name': null,
        'description': null,
        'closed': null,
        'deleted': null,
        'citizenId': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.gcchallenge.Cause',
      'name': this.name.value,
      'description': this.description.value,
      'closed': this.closed.value,
      'deleted': this.deleted.value,
      'citizenId': this.citizenId.value
    };

    return this.serviceCause.updateAsset(form.get('causeId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCause.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCause.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'causeId': null,
        'name': null,
        'description': null,
        'closed': null,
        'deleted': null,
        'citizenId': null
      };

      if (result.causeId) {
        formObject.causeId = result.causeId;
      } else {
        formObject.causeId = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.closed) {
        formObject.closed = result.closed;
      } else {
        formObject.closed = null;
      }

      if (result.deleted) {
        formObject.deleted = result.deleted;
      } else {
        formObject.deleted = null;
      }

      if (result.citizenId) {
        formObject.citizenId = result.citizenId;
      } else {
        formObject.citizenId = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'causeId': null,
      'name': null,
      'description': null,
      'closed': null,
      'deleted': null,
      'citizenId': null
      });
  }

}
