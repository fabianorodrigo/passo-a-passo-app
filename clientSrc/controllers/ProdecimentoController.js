//serviços
import { Service } from "../lib/service";

class ProcedimentoController {
  constructor(appController) {
    this.app = appController;
  }

  limpaProcessos() {
    this.app.setState("resultadoBuscaProcedimentos", {});
  }

  /**
   * Busca no conjunto de procedimentos aqueles que tenham a ocorrência de {textoFiltro} no campo titulo e retorna
   * @param {string} textoFiltro Texto que será procurado no titulo
   */
  async buscaProcessosPorTitulo({ textoFiltro }) {
    this.app.setState("loading", true);
    try {
      const response = await Service.getAllLike({
        nomeModeloPlural: "Procedimentos",
        //FIXME: Por alguma razão que não descobri, o loopback-connector-mongodb não está conseguindo filtrar
        //pelo idGrupo mesmo quando coloco somente ele via "localhost:3000/explorer/processos"
        //filtroAND: grupoIdFiltro != "" && grupoIdFiltro != null? [{idGrupo:grupoIdFiltro}]:[],
        expressaoFiltro: textoFiltro,
        campos: ["titulo"]
      });
      const retorno = [];
      response.data.forEach(async p => {
        retorno.push({
          id: p.id,
          titulo: p.titulo,
          grupo: this.app.getState("Grupos")[p.idGrupo]
        });
      });
      return retorno;
    } catch (e) {
      console.error(`Exceção capturada em 'buscaProcessosPorTitulo'`, e);
      app.mostraMensagem(`Falha ao buscar ${nomeEntidadePlural}`, "error");
    } finally {
      this.app.setState("loading", false);
    }
  }

  /**
   * Busca no conjunto de procedimentos aqueles que tenham a ocorrência de {textoFiltro} nos campos titulo, entradas, saidas
   * ou passos.descricao e atualiza a state global 'resultadoBuscaProcedimentos'
   * @param {string} textoFiltro Texto que será procurado nos campos
   * @param {string} grupoIdFiltro Se setado, tratará somente processos que estejam neste grupo
   */
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
              tituloComposto: this.app.getState("Grupos")[p.idGrupo].tituloComposto,
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

  /**
   * Busca no conjunto de procedimentos aquele que o id {id} e atualiza a state global 'resultadoBuscaProcedimentos'
   * @param {string} id Identificador único do procedimento
   */
  async buscaProcesso(id) {
    this.app.setState("loading", true);
    try {
      const response = await Service.get({
        nomeModeloPlural: "Procedimentos",
        id
      });
      //Agrupando itens por grupo
      let grupoItens = {};
      let grupo = null;
      do {
        grupo = this.app.getState("Grupos")[response.data.idGrupo];
      } while (grupo == null);
      if (grupoItens[response.data.idGrupo] == null) {
        grupoItens[response.data.idGrupo] = {
          id: response.data.idGrupo,
          titulo: grupo.titulo,
          tituloComposto: grupo.tituloComposto,
          processos: []
        };
      }
      grupoItens[response.data.idGrupo].processos.push(response.data);
      this.app.setState("resultadoBuscaProcedimentos", grupoItens);
    } catch (e) {
      console.error(`Exceção capturada em 'buscaProcesso'`, e);
      app.mostraMensagem(`Falha ao buscar ${nomeEntidadePlural}`, "error");
    } finally {
      this.app.setState("loading", false);
    }
  }
}

export default ProcedimentoController;
