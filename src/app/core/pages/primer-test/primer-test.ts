import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodePlaygroundComponent } from '../../../share/components/code-playground/code-playground';

@Component({
  selector: 'app-primer-test',
  imports: [CodePlaygroundComponent],
  templateUrl: './primer-test.html',
  styleUrl: './primer-test.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimerTest {
  readonly emailValidatorSnippet = `function isValidEmail(email) {
  return email.includes('@');
}

console.assert(
  isValidEmail('user@mail.com') === true,
  'El campo email debe contener @'
);

console.assert(
  isValidEmail('user.mail.com') === false,
  'El campo email debe contener @'
);`;

  readonly businessLogicSnippet = `function parseDiscountInput(rawDiscount) {
  if (typeof rawDiscount === 'number') {
    return rawDiscount > 1 ? rawDiscount / 100 : rawDiscount;
  }

  if (typeof rawDiscount !== 'string') return null;

  const normalized = rawDiscount.trim().replace('%', '');
  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) return null;

  return rawDiscount.includes('%') || parsed > 1 ? parsed / 100 : parsed;
}

function applyDiscount(price, rawDiscount) {
  const discount = parseDiscountInput(rawDiscount);

  if (typeof price !== 'number' || Number.isNaN(price)) {
    throw new Error('price invalido');
  }

  if (discount === null || discount < 0 || discount > 1) {
    throw new Error('discount invalido');
  }

  return price - price * discount;
}

console.assert(
  applyDiscount(100, 0.2) === 80,
  'Debe aplicar correctamente un 20% en formato decimal'
);

console.assert(
  applyDiscount(100, '20%') === 80,
  'Debe aceptar descuento en formato de formulario (string con %)'
);

console.assert(
  applyDiscount(100, 20) === 80,
  'Debe aceptar 20 como porcentaje entero y normalizarlo'
);

let failed = false;
try {
  applyDiscount(100, 'abc');
} catch {
  failed = true;
}

console.assert(
  failed === true,
  'Debe rechazar descuentos en formato invalido'
);`;

  readonly edgeCasesSnippet = `function getUserDisplayName(user) {
  if (!user) return 'Anonymous';
  return user.name;
}

console.assert(
  getUserDisplayName({ name: 'Ana' }) === 'Ana',
  'Debe devolver el nombre del usuario'
);

console.assert(
  getUserDisplayName(null) === 'Anonymous',
  'Debe devolver Anonymous si no hay usuario'
);`;

  readonly bugHuntingSnippet = `function removeItem(list, item) {
  const index = list.indexOf(item);
  list.splice(index, 1);
  return list;
}

console.assert(
  JSON.stringify(removeItem(['a', 'b', 'c'], 'b')) === JSON.stringify(['a', 'c']),
  'Debe eliminar el elemento correcto'
);

console.assert(
  JSON.stringify(removeItem(['a', 'b', 'c'], 'x')) === JSON.stringify(['a', 'b', 'c']),
  'No deberia cambiar la lista si el elemento no existe'
);`;
}
