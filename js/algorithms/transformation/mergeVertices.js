/**
 * Klasa do scalania wierzchołków
 * na podstawie reprezentacji:
 * "Macierz sąsiedztwa"
 */
function MergeVertices() {
}

MergeVertices.prototype.run = function () {
    this.runOnGraph(GRAPH.graph);
}

MergeVertices.prototype.runOnGraph = function(graphObject) {
    // buduj "Macierz sąsiedztwa"
    GRAPH.structures.neighbourMatrix.buildFromGraph(graphObject);
	this.workableMatrix = GRAPH.structures.neighbourMatrix.neighbourArray;

    // sprawdź ilość wierzchołków
    let verticesAmount = GRAPH.structures.neighbourMatrix.neighbourArray.length;

    // scalany wierzchołek
    let v = 3;

    // zmienna globalna
    perm = [];

    z = [];

	GRAPH.algorithms.transposeGraph.showNeighbourArray(this.workableMatrix);

	// console.log(this.workableMatrix);

    this.mergeVertex(this.workableMatrix, verticesAmount, v);

    perm[v] = perm[0];
	z.push(v);

	do {
		let i = 1;
		while( (i<(verticesAmount-1) ) && (this.workableMatrix[0][i] == 0) ){ i++; }
		if ( this.workableMatrix[0][i] == 0) { return this.workableMatrix, verticesAmount, z; }
		else {
			z.push(perm[i]);
			perm[i] = perm[verticesAmount];
			this.mergeVertex(this.workableMatrix, verticesAmount, i);

			this.workableMatrix.splice(this.workableMatrix.length-1,1);
			for(var j=0; j<this.workableMatrix.length; j++){
				this.workableMatrix[j].splice(this.workableMatrix[j].length-1,1);
			}
			GRAPH.algorithms.transposeGraph.showNeighbourArray(this.workableMatrix);

			// to powinno byc w mergeVertex
			verticesAmount = verticesAmount - 1;

			// perm[i] = perm[verticesAmount];
			console.log("Perm: " + perm);

		}

	} while (true);	

}

MergeVertices.prototype.mergeVertex = function (workableMatrix, verticesAmount, v) {
	console.log(v);
	for (let k = 0; k < verticesAmount; k++){

		console.log(workableMatrix);
		console.log(workableMatrix[0]);
		console.log(workableMatrix[0][k]);
		console.log(workableMatrix[v]);

		// workableMatrix[1][k] ↔ workableMatrix[v][k] // zamień miejscami
		temporaryVariable = workableMatrix[0][k];
		workableMatrix[0][k] = Math.max(workableMatrix[v][k], temporaryVariable);
		workableMatrix[v][k] = Math.max(workableMatrix[v][k], temporaryVariable);

		// workableMatrix[k][1] ↔ workableMatrix[k][v] // zamień miejscami
		temporaryVariable = workableMatrix[k][0];
		workableMatrix[k][0] = Math.max(workableMatrix[k][v], temporaryVariable);
		workableMatrix[k][v] = Math.max(workableMatrix[k][v], temporaryVariable);

		workableMatrix[v][k] = workableMatrix[verticesAmount-1][k];
		workableMatrix[k][v] = workableMatrix[k][verticesAmount-1];
		
	}

	verticesAmount = verticesAmount - 1;
	return workableMatrix, verticesAmount;


}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.algorithms' to ją utwórz)
GRAPH.algorithms = GRAPH.algorithms || {};
GRAPH.algorithms.mergeVertices = new MergeVertices();