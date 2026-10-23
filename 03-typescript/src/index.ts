/**
 * Arquivo de demonstração executável via CLI (npm start).
 */
import {
  users,
  getUserNamesOlderThan23,
  filterByNumericField,
  filterAndPluckByNumericField,
} from './users.js';

console.log('='.repeat(60));
console.log('DEMONSTRAÇÃO: FILTRO DE USUÁRIOS EM TYPESCRIPT');
console.log('='.repeat(60));

console.log('\n1. Array original de usuários:');
console.dir(users, { depth: null });

console.log('\n2. Nomes dos usuários com idade estritamente maior que 23 anos:');
const olderThan23Names = getUserNamesOlderThan23(users);
console.log(olderThan23Names); // Deve imprimir [ 'Ana', 'Pedro' ]

console.log('\n3. Bônus: Filtro genérico por campo numérico (age > 23):');
const filteredObjects = filterByNumericField(users, 'age', 23);
console.dir(filteredObjects, { depth: null });

console.log('\n4. Bônus: Filtro genérico com projeção de nome (filterAndPluck):');
const pluckedNames = filterAndPluckByNumericField(users, 'age', 23, 'name');
console.log(pluckedNames);

console.log('\n5. Demonstração com outra entidade numérica (ex: Produtos por preço):');
interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly stock: number;
}

const products: Product[] = [
  { id: 101, title: 'Teclado Mecânico', price: 250, stock: 12 },
  { id: 102, title: 'Mouse Óptico', price: 90, stock: 45 },
  { id: 103, title: 'Monitor 4K', price: 1800, stock: 5 },
];

const expensiveProducts = filterByNumericField(products, 'price', 200);
console.log('Produtos com price > 200:');
console.dir(expensiveProducts, { depth: null });

console.log('\n' + '='.repeat(60));
console.log('Execução concluída com sucesso!');
console.log('='.repeat(60));
