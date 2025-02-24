# Home Cell

É um sistema para gerenciar clientes que deixam dispositivos para reparo. O frontend é construído com React, e o backend usa Node.js. É um aplicativo CRUD, e aprendi muito sobre integração de API e também UI/UX enquanto o desenvolvia.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento.

### 🔧 Instalação

Depois de já ter clonado o repositório siga essas etapas para terminar a instalação e começar a execução

Instale os módulos necessarios na pasta do *backend* e também no *frontend*:

```
npm install
```

Navegue até *Homecell/backend/src/server.js* e altere o valor de *PORT* para a porta de preferência, Exemplo:

```
const PORT = 3333;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
```

Agora vá até *Homecell/backend/src/database/connection.js* e altere os dados de acordo com a sua conexão ao MariaDB, Exemplo:

```
const pool = mariadb.createPool({
    host: localhost,
    user: root,
    password: 12345,
    database: homecell, 
});
```


Agora no terminal tanto do *backend* quanto o *frontend*, execute o seguinte comando:

```
npm start
```
### 📋 Pré-requisitos

#### Banco de dados ultilizado: MariaDB
Tabela *clientes*

```
CREATE TABLE `clientes` (
	`id` INT(20) NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(50) NOT NULL,
	`cpf` VARCHAR(14) NOT NULL,
	`numeroCell` VARCHAR(15) NULL,
	`numeroRes` VARCHAR(15) NULL,
	`endereco` VARCHAR(50) NULL,
	`cidade` VARCHAR(50) NULL,
	`created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
	`updated_at` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
);
```

Tabela *aparelhos*

```
CREATE TABLE `aparelhos` (
	`id` INT(20) NOT NULL AUTO_INCREMENT,
	`idCli` INT(11) NOT NULL,
	`modelo` VARCHAR(50) NOT NULL,
	`descricao` VARCHAR(200) NOT NULL,
	`valor` DECIMAL(10,2) NOT NULL,
	`pago` VARCHAR(50) NULL DEFAULT NULL,
	`situacao` VARCHAR(50) NULL DEFAULT NULL,
	`observacao` VARCHAR(250) NULL DEFAULT NULL,
	`created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
	`updated_at` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK1_idCli` (`idCli`) USING BTREE,
	CONSTRAINT `FK1_idCli` FOREIGN KEY (`idCli`) REFERENCES `clientes` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
```

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML) - Estruturação do conteúdo da aplicação
* [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) - Estilização e layout responsivo.
* [JAVASCRIPT](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Lógica de programação e interatividade.
* [REACT](https://pt-br.react.dev/learn) - Biblioteca JavaScript para construção da interface de usuário.
* [NODE.JS](https://nodejs.org/docs/latest/api/) - Ambiente de execução para JavaScript no backend.
* [MARIADB](https://mariadb.org/documentation/) - Banco de dados relacional para armazenamento de informações.

## ✒️ Autores

- **Thiago Pecorari Clemente**
  - [Github](https://github.com/Pecorari)
  - [linkedin](https://www.linkedin.com/in/pecorari-clemente/)
