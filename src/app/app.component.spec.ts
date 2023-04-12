import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent, Operator } from './app.component';

describe('FilterPanelComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('getNumber() should get correct number from input', () => {
    component.getNumber('0')
    component.getNumber('1')
    component.getNumber('2')
    component.getNumber('3')
    expect(component.currentNumber).toBe('123')
  })

  it('addDecimal() should add decimal to number', () => {
    component.getNumber('1')
    component.addDecimal()
    component.getNumber('5')
    expect(component.currentNumber).toBe('1.5')
  })

  it('doCalculation() should do the correct calculation based on firstOperand, secondOperand and operator', () => {
    component.firstOperand = 10
    expect(component.doCalculation(Operator.Add, 10)).toEqual(20)
    component.firstOperand = 10
    expect(component.doCalculation(Operator.Subtract, 10)).toEqual(0)
    component.firstOperand = 10
    expect(component.doCalculation(Operator.Multiply, 10)).toEqual(100)
    component.firstOperand = 10
    expect(component.doCalculation(Operator.Divide, 10)).toEqual(1)
  })

  it('doCalculation() should return null if no firstOperand', () => {
    expect(component.firstOperand).toBeNull()
    expect(component.doCalculation(Operator.Add, 10)).toBeNull()
  })

  it('getOperation() should get operator and pause for second operand', () => {
    component.getNumber('1')
    expect(component.firstOperand).toBeNull()
    component.getOperation(Operator.Add)
    expect(component.firstOperand).toBeDefined()
    expect(component.operator).toBe(Operator.Add)
    expect(component.pauseForSecondNumber).toBeTrue()
  })

  it('getOperation() should call doCalculation()', () => {
    spyOn(component, 'doCalculation')
    component.getNumber('1')
    component.getOperation(Operator.Add)
    component.getNumber('1')
    component.getOperation(Operator.Equals)
    expect(component.doCalculation).toHaveBeenCalled()
  })

  it('clear() should clear the calculator', () => {
    component.currentNumber = '123456'
    component.clear()
    expect(component.currentNumber).toBe('0')
    expect(component.firstOperand).toBeNull()
    expect(component.operator).toBeNull()
    expect(component.pauseForSecondNumber).toBeFalse()
  })

  it('should chain operations correctly', () => {
    component.firstOperand = 10
    expect(component.doCalculation(Operator.Add, 10)).toEqual(20)
    expect(component.doCalculation(Operator.Subtract, 10)).toEqual(10)
    expect(component.doCalculation(Operator.Multiply, 10)).toEqual(100)
    expect(component.doCalculation(Operator.Divide, 10)).toEqual(10)
  })
  
});
