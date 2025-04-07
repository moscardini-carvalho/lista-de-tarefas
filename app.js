// Tarefa.js
class Tarefa {
    constructor(titulo, prioridade) {
      this.titulo = titulo;
      this.prioridade = prioridade;
      this.concluida = false;
    }
  
    concluir() {
      this.concluida = true;
    }
  }
  
  // ListaTarefas.js
  class ListaTarefas {
    constructor() {
      this.tarefas = [];
    }
  
    adicionar(tarefa) {
      this.tarefas.push(tarefa);
    }
  
    [Symbol.iterator]() {
      return new IteradorTarefas(this.tarefas);
    }
  }
  
  // IteradorTarefas.js
  class IteradorTarefas {
    constructor(tarefas) {
      this.tarefas = tarefas;
      this.index = 0;
    }
  
    next() {
      if (this.index < this.tarefas.length) {
        return { value: this.tarefas[this.index++], done: false };
      }
      return { done: true };
    }
  }
  
  // Comando base
  class Comando {
    executar() {}
  }
  
  // ComandoCriarTarefa.js
  class ComandoCriarTarefa extends Comando {
    constructor(lista, tarefa, historico) {
      super();
      this.lista = lista;
      this.tarefa = tarefa;
      this.historico = historico;
    }
  
    executar() {
      this.lista.adicionar(this.tarefa);
      this.historico.adicionar(`Tarefa criada: ${this.tarefa.titulo}`);
    }
  }
  
  // ComandoConcluirTarefa.js
  class ComandoConcluirTarefa extends Comando {
    constructor(tarefa, historico, observador) {
      super();
      this.tarefa = tarefa;
      this.historico = historico;
      this.observador = observador;
    }
  
    executar() {
      this.tarefa.concluir();
      this.historico.adicionar(`Tarefa concluída: ${this.tarefa.titulo}`);
      this.observador.notificar(this.tarefa);
    }
  }
  
  // FiltroPrioridade.js
  class FiltroPrioridade {
    constructor(prioridade) {
      this.prioridade = prioridade;
    }
  
    filtrar(tarefas) {
      return tarefas.filter(t => t.prioridade === this.prioridade);
    }
  }
  
  // ObservadorTarefaConcluida.js
  class ObservadorTarefaConcluida {
    notificar(tarefa) {
      console.log(`Notificação: A tarefa '${tarefa.titulo}' foi concluída.`);
    }
  }
  
  // HistoricoComandos.js
  class HistoricoComandos {
    constructor() {
      this.entradas = [];
    }
  
    adicionar(entrada) {
      this.entradas.push(entrada);
    }
  
    mostrar() {
      this.entradas.forEach(e => console.log(e));
    }
  }
  
  // Exemplo de uso
  const lista = new ListaTarefas();
  const historico = new HistoricoComandos();
  const observador = new ObservadorTarefaConcluida();
  
  const tarefa1 = new Tarefa("Estudar JavaScript", "alta");
  const criar = new ComandoCriarTarefa(lista, tarefa1, historico);
  criar.executar();
  
  const concluir = new ComandoConcluirTarefa(tarefa1, historico, observador);
  concluir.executar();
  
  const filtro = new FiltroPrioridade("alta");
  const filtradas = filtro.filtrar(lista.tarefas);
  console.log("Filtradas:", filtradas.map(t => t.titulo));
  
  console.log("\nHistórico:");
  historico.mostrar();
  