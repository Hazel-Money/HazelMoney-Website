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
                    element: document.querySelector('.total-income'),
                    intro: 'Here you can check your total income',
                },
                {
                    title: 'Add income',
                    element: document.querySelector('.income-form-container'),
                    intro: 'Here you can add an income',
                },
                {
                    title: 'Income history',
                    element: document.querySelector('.incomes'),
                    intro: 'Here you can check your income history',
                },
                {
                    title: 'Edit income',
                    element: document.querySelector('.btn-con-edit'),
                    intro: 'Here you can edit your income',
                },
                {
                    title: 'Delete income',
                    element: document.querySelector('.btn-con-delete'),
                    intro: 'Here you can delete your income',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
