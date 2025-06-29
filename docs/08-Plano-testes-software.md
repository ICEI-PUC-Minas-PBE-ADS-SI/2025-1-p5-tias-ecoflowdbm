# Plano de testes de software

<p align="justify">
Este documento descreve os casos de teste elaborados para validação da aplicação EcoFlow DBM, sistema de gestão para devolução de garrafas retornáveis com programa de recompensas. Os testes foram projetados para verificar os requisitos funcionais e não-funcionais do sistema, garantindo que todas as features implementadas atendam aos critérios de qualidade esperados tanto pela equipe de desenvolvimento quanto pelos stakeholders do projeto. 
<p align="justify">
A estrutura de testes segue metodologia baseada em requisitos, onde cada caso está vinculado a um item específico da documentação de especificações (RF-XXX). Foram priorizados os fluxos críticos do sistema, incluindo processos de autenticação, gestão de coletas, cálculo de saldo e integrações externas, com abordagem que cobre testes positivos, negativos e de validação de regras de negócio. 
<p align="justify">
Cada caso de teste contém: identificador único (CT-XXX), pré-condições claras, passos de execução detalhados, critérios de aprovação mensuráveis e evidências obrigatórias. A organização em tabelas padronizadas permite fácil rastreabilidade e execução pelos membros da equipe de QA, sendo Lucas Silva e Robson Rodrigues os responsáveis primários pela elaboração e validação dos testes. 
 

# Casos de Teste - Aplicação EcoFlow DBM

## CT-001 – Acesso à página inicial
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-000                                                                  |
| **Objetivo**          | Verificar carregamento da página principal                              |
| **Passos**            | 1. Acessar URL<br>2. Verificar elementos<br>3. Medir tempo de resposta  |
| **Critério de Êxito** | - Load <3s<br>- Elementos visíveis                                      |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-002 – Login válido
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-001                                                                  |
| **Objetivo**          | Testar autenticação com credenciais corretas                            |
| **Passos**            | 1. Inserir e-mail válido<br>2. Inserir senha correta<br>3. Submeter     |
| **Critério de Êxito** | - Redireciona para dashboard<br>- Cookie de sessão criado               |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-003 – Login inválido
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-001                                                                  |
| **Objetivo**          | Verificar tratamento de credenciais incorretas                          |
| **Passos**            | 1. Inserir e-mail inválido<br>2. Submeter formulário                    |
| **Critério de Êxito** | - Exibe mensagem de erro<br>- Bloqueia após 3 tentativas                |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-004 – Cadastro de usuário
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-002                                                                  |
| **Objetivo**          | Validar fluxo de registro                                               |
| **Passos**            | 1. Preencher formulário<br>2. Aceitar termos<br>3. Confirmar e-mail     |
| **Critério de Êxito** | - Conta criada no banco<br>- E-mail de confirmação enviado              |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-005 – Recuperação de senha
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-003                                                                  |
| **Objetivo**          | Testar reset de senha                                                   |
| **Passos**            | 1. Solicitar recuperação<br>2. Acessar link do e-mail<br>3. Nova senha  |
| **Critério de Êxito** | - Link expira em 24h<br>- Senha é atualizada                            |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-006 – Agendamento de coleta
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-004                                                                  |
| **Objetivo**          | Verificar cadastro de coletas                                           |
| **Passos**            | 1. Selecionar tipo<br>2. Informar endereço<br>3. Escolher data/hora     |
| **Critério de Êxito** | - Coleta aparece no calendário<br>- Notificação enviada                 |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-007 – Cancelamento de coleta
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-005                                                                  |
| **Objetivo**          | Testar remoção de agendamentos                                          |
| **Passos**            | 1. Acessar agendamento<br>2. Clicar "Cancelar"<br>3. Confirmar          |
| **Critério de Êxito** | - Coleta é removida<br>- E-mail de confirmação enviado                  |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-008 – Consulta de saldo
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-006                                                                  |
| **Objetivo**          | Verificar exibição de saldo acumulado                                   |
| **Passos**            | 1. Acessar perfil<br>2. Navegar para "Saldo"                            |
| **Critério de Êxito** | - Valor exato é exibido<br>- Atualizado em tempo real                   |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-009 – Resgate de saldo
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-007                                                                  |
| **Objetivo**          | Testar conversão de saldo em benefícios                                 |
| **Passos**            | 1. Selecionar recompensa<br>2. Confirmar resgate<br>3. Verificar e-mail |
| **Critério de Êxito** | - Saldo debitado<br>- Voucher gerado                                    |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-010 – Alteração de senha
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-008                                                                  |
| **Objetivo**          | Validar atualização de senha                                            |
| **Passos**            | 1. Acessar "Segurança"<br>2. Inserir senha atual<br>3. Cadastrar nova   |
| **Critério de Êxito** | - Senha alterada<br>- Requer login com nova credencial                  |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-011 – Logout
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-009                                                                  |
| **Objetivo**          | Testar encerramento de sessão                                           |
| **Passos**            | 1. Clicar em "Sair"<br>2. Tentar acessar área restrita                  |
| **Critério de Êxito** | - Sessão invalidada<br>- Redireciona para login                         |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-012 – Relatório de coletas
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-010                                                                  |
| **Objetivo**          | Verificar geração de documentos                                         |
| **Passos**            | 1. Filtrar por período<br>2. Selecionar formato<br>3. Gerar relatório   |
| **Critério de Êxito** | - Arquivo download<br>- Dados consistentes                              |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-013 – Integração com WhatsApp
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-011                                                                  |
| **Objetivo**          | Validar canal de suporte                                                |
| **Passos**            | 1. Clicar em "Ajuda"<br>2. Iniciar chat<br>3. Enviar mensagem teste     |
| **Critério de Êxito** | - Chat aberto<br>- Mensagem recebida                                    |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-014 – Aprovação de coletas (admin)
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-012                                                                  |
| **Objetivo**          | Validar fluxo administrativo                                            |
| **Passos**            | 1. Login como admin<br>2. Aprovar coleta<br>3. Verificar status         |
| **Critério de Êxito** | - Status atualizado<br>- Usuário notificado                             |
| **Responsável**       | Robson Rodrigues                                                        |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

---

## CT-015 – Responsividade
| Campo                 | Conteúdo                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| **Requisito**         | RF-013                                                                  |
| **Objetivo**          | Verificar adaptação a diferentes telas                                  |
| **Passos**            | 1. Testar em mobile<br>2. Verificar tablet<br>3. Checar desktop         |
| **Critério de Êxito** | - Layout responsivo<br>- Funcionalidades acessíveis                     |
| **Responsável**       | Lucas Silva                                                             |
| **Evidência**         | ![Etapas](images/Login.png)                                             |

<p align="justify">Os resultados obtidos nesta bateria de testes servirão como base para a liberação das versões em ambiente de homologação e produção, além de fornecer métricas objetivas sobre a maturidade do sistema. Recomenda-se a execução completa desta suite antes de cada deploy significativo no ambiente produtivo. 
