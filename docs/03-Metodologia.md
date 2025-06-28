
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>
<p align="justify">
A metodologia adotada para o desenvolvimento da aplicação EcoFlow DBM foi baseada em uma abordagem ágil e colaborativa, com foco na divisão de tarefas, testes contínuos e entregas incrementais. A equipe utilizou o GitHub como ambiente principal para versionamento e controle do código-fonte, garantindo rastreabilidade e colaboração eficiente entre os membros. O projeto foi desenvolvido localmente com uso de Visual Studio Code, Node.js para o backend e arquivos HTML/CSS/JavaScript para o frontend, mantendo a integração com banco de dados MySQL. A organização das atividades foi feita por meio de quadros no Projects do proprio GitHub Project, permitindo o acompanhamento do progresso de cada funcionalidade, priorização de demandas e cumprimento dos prazos estabelecidos. Essa estrutura de trabalho proporcionou flexibilidade, comunicação constante e alinhamento entre os membros da equipe durante todas as fases do projeto.



## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

## Planejamento do projeto

###  Divisão de papéis

Para garantir uma melhor organização, produtividade e colaboração entre os membros da equipe, foi adotada a prática de dividir as funções em cada Sprint do projeto. Abaixo, segue a divisão de funções por membro do grupo em cada Sprint, conforme o modelo sugerido.

#### Sprint 1
- _Scrum master_: Robson Rodrigues de Oliveira
- Pesquisa: Arthur Gomes Murta e Pedro Henrique Ribeiro
- Documentação: Henrique Borelli Irenti de Melo, Lucas da Silva Souza e Robson Rodrigues de Oliveira

#### Sprint 2
- _Scrum master_: Henrique Borelli Irenti de Melo
- Pesquisa: Robson Rodrigues de Oliveira e Pedro Henrique Ribeiro
- Documentação: Henrique Borelli Irenti de Melo, Lucas da Silva Souza e Arthur Gomes Murta

#### Sprint 3
- _Scrum master_: Lucas da Silva Souza
- Pesquisa: Robson Rodrigues de Oliveira e Pedro Henrique Ribeiro
- Documentação: Henrique Borelli Irenti de Melo, Lucas da Silva Souza,Robson Rodrigues de Oliveira e Arthur Gomes Murta


#### Sprint 4
- Scrum master_: Pedro Henrique Ribeiro
- Front: Robson Rodrigues , Pedro Henrique , Henrique Borelli, Arthur Gomes Murta,Lucas da Silva
- Back: Robson Rodrigues , Pedro Henrique , Henrique Borelli, Arthur Gomes Murta,Lucas da Silva
- Banco de dados: Robson Rodrigues , Pedro Henrique , Henrique Borelli, Arthur Gomes Murta,Lucas da Silva

  ### Sprint 5  
**Scrum Master**: Robson Rodrigues  
**Equipe**: Robson Rodrigues, Lucas da Silva 
**Atuação**: Front-end, Back-end, Banco de Dados, Hospedagem, Documentação  

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 16/03/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Henrique Borelli Irenti de Melo        | Introdução | 06/03/2025     | 16/03/2025 | ✔️    | 09/03/2025      |
| Lucas da Silva Souza        | Objetivos    | 07/03/2025     | 16/03/2025 | ✔️    |          10/03/2025       |
| Robson Rodrigues de Oliveira       | Histórias de usuário  | 08/03/2025    | 16/03/2025 | ✔️     |     08/03/2025            |
| Robson Rodrigues de Oliveira        | Especificação do projeto  |    09/03/2025       | 16/03/2025 | ✔️    |   11/03/2025    |
| Pedro Henrique Ribeiro       | Requisitos  |    07/03/2025        | 16/03/2025 | ✔️    |    07/03/2025   |
| Robson Rodrigues de Oliveira       | Reunião com parceiro  |    05/03/2025        | 16/03/2025 | ✔️    |    05/03/2025   |
| Lucas da Silva Souza        | Slides    | 16/03/2025     | 16/03/2025 | ✔️    |          16/03/2025       |



#### Sprint 2

Atualizado em: 10/05/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Robson Rodrigues de Oliveira        | Correções Sprint 1   | 17/03/2025     | 06/04/2025 | ✔️     |  10/05/2025     |
| Robson Rodrigues de Oliveira        |Levantamento dos processos   | 17/03/2025    | 06/04/2025  | ✔️      |   24/04/2025              |
| Henrique Borelli Irenti de Melo        | Modelagem processo AS-IS  | 17/03/2025      | 06/04/2025  | ✔️   |   06/04/2025              |
| Lucas da Silva Souza        |  Modelagem processo TO DO |  17/03/2025       | 06/04/2025  | ✔️   | 06/04/2025                 |
| Pedro Henrique Ribeiro        | Respostas ao Questionário  |  17/03/2025     | 06/04/2025  | ✔️     |  06/04/2025                |
| Pedro Henrique Ribeiro       | Preenchimento formulário parcial  |  17/03/2025    | 06/04/2025  | ✔️     |  06/04/2025                |
| Todos Integrantes do Projeto      | Preparação da Apresentação |  17/03/2025     | 06/04/2025  | ✔️     |  06/04/2025                |


