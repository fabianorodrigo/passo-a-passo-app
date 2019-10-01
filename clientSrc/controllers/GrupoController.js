//serviços
import { Service } from "../lib/service";
//import Categoria from '../components/Categoria';

class GrupoController {
  constructor(appController) {
    this.app = appController;
  }

  getHierarquiaCategoria(categoria, categorias = this.app.getState("CategoriasProdutos")) {
    let retorno = "";
    if (categoria.idpai != null) {
      retorno += this.getHierarquiaCategoria(categorias[categoria.idpai], categorias) + "→";
    }
    retorno = retorno + categoria.descricao;
    return retorno;
  }

  populaGrupos(arrayDestino, grupo) {
    arrayDestino.push(grupo);
    if (grupo.filhos) {
      Object.values(grupo.filhos).forEach(f => {
        this.populaGrupos(arrayDestino, f);
      });
    }
  }

  async carrega() {
    const grupos = {};
    const gruposHierarquica = {};
    const gruposFilhosPorPai = {};
    //carga em todos os grupos
    try {
      this.app.setState("loading", true);
      const response = await Service.getAll({
        nomeModeloPlural: "Grupos",
        sort: ["ordem", "titulo"]
      });
      response.data.forEach(g => {
        g.tituloComposto = g.titulo;
        grupos[g.id] = g;
        //Se não tem pai, começa a colocar na raiz da estrutura hierárquica
        //Se não, coloca na {gruposFilhosPorPai} para serem adicionados posteriormente de forma adequada
        if (g.grupoPai == null || g.grupoPai == "") {
          gruposHierarquica[g.id] = g;
        } else {
          if (gruposFilhosPorPai[g.grupoPai] == null) {
            gruposFilhosPorPai[g.grupoPai] = [];
          }
          gruposFilhosPorPai[g.grupoPai].push(g);
        }
      });
      this.app.setState("Grupos", grupos);
    } catch (e) {
      console.error(e);
      this.app.mostraMensagem(`Falha ao buscar Grupos`, "error");
    } finally {
      this.app.setState("loading", false);
    }

    //Organização dos grupos em uma estrutura encadeada
    try {
      this.app.setState("loading", true);

      Object.values(gruposHierarquica).forEach(pai => {
        pai.tituloComposto = pai.titulo;
        const paiApendado = apendaFilhos.call(this, pai, gruposFilhosPorPai);
        gruposHierarquica[pai.id] = paiApendado;
      });
      this.app.setState("GruposHierarquica", gruposHierarquica);
    } catch (e) {
      console.error(e);
      this.app.mostraMensagem(`Falha ao montar estrutura hierárquica de grupos de processos`, "error");
    } finally {
      this.app.setState("loading", false);
    }

    //Criação de estrutura sequencial mas em ordem hierarquica
    const gruposOrdemHierarquica = [];
    try {
      this.app.setState("loading", true);
      if (gruposHierarquica) {
        Object.values(gruposHierarquica).forEach(gh => {
          this.populaGrupos(gruposOrdemHierarquica, gh);
        });
      }
      this.app.setState("GruposOrdemHierarquica", gruposOrdemHierarquica);
    } catch (e) {
      console.error(e);
      this.app.mostraMensagem(`Falha ao montar estrutura ordenadacom base na hierarquia`, "error");
    } finally {
      this.app.setState("loading", false);
    }
  }
}

function apendaFilhos(grupoPai, filhosPorPai) {
  if (filhosPorPai[grupoPai.id] != null) {
    grupoPai.filhos = {};
    filhosPorPai[grupoPai.id].forEach(f => {
      f.tituloComposto = `${grupoPai.tituloComposto} 🢒 ${f.titulo}`;
      //copiando o titulo composto para a estrutura não hierárquica
      const grupos = this.app.getState("Grupos");
      grupos[f.id].tituloComposto = f.tituloComposto;
      this.app.setState("Grupos", grupos);
      const fApendado = apendaFilhos.call(this, f, filhosPorPai);
      grupoPai.filhos[f.id] = fApendado;
    });
  }
  return grupoPai;
}

export default GrupoController;
