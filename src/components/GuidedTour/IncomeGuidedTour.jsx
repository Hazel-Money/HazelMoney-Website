import React, { useEffect } from 'react';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';
import { useGlobalContext } from '../../context/globalContext';

function GuidedTour() {
    const { language } = useGlobalContext();
    useEffect(() => {
        const tour = IntroJs();

        tour.setOptions({
            steps: [
                {
                    title: language === 'Portuguese' ? 'Total receitas' : 'Total income',
                    element: document.querySelector('.total-income'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o total de receitas' : 'Here you can check your total income',
                },
                {
                    title: language === 'Portuguese' ? 'Adicionar receita' : 'Add income',
                    element: document.querySelector('.income-form-container'),
                    intro: language === 'Portuguese' ? 'Aqui pode adicionar uma receita' : 'Here you can add an income',
                },
                {
                    title: language === 'Portuguese' ? 'Histórico de receitas' : 'Income history',
                    element: document.querySelector('.incomes'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o histórico de receitas' : 'Here you can check your income history',
                },
                {
                    title: language === 'Portuguese' ? 'Editar receita' : 'Edit income',
                    element: document.querySelector('.btn-con-edit'),
                    intro: language === 'Portuguese' ? 'Aqui pode editar uma receita' : 'Here you can edit your income',
                },
                {
                    title: language === 'Portuguese' ? 'Excluir receita' : 'Delete income',
                    element: document.querySelector('.btn-con-delete'),
                    intro: language === 'Portuguese' ? 'Aqui pode excluir uma receita' : 'Here you can delete your income',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
