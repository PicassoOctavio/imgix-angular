import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';

// services
import { FilterService } from '../services/filterService';
export interface IOperation {
  operationName: string,
  operationValue: number,
}
export interface IOperations{
  operations: IOperation[],
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() image: string = '';
  @Input() url: string = '';
  @Output() urlWithFilters = new EventEmitter<string>();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: any;
  operationsForm: FormGroup;
  operations: any = [];
  saveValueChanges = true;
  historyChanges: any = [];
  historyFuture: any = [];

  constructor(
    private _fb: FormBuilder,
    private service: FilterService,
    private route: ActivatedRoute,
  ) {
    this.operationsForm = this.createArrayOperations(); 
  }

  ngOnInit() {
    this.operations = this.operationsForm.get('operations') as FormArray;
    this.getFilterOptions();
    this.historyListener();
    this.url = `${ this.image }`;
  }

  // -------------- operations functions --------------
  private createArrayOperations(): FormGroup {
    return this._fb.group({
      operations:  this._fb.array([ this.createOperation() ]),
    })
  }

  private createOperation(): FormGroup {
    return this._fb.group({
      operationName: [ '', Validators.required ],
      operationValue: [ 0, Validators.required ]
    })
  }

  addOperation(): void {
    this.operations = this.operationsForm.get('operations') as FormArray;
    this.operations.push(this.createOperation()); 
  }

  deleteOperation( index: number ): void {
    if((<FormArray>this.operationsForm.controls['operations']).controls.length > 1) {
      const filterName = this.operationsForm.controls['operations'].value[index].operationName;
      (<FormArray>this.operationsForm.controls['operations']).controls.splice(index, 1);
      this.operationsForm.value.operations.splice(index, 1);
      this.removeFilterFromUrl( filterName );
    }
  }
  // -------------- end operations functions --------------

  // -------------- history functions --------------
  rollBack(): void {
    if(this.historyChanges?.length > 1) {
      this.saveValueChanges = false;
      this.operationsForm.setValue(this.historyChanges[this.historyChanges.length - 2]);
      this.historyChanges.splice(-1, 1);
      this.saveValueChanges = true;
    } else {
      this.operationsForm.reset();
    }
  }

  reDo(): void {
    if(this.historyChanges.length > 0 && this.historyFuture.length > this.historyChanges.length) {
      this.saveValueChanges = false;
      this.operationsForm.setValue(this.historyFuture[this.historyChanges.length]);
      this.historyChanges.push(this.historyFuture[this.historyChanges.length]);
      this.saveValueChanges = true;
    }
  }

  private historyListener(): void {
    this.operationsForm.valueChanges
    .pipe(
      filter(() => this.saveValueChanges),
      debounceTime(500)
    )
    .subscribe(values => {
      this.historyChanges.push(values);
      this.historyFuture.push(values);
    }
    );
  }
  // -------------- end history functions --------------

  // -------------- filter functions --------------
  private getFilterOptions() {
    this.service.getFilterOptions().subscribe( (data: any) => {
      this.filteredOptions = Object.keys(data.parameters);
      this.getParamsAndAddFilter();
    })
  }
  
  private removeFilterFromUrl( filterName: string ): void {
    const arrUrlOne = this.url.split('?');
    const arrUrlTwo = arrUrlOne[1].split('&');

    arrUrlTwo.forEach( (element, i) => {
      if(element.includes(filterName)){
        arrUrlTwo.splice(i, 1);
      }
    });

    this.url = arrUrlOne[0];
    arrUrlTwo.forEach((e: string, i: number) => {
      if (!this.url.includes('?')){
        this.url += `?${ e }`;
      } else {
        this.url += `&${ e }`;
      }
    });
    this.urlWithFilters.emit(this.url);
  }

  addFilterToImage( index: number ): void {
    const filterName = this.operationsForm.controls['operations'].value[index].operationName;
    const filterValue = this.operationsForm.controls['operations'].value[index].operationValue;
    if (this.url.includes('?')){
      this.url += `&${ filterName }=${ filterValue }`;
    } else {
      this.url += `?${ filterName }=${ filterValue }`;
    }
    this.urlWithFilters.emit(this.url);
  }
  // -------------- end filter functions --------------

  private setUrlWithFilters(): void {
    const controls = <FormArray>this.operationsForm.get('operations');
    controls.value.forEach((control: IOperation, index: number) => {
      if (control.operationName !== '') {
        if (!this.url.includes('?')){
          this.url += `?${ control.operationName }=${ control.operationValue }`;
        } else {
          this.url += `&${ control.operationName }=${ control.operationValue }`;
        }
      }
    });
  }

  private getParamsAndAddFilter(): void {
    this.route.queryParams.subscribe( params => {
      if (this.filteredOptions?.length > 0){
        this.filteredOptions.forEach( (option: string) => {
          if (params[option] !== undefined) {
            this.addParametersToForm( option, params[option] );
          }
        });
        this.setUrlWithFilters();
      }
    });
  }

  private addParametersToForm( option: string, optionValue: string ) {
    const controls = <FormArray>this.operationsForm.get('operations');

    controls.push(
      this._fb.group({
        operationName: [ option, Validators.required ],
        operationValue: [ optionValue, Validators.required ]
      })
    );
  }
  
}
