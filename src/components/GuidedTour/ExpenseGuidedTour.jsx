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
                    title: language === 'Portuguese' ? 'Total despesas' :'Total expense',
                    element: document.querySelector('.total-expense'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o total de despesas' : 'Here you can check your total expense',
                },
                {
                    title: language === 'Portuguese' ? 'Adicionar despesa' : 'Add expense',
                    element: document.querySelector('.expense-form-container'),
                    intro: language === 'Portuguese' ? 'Aqui pode adicionar uma despesa' :'Here you can add an expense',
                },
                {
                    title: language === 'Portuguese' ? 'Histórico de despesas' : 'Expense history',
                    element: document.querySelector('.expenses'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o histórico de despesas' : 'Here you can check your expense history',
                },
                {
                    title: language === 'Portuguese' ? 'Editar despesa' : 'Edit expense',
                    element: document.querySelector('.btn-con-edit'),
                    intro: language === 'Portuguese' ? 'Aqui pode editar uma despesa' :'Here you can edit your expense',
                },
                {
                    title: language === 'Portuguese' ? 'Excluir despesa' : 'Delete expense',
                    element: document.querySelector('.btn-con-delete'),
                    intro: language === 'Portuguese' ? 'Aqui pode excluir uma despesa' : 'Here you can delete your expense',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
