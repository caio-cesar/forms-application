import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';

export function validateCPF(control: AbstractControl) {

  return (TestaCPF(control.value) ? null :
  {
    validateCPF: {
      valid: false
    }
  });
}

function TestaCPF(strCPF: string) {

  if (! strCPF || (! strCPF.trim())) {
    return false;
  }

  strCPF = strCPF.trim().replace(/\D/g, '');

  if (strCPF.length !== 11) {
    return false;
  }

  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF === '00000000000') { return false; }

  for (let i = 1; i <= 9; i++) {
    // tslint:disable-next-line:radix
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) { Resto = 0; }

  // tslint:disable-next-line:radix
  if (Resto !== parseInt(strCPF.substring(9, 10))) { return false; }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    // tslint:disable-next-line:radix
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
  // tslint:disable-next-line:radix
  if (Resto !== parseInt(strCPF.substring(10, 11))) { return false; }

  return true;
}

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  public _pessoaGroup: FormGroup;
  public _dadosPrincipais: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this._dadosPrincipais = this._formBuilder.group({
      'nome': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'cpf': new FormControl('', [Validators.required, validateCPF]),
      'rg': new FormControl('', Validators.required)
    });

    this._pessoaGroup = this._formBuilder.group({
      dadosPrincipais: this._dadosPrincipais
    });

  }

get nome() { return this._dadosPrincipais.get('nome'); }

get cpf() { return this._dadosPrincipais.get('cpf'); }

get rg() { return this._dadosPrincipais.get('rg'); }
}

