import { Component } from '@angular/core';

export enum Operator {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Equals = '='
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  currentNumber: string = '0';
  firstOperand: number | null = null;
  operator: Operator | null = null;
  pauseForSecondNumber: boolean = false;

  get Operator() {
    return Operator
  }

  getNumber(number: string): void {
    if (this.pauseForSecondNumber) {
      this.currentNumber = number;
      this.pauseForSecondNumber = false;
    } else {
      this.currentNumber === '0'
        ? (this.currentNumber = number)
        : (this.currentNumber += number);
    }
  }

  addDecimal(): void {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  doCalculation(operator: Operator, secondOperand: number): number | null {
    if (!this.firstOperand) {
      return null;
    }
    switch (operator) {
      case Operator.Add:
        return (this.firstOperand += secondOperand);
      case Operator.Subtract:
        return (this.firstOperand -= secondOperand);
      case Operator.Multiply:
        return (this.firstOperand *= secondOperand);
      case Operator.Divide:
        return (this.firstOperand /= secondOperand);
      case Operator.Equals:
        return secondOperand;
    }
  }

  getOperation(operator: Operator): void {
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(
        this.operator,
        Number(this.currentNumber)
      );
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = operator;
    this.pauseForSecondNumber = true;
  }

  clear(): void {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.pauseForSecondNumber = false;
  }
}
