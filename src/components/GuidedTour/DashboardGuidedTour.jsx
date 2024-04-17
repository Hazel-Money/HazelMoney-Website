import React, { useEffect } from 'react';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';

function GuidedTour() {
    useEffect(() => {
        const tour = IntroJs();

        tour.setOptions({
            steps: [
                {
                    title: 'Total income',
                    element: document.querySelector('.income'),
                    intro: 'Here you can check your total income',
                },
                {
                    title: 'Total expense',
                    element: document.querySelector('.expense'),
                    intro: 'Here you can check your total expense',
                },
                {
                    title: 'Total balance',
                    element: document.querySelector('.balance'),
                    intro: 'Here you can check your total balance',
                },
                {
                    title: 'Recent history',
                    element: document.querySelector('.history-con'),
                    intro: 'Here you can check your last transactions',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
