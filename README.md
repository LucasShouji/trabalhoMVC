
# Tutorial Passo a Passo: Criando um Projeto Node.js com TypeScript e Express

Este tutorial irá guiá-lo de forma detalhada e didática na criação de um projeto Node.js moderno, utilizando TypeScript, Express e SQLite. Cada etapa é explicada de maneira clara para que você compreenda não só o que fazer, mas também o porquê de cada comando e configuração.

---

## 1. Entendendo as ferramentas: npm e npx

Antes de começar, é fundamental conhecer duas ferramentas essenciais do ecossistema Node.js:

- **npm** (Node Package Manager) é o gerenciador de pacotes padrão do Node.js. Ele permite instalar, atualizar, remover e gerenciar dependências (bibliotecas e ferramentas) de projetos JavaScript. Você pode instalar pacotes localmente (apenas para o projeto atual) ou globalmente (disponível para todos os projetos do sistema).

- **npx** é uma ferramenta que acompanha o npm (a partir da versão 5.2.0) e serve para executar pacotes Node.js sem precisar instalá-los globalmente. Com o npx, você pode rodar comandos de pacotes diretamente, facilitando o uso de ferramentas e scripts temporários ou de uso pontual.

---

## 2. Inicializando um novo projeto Node.js

Abra o terminal na pasta onde deseja criar o projeto e execute:

```bash
npm init
```

Esse comando inicia um assistente interativo que irá perguntar o nome do projeto, versão, descrição, ponto de entrada, autor, licença, etc. Ao final, será criado o arquivo `package.json` com as informações fornecidas.

Se quiser pular as perguntas e usar valores padrão, utilize:

```bash
npm init -y
```

O arquivo `package.json` é fundamental para qualquer projeto Node.js, pois armazena informações como nome, versão, dependências, scripts e outras configurações. Sempre que você instalar um pacote com npm, ele será registrado nesse arquivo.


---

## 3. O que é o arquivo `package.json`?

O arquivo `package.json` é o coração do seu projeto Node.js. Ele contém informações essenciais como nome, versão, descrição, autor, licenças e principalmente as dependências do projeto. Sempre que você instalar, atualizar ou remover pacotes com o npm, essas alterações serão refletidas nesse arquivo.

Além disso, o `package.json` pode conter scripts personalizados, que você executa com o comando `npm run <nome-do-script>`. Por exemplo, você pode criar um script para rodar o servidor, compilar o TypeScript, rodar testes, etc.

---


## 4. O que é o arquivo `package-lock.json`?

O arquivo `package-lock.json` é criado automaticamente pelo npm sempre que você instala ou atualiza dependências. Ele registra exatamente quais versões de cada pacote e subpacote foram instaladas, garantindo que todos os desenvolvedores e ambientes (produção, testes, etc.) usem as mesmas versões, evitando conflitos e problemas de compatibilidade.

Você nunca deve editar esse arquivo manualmente. Ele é fundamental para a consistência do projeto.

---


## 5. A pasta `node_modules`

Quando você executa `npm install`, todas as dependências do seu projeto são baixadas e armazenadas na pasta `node_modules`. Cada pacote pode ter suas próprias dependências, formando uma estrutura de árvore.

Essa pasta pode ficar muito grande, pois contém todos os arquivos necessários para o funcionamento das bibliotecas instaladas. Por isso, nunca inclua `node_modules` no controle de versão (como Git). Basta adicionar essa pasta ao arquivo `.gitignore` do seu projeto. Se você apagar a pasta, pode restaurá-la a qualquer momento rodando `npm install` novamente.

---




## 6. O que significa "type": "commonjs" no package.json?

No arquivo `package.json`, o campo `"type": "commonjs"` define qual sistema de módulos o Node.js irá utilizar no seu projeto.

- Se estiver como `commonjs`, você deve usar o padrão tradicional do Node.js, com `require()` para importar módulos e `module.exports` para exportar:

```js
// Importando um módulo em CommonJS
const express = require('express');

// Exportando uma função ou objeto
module.exports = { minhaFuncao };
```

- Se estiver como `module`, você deve usar o padrão moderno ECMAScript Modules (ESM), com `import` e `export`:

```js
import express from 'express';
export function minhaFuncao() {}
```

**Resumo:**
- `"type": "commonjs"` → Usa `require`/`module.exports` (padrão tradicional do Node.js)
- `"type": "module"` → Usa `import`/`export` (padrão moderno ECMAScript)

---




---

## 7. Instalando dependências do projeto

Para adicionar funcionalidades ao seu projeto, você precisará instalar pacotes (dependências). O comando principal é:

```bash
npm install <nome-do-pacote>
```

Por exemplo, para instalar o Express, execute:

```bash
npm install express
```

Por padrão, o npm adiciona o pacote à seção `dependencies` do `package.json`, indicando que ele é necessário para rodar o projeto em produção.

Se você quiser instalar uma dependência apenas para desenvolvimento (como ferramentas de build, tipos ou testadores), use:

```bash
npm install --save-dev <nome-do-pacote>
```

Exemplo:

```bash
npm install --save-dev typescript tsc @types/node @types/express
```

---

## 8. Instalando e configurando o TypeScript

O TypeScript adiciona tipagem estática ao JavaScript, tornando o desenvolvimento mais seguro e produtivo. Para instalar o TypeScript e o compilador, execute:

```bash
npm install --save-dev typescript tsc
```

Para criar o arquivo de configuração do TypeScript, rode:

```bash
npx tsc --init
```

Isso criará o arquivo `tsconfig.json`, onde você pode definir opções como o diretório de entrada (`rootDir`) e saída (`outDir`).

Exemplo de configuração:

```json
{
	"rootDir": "./src",
	"outDir": "./dist"
}
```

Essas opções ajudam a organizar o código-fonte e os arquivos compilados.

---

## 9. Adicionando tipos para Node.js e Express

Para ter autocompletar e verificação de tipos ao usar Node.js e Express com TypeScript, instale:

```bash
npm install --save-dev @types/node @types/express
```

Esses pacotes fornecem as definições de tipos para as APIs do Node.js e do Express, facilitando o desenvolvimento com TypeScript.

---

## 10. Diferença entre tsc e tsx

O comando `tsc` é o compilador TypeScript, usado para converter arquivos `.ts` em `.js`. Já o `tsx` (quando instalado) permite executar arquivos TypeScript diretamente no Node.js, sem precisar compilar antes.

---

## 11. O arquivo `tsconfig.json`

O arquivo `tsconfig.json` é fundamental para projetos TypeScript. Ele define as opções de compilação, como o diretório de saída dos arquivos compilados, quais arquivos devem ser incluídos ou excluídos da compilação, e outras configurações importantes.

Exemplo de configuração:

```json
{
	"rootDir": "./src",
	"outDir": "./dist"
}
```

Essas configurações ajudam a organizar o código-fonte e os arquivos compilados de forma clara e estruturada.

---

## 12. Instalando o SQLite3

O SQLite é um banco de dados leve e autônomo, ideal para projetos pequenos e médios que precisam de armazenamento local sem a complexidade de um servidor de banco de dados separado.

Para instalar o SQLite3, execute:

```bash
npm install sqlite3
```

O pacote será adicionado às dependências do seu projeto e estará pronto para uso.
