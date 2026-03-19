import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

type PlaygroundTab = 'code' | 'response';

interface RuntimeConsole {
	log: (...values: unknown[]) => void;
	warn: (...values: unknown[]) => void;
	error: (...values: unknown[]) => void;
	assert: (condition: unknown, ...values: unknown[]) => void;
}

let editorSequence = 0;

@Component({
	selector: 'app-code-playground',
	imports: [],
	templateUrl: './code-playground.html',
	styleUrl: './code-playground.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePlaygroundComponent {
	readonly title = input('snippet.js');
	readonly ariaLabel = input('Playground de codigo');
	readonly editorLabel = input('Pega tu codigo');
	readonly initialCode = input('');
	readonly emptyResponseText = input('Aun no hay salida. Cambia a la pestana Respuesta o pulsa Ejecutar.');

	readonly activeTab = signal<PlaygroundTab>('code');
	readonly editableCode = signal('');
	readonly response = signal(this.emptyResponseText());
	readonly editorId = `code-playground-editor-${editorSequence++}`;

	constructor() {
		effect(
			() => {
				this.activeTab.set('code');
				this.editableCode.set(this.initialCode());
				this.response.set(this.emptyResponseText());
			},
			{ allowSignalWrites: true }
		);
	}

	selectTab(tab: PlaygroundTab): void {
		this.activeTab.set(tab);
		if (tab === 'response') {
			this.runCode();
		}
	}

	onCodeInput(event: Event): void {
		const target = event.target as HTMLTextAreaElement | null;
		this.editableCode.set(target?.value ?? '');
	}

	runCode(): void {
		const rawCode = this.editableCode().trim();
		if (!rawCode) {
			this.response.set('No hay codigo para ejecutar. Pega un snippet en la pestana Codigo.');
			return;
		}

		const output: string[] = [];
		const runtimeConsole: RuntimeConsole = {
			log: (...values: unknown[]) => output.push(this.formatLogLine('log', values)),
			warn: (...values: unknown[]) => output.push(this.formatLogLine('warn', values)),
			error: (...values: unknown[]) => output.push(this.formatLogLine('error', values)),
			assert: (condition: unknown, ...values: unknown[]) => {
				if (!condition) {
					if (values.length) {
						output.push(this.formatLogLine('assert', values));
						return;
					}

					output.push('[assert] Assertion failed');
				}
			},
		};

		try {
			const executor = new Function('console', `"use strict";\n${rawCode}`) as (consoleProxy: RuntimeConsole) => unknown;
			const returnValue = executor(runtimeConsole);

			if (returnValue !== undefined) {
				output.push(`[return] ${this.formatValue(returnValue)}`);
			}

			this.response.set(output.length ? output.join('\n') : 'Codigo ejecutado sin salida de consola.');
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : String(error);
			this.response.set(`[runtime error] ${message}`);
		}
	}

	private formatLogLine(level: 'log' | 'warn' | 'error' | 'assert', values: unknown[]): string {
		const payload = values.map((value) => this.formatValue(value)).join(' ');
		return `[${level}] ${payload}`.trim();
	}

	private formatValue(value: unknown): string {
		if (typeof value === 'string') {
			return value;
		}

		if (value instanceof Error) {
			return value.message;
		}

		try {
			return JSON.stringify(value, null, 2) ?? String(value);
		} catch {
			return String(value);
		}
	}
}