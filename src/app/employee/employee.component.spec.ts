import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      directReports: [2]
    };
    expect(comp).toBeTruthy();
    
  }));

  it('should emit direct report - delete', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      directReports: [2]
    };

    comp.directReports = [
      {
        id: 2,
        firstName: 'first - Report',
        lastName: 'last - Report',
        position: 'jobTitle - Report',
      }
    ]

    expect(comp).toBeTruthy();
    
    spyOn(comp.deleteEmployee, 'emit');

    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#delete');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(comp.deleteEmployee.emit).toHaveBeenCalledWith(comp.directReports[0]);

  }));


  it('should emit direct report - update', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      directReports: [2]
    };

    comp.directReports = [
      {
        id: 2,
        firstName: 'first - Report',
        lastName: 'last - Report',
        position: 'jobTitle - Report',
      }
    ]

    expect(comp).toBeTruthy();
    
    spyOn(comp.updateEmployee, 'emit');
    
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#edit');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(comp.updateEmployee.emit).toHaveBeenCalledWith(comp.directReports[0]);

  }));
});
