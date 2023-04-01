import { FormControl } from "@angular/forms";

export function isMatchPassword() {
    return (c: FormControl) => {
        if (!c.parent || c.value === c.parent.value.password) {
            return null;
        }

        return { invalid: true };
    }
}