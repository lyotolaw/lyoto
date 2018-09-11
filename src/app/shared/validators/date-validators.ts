import { AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

export class DateValidators {
  /**
   * Définition du validateur de dates
   * @param beginField Date de début dans un formulaire
   * @param endField Date de fin dans un formulaire
   * @param validatorField Contrôle sur lequel le validateur est exécuté
   */
  public static dateLessThan(
      beginField: string,
      endField: string,
      validatorField: { [key: string]: boolean }): ValidatorFn
  {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const begin = c.get(beginField).value;
        const end = c.get(endField).value;
        if ((begin !== null && end !== null) && begin > end) {
            return validatorField;
        }
        return null;
    };
}
}
