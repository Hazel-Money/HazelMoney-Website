import React, { useEffect } from 'react';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';

function GuidedTour() {
    useEffect(() => {
        const tour = IntroJs();

        tour.setOptions({
            steps: [
                {
                    title: 'Add regular payment',
                    element: document.querySelector('.payment-form-container'),
                    intro: 'Here you can add a regular payment',
                },
                {
                    title: 'Regular payment history',
                    element: document.querySelector('.payment'),
                    intro: 'Here you can check your regular payments history',
                },
                {
                    title: 'Edit regular payment',
                    element: document.querySelector('.btn-con-edit'),
                    intro: 'Here you can edit your regular payment',
                },
                {
                    title: 'Delete regular payment',
                    element: document.querySelector('.btn-con-delete'),
                    intro: 'Here you can delete your regular payment',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
