const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

const criaLi = () => {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = "Apagar";
  //botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  li.appendChild(botaoApagar);
}

const criaTarefa = (textoInput) => {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', (e) => {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});


//Removendo Tarefa
document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

const salvarTarefas = () => {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON); // só pode salvar em string, por isso a conversão
}

const adicionaTarefasSalvas = () => {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas){
    criaTarefa(tarefa);
  }
}

adicionaTarefasSalvas();