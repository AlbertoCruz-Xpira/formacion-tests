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
  selector: 'app-ejercicio-1',
  imports: [ReactiveFormsModule],
  templateUrl: './ejercicio-1.html',
  styleUrl: './ejercicio-1.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ejercicio1Page {
  private readonly formBuilder = inject(FormBuilder);

  readonly questions: readonly QuizQuestion[] = [
    {
      id: 'question1',
      title: 'Pregunta 1',
      prompt: '¿Qué intenta comprobar un test unitario?',
      options: [
        { value: 'a', label: 'Que una unidad pequeña de código se comporta como se espera.' },
        { value: 'b', label: 'Que toda la aplicación funciona al completo en producción.' },
        { value: 'c', label: 'Que el diseño visual se ve igual en todos los navegadores.' },
      ],
      correctAnswer: 'a',
    },
    {
      id: 'question2',
      title: 'Pregunta 2',
      prompt: '¿Qué papel tiene una aserción dentro de un test?',
      options: [
        { value: 'a', label: 'Compilar el archivo antes de ejecutarlo.' },
        { value: 'b', label: 'Verificar si el resultado coincide con lo esperado.' },
        { value: 'c', label: 'Transformar automáticamente el código en una función.' },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'question3',
      title: 'Pregunta 3',
      prompt: '¿Qué patrón se suele seguir al escribir un test unitario?',
      options: [
        { value: 'a', label: 'Open-Close-Loop' },
        { value: 'b', label: 'Fetch-Render-Deploy' },
        { value: 'c', label: 'Arrange-Act-Assert' },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'question4',
      title: 'Pregunta 4',
      prompt: '¿Por qué los tests unitarios ayudan durante una refactorización?',
      options: [
        { value: 'a', label: 'Porque garantizan que la aplicación será más rápida.' },
        { value: 'b', label: 'Porque permiten comprobar si el comportamiento sigue siendo correcto tras cambiar el código.' },
        { value: 'c', label: 'Porque sustituyen por completo a las pruebas manuales.' },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'question5',
      title: 'Pregunta 5',
      prompt: 'Mira este fragmento: ¿qué está validando la aserción?',
      codeExample: `function isEven(value) {
  return value % 2 === 0;
}

console.assert(isEven(4) === true, '4 debería ser par');`,
      options: [
        { value: 'a', label: 'Que 4 es un número par.' },
        { value: 'b', label: 'Que 4 es mayor que 10.' },
        { value: 'c', label: 'Que la función devuelve siempre false.' },
      ],
      correctAnswer: 'a',
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