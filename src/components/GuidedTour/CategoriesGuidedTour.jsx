import React, { useEffect } from 'react';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';

function GuidedTour() {
    useEffect(() => {
        const tour = IntroJs();

        tour.setOptions({
            steps: [
                {
                    title: 'Add category',
                    element: document.querySelector('.category-form-inputs'),
                    intro: 'Here you can add a category',
                },
                {
                    title: 'Select icon',
                    element: document.querySelector('.icon-selection'),
                    intro: 'Here you can select an icon for your category',
                },
                {
                    title: 'Preview section',
                    element: document.querySelector('.preview-section'),
                    intro: 'Here you can check what is your icon looking like',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
