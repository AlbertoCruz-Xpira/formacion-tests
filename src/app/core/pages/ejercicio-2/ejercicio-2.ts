import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

type QuestionId = 'question1' | 'question2' | 'question3' | 'question4' | 'question5' | 'question6';
type OptionValue = 'a' | 'b' | 'c' | 'd';

interface ExerciseOption {
  value: OptionValue;
  label: string;
}

interface ExerciseQuestion {
  id: QuestionId;
  title: string;
  prompt: string;
  correctAnswer: OptionValue;
}

@Component({
  selector: 'app-ejercicio-2',
  imports: [ReactiveFormsModule],
  templateUrl: './ejercicio-2.html',
  styleUrl: './ejercicio-2.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ejercicio2Page {
  private readonly formBuilder = inject(FormBuilder);

  readonly challengeScript = `function checkout(cart, gateway, storage) {
  if (!cart.length) {
    return { status: 'empty', total: 0 };
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  storage.setItem('last-total', String(total));
  gateway.charge(total);

  return { status: 'paid', total };
}`;

  readonly classificationOptions: readonly ExerciseOption[] = [
    { value: 'a', label: 'Se queda: funcionalidad' },
    { value: 'b', label: 'Se queda: comportamiento o caso límite' },
    { value: 'c', label: 'Se queda: integración con dependencia' },
    { value: 'd', label: 'Se quita: detalle interno o test frágil' },
  ];

  readonly questions: readonly ExerciseQuestion[] = [
    {
      id: 'question1',
      title: 'Test propuesto 1',
      prompt: 'Verifica que con dos productos de 10 y 15 el checkout devuelve total 25.',
      correctAnswer: 'a',
    },
    {
      id: 'question2',
      title: 'Test propuesto 2',
      prompt: 'Verifica que si el carrito está vacío devuelve status empty y total 0.',
      correctAnswer: 'b',
    },
    {
      id: 'question3',
      title: 'Test propuesto 3',
      prompt: 'Verifica que llama a gateway.charge(total) con el importe calculado.',
      correctAnswer: 'c',
    },
    {
      id: 'question4',
      title: 'Test propuesto 4',
      prompt: 'Verifica que guarda last-total en storage.',
      correctAnswer: 'c',
    },
    {
      id: 'question5',
      title: 'Test propuesto 5',
      prompt: 'Verifica que internamente usa reduce para calcular el total.',
      correctAnswer: 'd',
    },
    {
      id: 'question6',
      title: 'Test propuesto 6',
      prompt: 'Verifica que el test falle si mañana cambiamos el nombre de la variable total.',
      correctAnswer: 'd',
    },
  ];

  readonly quizForm = this.formBuilder.nonNullable.group({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
  });

  readonly submitted = signal(false);
  readonly correctAnswers = signal(0);
  readonly resultText = computed(() => {
    if (!this.submitted()) {
      return '';
    }

    return `Has clasificado correctamente ${this.correctAnswers()} de ${this.questions.length} tests.`;
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