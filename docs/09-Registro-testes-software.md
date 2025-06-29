# Registro de testes de software
<p align="justify">
Este relatório documenta os resultados dos testes realizados na aplicação EcoFlow DBM, contemplando a validação dos 15 casos de teste definidos no plano de testes. Cada evidência registrada demonstra o cumprimento (ou não) dos requisitos funcionais associados, garantindo que os critérios de qualidade foram devidamente verificados pela equipe de qualidade. Os testes foram executados em ambiente controlado, utilizando dados de teste preparados especificamente para cada cenário.
</p>

<p align="justify">
As evidências apresentadas consistem em capturas de tela e gravações em vídeo (screencasts) que comprovam a execução completa de cada caso de teste. Este documento serve como registro oficial para auditorias futuras e como base para a liberação da versão em produção, atestando que todas as funcionalidades críticas foram validadas conforme os padrões estabelecidos no plano de qualidade do projeto.
</p>


| Caso de teste          | CT-001 – Acesso à página inicial       |
|------------------------|----------------------------------------|
| Requisito associado    | RF-001 - O sistema deve carregar a página principal  |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-002 – Login válido                  |
|------------------------|----------------------------------------|
| Requisito associado    | RF-002 - O sistema deve autenticar usuários com credenciais válidas |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-003 – Login inválido                |
|------------------------|----------------------------------------|
| Requisito associado    | RF-002 - O sistema deve notificar quanto aos dados invalidos |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-004 – Cadastro de usuário           |
|------------------------|----------------------------------------|
| Requisito associado    | RF-003 - O sistema deve registrar novos usuários com e-mail válido |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-005 – Recuperação de senha          |
|------------------------|----------------------------------------|
| Requisito associado    | RF-004 - O sistema deve permitir redefinição de senha via e-mail |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-006 – Agendamento de coleta         |
|------------------------|----------------------------------------|
| Requisito associado    | RF-005 - Usuários devem agendar coletas com data/hora válidas |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-007 – Cancelamento de coleta        |
|------------------------|----------------------------------------|
| Requisito associado    | RF-006 - O sistema deve permitir cancelamento  |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-008 – Consulta de saldo             |
|------------------------|----------------------------------------|
| Requisito associado    | RF-007 - O saldo deve ser exibido em tempo real |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-009 – Resgate de saldo              |
|------------------------|----------------------------------------|
| Requisito associado    | RF-008 - O sistema deve converter a coleta em saldo s |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-010 – Alteração de senha            |
|------------------------|----------------------------------------|
| Requisito associado    | RF-009 - Usuários devem atualizar senha  |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-011 – Logout                        |
|------------------------|----------------------------------------|
| Requisito associado    | RF-010 - O sistema deve encerrar sessões após logout |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-012 – Relatório de coletas          |
|------------------------|----------------------------------------|
| Requisito associado    | RF-011 - O sistema deve gerar relatórios em PDF/CSV |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-013 – Integração com WhatsApp       |
|------------------------|----------------------------------------|
| Requisito associado    | RF-012 - O sistema deve iniciar chats no WhatsApp Business |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-014 – Aprovação de coletas (admin)  |
|------------------------|----------------------------------------|
| Requisito associado    | RF-013 - Administradores devem aprovar coletas pendentes |
| Registro de evidência  | ![Etapas](images/Login.png)            |

| Caso de teste          | CT-015 – Responsividade                |
|------------------------|----------------------------------------|
| Requisito associado    | RF-014 - A interface deve se adaptar a diferentes telas |
| Registro de evidência  | ![Etapas](images/Login.png)            |
