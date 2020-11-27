export default (category) => {
  switch (category) {
    case 'SALARIO':
      return 'Salário';
    case 'INVESTIMENTO':
      return 'Investimento';
    case 'EMPRESTIMO':
      return 'Empréstimo';
    case 'ALIMENTACAO':
      return 'Alimentação';
    case 'ASSINATURAS_E_SERVICOS':
      return 'Assinaturas e serviços';
    case 'EDUCACAO':
      return 'Educação';
    case 'IMPOSTOS_E_ETAXAS':
      return 'Impostos e taxas';
    case 'LAZER_E_HOBBIES':
      return 'Lazer e hobbies';
    case 'PETS':
      return 'Pets';
    case 'ROUPAS':
      return 'Roupas';
    case 'SAUDE':
      return 'Saúde';
    case 'TRANSPORTE':
      return 'Transporte';
    case 'OUTROS':
      return 'Outros';
    default:
  }
};
