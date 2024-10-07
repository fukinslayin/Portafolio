import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormService {
  private forms: { [key: string]: FormGroup } = {};
  private formTouched: { [key: string]: boolean } = {};

  public registerForm(formName: string, form: FormGroup) {
    if (form instanceof FormGroup) {
      this.forms[formName] = form;
      form.valueChanges.subscribe(() => {
        this.formTouched[formName] = true;
      });
    }
  }

  isFormIncomplete(): boolean {
    return Object.keys(this.forms).some(
      (formName) =>
        this.formTouched[formName] &&
        Object.values(this.forms[formName].controls).some(
          (control) => control.value === ''
        )
    );
  }
}
