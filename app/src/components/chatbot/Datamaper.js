export default class Datamaper {
    constructor(properties) {
        this.properties = properties;
    }
    async Fetch() {
        const {
            Origin,
            Destination,
            Planid,
        } = this.properties;

        const Tarifas = await fetch(`http://localhost:4000/api/tarifas/destino?origin=${Origin}&destination=${Destination}`);
        const Plano = await fetch(`http://localhost:4000/api/planos/especifico?id=${Planid}`);
        if (Tarifas.status === 404 || Plano.status === 404)
            return {
                Qname: '404',
                question: 'Valor não encontrado no seridor não encontrado no servidor',
                id: 'error 404',
                options: [{
                    content: 'Tentar denovo',
                    id: '80',
                }]
            }

        const _Data = await Tarifas.json();
        const _Plano = await Plano.json();
        console.log(_Data);
        return {
            price: await _Data[0].H_M,
            origin: await _Data[0].origem,
            dest: await _Data[0].destino,
            tolerancy: await _Plano[0].pl_tolerancy,
            planname: await _Plano[0].pl_name
        }
    }
    async Bussines() {
        const Tarrif = await this.Fetch();
        const {Time} = this.properties;
        let Results = {
            origin: Tarrif.origin,
            Dest: Tarrif.dest,
            plan: Tarrif.planname,
            Time,
            Wfl: 0,
            WTfl: 0,
        };

       
            const _ExxedPercentage = 10;
            const _ExxedValue = Time - Tarrif.tolerancy;
            const Percentage = _ExxedPercentage/100 * Tarrif.price;
            if( Time <= Tarrif.tolerancy )
                Results.Wfl = 0
            else {
                let Interest = _ExxedValue * Tarrif.price + Percentage; 
                Results.Wfl = Interest;
            }
            let WithoutFl = Time * Tarrif.price + Percentage;
            Results.WTfl = WithoutFl;

            return Results;
    }
    async GetResults( ) {
        return await this.Bussines();
    }
}