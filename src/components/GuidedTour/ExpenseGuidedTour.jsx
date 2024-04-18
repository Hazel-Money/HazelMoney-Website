import React, { useEffect } from 'react';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';

function GuidedTour() {
    useEffect(() => {
        const tour = IntroJs();

        tour.setOptions({
            steps: [
                {
                    title: 'Total expense',
                    element: document.querySelector('.total-expense'),
                    intro: 'Here you can check your total expense',
                },
                {
                    title: 'Add expense',
                    element: document.querySelector('.expense-form-container'),
                    intro: 'Here you can add an expense',
                },
                {
                    title: 'Expense history',
                    element: document.querySelector('.expenses'),
                    intro: 'Here you can check your expense history',
                },
                {
                    title: 'Edit expense',
                    element: document.querySelector('.btn-con-edit'),
                    intro: 'Here you can edit your expense',
                },
                {
                    title: 'Delete expense',
                    element: document.querySelector('.btn-con-delete'),
                    intro: 'Here you can delete your expense',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
