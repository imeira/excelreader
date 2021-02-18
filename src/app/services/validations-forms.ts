import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requireMinCheckbox(min = 1) {
    return (fromarray: FormArray) => {
      const totalcheckd = fromarray.controls.map(v => v.value).reduce((tot, curr) => curr ? tot + 1 : tot, 0);
      return totalcheckd >= min ? null : { required : true };
    };
  }

  static cepvalidator(control: FormControl) {
    const cep = control.value;
    const validacao = /[0-9]{5}-[0-9]{3}/;
    if (cep && cep !== '') {
      return validacao.test(cep) ? null : { cepinvalid : true };
    }
    return null;
  }

  static equalsTo(other: string) {
    return (control: FormGroup) => {
      const campo1 = control;
      const campo2 = control.root.get(other) as FormControl;

      if (campo2 !== null && campo1 !== null) {
        if (campo1.value !== campo2.value) {
          return { isnotequal: true };
        };
      };
      return null;
    };
  }


}
