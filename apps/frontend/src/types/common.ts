/**
 * Estado de carga para operaciones asíncronas
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Error estándar de API
 */
export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
}

/**
 * Estado asíncrono genérico con discriminated union.
 * Permite a TypeScript estrechar tipos automáticamente en los componentes.
 *
 * @example
 * const [state, setState] = useState<AsyncState<Animal[]>>({ status: 'idle' });
 * if (state.status === 'success') state.data; // TypeScript sabe que data existe
 */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: ApiError };
