import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

type QuestionId = 'question1' | 'question2' | 'question3' | 'question4' | 'question5';
type OptionValue = 'a' | 'b' | 'c';

interface QuizOption {
  value: OptionValue;
  label: string;
}

interface QuizQuestion {
  id: QuestionId;
  title: string;
  prompt: string;
  options: readonly QuizOption[];
  correctAnswer: OptionValue;
  codeExample?: string;
}

@Component({
  selector: 'app-ejercicio-3',
  imports: [ReactiveFormsModule],
  templateUrl: './ejercicio-3.html',
  styleUrl: './ejercicio-3.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ejercicio3Page {
  private readonly formBuilder = inject(FormBuilder);

  readonly questions: readonly QuizQuestion[] = [
    {
      id: 'question1',
      title: 'Pregunta 1',
      prompt: '¿Para qué se usa describe en Jasmine?',
      options: [
        { value: 'a', label: 'Para agrupar casos de prueba relacionados.' },
        { value: 'b', label: 'Para ejecutar peticiones HTTP reales.' },
        { value: 'c', label: 'Para reemplazar expect en todas las pruebas.' },
      ],
      correctAnswer: 'a',
    },
    {
      id: 'question2',
      title: 'Pregunta 2',
      prompt: '¿Qué está comprobando este test?',
      codeExample: `function isAdult(age) {
  return age >= 18;
}

expect(isAdult(20)).toBeTrue();`,
      options: [
        { value: 'a', label: 'Que isAdult devuelve true para 20.' },
        { value: 'b', label: 'Que age siempre es 20 en toda la aplicación.' },
        { value: 'c', label: 'Que la función lanza un error si age es menor de 18.' },
      ],
      correctAnswer: 'a',
    },
    {
      id: 'question3',
      title: 'Pregunta 3',
      prompt: '¿Qué pasará con este test?',
      codeExample: `const user = { id: 1 };
expect(user).toBe({ id: 1 });`,
      options: [
        { value: 'a', label: 'Pasa, porque ambos objetos tienen el mismo contenido.' },
        { value: 'b', label: 'Falla, porque toBe compara referencia estricta en objetos.' },
        { value: 'c', label: 'Pasa solo si user.id es un número par.' },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'question4',
      title: 'Pregunta 4',
      prompt: '¿Qué matcher elegirías para comprobar que un array contiene "premium"?',
      options: [
        { value: 'a', label: 'toBe' },
        { value: 'b', label: 'toEqual' },
        { value: 'c', label: 'toContain' },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'question5',
      title: 'Pregunta 5 (más completa)',
      prompt: '¿Qué descripción representa mejor lo que validan estos tests?',
      codeExample: `describe('cart summary', () => {
  function total(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  it('calcula total', () => {
    expect(total([{ price: 10 }, { price: 20 }])).toBe(30);
  });

  it('el total es mayor que cero', () => {
    expect(total([{ price: 10 }])).toBeGreaterThan(0);
  });

  it('las etiquetas no incluyen vip', () => {
    expect(['new', 'basic']).not.toContain('vip');
  });
});`,
      options: [
        { value: 'a', label: 'Solo valida formato de variables y nombres internos.' },
        { value: 'b', label: 'Valida comportamiento real: resultado numérico, rango y contenido esperado.' },
        { value: 'c', label: 'Valida integración con APIs externas.' },
      ],
      correctAnswer: 'b',
    },
  ];

  readonly quizForm = this.formBuilder.nonNullable.group({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  readonly submitted = signal(false);
  readonly correctAnswers = signal(0);
  readonly resultText = computed(() => {
    if (!this.submitted()) {
      return '';
    }

    return `Has respondido correctamente ${this.correctAnswers()} de ${this.questions.length} preguntas.`;
  });

  submitQuiz(): void {
    const answers = this.quizForm.getRawValue();

    const score = this.questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    this.correctAnswers.set(score);
    this.submitted.set(true);
  }
}