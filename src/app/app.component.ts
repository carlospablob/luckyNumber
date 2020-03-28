import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formLucky: FormGroup;

  numLucky: number;

  constructor(
    private fb: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    // Se crea un formulario para asociar al campos mas sus validaciones
    this.formLucky = this.fb.group({
      number: [null, [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(16),
        Validators.pattern(`^[0-9]+$`),
      ]]
    });
  }

  getNumberLucky() {
    // Se crea un arreglo apartir del string ingresado
    const arrayNumbers = this.formLucky.get('number').value.split('');
    let sum = 0;
    let num = 0;
    let total = 0;

    // Se obtiene arreglo de valores unicos
    const unique = arrayNumbers.filter((elem, index, self) =>  {
      return index === self.indexOf(elem);
    });

    // Se recorre valores unicos
    for(let cont = 0; cont < unique.length; cont++) {
      // Se recorre los valores del arreglo inicial
      for(let cont2 = 0; cont2 < arrayNumbers.length; cont2++) {
        // Se calcula el total de veces que aparece el numero
        if (arrayNumbers[cont2] === unique[cont]) {
          sum = sum + 1;
        }
      }
      // Se verifica si la suma actual es mayor al total almacenado, si es mayor se sustituye
      if (total < sum) {
        total = sum;
        num = unique[cont];
      }
      // Se resetea el valor de veces que aparece el numero
      sum = 0;
    }
    console.log('Numero que mas se repite', num);
    console.log('Numero de veces que se repite', total);

    this.numLucky = num;
  }
}
