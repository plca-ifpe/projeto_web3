Category(id: int, name: varchar(255)) 1 to * Product(id: int, name: varchar(255), categoryId: int)

Procedimento para **SUBIR**:
1. Navegar até a pasta do projeto;
2. Executar docker compose -f docker-compose.postgres.yml up -d;
3. Executar npm run start:dev;
4. Aguardar a aplicação subir.

Procedimento para **DERRUBAR**:
1. Apertar Ctrl + C no terminal que está rodando o Nest;
2. Navegar até a pasta do projeto se já não estiver nela;
3. Executar docker compose -f docker-compose.postgres.yml down;
- Caso seja desejado, executar o comando com a flag -v no final dropa o volume do banco de dados, permitindo a geração de uma instância completamente nova;
4. Aguardar o banco sair do ar.

## Uso de IA
Usei IA pra me estudar o código que não estava nos vídeos, codei na mão mas pedindo ajuda à IA às vezes na hora de debugar ou para pesar os pros e contras de uma implementação.

Política de erro:
*Planejo implementar como 404 para alguém tentando acessar algo de outra pessoa.*