#### Sprint 3

Atualizado em: 11/05/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Robson Rodrigues de Oliveira        |Protótipo da aplicação   | 07/04/2025    | 11/05/2025  | ✔️      |   11/05/2025              |
| Lucas da Silva Souza       | Diagrama de classes | 07/04/2025       | 06/04/2025  | ✔️   |   11/05/2025             |
| Lucas da Silva Souza       |  Modelo Conceitual do Banco de Dados – DER |  07/04/2025         | 11/05/2025  | ✔️   | 11/05/2025                |
| Pedro Henrique Ribeiro e Lucas da Silva Souza        | Modelo Lógico do Banco de Dados – DER |  07/04/2025      | 11/05/2025  | ✔️     |  11/05/2025            |
| Robson Rodrigues de Oliveira     | Elementos conceituais do banco mapeados num SGBD |  11/05/2025     | 11/05/2025  | ✔️     |  11/05/2025                |
| Robson Rodrigues de Oliveira       | Scripts SQL para criação do Banco de Dados |  11/05/2025     | 11/05/2025  | ✔️     |  11/05/2025                |
| Todos Integrantes do Projeto      | Preparação da Apresentação |  17/03/2025     | 11/05/2025  | ✔️     |  11/05/2025               |

#### Sprint 4

Atualizado em: 08/06/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Lucas da silva e Robson Rodrigues   |Front End | 12/05/2025    | 08/06/2025     | ✔️      |   08/06/2025              |
| Lucas da silva e Robson Rodrigues      | Back End | 12/05/2025    | 08/06/2025     | ✔️      |   08/06/2025              |
| Lucas da silva e Robson Rodrigues      |  Banco de dados | 12/05/2025    | 08/06/2025     | ✔️      |   08/06/2025              |
| Todos Integrantes do Projeto      | Preparação da Apresentação | 12/05/2025    | 08/06/2025     | ✔️      |   08/06/2025              |

#### Sprint 5

Atualizado em: 29/06/2025

| Responsável                          | Tarefa/Requisito         | Iniciado em | Prazo      | Status | Terminado em |
| :----------------------------------- | :----------------------- | :---------: | :--------: | :----: | :----------: |
| Lucas da Silva, Robson Rodrigues     | Front-end                | 10/06/2025  | 29/06/2025 | ✔️     | 29/06/2025   |
| Lucas da Silva, Robson Rodrigues      | Back-end                 | 10/06/2025  | 29/06/2025 | ✔️     | 29/06/2025   |
| Lucas da Silva, Robson Rodrigues      | Banco de Dados           | 10/06/2025  | 29/06/2025 | ✔️     | 29/06/2025   |
| Lucas da Silva, Robson Rodrigues      | Hospedagem               | 10/06/2025  | 29/06/2025 | ✔️     | 29/06/2025   |
| Lucas da Silva, Robson Rodrigues      | Documentação             | 10/06/2025  | 29/06/2025 | ✔️     | 29/06/2025   |




Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado




### Processo

O desenvolvimento do projeto EcoFlow DBM foi conduzido utilizando a metodologia ágil Scrum, com o objetivo de garantir organização, colaboração contínua e entregas incrementais. A equipe foi estruturada com os papéis fundamentais do Scrum: Scrum Master, Pesquisa e Documentação, promovendo reuniões regulares de planejamento, revisões de Sprint e retrospectivas.

Para o gerenciamento eficiente das atividades e acompanhamento do progresso do projeto, foi utilizado o recurso GitHub Projects, onde foram criadas issues representando as tarefas técnicas e funcionais de cada Sprint. 

Esse processo contribuiu para a organização das entregas, priorização de funcionalidades e melhor comunicação entre os integrantes do grupo, assegurando um ciclo de desenvolvimento contínuo e focado na entrega de valor ao usuário final.
 



## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | [http://.... ](https://github.com/ICEI-PUC-Minas-PBE-ADS-SI/2025-1-p5-tias-ecoflowdbm)                           |
| Documentos do projeto               | GitHub                             | [http://....](https://github.com/ICEI-PUC-Minas-PBE-ADS-SI/2025-1-p5-tias-ecoflowdbm)                            |
| Projeto de interface                | Figma                              | [http://.... ]([https://www.figma.com/design/Mqi1j2yFVllhyIWU0P76ib/APP-EcoFlow-DBM?node-id=0-1&t=iQIJ1asjwoQMlIsn-1](https://www.figma.com/design/Mqi1j2yFVllhyIWU0P76ib/APP-EcoFlow-DBM?node-id=0-1&t=B3r0TRmAznOgqvRH-1))                           |
| Gerenciamento do projeto            | GitHub Projects                    | [http://....](https://github.com/ICEI-PUC-Minas-PBE-ADS-SI/2025-1-p5-tias-ecoflowdbm)                            |
| Hospedagem                          | A definir                           | http://....                            |
 
