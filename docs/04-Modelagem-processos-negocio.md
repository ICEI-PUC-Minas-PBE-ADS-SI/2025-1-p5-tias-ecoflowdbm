# Modelagem dos processos de negócio


## Modelagem da situação atual (Modelagem AS IS)

<p align="justify">Atualmente, o processo de gestão de coleta e retorno de garrafas é realizado de forma manual e descentralizada. A separação e o controle das garrafas retornáveis dependem da atuação direta dos usuários e dos estabelecimentos, sem um sistema automatizado que acompanhe o fluxo das garrafas ou registre suas movimentações. A comunicação entre os envolvidos ocorre por meios informais, o que dificulta o monitoramento em tempo real, gera riscos de falhas no controle logístico e torna o processo menos eficiente e escalável. Além disso, não há uma estrutura de monetização clara que garanta a sustentabilidade do projeto, nem um sistema que incentive a participação contínua dos usuários.
  

## Descrição geral da proposta (Modelagem TO BE)

<p align="justify">Com a implementação da plataforma web, o processo será automatizado e centralizado, proporcionando maior controle, rastreabilidade e eficiência. Os usuários poderão registrar a devolução das garrafas diretamente na plataforma, que calculará automaticamente os valores a serem recebidos e aplicará o percentual de monetização do projeto. A comunicação com os estabelecimentos será feita de forma padronizada, via sistema, e os dados serão armazenados de forma segura e acessível para análises futuras.



## Modelagem dos processos

[PROCESSO 1 - Gestão de Estoque](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Gestão de pedidos e devolução](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")


## Indicadores de desempenho



| Indicador                      | Objetivos                                                              | Descrição                                                                 | Fonte de dados       | Fórmula de design                                                                 |
|-------------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------|-----------------------|------------------------------------------------------------------------------------|
| Taxa de devolução de garrafas | Medir o engajamento dos usuários no programa de retorno                | Percentual de garrafas devolvidas em relação à quantidade distribuída     | Tabela Devoluções     | (nº de garrafas devolvidas / nº de garrafas distribuídas) * 100                   |
| Tempo médio de coleta         | Avaliar a eficiência logística na coleta das garrafas                  | Tempo médio entre a solicitação de coleta e o recebimento do material     | Tabela Coletas        | soma dos tempos de coleta / número total de coletas                               |
| Taxa de participação dos usuários | Medir o alcance do sistema entre o público-alvo                    | Percentual de usuários ativos em relação ao total de usuários cadastrados | Tabela Usuários        | (nº de usuários ativos / nº total de usuários cadastrados) * 100                  |
| Eficiência financeira         | Acompanhar o retorno econômico da operação                             | Relação entre o valor arrecadado e os custos operacionais do sistema      | Tabela Financeiro      | (valor arrecadado - custo operacional) / custo operacional * 100                  |
| Índice de satisfação dos usuários | Avaliar a qualidade do serviço prestado sob a ótica do usuário     | Média das notas atribuídas pelos usuários em pesquisas de satisfação      | Tabela Avaliações      | soma das notas atribuídas / número total de avaliações                            |



Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
