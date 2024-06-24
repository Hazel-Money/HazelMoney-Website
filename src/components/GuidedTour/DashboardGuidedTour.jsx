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
                    element: document.querySelector('.income'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o total de receitas' : 'Here you can check your total income',
                },
                {
                    title: language === 'Portuguese' ? 'Total despesas' : 'Total expense',
                    element: document.querySelector('.expense'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o total de despesas' : 'Here you can check your total expense',
                },
                {
                    title: language === 'Portuguese' ? 'Total saldo' : 'Total balance',
                    element: document.querySelector('.balance'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o total de saldo' : 'Here you can check your total balance',
                },
                {
                    title: language === 'Portuguese' ? 'Histórico recente' : 'Recent history',
                    element: document.querySelector('.history-con'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o histórico de transações' : 'Here you can check your last transactions',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
