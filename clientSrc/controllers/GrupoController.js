//serviços
import { Service } from '../lib/service';
//import Categoria from '../components/Categoria';

class GrupoController {
  constructor(appController) {
    this.app = appController;
  }

  getHierarquiaCategoria(
    categoria,
    categorias = this.app.getState('CategoriasProdutos'),
  ) {
    let retorno = '';
    if (categoria.idpai != null) {
      retorno +=
        this.getHierarquiaCategoria(categorias[categoria.idpai], categorias) +
        '→';
    }
    retorno = retorno + categoria.descricao;
    return retorno;
  }

  async carrega() {
    const grupos = {};
    const gruposHierarquica = {};
    const gruposFilhosPorPai = {};
    //carga em todos os grupos
    try {
      this.app.setState('loading', true);
      const response = await Service.getAll({
        nomeModeloPlural: 'Grupos',
        sort: ['ordem', 'titulo'],
      });
      response.data.forEach(g => {
        grupos[g.id] = g;
        //Se não tem pai, começa a colocar na raiz da estrutura hierárquica
        //Se não, coloca na {gruposFilhosPorPai} para serem adicionados posteriormente de forma adequada
        if (g.grupoPai == null || g.grupoPai == '') {
          gruposHierarquica[g.id] = g;
        } else {
          if (gruposFilhosPorPai[g.grupoPai] == null) {
            gruposFilhosPorPai[g.grupoPai] = [];
          }
          gruposFilhosPorPai[g.grupoPai].push(g);
        }
      });
      this.app.setState('Grupos', grupos);
    } catch (e) {
      console.error(e);
      this.app.mostraMensagem(`Falha ao buscar Grupos`, 'error');
    } finally {
      this.app.setState('loading', false);
    }

    //Organização dos grupos em uma estrutura encadeada
    try {
      this.app.setState('loading', true);

      Object.values(gruposHierarquica).forEach(pai => {
        pai.tituloComposto = pai.titulo;
        const paiApendado = apendaFilhos(pai, gruposFilhosPorPai);
        gruposHierarquica[pai.id] = paiApendado;
      });
      this.app.setState('GruposHierarquica', gruposHierarquica);
    } catch (e) {
      console.error(e);
      this.app.mostraMensagem(
        `Falha ao montar estrutura hierárquica de grupos de processos`,
        'error',
      );
    } finally {
      this.app.setState('loading', false);
    }
  }
}

function apendaFilhos(grupoPai, filhosPorPai) {
  if (filhosPorPai[grupoPai.id] != null) {
    grupoPai.filhos = {};
    filhosPorPai[grupoPai.id].forEach(f => {
      f.tituloComposto = `${grupoPai.tituloComposto} 🢒 ${f.titulo}`;
      const fApendado = apendaFilhos(f, filhosPorPai);
      grupoPai.filhos[f.id] = fApendado;
    });
  }
  return grupoPai;
}

export default GrupoController;
