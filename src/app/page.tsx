"use client";

import React, { useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import { ModalTarefa } from "@/componentes/ModalTarefa";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido
			? "bg-gray-800 hover:border-gray-800"
			: "bg-gray-400 hover:border-gray-400"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={escutarClique}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

export default function Home() {
	const [tarefasAdicionadas, setTarefasAdicionadas] = useState<string[]>([]);
	const [modalAberto, setModalAberto] = useState(false);

	const adicionarTarefa = (titulo: string) => {
		setTarefasAdicionadas([...tarefasAdicionadas, titulo]);
	};

	return (
		<main className="min-h-screen bg-gray-100 p-8">
			<Cabecalho />

			<h1 className="text-3xl font-bold mb-6">Minhas Tarefas</h1>

			{/* Tarefas fixas (dados.ts) */}
			<div className="mb-10">
				<h2 className="text-2xl font-semibold mb-3">Tarefas do sistema</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{dados.map((tarefa) => (
						<Tarefa
							key={tarefa.id}
							titulo={tarefa.title}
							concluido={tarefa.completed}
						/>
					))}
				</div>
			</div>

			{/* Tarefas adicionadas pelo usuário */}
			<div className="mb-10">
				<h2 className="text-2xl font-semibold mb-3">Minhas Tarefas</h2>
				{tarefasAdicionadas.length === 0 ? (
					<p className="text-gray-500">Nenhuma tarefa adicionada ainda.</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{tarefasAdicionadas.map((tarefa, index) => (
							<Tarefa key={index} titulo={tarefa} />
						))}
					</div>
				)}
			</div>

			{/* Botão para abrir o modal */}
			<button
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
				onClick={() => setModalAberto(true)}
			>
				Nova Tarefa
			</button>

			{/* Modal para adicionar nova tarefa */}
			{modalAberto && (
				<ModalTarefa
					onAdd={adicionarTarefa}
					onClose={() => setModalAberto(false)}
				/>
			)}
		</main>
	);
}
