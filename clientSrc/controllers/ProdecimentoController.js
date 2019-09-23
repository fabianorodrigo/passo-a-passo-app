//serviços
import { Service } from '../lib/service';

class ProcedimentoController {
  constructor(appController) {
    this.app = appController;
  }

  async buscaProcessos(filtro) {
    this.app.setState('loading', true);
    try {
      const response = await Service.getAllLike({
        nomeModeloPlural: 'Procedimentos',
        expressaoFiltro: filtro,
        campos: ['titulo', 'entradas', 'saidas', 'passos.descricao'],
      });
      //Agrupando itens por grupo
      let grupoItens = {};
      response.data.forEach(async p => {
        if (grupoItens[p.idGrupo] == null) {
          grupoItens[p.idGrupo] = {
            id: p.idGrupo,
            titulo: this.app.getState('Grupos')[p.idGrupo].titulo,
            processos: [],
          };
        }
        grupoItens[p.idGrupo].processos.push(p);
      });
      this.app.setState('resultadoBuscaProcedimentos', grupoItens);
    } catch (e) {
      console.error(`Exceção capturada em 'buscaProcessos'`, e);
      app.mostraMensagem(`Falha ao buscar ${nomeEntidadePlural}`, 'error');
    } finally {
      this.app.setState('loading', false);
    }
  }
}

export default ProcedimentoController;
