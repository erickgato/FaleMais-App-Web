export default class Datamaper {
  constructor(properties) {
    this.properties = properties;
  }
  Get404error() {
    return {
      Qname: "404",
      question: "Valor não encontrado no seridor não encontrado no servidor",
      id: "error 404",
      options: [
        {
          content: "Tentar denovo",
          id: "80",
        },
      ],
    };
  }
  async Fetch() {
    const { Origin, Destination, Planid } = this.properties;

    const Tarifas = await fetch(
      `http://localhost:4000/api/tarifas/destino?origin=${Origin}&destination=${Destination}`
    );
    const Plano = await fetch(
      `http://localhost:4000/api/planos/especifico?id=${Planid}`
    );
    if (Tarifas.status === 404 || Plano.status === 404)
      return this.Get404error();

    const _Data = await Tarifas.json();
    const _Plano = await Plano.json();
    if (_Data.length === 0 || _Plano.length === 0) return false;

    return {
      price: await _Data[0].H_M,
      origin: await _Data[0].origem,
      dest: await _Data[0].destino,
      tolerancy: await _Plano[0].pl_tolerancy,
      planname: await _Plano[0].pl_name,
    };
  }
  async Bussines() {
    const Tarrif = await this.Fetch();
    if (Tarrif === false) return this.Get404error();

    const { Time } = this.properties;
    let Results = {
      origin: Tarrif.origin,
      Dest: Tarrif.dest,
      plan: Tarrif.planname,
      Time,
      Wfl: 0,
      WTfl: 0,
    };
    /**
     * @Description_PT caso o valor falado pelo cliente  seja maior do que a tolerância
     * do seu plano cada minuto excedente terá um acrescimo de 10% sobre o valor de cada minuto a mais
     * na tolerãncia
     */
    const _ExxedPercentage = 10;
    const _ExxedValue = Tarrif.tolerancy - Time;
    const Percentage = (_ExxedPercentage / 100) * Tarrif.price;
    let Interest = _ExxedValue * Tarrif.price + Percentage;
    console.log(Tarrif);
    console.log(typeof Time, typeof Tarrif.tolerancy);
    console.log(Time < Tarrif.tolerancy);
    if (_ExxedValue >= 0) Results.Wfl = "R$ 0,00";
    // Se for maior não é uma divida
    else {
      let WithFl = Interest * -1;
      Results.Wfl = WithFl.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    }
    let WithoutFl = Time * Tarrif.price;
    Results.WTfl = WithoutFl.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return Results;
  }
  async GetResults() {
    return await this.Bussines();
  }
}
