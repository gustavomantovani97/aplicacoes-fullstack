import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  users,
  getUserNamesOlderThan23,
  filterByNumericField,
  filterAndPluckByNumericField,
  type User,
} from './users.js';

describe('Desafio 3 - Testes de Funções TypeScript', () => {
  describe('getUserNamesOlderThan23', () => {
    it('deve retornar exatamente os nomes dos usuários com idade estritamente maior que 23 anos', () => {
      const result = getUserNamesOlderThan23(users);
      assert.deepEqual(result, ['Ana', 'Pedro']);
    });

    it('deve excluir estritamente usuários com 23 anos ou menos', () => {
      const testUsers: User[] = [
        { id: 10, name: 'Lucas', age: 23 }, // Limiar exato: deve ser excluído
        { id: 11, name: 'Beatriz', age: 24 }, // Maior que 23: deve ser incluída
        { id: 12, name: 'Carlos', age: 22 }, // Menor que 23: deve ser excluído
      ];

      const result = getUserNamesOlderThan23(testUsers);
      assert.deepEqual(result, ['Beatriz']);
    });

    it('deve retornar um array vazio caso nenhum usuário atenda ao critério', () => {
      const youngUsers: User[] = [
        { id: 1, name: 'Jovem 1', age: 18 },
        { id: 2, name: 'Jovem 2', age: 20 },
      ];

      const result = getUserNamesOlderThan23(youngUsers);
      assert.deepEqual(result, []);
    });

    it('deve retornar um array vazio quando receber um array vazio', () => {
      const result = getUserNamesOlderThan23([]);
      assert.deepEqual(result, []);
    });
  });

  describe('filterByNumericField (Função Genérica)', () => {
    it('deve filtrar usuários por age > 23 retornando os objetos completos', () => {
      const result = filterByNumericField(users, 'age', 23);
      assert.equal(result.length, 2);
      assert.deepEqual(result, [
        { id: 1, name: 'Ana', age: 25 },
        { id: 2, name: 'Pedro', age: 30 },
      ]);
    });

    it('deve filtrar usuários por id > 1', () => {
      const result = filterByNumericField(users, 'id', 1);
      assert.equal(result.length, 2);
      assert.deepEqual(result, [
        { id: 2, name: 'Pedro', age: 30 },
        { id: 3, name: 'Maria', age: 22 },
      ]);
    });

    it('deve funcionar com tipos de dados customizados arbitrários', () => {
      interface Transaction {
        readonly code: string;
        readonly amount: number;
        readonly fee: number;
        readonly status: string;
      }

      const transactions: Transaction[] = [
        { code: 'TX-1', amount: 100, fee: 5, status: 'completed' },
        { code: 'TX-2', amount: 500, fee: 20, status: 'completed' },
        { code: 'TX-3', amount: 50, fee: 2, status: 'pending' },
      ];

      // Filtra por amount > 80
      const largeTx = filterByNumericField(transactions, 'amount', 80);
      assert.equal(largeTx.length, 2);
      assert.deepEqual(largeTx.map((t) => t.code), ['TX-1', 'TX-2']);

      // Filtra por fee > 10
      const highFeeTx = filterByNumericField(transactions, 'fee', 10);
      assert.equal(highFeeTx.length, 1);
      assert.equal(highFeeTx[0]?.code, 'TX-2');
    });

    it('deve gerar erro de compilação estático ao passar campo não-numérico (ex: "name" ou "status")', () => {
      // @ts-expect-error O campo 'name' é do tipo string, não sendo atribuível a NumericKeys<User> ('id' | 'age')
      const invalidCall = filterByNumericField(users, 'name', 23);
      assert.ok(Array.isArray(invalidCall));
    });
  });

  describe('filterAndPluckByNumericField (Filtro e Projeção Genérica)', () => {
    it('deve filtrar por age > 23 e projetar apenas a propriedade name', () => {
      const names = filterAndPluckByNumericField(users, 'age', 23, 'name');
      assert.deepEqual(names, ['Ana', 'Pedro']);
    });

    it('deve filtrar por age > 23 e projetar a propriedade id', () => {
      const ids = filterAndPluckByNumericField(users, 'age', 23, 'id');
      assert.deepEqual(ids, [1, 2]);
    });
  });
});
