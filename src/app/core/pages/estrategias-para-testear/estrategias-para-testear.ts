import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodePlaygroundComponent } from '../../../share/components/code-playground/code-playground';

@Component({
  selector: 'app-estrategias-para-testear',
  imports: [CodePlaygroundComponent],
  templateUrl: './estrategias-para-testear.html',
  styleUrl: './estrategias-para-testear.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstrategiasParaTestearPage {
  readonly userFlowSnippet = `function getCheckoutButtonState(cartItems, isSaving) {
  if (isSaving) return 'disabled';
  return cartItems.length > 0 ? 'enabled' : 'disabled';
}

console.assert(
  getCheckoutButtonState([], false) === 'disabled',
  'Sin productos no se puede comprar'
);

console.assert(
  getCheckoutButtonState([{ id: 1 }], false) === 'enabled',
  'Con productos el boton debe activarse'
);

console.assert(
  getCheckoutButtonState([{ id: 1 }], true) === 'disabled',
  'Mientras guarda, el boton debe bloquearse'
);`;

  readonly businessRulesSnippet = `function calculateShipping(total) {
  if (total < 0) throw new Error('total invalido');
  if (total >= 50) return 0;
  return 4.99;
}

console.assert(
  calculateShipping(20) === 4.99,
  'Pedidos pequenos pagan envio'
);

console.assert(
  calculateShipping(75) === 0,
  'A partir de 50 el envio debe ser gratis'
);

let failed = false;
try {
  calculateShipping(-1);
} catch {
  failed = true;
}

console.assert(
  failed === true,
  'Totales invalidos deben fallar'
);`;

  readonly integrationSnippet = `function saveDraft(storage, key, value) {
  storage.setItem(key, value);
  return 'saved';
}

const calls = [];
const fakeStorage = {
  setItem(key, value) {
    calls.push({ key, value });
  }
};

console.assert(
  saveDraft(fakeStorage, 'profile-draft', 'Ana') === 'saved',
  'Debe devolver saved'
);

console.assert(
  calls.length === 1,
  'Debe hablar con la dependencia una sola vez'
);

console.assert(
  calls[0].key === 'profile-draft',
  'Debe enviar la clave correcta'
);

console.assert(
  calls[0].value === 'Ana',
  'Debe enviar el valor correcto'
);`;

  readonly avoidSnippet = `function formatPrice(value) {
  const amount = Number(value);
  return amount.toFixed(2) + ' €';
}

console.assert(
  formatPrice(10) === '10.00 €',
  'Este test si aporta valor: comprueba el resultado final'
);

console.log(
  'Este test no deberia existir: inspeccionar si la funcion usa toFixed internamente seria un detalle de implementacion.'
);

// Evitaríamos algo así:
// console.assert(formatPrice.toString().includes('toFixed'));
`;
}
