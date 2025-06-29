# Plano de testes de software

<p align="justify">
Este documento descreve os casos de teste elaborados para validação da aplicação EcoFlow DBM, sistema de gestão para devolução de garrafas retornáveis com programa de recompensas. Os testes foram projetados para verificar os requisitos funcionais e não-funcionais do sistema, garantindo que todas as features implementadas atendam aos critérios de qualidade esperados tanto pela equipe de desenvolvimento quanto pelos stakeholders do projeto. 
<p align="justify">
A estrutura de testes segue metodologia baseada em requisitos, onde cada caso está vinculado a um item específico da documentação de especificações (RF-XXX). Foram priorizados os fluxos críticos do sistema, incluindo processos de autenticação, gestão de coletas, cálculo de saldo e integrações externas, com abordagem que cobre testes positivos, negativos e de validação de regras de negócio. 
<p align="justify">
Cada caso de teste contém: identificador único (CT-XXX), pré-condições claras, passos de execução detalhados, critérios de aprovação mensuráveis e evidências obrigatórias. A organização em tabelas padronizadas permite fácil rastreabilidade e execução pelos membros da equipe de QA, sendo Lucas Silva e Robson Rodrigues os responsáveis primários pela elaboração e validação dos testes. 
 

# Casos de Teste - Aplicação EcoFlow DBM

## CT-01 – Acesso à página inicial
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-001                                                                  |
| **Objetivo**          | Verificar carregamento correto da página principal                       |
| **Passos**            | 1. Acessar URL do sistema<br>2. Verificar elementos essenciais<br>3. Medir tempo de carregamento |
| **Critério de Êxito** | - Página carrega s<br>- Todos componentes visíveis                 |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-02 – Login válido
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-002                                                                  |
| **Objetivo**          | Validar autenticação com credenciais corretas                           |
| **Passos**            | 1. Inserir e-mail cadastrado<br>2. Inserir senha válida<br>3. Clicar em "Entrar" |
| **Critério de Êxito** | - Redirecionamento para dashboard<br>- Sessão iniciada                  |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-03 – Login inválido
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-002                                                                  |
| **Objetivo**          | Verificar tratamento de credenciais incorretas                          |
| **Passos**            | 1. Inserir e-mail não cadastrado<br>2. Inserir senha aleatória<br>3. Tentar login |
| **Critério de Êxito** | - Mensagem de erro exibida<br>- Conta bloqueada após 3 tentativas       |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-04 – Cadastro de usuário
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-003                                                                  |
| **Objetivo**          | Validar criação de nova conta                                           |
| **Passos**            | 1. Preencher formulário completo<br>2. Aceitar termos<br>3. Confirmar e-mail |
| **Critério de Êxito** | - Conta criada             |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-05 – Recuperação de senha
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-004                                                                  |
| **Objetivo**          | Testar fluxo de redefinição de senha                                    |
| **Passos**            | 1. Solicitar recuperação<br>2. Acessar link do e-mail<br>3. Criar nova senha |
| **Critério de Êxito** | - Senha alterada com sucesso<br>- Link expira em 24h                    |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-06 – Agendamento de coleta
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-005                                                                  |
| **Objetivo**          | Verificar cadastro de nova coleta                                       |
| **Passos**            | 1. Selecionar tipo de material<br>2. Informar endereço<br>3. Escolher data/hora |
| **Critério de Êxito** | - Coleta registrada no sistema<br>- Notificação enviada                 |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-07 – Cancelamento de coleta
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-006                                                                  |
| **Objetivo**          | Testar remoção de agendamento                                           |
| **Passos**            | 1. Acessar coleta agendada<br>2. Clicar em "Cancelar"<br>3. Confirmar   |
| **Critério de Êxito** | - Coleta removida do sistema<br>- E-mail de confirmação enviado         |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-08 – Consulta de saldo
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-007                                                                  |
| **Objetivo**          | Verificar exibição do saldo acumulado                                   |
| **Passos**            | 1. Acessar perfil<br>2. Navegar para "Saldo"<br>3. Atualizar página     |
| **Critério de Êxito** | - Valor exato exibido<br>- Atualização em tempo real                    |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-09 – Resgate de saldo
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-008                                                                  |
| **Objetivo**          | Testar conversão de saldo em benefícios                                 |
| **Passos**            | 1. Selecionar recompensa<br>2. Confirmar resgate<br>3. Verificar e-mail |
| **Critério de Êxito** | - Saldo debitado corretamente<br>- Voucher gerado                       |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-10 – Alteração de senha
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-009                                                                  |
| **Objetivo**          | Validar atualização de credenciais                                      |
| **Passos**            | 1. Acessar "Segurança"<br>2. Inserir senha atual<br>3. Cadastrar nova   |
| **Critério de Êxito** | - Senha alterada<br>- Requer nova autenticação                         |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-11 – Logout
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-010                                                                  |
| **Objetivo**          | Testar encerramento de sessão                                           |
| **Passos**            | 1. Clicar em "Sair"<br>2. Tentar acessar área restrita                  |
| **Critério de Êxito** | - Sessão encerrada<br>- Redirecionamento para login                     |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-12 – Relatório de coletas
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-011                                                                  |
| **Objetivo**          | Validar geração de documentos                                           |
| **Passos**            | 1. Filtrar por período<br>2. Selecionar formato<br>3. Gerar relatório   |
| **Critério de Êxito** | - Arquivo gerado<br>- Dados consistentes                                |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-13 – Integração com WhatsApp
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-012                                                                  |
| **Objetivo**          | Testar canal de suporte                                                 |
| **Passos**            | 1. Clicar em "Ajuda"<br>2. Iniciar conversa<br>3. Enviar mensagem teste |
| **Critério de Êxito** | - Chat iniciado<br>- Mensagem recebida                                  |
| **Responsável**       | Lucas Silva                                                             |

---

## CT-14 – Aprovação de coletas (admin)
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-013                                                                  |
| **Objetivo**          | Validar fluxo administrativo                                            |
| **Passos**            | 1. Login como admin<br>2. Aprovar coleta<br>3. Verificar status         |
| **Critério de Êxito** | - Status atualizado<br>- Usuário notificado                             |
| **Responsável**       | Robson Rodrigues                                                        |

---

## CT-15 – Responsividade
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-014                                                                  |
| **Objetivo**          | Verificar adaptação a diferentes telas                                  |
| **Passos**            | 1. Testar em mobile<br>2. Verificar tablet<br>3. Checar desktop         |
| **Critério de Êxito** | - Layout responsivo<br>- Funcionalidades acessíveis                     |
| **Responsável**       | Lucas Silva                                                             |                                        |

<p align="justify">Os resultados obtidos nesta bateria de testes servirão como base para a liberação das versões em ambiente de homologação e produção, além de fornecer métricas objetivas sobre a maturidade do sistema. Recomenda-se a execução completa desta suite antes de cada deploy significativo no ambiente produtivo. 
