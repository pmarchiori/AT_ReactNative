const BASE_URL =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata";

export default CurrencyApi = {
  async getMonitoredCurrencies() {
    const url = `${BASE_URL}/Moedas?$top=100&$format=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Erro ao obter lista de moedas: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getCurrencyQuotation(currency, date) {
    const url = `${BASE_URL}/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${currency}'&@dataCotacao='${date}'&$top=1&$format=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Erro ao obter cotação para ${currency} na data ${date}: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data.value[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
