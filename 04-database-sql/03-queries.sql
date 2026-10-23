USE desafio;

SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC, id DESC;

SELECT DATE_FORMAT(created_at, '%Y-%m') AS mes,
       COUNT(*) AS total_usuarios
FROM users
GROUP BY mes
ORDER BY mes;