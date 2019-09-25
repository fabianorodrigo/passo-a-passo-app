//serviços
import { Service } from "../lib/service";

class ProcedimentoController {
  constructor(appController) {
    this.app = appController;
  }

  limpaProcessos() {
    this.app.setState("resultadoBuscaProcedimentos", {});
  }

  async buscaProcessos({ textoFiltro, grupoIdFiltro }) {
    this.app.setState("loading", true);
    try {
      const response = await Service.getAllLike({
        nomeModeloPlural: "Procedimentos",
        //FIXME: Por alguma razão que não descobri, o loopback-connector-mongodb não está conseguindo filtrar
        //pelo idGrupo mesmo quando coloco somente ele via "localhost:3000/explorer/processos"
        //filtroAND: grupoIdFiltro != "" && grupoIdFiltro != null? [{idGrupo:grupoIdFiltro}]:[],
        expressaoFiltro: textoFiltro,
        campos: ["titulo", "entradas", "saidas", "passos.descricao"]
      });
      //Agrupando itens por grupo
      let grupoItens = {};
      response.data.forEach(async p => {
        //FIXME: Por alguma razão que não descobri, o loopback-connector-mongodb não está conseguindo filtrar
        //pelo idGrupo mesmo quando coloco somente ele via "localhost:3000/explorer/processos"
        if (grupoIdFiltro == null || grupoIdFiltro.trim() == "" || grupoIdFiltro === p.idGrupo) {
          if (grupoItens[p.idGrupo] == null) {
            grupoItens[p.idGrupo] = {
              id: p.idGrupo,
              titulo: this.app.getState("Grupos")[p.idGrupo].titulo,
              processos: []
            };
          }
          grupoItens[p.idGrupo].processos.push(p);
        }
      });
      this.app.setState("resultadoBuscaProcedimentos", grupoItens);
    } catch (e) {
      console.error(`Exceção capturada em 'buscaProcessos'`, e);
      app.mostraMensagem(`Falha ao buscar ${nomeEntidadePlural}`, "error");
    } finally {
      this.app.setState("loading", false);
    }
  }
}

export default ProcedimentoController;
