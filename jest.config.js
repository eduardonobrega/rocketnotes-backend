module.exports = {
  bail: true, // se um teste falhar ele para de executar o teste
  coverageProvider: 'v8',
  // Vale a pena colocar, pois quando o teste for executar ele vai ignorar os outros arquivos e vai direto nos arquivos de teste
  testMatch: [ // expressão regular para disser o padrão dos arquivos de teste
    "<rootDir>/src/**/*.spec.js"  // dentro de qualquer pasta vai ter um arquivo de qualquer nome com a extensão .spec.js
  ] //(.spec.js/.test.js)-> para falar que é um arquivo de test
};
