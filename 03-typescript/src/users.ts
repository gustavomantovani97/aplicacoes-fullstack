/**
 * Desafio 3 - TypeScript
 * Tipagem estrita de coleções, filtros específicos e funções genéricas.
 */

/**
 * Interface que modela a entidade de Usuário.
 * Definida com propriedades readonly para garantir imutabilidade e previsibilidade.
 */
export interface User {
  readonly id: number;
  readonly name: string;
  readonly age: number;
}

/**
 * Array de usuários base fornecido no enunciado do desafio.
 */
export const users: readonly User[] = [
  { id: 1, name: 'Ana', age: 25 },
  { id: 2, name: 'Pedro', age: 30 },
  { id: 3, name: 'Maria', age: 22 },
];

/**
 * 1 e 2. Função específica do desafio:
 * Recebe o array tipado de usuários e retorna apenas os nomes daqueles
 * com idade estritamente maior que 23 anos (age > 23).
 *
 * @param userList Lista tipada de usuários
 * @returns Array com os nomes (string[]) dos usuários com mais de 23 anos
 */
export function getUserNamesOlderThan23(userList: readonly User[]): string[] {
  return userList
    .filter((user) => user.age > 23)
    .map((user) => user.name);
}

/**
 * 3. Bônus - Utility Type Mapeado:
 * Extrai exclusivamente as chaves de T cujo valor associado é do tipo number.
 * Qualquer chave não numérica é mapeada para never e descartada na união de chaves.
 */
export type NumericKeys<T> = {
  [K in keyof T]-?: T[K] extends number ? K : never;
}[keyof T];

/**
 * 3. Bônus - Função Genérica:
 * Filtra qualquer coleção de objetos por qualquer campo estritamente numérico.
 * Caso o consumidor passe um campo textual (como 'name'), o TypeScript emite
 * erro imediato em tempo de compilação, prevenindo falhas em runtime.
 *
 * @template T Tipo do objeto contido na coleção
 * @template K Chave restrita exclusivamente a campos numéricos de T (NumericKeys<T>)
 * @param items Coleção genérica de objetos
 * @param key Campo numérico pelo qual filtrar
 * @param threshold Valor numérico de corte (estritamente maior que threshold)
 * @returns Nova lista contendo apenas os objetos que atendem ao critério
 */
export function filterByNumericField<T, K extends NumericKeys<T>>(
  items: readonly T[],
  key: K,
  threshold: number
): T[] {
  return items.filter((item) => {
    const value = item[key];
    return typeof value === 'number' && value > threshold;
  });
}

/**
 * 3. Bônus Complementar - Filtro e Projeção Genérica:
 * Combina a filtragem por campo numérico com a projeção (pluck) de uma propriedade arbitrária.
 *
 * @template T Tipo do objeto
 * @template KNum Campo numérico de corte
 * @template KPluck Campo a ser projetado/extraído no retorno
 */
export function filterAndPluckByNumericField<
  T,
  KNum extends NumericKeys<T>,
  KPluck extends keyof T
>(
  items: readonly T[],
  numericKey: KNum,
  threshold: number,
  pluckKey: KPluck
): T[KPluck][] {
  return filterByNumericField(items, numericKey, threshold).map((item) => item[pluckKey]);
}
