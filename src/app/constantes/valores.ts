export const CORES = {
  primaria: '#00838f',
  primaria_light: '#4fb3bf',
  primaria_dark: '#005662',
  acento: '#00796b',
  acento_light: '#48a999',
  acento_dark: '#004c40',
};

export const SEXOS = [
  { valor: 'M', descricao: 'Masculino' },
  { valor: 'F', descricao: 'Feminino' },
  { valor: 'O', descricao: 'Outro' },
  { valor: 'N', descricao: 'Não informado' },
];

export const TIPOS_TELEFONE = [
  { valor: 'W', descricao: 'WhatsApp' },
  { valor: 'C', descricao: 'Celular' },
  { valor: 'F', descricao: 'Fixo' }
];

export const RESPONSAVEL_TIPO = [
  { valor: 1, descricao: 'Pai' },
  { valor: 2, descricao: 'Mãe' },
  { valor: 3, descricao: 'Irmão(ã)' },
  { valor: 4, descricao: 'Avô(ó)' },
  { valor: 5, descricao: 'Tio(a)' },
  { valor: 6, descricao: 'Cuidador(a)' },
  { valor: 7, descricao: 'Primo(a)' },
  { valor: 8, descricao: 'Outro' },
]

export const REGEX_TELEFONE =
  /^(68|82|96|92|71|88|61|27|62|98|65|84|31|41|83|91|81|86|21|84|51|69|95|48|79|11|63)\s?(([2-5]\d{3})|([6-9]\d{4}))-?\d{4}$/g;

export const TIPOS_PAGAMENTO = {
  dinheiro: 1,
  debito: 2,
  credito: 3
};
