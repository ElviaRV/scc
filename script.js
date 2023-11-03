let matriz = [];
let cy;



function agregarNodo() {
   // const tabla = document.getElementById('matriz');
    const tamanio = matriz.length;
    
    // Agregar una columna
    for (let i = 0; i < tamanio; i++) {
        matriz[i].push(0);
    }

    // Agregar una fila
    const nuevaFila = [];
    for (let i = 0; i < tamanio + 1; i++) {
        nuevaFila.push(0);
    }
    matriz.push(nuevaFila);

    actualizarMatriz();
}

function quitarNodo() {
    if (matriz.length <= 1) {
        alert("No puedes eliminar más nodos.");
        return;
    }

    const tamanio = matriz.length;

    // Eliminar última columna
    for (let i = 0; i < tamanio; i++) {
        matriz[i].pop();
    }

    // Eliminar última fila
    matriz.pop();

    actualizarMatriz();
}

function actualizarMatriz() {
    const tabla = document.getElementById('matriz');
    tabla.innerHTML = '';

    for (let i = 0; i < matriz.length; i++) {
        const nuevaFila = document.createElement('tr');

        for (let j = 0; j < matriz[i].length; j++) {
            const nuevaCelda = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = matriz[i][j];
            input.style.width = '30px';
            input.style.height = '30px';
            input.style.textAlign = 'center';
            input.name = `valor${i}-${j}`;
            input.addEventListener('change', function() {
                matriz[i][j] = parseInt(this.value);
            });
            nuevaCelda.appendChild(input);
            nuevaFila.appendChild(nuevaCelda);
        }

        tabla.appendChild(nuevaFila);
    }
}

function generarMatrizAleatoria() {
    const tamanio = matriz.length;

    for (let i = 0; i < tamanio; i++) {
        for (let j = 0; j < tamanio; j++) {
            matriz[i][j] = Math.round(Math.random());
        }
    }

    actualizarMatriz();
}

function imprimirMatriz() {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            console.log(matriz[i][j]);
        }
        console.log('\n'); // Agrega un salto de línea entre filas
    }
}

function dibujarGrafo() {
    var nodes = new vis.DataSet();
    var edges = new vis.DataSet();

    var tamanio = matriz.length;

    for (let i = 0; i < tamanio; i++) {
        nodes.add({ id: i, label: `Nodo ${i}` });
        for (let j = 0; j < tamanio; j++) {
            if (matriz[i][j] != 0) {
                edges.add({ from: i, to: j, arrows: "to"});
            }
        }
    }

    var container = document.getElementById("mynetwork");
    var data = { nodes, edges };
    var options = {};
    window.network = new vis.Network(container, data, options);
}
function makeG(matrix) {
    let G = [];
    for (let i = 0; i < matrix.length; i++) {
      G.push([]);
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] == 1) {
          G[i].push(j);
        }
      }
    }
    return G;
  }
  

function reverseGraph(G) {
    let n = G.length;
    let Grev = Array.from({ length: n }, () => []);
  
    for (let u = 0; u < n; u++) {
        for (let v of G[u]) {
            Grev[v].push(u);
        }
    }
  
    return Grev;
}


  

  
function dfs(G, u, lst, visited) {
    visited[u] = true;
    for (let v of G[u]) {
        if (!visited[v]) {
            dfs(G, v, lst, visited);
        }
    }
    lst.push(u);
}

function kosaraju(G) {
    const n = G.length;
const visited = new Array(n).fill(false);
    const  f = [];

    const Grev = reverseGraph(G);

    for (let u = 0; u < n; u++) {
        if (!visited[u]) {
            dfs(Grev, u, f, visited);
        }
    }

    visited.fill(false);

    const scc = [];

    for (let i = f.length-1; i>=0; i--) {
        const u = f[i];
        if (!visited[u]) {
            const cc = [];
            dfs(G, u, cc, visited);
            scc.push(cc);
        }
    }

    return scc;
}




function hallarComponentesFuertementeConexas() {
    imprimirMatriz()
    let  G = makeG(matriz);
    let  componentes = kosaraju(G);
    imprimirComponentesFuertementeConexas(componentes);
}

function imprimirComponentesFuertementeConexas(componentes) {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Componentes Fuertemente Conexas:<br>';
    for (let i = 0; i < componentes.length; i++) {
        resultado.innerHTML += `[${componentes[i].join(',')}] `;
    }

       // Visualizar las componentes fuertemente conexas
       let sccContainer = document.getElementById('sccVisualization');
       let sccNodes = new vis.DataSet();
       let sccEdges = new vis.DataSet();
   
       for (let i = 0; i < componentes.length; i++) {
           for (let j = 0; j < componentes[i].length; j++) {
               sccNodes.add({ id: componentes[i][j], label: `Nodo ${componentes[i][j]}` });
           }
    for (let j = 0; j < componentes[i].length; j++) {
        for (let k = j + 1; k < componentes[i].length; k++) {
            sccEdges.add({ from: componentes[i][j], to: componentes[i][k], arrows: "to" });
        }
    }
}

let sccData = { nodes: sccNodes, edges: sccEdges };
let sccOptions = {};
let sccNetwork = new vis.Network(sccContainer, sccData, sccOptions);
}

