# Registro de Testes de Usabilidade - EcoFlow DBM

<p align="justify">
Este relatório consolida os resultados dos testes de usabilidade realizados na aplicação EcoFlow DBM, envolvendo 8 participantes em 5 cenários críticos do sistema. Os dados coletados abrangem métricas de eficácia (taxa de sucesso), eficiência (tempo de execução) e satisfação subjetiva, comparando sempre o desempenho dos usuários com o do especialista. O objetivo principal é identificar pontos de melhoria na experiência do usuário, garantindo que a plataforma atenda tanto às necessidades funcionais quanto às expectativas de usabilidade.
</p>

**Data**: 27/06/2025 
**Amostra**: 8 usuários (U1-U8) + 1 especialista  
**Método**: Observação direta com medição de tempo e satisfação  

## Resultados por Cenário

### Cenário 1: Cadastro de Usuário  
*"Você é um novo usuário - realize seu cadastro completo"*  

| Usuário | Sucesso | Satisfação (1-5) | Tempo  | Dificuldades              |
|---------|---------|------------------|--------|---------------------------|
| U1      | SIM     | 5                | 25s    | Nenhuma                   |
| U2      | SIM     | 4                | 32s    | Campos obrigatórios       |
| U3      | SIM     | 5                | 28s    | Nenhuma                   |
| U4      | SIM     | 4                | 41s    | Confirmação de senha      |
| U5      | SIM     | 5                | 36s    | Nenhuma                   |
| U6      | SIM     | 3                | 47s    | Validação em tempo real   |
| U7      | SIM     | 5                | 29s    | Nenhuma                   |
| U8      | SIM     | 4                | 31s    | Termos de uso             |
| **Média** | **100%** | **4,4**         | **34,6s** | 3/8 reportaram problemas  |
| Especialista | SIM | 5          | 8s     | -                         |

**Comentários**:  
> "Poderia mostrar erros durante o preenchimento" (U6)  
> "Botão de cadastro pouco visível" (U2)  

---

### Cenário 2: Agendamento de Coleta  
*"Agende uma coleta para 15 vasilhames"*  

| Usuário | Sucesso | Satisfação | Tempo  | Dificuldades              |
|---------|---------|------------|--------|---------------------------|
| U1      | SIM     | 5          | 42s    | Nenhuma                   |
| U2      | SIM     | 4          | 51s    | Seleção de quantidade     |
| U3      | SIM     | 5          | 38s    | Nenhuma                   |
| U4      | SIM     | 3          | 56s    | Calendário                |
| U5      | SIM     | 4          | 1min12s| Confirmação               |
| U6      | SIM     | 5          | 45s    | Nenhuma                   |
| U7      | SIM     | 4          | 49s    | Endereço automático       |
| U8      | SIM     | 5          | 40s    | Nenhuma                   |
| **Média** | **100%** | **4,4**   | **51,6s** | 4/8 dificuldades         |
| Especialista | SIM | 5    | 14s    | -                         |

**Comentários**:  
> "Calendário deveria mostrar fins de semana de outra cor" (U4)  
> "Quase agendei a quantidade errada" (U2)  

---

### Cenário 3: Consulta de Saldo  
*"Verifique seu saldo atual de recompensas"*  

| Usuário | Sucesso | Satisfação | Tempo  | Observações               |
|---------|---------|------------|--------|---------------------------|
| U1      | SIM     | 5          | 18s    | -                         |
| U2      | SIM     | 5          | 15s    | -                         |
| U3      | NÃO     | 2          | 1min05s| Não encontrou o ícone      |
| U4      | SIM     | 4          | 22s    | Ícone pequeno             |
| U5      | SIM     | 5          | 16s    | -                         |
| U6      | SIM     | 5          | 14s    | -                         |
| U7      | SIM     | 4          | 25s    | -                         |
| U8      | SIM     | 5          | 19s    | -                         |
| **Média** | **87,5%** | **4,3**  | **24,3s** | 1 falha crítica         |
| Especialista | SIM | 5    | 5s     | -                         |

**Comentários**:  
> Não houve comentários 
  

---

### Cenário 4: Resgate via Pix  
*"Resgate R$20,00 do seu saldo via Pix"*  

| Usuário | Sucesso | Satisfação | Tempo  | Problemas                 |
|---------|---------|------------|--------|---------------------------|
| U1      | SIM     | 5          | 35s    | -                         |
| U2      | SIM     | 4          | 48s    | Confirmação em 2 etapas    |
| U3      | SIM     | 5          | 40s    | -                         |
| U4      | SIM     | 3          | 1min10s| Campos do Pix             |
| U5      | SIM     | 4          | 52s    | -                         |
| U6      | SIM     | 5          | 38s    | -                         |
| U7      | NÃO     | 1          | 2min   | Erro na chave Pix         |
| U8      | SIM     | 5          | 42s    | -                         |
| **Média** | **87,5%** | **4,0**  | **58,1s** | 1 falha + 2 dificuldades |
| Especialista | SIM | 5    | 12s    | -                         |

**Comentários**:  
> "Poucos passos para confirmar" (U2)  
> "Não existe validação da chave Pix" (U7)  

---

### Cenário 5: Edição de Perfil  
*"Atualize aua senha"*  

| Usuário | Sucesso | Satisfação | Tempo  | Dificuldades              |
|---------|---------|------------|--------|---------------------------|
| U1      | SIM     | 5          | 28s    | -                         |
| U2      | SIM     | 4          | 35s    | Botão "Salvar"            |
| U3      | SIM     | 5          | 30s    | -                         |
| U4      | SIM     | 5          | 32s    | -                         |
| U5      | SIM     | 4          | 45s    | Validação de telefone     |
| U6      | SIM     | 5          | 27s    | -                         |
| U7      | SIM     | 3          | 1min05s| Campos obrigatórios       |
| U8      | SIM     | 5          | 29s    | -                         |
| **Média** | **100%** | **4,5**   | **36,4s** | 3/8 problemas           |
| Especialista | SIM | 5    | 7s     | -                         |

**Comentários**:  
> "Campo não confirma as senhas se estão idênticas" (U5)  
> "sem informação dos requisitos da senha" (U2)  

---

## Análise Geral

### Desempenho por Cenário
| Cenário               | Taxa Sucesso | Satisfação | Tempo Usuários | Tempo Especialista |
|-----------------------|--------------|------------|----------------|--------------------|
| Cadastro              | 100%         | 4,4        | 34,6s          | 8s                 |
| Agendamento           | 100%         | 4,4        | 51,6s          | 14s                |
| Consulta Saldo        | 87,5%        | 4,3        | 24,3s          | 5s                 |
| Resgate Pix           | 87,5%        | 4,0        | 58,1s          | 12s                |
| Edição Perfil         | 100%         | 4,5        | 36,4s          | 7s                 |



<p align="justify">
Os resultados demonstram alta taxa de sucesso (87,5%-100%) e satisfação média elevada (4,0-4,5/5) em todos os cenários, porém revelam oportunidades significativas de otimização, especialmente no fluxo de resgate via Pix (58,1s tempo médio) e na visibilidade do ícone de saldo (25% dos usuários com dificuldades). A análise comparativa entre usuários e especialista evidenciou gaps de eficiência consistentes (3-4x maior tempo de execução), sugerindo a necessidade de melhorias no design de interação e feedback visual para reduzir a curva de aprendizado.
</p>
